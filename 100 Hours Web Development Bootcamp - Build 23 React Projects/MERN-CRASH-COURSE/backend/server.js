import express from "express";
import { connectDB } from "./config/db.js";
import productoRoutes from "./routes/product.route.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/products", productoRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("El servidor se encuentra en http://localhost:" + PORT);
});
