const express = require('express')
const cors = require('cors')

const app = express()

// middleware

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

const db = require("./models");

db.sequelize.sync();


// routers
const router = require('./routes/main.routes.js')
app.use('/api', router)
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)



//port
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MyParfum application." });
});

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})

