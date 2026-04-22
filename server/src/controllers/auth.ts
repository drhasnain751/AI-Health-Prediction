import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-healthcare-key';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role, age, gender } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'This email is already registered. Please login instead.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        patientProfile: role === 'PATIENT' ? {
          create: {
            age: age ? parseInt(age) : 0,
            gender: gender || 'Not Specified',
          }
        } : undefined,
        doctorProfile: role === 'DOCTOR' ? {
          create: {
            specialization: 'General Physician'
          }
        } : undefined,
      },
      include: {
        patientProfile: true,
        doctorProfile: true
      }
    });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ 
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        role: user.role,
        profileId: user.patientProfile?.id || user.doctorProfile?.id 
      } 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ 
      where: { email },
      include: {
        patientProfile: true,
        doctorProfile: true
      }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

    res.json({ token, user: { id: user.id, name: user.name, role: user.role, profileId: user.patientProfile?.id || user.doctorProfile?.id } });
  } catch (error: any) {
    console.error('Login Error Details:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    res.status(500).json({ 
      error: 'Internal Server Error', 
      details: error.message,
      code: error.code
    });
  }
};
