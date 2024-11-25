import express from "express";
export default function apiInit(){
    const app = express();

    app.get('/', (req, res) => {
    res.send('Hello from Render!');
    console.log("PING!")
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    });
}