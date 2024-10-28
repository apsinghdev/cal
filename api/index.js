import Express from "express"
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv"

dotenv.config();
const prisma = new PrismaClient();
const app = Express()
let PORT = 8000;

app.use(Express.json())

app.get("/test", (req, res) => {res.status(200).json({"status": "ok"})})

app.post("/create-event", async (req, res) => {
    
    const {title, datetime, description, user_id} = req.body

    const userExists = await prisma.user.findUnique({
        where: {user_id: user_id}
    })

    if (!userExists) {
        return res.status(404).json({ error: "User not found. Please create user first." });
    }

    try {
        const newEvent = await prisma.event.create({
            data: {
                title,
                datetime: new Date(datetime),
                description,
                user: {
                    connect: {
                        user_id: user_id
                    }
                }
            }
        })
        res.status(201).json(newEvent);
    } catch(error) {
        res.status(500).json({ error: "Event creation failed." });
    }
})

app.post("/create-user", async (req, res) => {
    const {user_id, email, password} = req.body
    try {
        const newEvent = await prisma.user.create({
            data: {
                user_id,
                email,
                password
            }
        })
        res.status(201).json(newEvent);
    } catch(error) {
        res.status(500).json({ error: "User creation failed." });
    }
})

app.post("/test-post", async (req, res) => {
    const {name} = req.body
    try {
        const addName = await prisma.test.create({
            data: {
                name
            }
        })
        res.status(201).json(addName)
    } catch(error) {
        res.status(500).json({ error: "User creation failed." });
    }
})

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

