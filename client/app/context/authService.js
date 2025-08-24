/**
 * Authentication Service
 * Handles all authentication-related API calls and token management
 */

import { API_BASE_URL } from './constants';

/**
 * Login user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<{ok: boolean, token?: string, user?: object, error?: string}>}
 */
export const loginUser = async (email, password) => {
  console.log(`🔐 AUTH SERVICE: Attempting login for email: ${email}`);
  
  try {
    console.log(`📡 AUTH SERVICE: Sending POST request to ${API_BASE_URL}/auth/login`);
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    console.log(`📡 AUTH SERVICE: Login response status: ${res.status} ${res.statusText}`);
    const data = await res.json();
    
    if (!res.ok || !data?.token) {
      console.log(`❌ AUTH SERVICE: Login failed - ${data?.message || 'No token received'}`);
      throw new Error(data?.message || 'Login failed');
    }
    
    console.log(`✅ AUTH SERVICE: Login successful for user: ${data.data?.name || 'Unknown'}`);
    console.log(`🔑 AUTH SERVICE: Token received (length: ${data.token.length})`);
    
    return {
      ok: true,
      token: data.token,
      user: data.data || null
    };
  } catch (e) {
    console.log(`❌ AUTH SERVICE: Login error: ${e.message}`);
    return { ok: false, error: e.message };
  }
};

/**
 * Register new user account
 * @param {string} name - User's full name
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<{ok: boolean, token?: string, user?: object, error?: string}>}
 */
export const registerUser = async (name, email, password) => {
  console.log(`📝 AUTH SERVICE: Attempting registration for: ${name} (${email})`);
  
  try {
    console.log(`📡 AUTH SERVICE: Sending POST request to ${API_BASE_URL}/auth/register`);
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    
    console.log(`📡 AUTH SERVICE: Registration response status: ${res.status} ${res.statusText}`);
    const data = await res.json();
    
    if (!res.ok || !data?.token) {
      console.log(`❌ AUTH SERVICE: Registration failed - ${data?.message || 'No token received'}`);
      throw new Error(data?.message || 'Registration failed');
    }
    
    console.log(`✅ AUTH SERVICE: Registration successful for user: ${data.data?.name || name}`);
    console.log(`🔑 AUTH SERVICE: Token received (length: ${data.token.length})`);
    
    return {
      ok: true,
      token: data.token,
      user: data.data || null
    };
  } catch (e) {
    console.log(`❌ AUTH SERVICE: Registration error: ${e.message}`);
    return { ok: false, error: e.message };
  }
};

/**
 * Fetch user profile from server
 * @param {string} token - JWT authentication token
 * @returns {Promise<{ok: boolean, user?: object, error?: string}>}
 */
export const fetchUserProfile = async (token) => {
  console.log(`👤 AUTH SERVICE: Fetching user profile with token (length: ${token?.length || 0})`);
  
  try {
    console.log(`📡 AUTH SERVICE: Sending GET request to ${API_BASE_URL}/auth/profile`);
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log(`📡 AUTH SERVICE: Profile response status: ${res.status} ${res.statusText}`);
    
    if (!res.ok) {
      console.log(`❌ AUTH SERVICE: Profile fetch failed - ${res.status} ${res.statusText}`);
      throw new Error('Failed to fetch profile');
    }
    
    const profile = await res.json();
    console.log(`✅ AUTH SERVICE: Profile fetched successfully for: ${profile?.data?.name || 'Unknown'}`);
    
    return {
      ok: true,
      user: profile?.data || null
    };
  } catch (e) {
    console.log(`❌ AUTH SERVICE: Profile fetch error: ${e.message}`);
    return { ok: false, error: e.message };
  }
};

/**
 * Store authentication data in localStorage
 * @param {string} token - JWT token to store
 * @param {object} user - User data to store
 */
export const storeAuthData = (token, user) => {
  console.log(`💾 AUTH SERVICE: Storing auth data for user: ${user?.name || 'Unknown'}`);
  
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('authToken', token);
      localStorage.setItem('authUser', JSON.stringify(user));
      console.log(`✅ AUTH SERVICE: Auth data stored successfully in localStorage`);
    } catch (e) {
      console.log(`❌ AUTH SERVICE: Failed to store auth data: ${e.message}`);
    }
  } else {
    console.log(`⚠️ AUTH SERVICE: Cannot store auth data - not in browser environment`);
  }
};

/**
 * Retrieve authentication data from localStorage
 * @returns {{token: string|null, user: object|null}}
 */
export const getStoredAuthData = () => {
  console.log(`🔍 AUTH SERVICE: Retrieving stored auth data...`);
  
  if (typeof window === 'undefined') {
    console.log(`⚠️ AUTH SERVICE: Cannot retrieve auth data - not in browser environment`);
    return { token: null, user: null };
  }
  
  try {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('authUser');
    let user = null;
    
    if (userStr) {
      try {
        user = JSON.parse(userStr);
      } catch (e) {
        console.log(`⚠️ AUTH SERVICE: Failed to parse stored user data: ${e.message}`);
        user = null;
      }
    }
    
    if (token && user) {
      console.log(`✅ AUTH SERVICE: Found stored auth data for user: ${user.name || 'Unknown'}`);
    } else if (token) {
      console.log(`⚠️ AUTH SERVICE: Found token but no user data`);
    } else {
      console.log(`🔍 AUTH SERVICE: No stored auth data found`);
    }
    
    return { token, user };
  } catch (e) {
    console.log(`❌ AUTH SERVICE: Error retrieving stored auth data: ${e.message}`);
    return { token: null, user: null };
  }
};

/**
 * Clear authentication data from localStorage
 */
export const clearStoredAuthData = () => {
  console.log(`🗑️ AUTH SERVICE: Clearing stored auth data...`);
  
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      console.log(`✅ AUTH SERVICE: Auth data cleared successfully`);
    } catch (e) {
      console.log(`❌ AUTH SERVICE: Error clearing auth data: ${e.message}`);
    }
  } else {
    console.log(`⚠️ AUTH SERVICE: Cannot clear auth data - not in browser environment`);
  }
};