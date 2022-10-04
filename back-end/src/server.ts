import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5000;
console.log(process.env.DATABASE_URL)

app.listen(PORT, () => console.log("Server connected!"));