import express from 'express';
import {
    getUserProfile,
    editUserProfile,
    register,
    login,
    logout,
    deleteUserAccount,
} from '../controllers/user.js'
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.post('/signup',register);

router.post('/signin',login);

router.get("/profile", isAuthenticated, getUserProfile);

router.patch("/:id/edit", isAuthenticated, editUserProfile);

router.delete("/:id/delete", isAuthenticated, deleteUserAccount);

router.get("/logout",isAuthenticated, logout);



export default router;