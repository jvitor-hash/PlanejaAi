const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("SQLite connected");
  } catch (error) {
    console.error(error);
  }
}

async function syncDatabase() {
    try {
        sequelize.sync()
        .then(() => console.log("Database synced"));
    } catch (err) {
        console.error(err);
    }
}

testConnection();
syncDatabase();

module.exports = sequelize;