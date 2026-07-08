const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Ticket = sequelize.define("Ticket", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
    },

    priority: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'LOW',
        validate: {
            isIn: [["LOW", "MED", "HIGH"]],
        }
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PENDING',
        validate: {
            isIn: [["PENDING", "IN_PROGRESS", "DONE"]],
        }
    },

    due_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    ticket_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },

    team_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Teams",
            key: "id",
        },
    },

    author_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Users",
            key: "id",
        },
    }
}, { timestamps: true });

module.exports = Ticket;