module.exports = app => {
    const movies = require("../controllers/movie.controller.js");
    let router = require("express").Router();
  
    // Create a new Movie
    router.post("/", movies.create);
  
    // Retrieve all Movies
    router.get("/", movies.findAll);
  
    app.use("/api/movies", router);
  };