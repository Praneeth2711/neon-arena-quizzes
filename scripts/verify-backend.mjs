import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Read .env file
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const idx = trimmed.indexOf('=');
    if (idx !== -1) {
      const k = trimmed.substring(0, idx).trim();
      const v = trimmed.substring(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      env[k] = v;
    }
  }
});

const url = env.VITE_SUPABASE_URL;
const anonKey = env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_ANON_KEY;

console.log('=== Neon Arena Quizzes: Supabase Real Backend Verification ===');
console.log('Supabase URL:', url);
console.log('Key Configured:', Boolean(anonKey));

if (!url || !anonKey) {
  console.error('ERROR: Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(url, anonKey);

async function testAll() {
  const results = {};

  try {
    // 1. Connection check & Public Tables
    console.log('\n1. Checking Tables & Queries...');
    
    // Profiles
    const { data: profiles, error: pErr } = await supabase.from('profiles').select('*').limit(5);
    results.profiles = !pErr;
    console.log('- profiles query:', pErr ? `FAIL: ${pErr.message}` : `PASS (found ${profiles.length} records)`);
    if (profiles && profiles.length > 0) {
      console.log('  Existing profile records:', JSON.stringify(profiles, null, 2));
    }

    // Quiz Rooms
    const { data: rooms, error: rErr } = await supabase.from('quiz_rooms').select('*').limit(5);
    results.quiz_rooms = !rErr;
    console.log('- quiz_rooms query:', rErr ? `FAIL: ${rErr.message}` : `PASS (found ${rooms.length} records)`);

    // Quiz Questions
    const { data: questions, error: qErr } = await supabase.from('quiz_questions').select('*').limit(5);
    results.quiz_questions = !qErr;
    console.log('- quiz_questions query:', qErr ? `FAIL: ${qErr.message}` : `PASS (found ${questions.length} records)`);

    // Leaderboard Scores
    const { data: leaderboard, error: lErr } = await supabase.from('leaderboard_scores').select('*').limit(5);
    results.leaderboard_scores = !lErr;
    console.log('- leaderboard_scores query:', lErr ? `FAIL: ${lErr.message}` : `PASS (found ${leaderboard.length} records)`);

    // Chat Messages
    const { data: chat, error: cErr } = await supabase.from('chat_messages').select('*').limit(5);
    results.chat_messages = !cErr;
    console.log('- chat_messages query:', cErr ? `FAIL: ${cErr.message}` : `PASS (found ${chat.length} records)`);

    // Room Players
    const { data: players, error: rpErr } = await supabase.from('room_players').select('*').limit(5);
    results.room_players = !rpErr;
    console.log('- room_players query:', rpErr ? `FAIL: ${rpErr.message}` : `PASS (found ${players.length} records)`);

    // Quiz Answers
    const { data: answers, error: aErr } = await supabase.from('quiz_answers').select('*').limit(5);
    results.quiz_answers = !aErr;
    console.log('- quiz_answers query:', aErr ? `FAIL: ${aErr.message}` : `PASS (found ${answers.length} records)`);

    // 2. Test Auth flow
    console.log('\n2. Testing Authentication...');
    const testEmail = `arena.tester@neonarena.internal`;
    const testPassword = `NeonArenaSecure2026!`;
    const testDisplayName = `NeonTester`;

    let authUser = null;
    let authSession = null;

    // Try sign in first (if user already created)
    let { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword,
    });

    if (signInErr) {
      console.log('Sign in with existing tester failed, trying sign up:', signInErr.message);
      const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: { display_name: testDisplayName }
        }
      });

      if (signUpErr) {
        console.log('Sign up result:', signUpErr.message);
        results.auth = false;
        results.authMessage = signUpErr.message;
      } else {
        console.log('Sign up successful! User ID:', signUpData.user?.id);
        authUser = signUpData.user;
        authSession = signUpData.session;
        results.auth = true;
      }
    } else {
      console.log('Sign in successful! User ID:', signInData.user?.id);
      authUser = signInData.user;
      authSession = signInData.session;
      results.auth = true;
    }

    // 3. Authenticated client actions if session active
    if (authUser) {
      console.log('\n3. Testing Authenticated CRUD with User:', authUser.id);

      // Create/ensure profile exists
      const { data: prof, error: profUpsertErr } = await supabase
        .from('profiles')
        .upsert({
          user_id: authUser.id,
          display_name: testDisplayName,
          username: testDisplayName.toLowerCase(),
        }, { onConflict: 'user_id' })
        .select()
        .single();
      
      console.log('- Profile upsert:', profUpsertErr ? `FAIL: ${profUpsertErr.message}` : `PASS (Display name: ${prof?.display_name})`);
      results.profile_crud = !profUpsertErr;

      // Create a quiz room
      const { data: newRoom, error: roomCreateErr } = await supabase
        .from('quiz_rooms')
        .insert({
          name: `Automated Test Room ${Date.now()}`,
          category: 'Technology',
          difficulty: 'Medium',
          max_players: 8,
          status: 'waiting',
          host_id: authUser.id,
        })
        .select()
        .single();

      console.log('- Room creation:', roomCreateErr ? `FAIL: ${roomCreateErr.message}` : `PASS (Room ID: ${newRoom?.id})`);
      results.room_creation = !roomCreateErr;

      if (newRoom) {
        // Insert a question
        const { data: newQ, error: qCreateErr } = await supabase
          .from('quiz_questions')
          .insert({
            room_id: newRoom.id,
            question_text: 'What protocol is used for secure web browsing?',
            options: ['HTTPS', 'FTP', 'SMTP', 'SSH'],
            correct_answer: 0,
            question_order: 1,
            time_limit: 15,
          })
          .select()
          .single();

        console.log('- Question creation:', qCreateErr ? `FAIL: ${qCreateErr.message}` : `PASS (Q ID: ${newQ?.id})`);
        results.question_creation = !qCreateErr;

        // Join room
        const { data: playerJoin, error: joinErr } = await supabase
          .from('room_players')
          .insert({
            room_id: newRoom.id,
            user_id: authUser.id,
            score: 0,
          })
          .select()
          .single();

        console.log('- Player join room:', joinErr ? `FAIL: ${joinErr.message}` : `PASS`);
        results.player_join = !joinErr;

        // Chat message
        const { data: chatMsg, error: chatPostErr } = await supabase
          .from('chat_messages')
          .insert({
            room_id: newRoom.id,
            user_id: authUser.id,
            message: 'Hello arena!',
          })
          .select()
          .single();

        console.log('- Chat post:', chatPostErr ? `FAIL: ${chatPostErr.message}` : `PASS`);
        results.chat_post = !chatPostErr;

        // Submit answer
        if (newQ) {
          const { data: ans, error: ansErr } = await supabase
            .from('quiz_answers')
            .insert({
              question_id: newQ.id,
              user_id: authUser.id,
              selected_answer: 0,
              is_correct: true,
            })
            .select()
            .single();

          console.log('- Answer submit:', ansErr ? `FAIL: ${ansErr.message}` : `PASS (is_correct: ${ans?.is_correct})`);
          results.answer_submit = !ansErr;
        }

        // Leaderboard upsert
        const { data: lScore, error: lErr } = await supabase
          .from('leaderboard_scores')
          .upsert({
            user_id: authUser.id,
            total_score: 1500,
            games_played: 1,
            wins: 1,
          }, { onConflict: 'user_id' })
          .select()
          .single();

        console.log('- Leaderboard update:', lErr ? `FAIL: ${lErr.message}` : `PASS (Score: ${lScore?.total_score})`);
        results.leaderboard_update = !lErr;

        // Test RPC record_quiz_completion if created
        const { error: rpcErr } = await supabase.rpc('record_quiz_completion', {
          p_user_id: authUser.id,
          p_score: 500,
          p_is_win: true,
          p_correct: 5,
          p_total: 5,
        });

        console.log('- RPC record_quiz_completion:', rpcErr ? `FAIL/NOT FOUND: ${rpcErr.message}` : `PASS`);
        results.rpc_record_quiz = !rpcErr;
      }
    }

    console.log('\n=== Final Verification Results ===');
    console.log(JSON.stringify(results, null, 2));

  } catch (err) {
    console.error('Unexpected error during verification:', err);
  }
}

testAll();
