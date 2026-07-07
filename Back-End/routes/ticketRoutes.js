const express = require("express");
const router = express.Router();

const ticketService = require("../services/ticketService");

// Create ticket
router.post("/", async (req, res) => {
    try {
        const ticket = await ticketService.createTicket(req.body);
        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all tickets
router.get("/", async (req, res) => {
    try {
        const tickets = await ticketService.getAllTickets(req.query);
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get ticket by ID
router.get("/:id", async (req, res) => {
    try {
        const ticket = await ticketService.getTicketById(req.params.id);
        res.status(200).json(ticket);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Get ticket by ticket number
router.get("/number/:ticket_number", async (req, res) => {
    try {
        const ticket = await ticketService.getTicketByNumber(
            req.params.ticket_number
        );

        res.status(200).json(ticket);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Update ticket
router.put("/:id", async (req, res) => {
    try {
        const ticket = await ticketService.updateTicket(
            req.params.id,
            req.body
        );

        res.status(200).json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update ticket status
router.patch("/:id/status", async (req, res) => {
    try {
        const ticket = await ticketService.updateTicketStatus(
            req.params.id,
            req.body.status
        );

        res.status(200).json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete ticket
router.delete("/:id", async (req, res) => {
    try {
        const result = await ticketService.deleteTicket(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Get tickets by team
router.get("/team/:team_id", async (req, res) => {
    try {
        const tickets = await ticketService.getTicketsByTeam(
            req.params.team_id
        );

        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get tickets by author
router.get("/author/:author_id", async (req, res) => {
    try {
        const tickets = await ticketService.getTicketsByAuthor(
            req.params.author_id
        );

        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;