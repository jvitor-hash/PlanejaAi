const express = require("express");
const router = express.Router();

const ticketActivityService = require("../services/ticketActivityService");

// Create ticket activity
router.post("/", async (req, res) => {
    try {
        const activity = await ticketActivityService.createTicketActivity(
            req.body
        );

        res.status(201).json(activity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all ticket activities
router.get("/", async (req, res) => {
    try {
        const activities = await ticketActivityService.getAllTicketActivities();

        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get ticket activity by ID
router.get("/:id", async (req, res) => {
    try {
        const activity = await ticketActivityService.getTicketActivityById(
            req.params.id
        );

        res.status(200).json(activity);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Get activities by ticket ID
router.get("/ticket/:ticket_id", async (req, res) => {
    try {
        const activities = await ticketActivityService.getActivitiesByTicketId(
            req.params.ticket_id
        );

        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update ticket activity
router.put("/:id", async (req, res) => {
    try {
        const activity = await ticketActivityService.updateTicketActivity(
            req.params.id,
            req.body
        );

        res.status(200).json(activity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete ticket activity
router.delete("/:id", async (req, res) => {
    try {
        const result = await ticketActivityService.deleteTicketActivity(
            req.params.id
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;