const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Logging middleware to log HTTP method and URL
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Initial set of courses
let cources = [
    { id: 1, name: "Java" },
    { id: 2, name: "JavaScript" },
    { id: 3, name: "DBMS" }
];

// GET all courses
app.get('/cources', (req, res) => {
    res.json(cources);
});

// POST a new course
app.post('/cources', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Course name is required' });
    }

    const newCourse = {
        id: cources.length + 1,
        name: name
    };

    cources.push(newCourse);
    console.log(req.body); // Log the request body for debugging
    res.status(201).json(newCourse); // Respond with the newly created course
});

// DELETE a course by ID
app.delete('/cources/:id', (req, res) => {
    const courseId = parseInt(req.params.id, 10);
    const courseIndex = cources.findIndex(course => course.id === courseId);

    if (courseIndex !== -1) {
        const deletedCourse = cources.splice(courseIndex, 1);
        res.json(deletedCourse[0]);
    } else {
        res.status(404).json({ message: `Course with ID ${courseId} not found` });
    }
});

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).json({ message: 'Bad Request: Invalid JSON' });
    } else {
        next();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
