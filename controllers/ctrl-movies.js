import express from 'express';
import Joi from 'joi';

import movies from '../models/movies/movies.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';


// схема для валідації
const addSchema = Joi.object({
  title: Joi.string().required(), 
  director: Joi.string().required()
})

// список всіх фільмів
const listMovies = async (req, res) => {

  const result = await movies.listMovies();
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

  const { error } = addSchema.validate(req.body);
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
const removeMovie = async (req, res) => {

  const { id } = req.params;
  const result = await movies.removeMovie(id);
  
  if (!result) {
    throw HttpError(404, `Not found id:${id}`);
  }
  
  res.status(200).json({ ...result, message: "Contact deleted" });
}


// оновлення запису
const updateMovie = async (req, res) => {

  const { error } = addSchema.validate(req.body);
  if (error) { 
    throw HttpError(400, "Missing fields " + error.message);
  }

  const { id } = req.params;
  const result = await movies.updateMovie(id, req.body);
  if (!result) {
    throw HttpError(404, `Not found contact with id:${id}`);
  }

  res.json(result);
}

export default {
  listMovies: ctrlWrapper(listMovies),
  getMovieById: ctrlWrapper(getMovieById),
  removeMovie: ctrlWrapper(removeMovie),
  addMovie: ctrlWrapper(addMovie),
  updateMovie: ctrlWrapper(updateMovie),
}
