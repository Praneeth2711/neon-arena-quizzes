import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";

export interface Profile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  games_played: number;
  games_won: number;
  total_correct: number;
  total_answered: number;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isConfigured: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: Error | null; needsConfirmation?: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (password: string) => Promise<{ error: Error | null }>;
  demoSignIn: (displayName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const formatAuthError = (msg: string): string => {
  if (
    msg.includes("Failed to fetch") ||
    msg.includes("NetworkError") ||
    msg.includes("ENOTFOUND") ||
    msg.includes("Load failed")
  ) {
    return "Cannot reach Supabase backend. The database URL in .env is offline or unreachable. You can continue using the Demo Account or connect a live Supabase project.";
  }
  if (msg.toLowerCase().includes("email rate limit") || msg.toLowerCase().includes("over_email_send_rate_limit")) {
    return "Supabase email rate limit exceeded. On new Supabase projects, the built-in email service is capped at ~3 confirmation emails/hr. To fix this instantly and register without email limits, go to your Supabase Dashboard -> Authentication -> Providers -> Email and toggle 'Confirm email' to OFF.";
  }
  return msg;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string, currentUser?: User) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (data) {
        setProfile(data as Profile);
      } else if (!error && (currentUser || user)) {
        const u = currentUser || user;
        const displayName = u?.user_metadata?.display_name || u?.email?.split("@")[0] || "Player";
        const { data: created } = await supabase
          .from("profiles")
          .upsert({
            user_id: userId,
            display_name: displayName,
          }, { onConflict: "user_id" })
          .select()
          .maybeSingle();

        if (created) {
          setProfile(created as Profile);
        }
      }
    } catch (err) {
      console.warn("Profile fetch/create notice:", err);
    }
  }, [user]);

  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      if (user.id === "demo-user-1") {
        const savedDemo = localStorage.getItem("neon_demo_user");
        if (savedDemo) {
          try {
            const parsed = JSON.parse(savedDemo);
            if (parsed.profile) setProfile(parsed.profile);
          } catch {
            // ignore
          }
        }
      } else {
        await fetchProfile(user.id, user);
      }
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (isMounted && currentSession) {
          setSession(currentSession);
          setUser(currentSession.user ?? null);
          if (currentSession.user) {
            await fetchProfile(currentSession.user.id, currentSession.user);
          }
        } else if (isMounted) {
          // Check for saved demo account
          const savedDemo = localStorage.getItem("neon_demo_user");
          if (savedDemo) {
            try {
              const parsed = JSON.parse(savedDemo);
              if (parsed.user && parsed.profile) {
                setUser(parsed.user);
                setProfile(parsed.profile);
              }
            } catch {
              localStorage.removeItem("neon_demo_user");
            }
          }
        }
      } catch (err) {
        console.warn("Supabase getSession notice:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        if (!isMounted) return;
        setSession(newSession);
        setUser(newSession?.user ?? null);
        if (newSession?.user) {
          await fetchProfile(newSession.user.id, newSession.user);
        } else {
          // Keep demo user if active, else null
          const savedDemo = localStorage.getItem("neon_demo_user");
          if (!savedDemo) {
            setProfile(null);
          }
        }
        setLoading(false);
      }
    );

    // Timeout safety fallback
    const timer = setTimeout(() => {
      if (isMounted && loading) {
        setLoading(false);
      }
    }, 2000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, [fetchProfile, loading]);

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName },
          emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
        },
      });
      if (error) {
        return { error: new Error(formatAuthError(error.message)), needsConfirmation: false };
      }
      if (data.user) {
        await fetchProfile(data.user.id, data.user);
      }
      const needsConfirmation = Boolean(data.user && !data.session);
      return { error: null, needsConfirmation };
    } catch (err: unknown) {
      const error = err as Error;
      return { error: new Error(formatAuthError(error.message || "Sign up failed")), needsConfirmation: false };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return { error: new Error(formatAuthError(error.message)) };
      }
      if (data.user) {
        await fetchProfile(data.user.id, data.user);
      }
      return { error: null };
    } catch (err: unknown) {
      const error = err as Error;
      return { error: new Error(formatAuthError(error.message || "Sign in failed")) };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: typeof window !== "undefined" ? `${window.location.origin}/reset-password` : undefined,
      });
      if (error) {
        return { error: new Error(formatAuthError(error.message)) };
      }
      return { error: null };
    } catch (err: unknown) {
      const error = err as Error;
      return { error: new Error(formatAuthError(error.message || "Password reset request failed")) };
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        return { error: new Error(formatAuthError(error.message)) };
      }
      return { error: null };
    } catch (err: unknown) {
      const error = err as Error;
      return { error: new Error(formatAuthError(error.message || "Failed to update password")) };
    }
  };

  const demoSignIn = async (name = "Player One") => {
    const demoUser = {
      id: "demo-user-1",
      email: `${name.toLowerCase().replace(/\s+/g, "")}@neonarena.demo`,
      app_metadata: {},
      user_metadata: { display_name: name },
      aud: "authenticated",
      created_at: new Date().toISOString(),
    } as unknown as User;

    const demoProfile: Profile = {
      id: "demo-prof-1",
      user_id: "demo-user-1",
      display_name: name,
      avatar_url: null,
      bio: "Neon Arena Quiz Competitor",
      games_played: 12,
      games_won: 8,
      total_correct: 48,
      total_answered: 55,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setUser(demoUser);
    setProfile(demoProfile);
    localStorage.setItem("neon_demo_user", JSON.stringify({ user: demoUser, profile: demoProfile }));
  };

  const signOut = async () => {
    try {
      localStorage.removeItem("neon_demo_user");
      await supabase.auth.signOut();
    } catch (err) {
      console.warn("Sign out notice:", err);
    } finally {
      setSession(null);
      setUser(null);
      setProfile(null);
    }
  };

  return (
    <AuthContext.Provider value={{
      session,
      user,
      profile,
      loading,
      isConfigured: isSupabaseConfigured,
      signUp,
      signIn,
      resetPassword,
      updatePassword,
      demoSignIn,
      signOut,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
