const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const user = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    email: {
        type: DataTypes.STRING,
        unique: true,
    },

    role: { type: DataTypes.STRING },
    passwordHash: { type: DataTypes.STRING },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ACTIVE',
        validate: {
            isIn: [["ACTIVE", "VACATION", "INACTIVE"]],
        }
    }
}, { timestamps: true });

module.exports = user;