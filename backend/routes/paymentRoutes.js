import express from 'express';
import { recordNewPayment, verifyPayment } from '../controllers/paymentController.js';
import { piAuthMiddleware } from '../middleware/piAuthMiddleware.js';

const router = express.Router();

router.post('/record', piAuthMiddleware, recordNewPayment);
router.post('/verify', piAuthMiddleware, verifyPayment);

export default router;
import { defineStore } from 'pinia';
import { PiAuth } from 'pi-sdk';  // Assuming Pi SDK is being used

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }),

  actions: {
    async login() {
      this.loading = true;
      try {
        // Use Pi SDK to authenticate user
        const piUser = await PiAuth.login();
        this.user = piUser;
        this.isAuthenticated = true;
        this.loading = false;
      } catch (err) {
        this.error = err.message || 'Authentication failed';
        this.loading = false;
      }
    },

    async logout() {
      this.user = null;
      this.isAuthenticated = false;
      this.error = null;
      await PiAuth.logout();  // Log the user out via Pi SDK
    },

    async checkAuthStatus() {
      this.loading = true;
      try {
        const piUser = await PiAuth.getUser();
        if (piUser) {
          this.user = piUser;
          this.isAuthenticated = true;
        } else {
          this.user = null;
          this.isAuthenticated = false;
        }
      } catch (err) {
        this.error = err.message || 'Error checking authentication status';
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getUser: (state) => state.user,
    getAuthStatus: (state) => state.isAuthenticated,
    getLoadingStatus: (state) => state.loading,
    getError: (state) => state.error,
  },
});
