import express from 'express';

import ctrl from "../../controllers/ctrl-movies.js";
const moviesRouter = express.Router();

// список всіх фільмів
moviesRouter.get('/', ctrl.getAllMovies);

// пошук по id
moviesRouter.get('/:id', ctrl.getMovieById);

// додавання запису
moviesRouter.post('/', ctrl.addMovie);

// видалення запису
moviesRouter.delete('/:id', ctrl.deleteById);

// оновлення запису
moviesRouter.put('/:id', ctrl.updateMovieById);



export default moviesRouter;