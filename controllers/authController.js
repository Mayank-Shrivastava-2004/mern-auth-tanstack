import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = crypto.randomUUID();

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        verificationToken,
        isVerified: true,
    });

    res.status(201).json({
        message: 'Registration successful! You can now log in.',
        verificationToken: user.verificationToken,
    });
};

const verifyEmail = async (req, res) => {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
};

const verifyDebug = async (req, res) => {
    const { email } = req.params;

    const user = await User.findOneAndUpdate(
        { email },
        { $set: { isVerified: true }, $unset: { verificationToken: '' } },
        { new: true }
    );

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: `${user.email} is now verified. You can log in.`, isVerified: user.isVerified });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
        return res.status(403).json({ message: 'Please verify your email first' });
    }

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.status(200).json({ token });
};

const getProfile = (req, res) => {
    const { name, email } = req.user;
    res.status(200).json({ name, email });
};

export { register, verifyEmail, verifyDebug, login, getProfile };
