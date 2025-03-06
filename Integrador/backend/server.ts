import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import fingerprintRoutes from './routes/fingerprintRoutes';

const app = express();
const PORT = process.env.PORT || 8082;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Conectar a MongoDB
connectDB();

// Middleware
app.use(express.json());

// Rutas
app.use('/api/fingerprints', fingerprintRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});