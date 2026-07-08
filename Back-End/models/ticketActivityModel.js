const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const TicketActivity = sequelize.define("TicketActivity", {
    ticket_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Tickets",
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

    action: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'UNASSIGNED',
        validate: {
            isIn: [[
                "CREATED", 
                "STATUS_CHANGED", 
                "PRIORITY_CHANGED", 
                "ASSIGNED", 
                "UNASSIGNED", 
                "COMMENT_ADDED"
            ]],
        }
    },
}, { timestamps: true });

module.exports = TicketActivity;