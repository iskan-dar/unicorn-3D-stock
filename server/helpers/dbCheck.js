const { sequelize } = require('../db/models');

const dbCheck = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected successfully');
  } catch (error) {
    console.log(error);
    console.log('Connection to db failed');
  }
};

module.exports = dbCheck;
