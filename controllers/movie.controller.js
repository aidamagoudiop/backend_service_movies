const db = require("../models");
const Movie = db.movies;

// Create and Save a new Student
exports.create = function (req, res) {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" 
  });
    return   ;
}
  
  // Create a Movie
  const movie = new Movie({
    title: req.body.title,
    price: req.body.price,
    categorie: req.body.categorie ? req.body.categorie : false,
  });


  movie.save()
    .then(data => {
      res.status(201).send(data); // Réponse avec le nouvel film créé
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Oups! Une erreur s'est produite lors de la création du film.",
      });
    });


}

// Retrieve all Movies from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title
      ? { title: { $regex: new RegExp(title), $options: "i" } }
      : {};
    Movie.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Movies.",
        });
      });
  };
