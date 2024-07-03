const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

let cources = [
    { id: 1, name: "Java" },
    { id: 2, name: "JavaScript" },
    { id: 3, name: "DBMS" }
];


app.get('/cources', (req, res) => {
    res.json(cources);
});

app.post('/cources', (req, res) => {
    const newCourse = {
        id: cources.length + 1, 
        name: req.body.name    
    };

    cources.push(newCourse);
    console.log(req.body); // Log the request body for debugging
    res.status(201).json(newCourse); 
});

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
const port = 3000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
