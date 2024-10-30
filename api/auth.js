import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from './config.js';

const router = express.Router();
const Prisma = new PrismaClient();

router.post('/verify-token', async (req, res) => {
    try {
        const { idToken } = req.body;
        const decodedToken = await auth.verifyIdToken(idToken);
        console.log(decodedToken);
        
        let user = await Prisma.user.findUnique({
            where: { user_id: decodedToken.uid }
        });

        if (!user) {
            user = await Prisma.user.create({
                data: {
                    user_id: decodedToken.uid,
                    email: decodedToken.email,
                    password: "randompass"
                }
            });
        }

        res.json({ user });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
});

export default router;