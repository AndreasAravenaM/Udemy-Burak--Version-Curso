import express from "express";
import { connectDB } from "./config/db.js";
import productoRoutes from "./routes/product.route.js";
import path from "path";

const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(express.json());
app.use("/api/products", productoRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("El servidor se encuentra en http://localhost:" + PORT);
});
