import Express from "express"
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv"
import router from "./auth.js";
import cors from "cors";

dotenv.config();
const prisma = new PrismaClient();
const app = Express()
let PORT = 8000;

app.use(cors());

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));

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

app.get("/get-events/:id", async (req, res) => {
    const {id: userID} = req.params
    try {
        const events = await prisma.event.findMany({
            where: {
                user_id: userID,
            }
        })
        if (events.length === 0) {
            res.status(404).json({ message: "No events found for this user." })
        }
        res.status(200).json(events)
    } catch(error) {
        res.status(500).json({ error: "Internal server error." })
    }
})

app.put("/update-event/:id", async (req, res) => {
    const {id: eventID} = req.params
    const {title, datetime, description} = req.body

    const updateData = {}

    if (title) updateData.title = title
    if (datetime) updateData.datetime = new Date(datetime)
    if (description) updateData.description = description

    try {
        const updateEvent = await prisma.event.update({
            where: {
                id: Number(eventID)
            },
            data: updateData
        })
        res.status(200).json(updateEvent)
    } catch(error) {
        res.status(500).json({ error: "Failed to update event." });
    }
})

app.delete("/delete-event/:id", async (req, res) => {
    const {id: eventID} = req.params
    try {
        const deletedEvent = await prisma.event.delete({
            where: {
                id: Number(eventID)
            }
        })
        res.status(200).json({ message: "Event deleted successfully", deletedEvent })
    } catch(error) {
        res.status(500).json({ error: "Failed to delete event." });
    }
})

app.use("/api/auth", router)

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

