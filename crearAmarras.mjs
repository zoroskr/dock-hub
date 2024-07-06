import mongoose from "mongoose";
import Amarra from "./src/models/Amarra.js";
import Marina from "./src/models/Marina.js";

async function crearAmarras() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ingsoftware", {
      // Configuración de conexión actualizada
      // useNewUrlParser: true, // No necesario en versiones >= 4.0.0
      // useUnifiedTopology: true, // No necesario en versiones >= 4.0.0
    });

    async function obtenerMarinas() {
      try {
        const marinas = await Marina.find();
        if (marinas.length === 0) {
          throw new Error("No se encontraron marinas en la base de datos");
        }
        return marinas;
      } catch (error) {
        console.error("Error al obtener las marinas de la base de datos:", error);
        throw error;
      }
    }

    const marinas = await obtenerMarinas();

    for (const marinaInfo of marinas) {
      let marina = await Marina.findOne({ nombre: marinaInfo.nombre });

      const amarras = [];
      for (let i = 0; i < 4; i++) {
        // Dividir la dirección por la coma
        const addressParts = marinaInfo.address.split(",");
        // Usar todo después de la primera coma si existe, de lo contrario, usar la dirección completa
        const locationAfterFirstComma =
          addressParts.length > 1 ? addressParts.slice(1).join(",").trim() : marinaInfo.address.trim();

        amarras.push({
          mooringNumber: i + 1,
          location: locationAfterFirstComma,
          dailyRate: Math.floor(Math.random() * 5000) + 1000, // Tarifa diaria entre 1000 y 6000
          image: `https://i.imgur.com/A4j1U5Y.jpeg`,
          isAvailable: true,
          availabilityDates: [],
          boat: null,
          marina: marina._id,
          reservations: [],
        });
      }

      await Amarra.insertMany(amarras);
      console.log(`Se han creado 4 amarras para ${marinaInfo.name}`);
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("Error al crear amarras:", error);
  }
}

crearAmarras();
