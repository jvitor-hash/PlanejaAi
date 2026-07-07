const TicketActivity = require("../models/ticketActivityModel");

exports.createTicketActivity = async (data) => {
    try {
        const activity = await TicketActivity.create(data);
        return activity;
    } catch (error) {
        throw error;
    }
};

exports.getAllTicketActivities = async () => {
    try {
        const activities = await TicketActivity.findAll();
        return activities;
    } catch (error) {
        throw error;
    }
};

exports.getTicketActivityById = async (id) => {
    try {
        const activity = await TicketActivity.findByPk(id);

        if (!activity) {
            throw new Error("Ticket activity not found");
        }

        return activity;
    } catch (error) {
        throw error;
    }
};

exports.getActivitiesByTicketId = async (ticket_id) => {
    try {
        const activities = await TicketActivity.findAll({
            where: {
                ticket_id
            },
            order: [["createdAt", "DESC"]]
        });

        return activities;
    } catch (error) {
        throw error;
    }
};

exports.updateTicketActivity = async (id, data) => {
    try {
        const activity = await TicketActivity.findByPk(id);

        if (!activity) {
            throw new Error("Ticket activity not found");
        }

        await activity.update(data);

        return activity;
    } catch (error) {
        throw error;
    }
};

exports.deleteTicketActivity = async (id) => {
    try {
        const activity = await TicketActivity.findByPk(id);

        if (!activity) {
            throw new Error("Ticket activity not found");
        }

        await activity.destroy();

        return {
            message: "Ticket activity deleted successfully"
        };
    } catch (error) {
        throw error;
    }
};