import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';

export const getAllPatients = async (req: AuthRequest, res: Response) => {
  try {
    const doctor = await prisma.doctorProfile.findUnique({
      where: { userId: req.user?.userId }
    });

    if (!doctor) return res.status(403).json({ error: 'Doctor profile not found' });

    const patients = await prisma.patientProfile.findMany({
      where: {
        records: { some: { doctorId: doctor.id } }
      },
      include: {
        user: { select: { name: true, email: true } },
        predictions: { take: 1, orderBy: { createdAt: 'desc' } }
      }
    });
    res.json(patients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPatientDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const patient = await prisma.patientProfile.findUnique({
      where: { id: id as string },
      include: {
        user: { select: { name: true, email: true } },
        predictions: { orderBy: { createdAt: 'desc' } },
        records: { include: { doctor: { include: { user: { select: { name: true } } } } } }
      }
    });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
