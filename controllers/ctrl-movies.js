import movies from '../models/movies/movies.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';

// схеми для валідації
import { movieAddSchema, movieUpdateSchema } from '../schemas/movie-schemas.js';


// список всіх фільмів
const getAllMovies = async (req, res) => {

  const result = await movies.getAllMovies();
  if (!result) {
    throw HttpError(500, "Server not found");
  }

  res.json(result);
}


// пошук по id
const getMovieById = async (req, res) => {

  const { id } = req.params;
  const result = await movies.getMovieById(id);
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  
  res.json(result);
}


// додавання запису
const addMovie = async (req, res) => {

  const { error } = movieAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing required name field. " + error.message);
  }

  const result = await movies.addMovie(req.body);
  if (!result) {
    throw HttpError(404, "Cannot add Contact");
  }
  
  res.status(201).json(result);
}


// видалення запису
const deleteById = async (req, res) => {

  const { id } = req.params;
  const result = await movies.deleteById(id);
  
  if (!result) {
    throw HttpError(404, `Not found id:${id}`);
  }
  
  res.status(200).json({ ...result, message: "Contact deleted" });
}


// оновлення запису
const updateMovieById = async (req, res) => {

  const { error } = movieUpdateSchema.validate(req.body);
  if (error) { 
    throw HttpError(400, "Missing fields " + error.message);
  }

  const { id } = req.params;
  const result = await movies.updateMovieById(id, req.body);
  if (!result) {
    throw HttpError(404, `Not found contact with id:${id}`);
  }

  res.json(result);
}

export default {
  getAllMovies: ctrlWrapper(getAllMovies),
  getMovieById: ctrlWrapper(getMovieById),
  deleteById: ctrlWrapper(deleteById),
  addMovie: ctrlWrapper(addMovie),
  updateMovieById: ctrlWrapper(updateMovieById),
}
