const express = require('express');
const app = express();
import fetch from "node-fetch";
const cors = require('cors');

app.use(cors({
  origin: '*'
}));

const invalidUsername = [];
const validData = [];
const validateData = async (data) => {
  const allUsername = data.map(entry => entry['Codeforce  Handle ']);

  for (let index = 0; index < allUsername.length; index++) {
    const un = allUsername[index];
    try {
      const response = await fetch(
        `https://codeforces.com/api/user.info?handles=${un}`
      );
      const resData = await response.json();
      console.log(`Checked: ${un} - Status: ${resData.status}`);
      if (resData.status === "FAILED") {
        invalidUsername.push(un);
      } else {
        validData.push(data[index]);
      }
    } catch (error) {
      console.error(`Error checking username: ${un}`, error);
      invalidUsername.push(un);
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return {validData, invalidUsername}
};

app.get('/', (req,res) => {
  res.send("healthy")
})

app.post('/validate', async(req, res) => {
 try {
   const data = req.body.data;
   const {validData, invalidUsername} = await validateData(data)
  res.status(200).json({ validData, invalidUsername });
 } catch (error) {
    console.error(error)
    res.status(500).json({msg: "some error occured"})
 }
});

module.exports = app;

