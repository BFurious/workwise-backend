const { Sequelize } = require('sequelize');// Update this path as necessary

// Sync all models with the database

const sequelize = new Sequelize(`${process.env.POSTGRES_URL}`, {
    host: 'localhost',
    dialect: 'postgres',
});

sequelize.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error: ' + err));

module.exports = sequelize;
