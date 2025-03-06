import express, { Request, Response } from "express";
import mongoose, { Document, Schema } from "mongoose";
import bodyParser from "body-parser";

// URI de MongoDB Atlas
const uri =
  "mongodb+srv://Aldahir:aldahir.05@cluster0.hpmmu.mongodb.net/proyIoT?retryWrites=true&w=majority&appName=Cluster0";

// Interfaz para el modelo de contraseñasPuerta
interface IPassword extends Document {
  password: string;
}

// Esquema de contraseñasPuerta
const PasswordSchema: Schema = new Schema({
  password: { type: String, required: true },
});

// Modelo de contraseñasPuerta
const Password = mongoose.model<IPassword>("users", PasswordSchema);

// Configuración de Express
const app = express();
app.use(bodyParser.json());

// Conexión a MongoDB Atlas
mongoose
  .connect(uri)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.error("Error conectando a MongoDB Atlas:", err));

// Ruta para comparar la contraseña
app.post("/compare-password", async (req: Request, res: Response) => {
  const { password } = req.body;

  try {
    // Buscar si la contraseña existe en la colección contraseñasPuerta
    const foundPassword = await Password.findOne({ password });

    if (foundPassword) {
      res.send("OK"); // Contraseña correcta
    } else {
      res.send("ERROR"); // Contraseña incorrecta
    }
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).send("Error en el servidor");
  }
});

// Ruta temporal para insertar una contraseña (solo para pruebas)
app.get("/insert-password", async (req: Request, res: Response) => {
  const newPassword = new Password({ password: "1234" });

  try {
    await newPassword.save();
    res.send("Contraseña insertada correctamente");
  } catch (error) {
    console.error("Error insertando contraseña:", error);
    res.status(500).send("Error insertando contraseña");
  }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
