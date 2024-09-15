require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const emailService = require('./emailService'); 
const port = process.env.PORT || 8080;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
})

app.use(bodyParser.json()); // Parse incoming JSON

app.post('/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  try {
    const response = await emailService.sendEmail({ name, email, phone, subject, message });
    console.log('Email sent: ' + response);
    res.status(200).send('Your message has been sent successfully.');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while sending the email.');
  }
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404 Not Found' });
});

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
