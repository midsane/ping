import express from "express"
import fetch from "node-fetch";
import cors from "cors"

const app = express();
app.use(cors({
  origin: '*'
}));

app.get('/', (req,res) => {
  res.status(200).send("healthy")
})

const pingWebsite = (url) => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const exactTime = `${hours}:${minutes}:${seconds}`;
  fetch(url)
  console.log(`pinged ${url} at ${exactTime}`);
};


const pingInterval = 3000;
const websiteUrl1 = "https://anime-blog-wwzt.onrender.com/ping";
const websiteUrl2 = "https://taskify-backend-j23x.onrender.com";

// Start the interval to ping every minute
setInterval(() => {
  pingWebsite(websiteUrl1);
}, pingInterval);

setInterval(() => {
  pingWebsite(websiteUrl2);
}, pingInterval);


export default app

