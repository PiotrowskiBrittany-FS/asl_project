const express = require("express");
const app = express();
const { Quiz } = require("./src/models");
const quizzesCtrl = require("./src/controllers/quizzes");
const questionsCtrl = require("./src/controllers/questions");
const choicesCtrl = require("./src/controllers/choices");
const authCtrl = require("./src/controllers/auth");
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors')

app.use(session({
  saveUnitialized: false,
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 }
}))

app.set('views', __dirname + '/src/views')
app.set('view engine', 'twig')


// GET / HTTP/1.1
app.get("/", (request, response, next) => {
  res.json("home")
});

app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true,
    "allowCrossDomain": true
}))

//Allow the application to use the controllers
app.use("/quizzes", quizzesCtrl);
app.use("/questions", questionsCtrl);
app.use("/choices", choicesCtrl);
app.use("/auth", authCtrl);

app.listen(3000); // http://localhost:3000/ in the web browser
