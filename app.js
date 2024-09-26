const express = require('express');
const app = express();
const PORT = 3000;

let movies = [];

// Middleware to parse JSON
app.use(express.json());

// Create a new movie
app.post('/movies', (req, res) => {
    const movie = { id: movies.length + 1, ...req.body };
    movies.push(movie);
    res.status(201).json(movie);
});

// // Read all movies
app.get('/movies', (req, res) => res.json(movies));

// Read an movie by ID
app.get('/movies/:id', (req, res) => {
    const movie = movies.find(e => e.id == req.params.id);
    movie ? res.json(movie) : res.status(404).send('Not found');
});

// Update an movie
app.patch('/movies/:id', (req, res) => {
    const movie = movies.find(e => e.id == req.params.id);
    if (movie) {
        Object.assign(movie, req.body);
        res.json(movie);
    } else {
        res.status(404).send('Not found');
    }
});

// Delete an movie
app.delete('/movies/:id', (req, res) => {
    movies = movies.filter(e => e.id != req.params.id);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));