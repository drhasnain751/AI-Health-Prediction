import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-healthcare-key';

export const getSystemStats = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'ADMIN') return res.status(403).json({ error: 'Access denied. Admin role required.' });
    const totalUsers = await prisma.user.count();
    const totalPatients = await prisma.patientProfile.count();
    const totalDoctors = await prisma.doctorProfile.count();
    const totalPredictions = await prisma.prediction.count();

    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });

    res.json({
      stats: { totalUsers, totalPatients, totalDoctors, totalPredictions },
      recentUsers
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'ADMIN') return res.status(403).json({ error: 'Access denied. Admin role required.' });
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const impersonateUser = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'ADMIN') return res.status(403).json({ error: 'Access denied.' });
    
    const { userId } = req.params;
    const targetUser: any = await prisma.user.findUnique({ 
      where: { id: String(userId) },
      include: {
        patientProfile: true,
        doctorProfile: true
      }
    });

    if (!targetUser) return res.status(404).json({ error: 'User not found' });

    // Generate token for target user
    const token = jwt.sign({ userId: targetUser.id, role: targetUser.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: targetUser.id, name: targetUser.name, role: targetUser.role, profileId: targetUser.patientProfile?.id || targetUser.doctorProfile?.id } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
