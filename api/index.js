const express = require('express');
const { route } = require('./routes/index');
const app = express();
const PORT = 9000;

// Add CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type,Accept");
    next()
});

// Add body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define Routes
const routes = require('./routes/index');
app.use('/', routes);
app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
});