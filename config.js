// ============================================================
//  SHARED CONFIG — Used by ALL CPC apps
//  Update SUPABASE_URL and SUPABASE_KEY only
// ============================================================
const CONFIG = {
  SUPABASE_URL: 'https://ihwgejsioutzcmkaaumi.supabase.co',
  SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlod2dlanNpb3V0emNta2FhdW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4OTMxMDcsImV4cCI6MjA5MTQ2OTEwN30.951EDcnMQMNzirlMxmxOLi3CmR6suhPNQNqvgvNC9rA',
};

// Keep old auth functions for backward compatibility
// (these are no longer used for login but kept to avoid errors)
function getSession(){ return null; }
function saveSession(s){ }
function clearSession(){ }
function getCurrentUser(){ return null; }
function getAuthToken(){ return null; }
function requireAuth(){ return true; }
function logout(){ }
async function supabaseSignUp(e,p){}
async function supabaseSignIn(e,p){}
async function supabaseSignOut(t){}
async function registerAppUser(e,a,t){}
async function checkAppUser(e,a,t){ return true; }
