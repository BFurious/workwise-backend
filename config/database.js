const { Sequelize } = require('sequelize');// Update this path as necessary

// Sync all models with the database

const sequelize = new Sequelize("postgresql://postgres:test1234@localhost:8000/postgres", {
    host: 'localhost',
    dialect: 'postgres',
});

sequelize.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error: ' + err));

module.exports = sequelize;
