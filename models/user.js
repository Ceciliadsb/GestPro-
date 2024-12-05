const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
  });

  // Antes de criar, criptografar a senha
  User.beforeCreate(async (user) => {
    console.log('Criptografando a senha para o usuário:', user.email); // Adicione logs para depuração
    user.password = await bcrypt.hash(user.password, 10);
  });

  return User;
};
