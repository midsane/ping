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
  // Use fetch without awaiting the response to avoid waiting
  fetch(url)
    .then(() => {
      // Successfully sent the ping (we don't care about the response)
      console.log(`Pinged ${url}`);
    })
    .catch((error) => {
      // Catch any network errors (e.g., website down)
      console.log(`Error pinging ${url}:`, error);
    });
};

// Ping every minute (60000 milliseconds)
const pingInterval = 60000;
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

