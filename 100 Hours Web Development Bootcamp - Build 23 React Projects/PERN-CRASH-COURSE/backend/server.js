import express, { json } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`El servidor se encuentra en http://localhost:${PORT}`);
});
