const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const ytdl = require("ytdl-core")
process.on("unhandledRejection", (reason, promise) => {
    console.error(reason)
})
process.on("uncaughtException", (err) => {
    console.error(err)
})
app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(express.static(__dirname + '/views/public'))
    .use(express.json())
    .set("views", path.join(__dirname, "/views"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})
app.get('/api/download', async (req, res) => {
    const videoUrl = req.query.url;
    const format = req.query.format;
    let quality = req.query.quality;
    if (["144", "240", "360", "480"].includes(quality)) quality = "lowest"
    if (["720", "1080"].includes(quality)) quality = "highest"
    res.setHeader('Content-Disposition', `attachment; filename="video.${format}"`);
    res.setHeader("Content-Type", `video/${format}`);
    ytdl(videoUrl, { format: format, quality: quality, filter: (format === "mp3" ? "audioonly" : "videoandaudio") }).pipe(res);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});