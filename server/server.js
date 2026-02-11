import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


app.get("/", (req, res) =>
    res.json({
        msg: "Welcome to Mini Recruitment Management System"
    }).status(200)
)


const PORT = process.env.PORT || 3000;

app.listen(PORT, "localhost", () => {
    console.log(`Server is started successfully. \nhttp://localhost:${PORT}`)
})