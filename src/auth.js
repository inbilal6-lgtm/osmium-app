// ============ OSMIUM AUTH MANAGER ============

const TOKEN_KEY = 'osmium_token';
const USER_KEY = 'osmium_user';
const EXPIRY_KEY = 'osmium_expiry';

// ============ SAVE USER SESSION ============
export const saveUser = (token, user) => {
  try {
    const expiry = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 7 days
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(EXPIRY_KEY, expiry.toString());
  } catch (err) {
    console.error('Failed to save session:', err);
  }
};

// ============ GET CURRENT USER ============
export const getUser = () => {
  try {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

// ============ GET TOKEN ============
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

// ============ CHECK IF LOGGED IN ============
export const isLoggedIn = () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(EXPIRY_KEY);
    if (!token || !expiry) return false;
    // Check if session expired
    if (new Date().getTime() > parseInt(expiry)) {
      logout();
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

// ============ LOGOUT ============
export const logout = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(EXPIRY_KEY);
    window.location.href = '/login';
  } catch (err) {
    console.error('Logout failed:', err);
  }
};

// ============ UPDATE USER DATA ============
export const updateUser = (updatedUser) => {
  try {
    const current = getUser();
    const merged = { ...current, ...updatedUser };
    localStorage.setItem(USER_KEY, JSON.stringify(merged));
  } catch (err) {
    console.error('Failed to update user:', err);
  }
};

// ============ GET SESSION INFO ============
export const getSessionInfo = () => {
  try {
    const expiry = localStorage.getItem(EXPIRY_KEY);
    if (!expiry) return null;
    const remaining = parseInt(expiry) - new Date().getTime();
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return { remaining, days, hours, expired: remaining <= 0 };
  } catch {
    return null;
  }
};

// ============ PROTECT ROUTE ============
export const requireAuth = () => {
  if (!isLoggedIn()) {
    window.location.href = '/login';
    return false;
  }
  return true;
};