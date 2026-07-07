const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const TicketAssignment = sequelize.define("TicketAssignment", {
    team_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Team",
            key: "id",
        },
    },

    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "User",
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