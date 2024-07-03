const express = require("express");
const app = express();

let cources = [
    {id: 1, name: "java"},
    {id: 1, name: "javaScript"},
    {id: 1, name: "DBMS"}
];
app.get('/cources', (req, res) => {
    res.json(cources);
});
let port = 3000;
app.listen(port, () => {
    console.log("server started")
});