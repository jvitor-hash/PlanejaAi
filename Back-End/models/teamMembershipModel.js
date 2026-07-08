const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const TeamMembership = sequelize.define("TeamMembership", {
    team_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Teams",
            key: "id",
        },
    },

    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Users",
            key: "id",
        },
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'MEMBER',
        validate: {
            isIn: [["MEMBER", "LEAD", "MANAGER"]],
        }
    },

    joined_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, { timestamps: true });

module.exports = TeamMembership;