import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';

const Conn = new Sequelize(
  'relay',
  'root',
  '123',
  {
    dialect: 'mysql',
    host: '127.0.0.1'
  }
);

const Material = Conn.define('material', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cover: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Category = Conn.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// Relationships

Category.hasMany(Material);
Material.belongsTo(Category);

Conn.sync({force: true}).then(() => {
  _.times(10, () => {
    return Category.create({
      name: Faker.name.firstName(),
      description: Faker.commerce.product()
    }).then(category => {
      return category.createMaterial({
        name: `Sample Category by ${category.name}`,
        cover: Faker.image.avatar(),
        url: Faker.image.imageUrl()
      });
    });
  });
});

export default Conn;


