import express, { Request, Response } from "express";
import mongoose, { Document, Schema } from "mongoose";
import bodyParser from "body-parser";

const uri ="mongodb+srv://Aldahir:aldahir.05@cluster0.hpmmu.mongodb.net/proyIoT?retryWrites=true&w=majority&appName=Cluster0";

// Interfaz para el modelo de usuario
interface IUser extends Document {
  password: string;
}

// Esquema de usuario
const UserSchema: Schema = new Schema({
  password: { type: String, required: true },
});

// Modelo de usuario
const User = mongoose.model<IUser>("User", UserSchema);

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
    // Buscar si la contraseña existe en la base de datos
    const user = await User.findOne({ password });

    if (user) {
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
  const newUser = new User({ password: "1234" });

  try {
    await newUser.save();
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
