// ============================================================
// SHARED CONFIG — Copy this file to every app
// Only change SUPABASE_URL and SUPABASE_KEY
// ============================================================

const CONFIG = {
  SUPABASE_URL: 'https://zpmjcdbqynebhyprqmrf.supabase.co',
  SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwbWpjZGJxeW5lYmh5cHJxbXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4MDMyNTksImV4cCI6MjA4NDM3OTI1OX0.68k7Ni0EfEVzKOa-tp9_d5QQ0Xh2u1scv_TdGwnXMtE',
};

// ============================================================
// SHARED AUTH FUNCTIONS — Do not modify
// ============================================================

// Get current session
function getSession() {
  try {
    const session = localStorage.getItem('svt_session');
    if (!session) return null;
    const parsed = JSON.parse(session);
    // Check if expired
    if (parsed.expires_at && Date.now() > parsed.expires_at * 1000) {
      localStorage.removeItem('svt_session');
      return null;
    }
    return parsed;
  } catch (e) {
    return null;
  }
}

// Save session
function saveSession(session) {
  localStorage.setItem('svt_session', JSON.stringify(session));
}

// Clear session
function clearSession() {
  localStorage.removeItem('svt_session');
  localStorage.removeItem('svt_loggedIn');
}

// Get current user
function getCurrentUser() {
  const session = getSession();
  return session ? session.user : null;
}

// Get auth token
function getAuthToken() {
  const session = getSession();
  return session ? session.access_token : null;
}

// Check if logged in — redirect to login if not
function requireAuth(appName) {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = `login.html?app=${appName}`;
    return false;
  }
  return true;
}

// Logout
function logout(appName) {
  clearSession();
  window.location.href = `login.html?app=${appName}`;
}

// Supabase Auth API calls
async function supabaseSignUp(email, password) {
  const res = await fetch(`${CONFIG.SUPABASE_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: { 'apikey': CONFIG.SUPABASE_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.msg || 'Signup failed');
  return data;
}

async function supabaseSignIn(email, password) {
  const res = await fetch(`${CONFIG.SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { 'apikey': CONFIG.SUPABASE_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.msg || 'Login failed');
  return data;
}

async function supabaseSignOut(token) {
  await fetch(`${CONFIG.SUPABASE_URL}/auth/v1/logout`, {
    method: 'POST',
    headers: { 'apikey': CONFIG.SUPABASE_KEY, 'Authorization': 'Bearer ' + token }
  });
}

// Register user to app_users table
async function registerAppUser(email, appName, token) {
  await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/app_users`, {
    method: 'POST',
    headers: {
      'apikey': CONFIG.SUPABASE_KEY,
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ email, app_name: appName })
  });
}

// Check if user is registered for this app
async function checkAppUser(email, appName, token) {
  const res = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/app_users?email=eq.${encodeURIComponent(email)}&app_name=eq.${appName}`, {
    headers: {
      'apikey': CONFIG.SUPABASE_KEY,
      'Authorization': 'Bearer ' + token,
    }
  });
  const data = await res.json();
  return data && data.length > 0;
}
