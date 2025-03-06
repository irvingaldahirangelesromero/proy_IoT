import { Request, Response } from 'express';
import Fingerprint from '../models/Fingerprint';
import axios from 'axios';

export const registerFingerprint = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const newFingerprint = new Fingerprint({ id });
    await newFingerprint.save();
    res.status(201).json(newFingerprint);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar la huella' });
  }
};

export const listFingerprints = async (req: Request, res: Response) => {
  try {
    const fingerprints = await Fingerprint.find(); // Busca todos los documentos en la colección
    res.status(200).json(fingerprints); // Devuelve los datos en formato JSON
  } catch (error) {
    res.status(500).json({ error: 'Error al listar las huellas' });
  }
};