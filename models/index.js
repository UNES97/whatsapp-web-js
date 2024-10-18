const Sequelize = require("sequelize");
require('dotenv').config();

const Connection    = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port:  process.env.DB_PORT,
        dialect: 'mysql',
        operatorsAliases: 0,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        dialectOptions: {
            ssl: {
                require: true,
                ca: process.env.DB_CA
            }
        }
    }
);
const db = {};
db.Sequelize  = Sequelize;
db.Connection = Connection;

db.template = require("../models/template.model")(Connection, Sequelize);
db.message = require("../models/message.model")(Connection, Sequelize);

db.template.hasMany(db.message, { foreignKey: 'message_template_id' });
db.message.belongsTo(db.template, { foreignKey: 'message_template_id' });

module.exports = db;