import Express from "express"

const app = Express()
let PORT = 8000;

app.get("/test", (req, res) => {res.status(200).json({"status": "ok"})})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

