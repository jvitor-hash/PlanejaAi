const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const TicketAssignment = sequelize.define("TicketAssignment", {
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

    assigned_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, { timestamps: true });


module.exports = TicketAssignment;