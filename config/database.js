const { Sequelize } = require('sequelize');// Update this path as necessary

// Sync all models with the database

const sequelize = new Sequelize(`postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`, {
    host: 'localhost',
    dialect: 'postgres',
});

sequelize.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error: ' + err));

module.exports = sequelize;
