import Express from "express"
import { PrismaClient } from "@prisma/client";
import { configDotenv } from "dotenv";


require('dotenv').config();
const prisma = new PrismaClient();
const app = Express()
let PORT = 8000;

app.get("/test", (req, res) => {res.status(200).json({"status": "ok"})})

const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected successfully!")
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        });
    } catch(error) {
        console.log("Database failed to connect", error)
    }
}

startServer();

