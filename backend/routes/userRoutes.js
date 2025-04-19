import express from 'express';
import { getUser, updateUser, deleteUser, getAllUsers } from '../controllers/userController';
import { validateUserUpdate } from '../utils/validators';
import { authorize, rateLimiter } from '../middlewares'; // Assuming these middlewares are defined

const router = express.Router();

// Route to get a user by ID
router.get('/:id', authorize, rateLimiter, async (req, res, next) => {
    try {
        await getUser(req, res, next);
    } catch (error) {
        next(error);
    }
});

// Route to update a user by ID
router.put('/:id', authorize, rateLimiter, validateUserUpdate, async (req, res, next) => {
    try {
        await updateUser(req, res, next);
    } catch (error) {
        next(error);
    }
});

// Route to delete a user by ID
router.delete('/:id', authorize, rateLimiter, async (req, res, next) => {
    try {
        await deleteUser(req, res, next);
    } catch (error) {
        next(error);
    }
});

// Route to get all users
router.get('/', authorize, rateLimiter, async (req, res, next) => {
    try {
        await getAllUsers(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default router;
const express = require('express');
const router = express.Router();
const verifyPiToken = require('../middlewares/piAuth');

router.get('/me', verifyPiToken, (req, res) => {
  const user = req.piUser;
  res.json({ message: `Welcome back, ${user.username}`, uid: user.uid });
});

module.exports = router;
