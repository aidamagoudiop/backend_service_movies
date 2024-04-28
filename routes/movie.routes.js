module.exports = app => {
    const movies = require("../controllers/movie.controller.js");
    let router = require("express").Router();
  
    // Create a new Movie
    router.post("/", movies.create);
  
    // Retrieve all Movies
    router.get("/", movies.findAll);

    router.get("/registered", movies.findAllRegistered);

    router.get("/:id", movies.findOne);

    router.put("/:id", movies.update);

    router.delete("/:id", movies.delete);

    router.delete("/", movies.deleteAll);


    app.use("/api/movies", router);
  };