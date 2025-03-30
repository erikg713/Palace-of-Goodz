const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt'); // For password hashing
const sequelize = require('../sequelize-instance'); // Sequelize instance

class User extends Model {
  // Instance method to verify password
  async verifyPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure unique usernames
      validate: {
        len: {
          args: [3, 30],
          msg: 'Username must be between 3 and 30 characters.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Must provide a valid email address.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 100],
          msg: 'Password must be at least 8 characters long.',
        },
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default to non-admin user
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
    hooks: {
      // Hash password before saving
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

// Ensure password is not returned in responses
User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

module.exports = User;
