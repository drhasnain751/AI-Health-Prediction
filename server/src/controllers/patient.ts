import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const getPatientDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const { patientId } = req.params;
    
    const profile = await prisma.patientProfile.findUnique({
      where: { id: patientId as string },
      include: {
        user: { select: { id: true, name: true, email: true } },
        predictions: { take: 5, orderBy: { createdAt: 'desc' } },
        records: { take: 5, orderBy: { date: 'desc' }, include: { doctor: { include: { user: { select: { name: true } } } } } }
      }
    });

    if (!profile) return res.status(404).json({ error: 'Patient not found' });

    // Strict Ownership Check
    if (profile.user.id !== req.user?.userId && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized: You do not have permission to view this dashboard.' });
    }

    res.json(profile);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addMedicalRecord = async (req: Request, res: Response) => {
  try {
    const { notes, patientId, doctorId } = req.body;
    const record = await prisma.medicalRecord.create({
      data: { notes, patientId, doctorId }
    });
    res.status(201).json(record);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
