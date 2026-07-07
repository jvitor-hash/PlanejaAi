const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const team = sequelize.define("Team", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    description: {
        type: DataTypes.TEXT
    },

    team_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ACTIVE',
        validate: {
            isIn: [["ACTIVE", "INACTIVE", "ARCHIVED"]],
        }
    },

    author_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "User",
            key: "id",
        },
    },
}, { timestamps: true });

module.exports = team;