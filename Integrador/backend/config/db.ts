import mongoose from 'mongoose';

const uri = "mongodb+srv://Aldahir:aldahir.05@cluster0.hpmmu.mongodb.net/proyIoT?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
};

export default connectDB;