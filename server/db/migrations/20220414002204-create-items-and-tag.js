module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ItemsAndTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      itemId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Items',
          key: 'id',
        },
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ItemsAndTags');
  },
};
