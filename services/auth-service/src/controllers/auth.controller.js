import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { generateToken } from '../services/utils.js';
import { supabase } from '../services/supabase.js';
dotenv.config();

export const checkAuth = async (req, res) => {
    try{
        res.status(200).json(req.user);    
    } catch (error) {
        console.error("Error in checking auth: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const signup = async (req, res) => {
    let { fullName, email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        email = email.trim().toLowerCase();;
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        
        console.log(data);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const result = await supabase.from('profiles').insert({
            id: data.user.id,
            fullname: req.body.fullName,
            email: data.user.email,
            created_at: new Date().toISOString()
        });
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }

        return res.status(201).json({
            message: 'User registered successfully',
            user: data.user
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error || !data.user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(data.user.id, res);
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const logout = (req, res) => {
    try{
        res.cookie("jwt", "", {
            httpOnly: true,
            maxAge: 0,
            sameSite: "Strict",
            secure: true
        });
        return res.status(200).json({ message: 'Logout successful' }); 
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


