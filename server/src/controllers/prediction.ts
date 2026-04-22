import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { callMLModel } from '../utils/mlBridge';

export const predictDisease = async (req: Request, res: Response) => {
  try {
    const { symptoms } = req.body;
    const userId = (req as any).user?.id;

    if (!symptoms || !Array.isArray(symptoms)) {
      return res.status(400).json({ error: 'Symptoms list is required' });
    }

    // Call Python ML Bridge
    const mlResult = await callMLModel(symptoms);

    // If logged in, save to database
    let savedPrediction = null;
    if (userId) {
      // Find the patient profile for this user
      const patient = await prisma.patientProfile.findUnique({
        where: { userId: userId }
      });

      if (patient) {
        savedPrediction = await prisma.prediction.create({
          data: {
            symptoms: JSON.stringify(symptoms),
            disease: mlResult.disease,
            riskScore: mlResult.risk_score,
            confidence: mlResult.confidence,
            recommendations: mlResult.recommendations,
            patientId: patient.id
          }
        });
      }
    }

    res.json({
      ...mlResult,
      dbId: savedPrediction?.id
    });
  } catch (error: any) {
    console.error('Prediction Error:', error);
    res.status(500).json({ error: error.message || 'Error processing prediction' });
  }
};

export const getPredictionHistory = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const requester = (req as any).user;

    // Strict isolation: Check if requester owns this profile or is admin/doctor (simplified for now to ownership)
    const patientProfile = await prisma.patientProfile.findUnique({
      where: { id: patientId as string }
    });

    if (!patientProfile || (requester.role === 'PATIENT' && patientProfile.userId !== requester.id)) {
      return res.status(403).json({ error: 'Unauthorized access to medical history' });
    }

    const history = await prisma.prediction.findMany({
      where: { patientId: patientId as string },
      orderBy: { createdAt: 'desc' }
    });
    res.json(history);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
