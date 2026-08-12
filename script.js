import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://myipkticsugptcqldgmx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_JsR7S94alqjJUdOh7GV6xQ_LmhRUN1U';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function getSupabaseClient() {
  return supabase;
}

async function handleWaitlist(e) {
  e.preventDefault();
  const emailInput = document.getElementById('waitlist-email');
  const email = emailInput ? emailInput.value.trim() : '';

  if (!email) {
    alert('Please enter a valid email address.');
    return;
  }

  const client = getSupabaseClient();
  if (client) {
    try {
      const { error } = await client.from('waitlist_signups').insert({ email });
      if (error && error.code !== '23505') {
        alert('Something went wrong — try again in a moment.');
        console.error(error);
        return;
      }
    } catch (err) {
      console.error('Waitlist submission error:', err);
      alert('Something went wrong — try again in a moment.');
      return;
    }
  }

  document.getElementById('waitlist-form').style.display = 'none';
  document.getElementById('waitlist-success').classList.add('show');
}

window.handleWaitlist = handleWaitlist;

const waitlistForm = document.getElementById('waitlist-form');
if (waitlistForm) {
  waitlistForm.addEventListener('submit', handleWaitlist);
}
