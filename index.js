const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require("./config/database.js");

database.sync({ alter: true }) // Set `force: true` to drop and recreate tables each time
    .then(() => {
        console.log('Database synced');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });
    
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const routes = require('./routes/index.js');
app.use('/api', routes);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
