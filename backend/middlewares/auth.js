// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import { User } from '../models/userSchema.js';

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select('-password');

        if (!user) { return res.status(401).json({ message: 'User not found' }) }

        req.user = user;
        next();
    } catch (error) {
        console.error('JWT verification failed:', error);
        return res.status(401).send({ message: 'Invalid or expired token' });
    }
};

