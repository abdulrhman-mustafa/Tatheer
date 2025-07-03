// src/utils/auth.ts

import { User } from '@/types/user'; 

// ده المفتاح اللي هنستخدمه لتخزين بيانات المستخدم في الـ localStorage
const USER_SESSION_KEY = 'user_session';


export const saveUserSession = (user: User) => {
  try {
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user session to localStorage:', error);
  }
};

/**
 * بتجيب بيانات المستخدم من الـ localStorage.
 * بترجع User object لو موجودة، أو null لو مش موجودة أو حصل خطأ.
 */
export const getUserSession = (): User | null => {
  try {
    const session = localStorage.getItem(USER_SESSION_KEY);
    return session ? (JSON.parse(session) as User) : null;
  } catch (error) {
    console.error('Error getting user session from localStorage:', error);
    return null;
  }
};


// بتمسح بيانات المستخدم من الـ localStorage.

export const clearUserSession = () => {
  try {
    localStorage.removeItem(USER_SESSION_KEY);
  } catch (error) {
    console.error('Error clearing user session from localStorage:', error);
  }
};