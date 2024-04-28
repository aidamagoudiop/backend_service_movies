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

exports.findOne =  (req, res) => {
    const id = req.params.id;
    Movie.findById(id)
      .then(data => {
        if (!data)
        res.status(404).send({ message: "Not found Movie with id" + id
      });
      else res.send(data);
    })
    
}
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 
      "Data to update can not be empty!",
    }); 
  }
  const id = req.params.id;
  Movie.findByIdAndUpdate(id, req.body,
  { useFindAndModify: false })
    .then(data => {
      if(!data) {
        res.status(404).send({ message: 
          `Cannot update Movie with id=${id}. Maybe Movie was not found`,
        }); 
      } else res.send({ message: 
        "Movie was updated successfully"});
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Movie with id=" +id,
      });
    });
};

exports.delete =  (req, res) => {
  const id = req.params.id;
  Movie.findByIdAndRemove(id)
    .then(data => {
      if (!data)
      res.status(404).send({ message: 
        `Cannot delete Movie with id=${id}. Maybe Movie was not found`,
    });
    else {
      res.send({ 
        message: 
        "Movie was deleted successfully",
      });      
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Movie with id=" +id,
    });
  });
  
};


exports.deleteAll =  (req, res) => {
  Movie.deleteMany({})
    .then(data => {
      res.send({ 
        message: 
        `${data.deletedCount}
        Students were deleted successfully`,
      });      
  })
  .catch(err => {
    res.status(500).send({
      message: 
      err.message || "Some error occurred while removing all students.",
    });
  });
  
};

exports.findAllRegistered =  (req, res) => {
  Movie.find({ registered: true })
    .then(data => {
      res.send(data);      
  })
  .catch(err => {
    res.status(500).send({
      message: 
      err.message || "Some error occurred while retrieving students.",
    });
  });
  
};