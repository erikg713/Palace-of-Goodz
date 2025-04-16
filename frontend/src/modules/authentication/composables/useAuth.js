// src/modules/authentication/composables/useAuth.js
import { ref } from 'vue';
import { signup, login, getProfile } from '@/modules/authentication/services/authService';

export default function useAuth() {
  const user = ref(null);

  const register = async (userData) => {
    try {
      const response = await signup(userData);
      user.value = response.data;
      return response;
    } catch (error) {
      console.error("Signup failed", error);
      throw error;
    }
  };

  const logIn = async (credentials) => {
    try {
      const response = await login(credentials);
      localStorage.setItem('token', response.data.token);
      user.value = await getProfile(response.data.token);
      return response;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };
    const fetchProfile = async (token) => {
        try {
            const response = await getProfile(token);
            user.value = response.data;
            return response;
        } catch (error) {
            console.error("Failed to fetch profile", error);
            throw error;
        }
    };
  return {
    user,
    register,
    logIn,
      fetchProfile,
  };
}

