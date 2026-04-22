import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Medications
export const getMedications = async (req: any, res: Response) => {
  try {
    const { profileId } = req.params;
    const medications = await prisma.medication.findMany({
      where: { patientId: profileId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(medications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addMedication = async (req: any, res: Response) => {
  try {
    const { patientId, name, dosage, frequency } = req.body;
    const medication = await prisma.medication.create({
      data: {
        name,
        dosage,
        frequency,
        patientId
      }
    });
    res.status(201).json(medication);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMedication = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.medication.delete({ where: { id } });
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Appointments
export const getAppointments = async (req: any, res: Response) => {
  try {
    const { profileId } = req.params;
    const { role } = req.user;
    
    const where = role === 'PATIENT' ? { patientId: profileId } : { doctorId: profileId };
    
    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        patient: { include: { user: { select: { name: true } } } },
        doctor: { include: { user: { select: { name: true } } } }
      },
      orderBy: { date: 'asc' }
    });
    res.json(appointments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createAppointment = async (req: any, res: Response) => {
  try {
    const { patientId, doctorId, date, reason } = req.body;
    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        date: new Date(date),
        reason,
        status: 'SCHEDULED'
      }
    });
    res.status(201).json(appointment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const cancelAppointment = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status: 'CANCELLED' }
    });
    res.json(appointment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Lab Results
export const getLabResults = async (req: any, res: Response) => {
  try {
    const { profileId } = req.params;
    const results = await prisma.labResult.findMany({
      where: { patientId: profileId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
