import express, { json } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import productRoutes from "./routes/product.route.js";
import { connectDB } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Demasiadas solicitudes" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Acceso denegado a bots" });
      } else {
        res.status(403).json({ error: "Prohibido" });
      }
      return;
    }

    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ error: "Bot de fraude de indentidad detectado" });
      return;
    }

    next();
  } catch (error) {
    console.log("Error en Arcjet", error);
    next(error);
  }
});

app.use("/api/products", productRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`El servidor se encuentra en http://localhost:${PORT}`);
  });
});
