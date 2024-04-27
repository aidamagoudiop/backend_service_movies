const express = require("express");
const app = express();

// const data = require("./movies.json");
// 
// app.use(express.json());

const logger = require("morgan");

const PORT = process.env.PORT || 4004;

const db = require("./models");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/movie.routes")(app);

db.mongoose
  .connect(db.url)
  .then(() => {
    console.log(`Connected to the database '${db.url}' !`);
  })
  .catch(err => {
    console.log(`Cannot connect to the database '${db.url}' !`, err);
    process.exit();
  });

app.use(logger("dev"));


app.get("/", (req, res) => {
    console.log(`request from ${req.url}`);
    res.send("Server running");
    res.json({ message: "Welcome to glsi movies application." });

});
app.get("/movies", (req, res) => {
    // console.log(`request from ${req.url}`);
    // res.send("Our best movies");
    data.push(req.body);
    res.status(200).json(data);
});
app.get("/movies/:id", (req, res) => {
    // console.log(`request from ${req.url}`);
    // res.send("Our best movies");

    const id_movie = parseInt(req.params.id);
   const movie = data.find(m => m.id === id_movie);
    res.status(200).json(movie);
});
app.post("/movies", (req, res) => {
    data.push(req.body);
    res.status(200).json(data);
});
app.put("/movies/:id", (req, res) => {
   const id = parseInt(req.params.id);
   let movie = data.find(m => m.id === id);
   (movie.title = req.body.title), (movie.price = req.body.price), (movie.categorie = req.body.categorie);
    res.status(200).json(movie);
});
app.delete("/movies/:id", (req, res) => {
    // console.log(`request from ${req.url}`);
    // res.send("Our best movies");

    const id = parseInt(req.params.id);
   let movie = data.find(m => m.id === id);
   data.splice(data.indexOf(movie), 1);
    res.status(200).json(data);
});

app.listen(PORT, () => {
    console.log(`Backend express server is running on port ${PORT}.`);
  });

