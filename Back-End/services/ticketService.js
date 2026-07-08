const Ticket = require("../models/ticketModel");

exports.createTicket = async (data) => {
    try {
        data.ticket_number = await Ticket.count() + 1; // Generate ticket number based on the count of existing tickets
        const ticket = await Ticket.create(data);
        return ticket;
    } catch (error) {
        throw new Error(`Error creating ticket: ${error.message}`);
    }
};

exports.getAllTickets = async (filters = {}) => {
    try {
        const tickets = await Ticket.findAll({
            where: filters,
            order: [["createdAt", "DESC"]],
        });

        return tickets;
    } catch (error) {
        throw new Error(`Error fetching tickets: ${error.message}`);
    }
};

exports.getTicketById = async (id) => {
    try {
        const ticket = await Ticket.findByPk(id);

        if (!ticket) {
            throw new Error("Ticket not found");
        }

        return ticket;
    } catch (error) {
        throw new Error(`Error fetching ticket: ${error.message}`);
    }
};

exports.getTicketByNumber = async (ticket_number) => {
    try {
        const ticket = await Ticket.findOne({
            where: { ticket_number },
        });

        if (!ticket) {
            throw new Error("Ticket not found");
        }

        return ticket;
    } catch (error) {
        throw new Error(`Error fetching ticket: ${error.message}`);
    }
};

exports.updateTicket = async (id, data) => {
    try {
        const ticket = await Ticket.findByPk(id);

        if (!ticket) {
            throw new Error("Ticket not found");
        }

        await ticket.update(data);

        return ticket;
    } catch (error) {
        throw new Error(`Error updating ticket: ${error.message}`);
    }
};

exports.updateTicketStatus = async (id, status) => {
    try {
        const ticket = await Ticket.findByPk(id);

        if (!ticket) {
            throw new Error("Ticket not found");
        }

        await ticket.update({ status });

        return ticket;
    } catch (error) {
        throw new Error(`Error updating ticket status: ${error.message}`);
    }
};

exports.deleteTicket = async (id) => {
    try {
        const ticket = await Ticket.findByPk(id);

        if (!ticket) {
            throw new Error("Ticket not found");
        }

        await ticket.destroy();

        return {
            message: "Ticket deleted successfully",
        };
    } catch (error) {
        throw new Error(`Error deleting ticket: ${error.message}`);
    }
};

exports.getTicketsByTeam = async (team_id) => {
    try {
        return await Ticket.findAll({
            where: { team_id },
            order: [["createdAt", "DESC"]],
        });
    } catch (error) {
        throw new Error(`Error fetching team tickets: ${error.message}`);
    }
};

exports.getTicketsByAuthor = async (author_id) => {
    try {
        return await Ticket.findAll({
            where: { author_id },
            order: [["createdAt", "DESC"]],
        });
    } catch (error) {
        throw new Error(`Error fetching author tickets: ${error.message}`);
    }
};