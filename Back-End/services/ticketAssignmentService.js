const TicketAssignment = require("../models/ticketAssignmentModel");

exports.create = async (data) => {
    try {
        return await TicketAssignment.create(data);
    } catch (error) {
        throw error;
    }
};

exports.findAll = async () => {
    try {
        return await TicketAssignment.findAll();
    } catch (error) {
        throw error;
    }
};

exports.findById = async (id) => {
    try {
        return await TicketAssignment.findByPk(id);
    } catch (error) {
        throw error;
    }
};

exports.findByTeamId = async (team_id) => {
    try {
        return await TicketAssignment.findAll({
            where: { team_id }
        });
    } catch (error) {
        throw error;
    }
};

exports.findByUserId = async (user_id) => {
    try {
        return await TicketAssignment.findAll({
            where: { user_id }
        });
    } catch (error) {
        throw error;
    }
};

exports.update = async (id, data) => {
    try {
        const ticketAssignment = await TicketAssignment.findByPk(id);

        if (!ticketAssignment) {
            throw new Error("Ticket assignment not found");
        }

        return await ticketAssignment.update(data);
    } catch (error) {
        throw error;
    }
};

exports.delete = async (id) => {
    try {
        const ticketAssignment = await TicketAssignment.findByPk(id);

        if (!ticketAssignment) {
            throw new Error("Ticket assignment not found");
        }

        await ticketAssignment.destroy();

        return {
            message: "Ticket assignment deleted successfully"
        };
    } catch (error) {
        throw error;
    }
};