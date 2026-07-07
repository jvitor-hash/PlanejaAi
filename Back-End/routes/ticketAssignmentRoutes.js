const express = require("express");
const router = express.Router();

const ticketAssignmentService = require("../services/ticketAssignmentService");

// Create ticket assignment
router.post("/", async (req, res) => {
    try {
        const assignment = await ticketAssignmentService.create(req.body);

        res.status(201).json(assignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all ticket assignments
router.get("/", async (req, res) => {
    try {
        const assignments = await ticketAssignmentService.findAll();

        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get ticket assignment by ID
router.get("/:id", async (req, res) => {
    try {
        const assignment = await ticketAssignmentService.findById(
            req.params.id
        );

        if (!assignment) {
            return res.status(404).json({
                message: "Ticket assignment not found"
            });
        }

        res.status(200).json(assignment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Get ticket assignments by team ID
router.get("/team/:team_id", async (req, res) => {
    try {
        const assignments = await ticketAssignmentService.findByTeamId(
            req.params.team_id
        );

        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get ticket assignments by user ID
router.get("/user/:user_id", async (req, res) => {
    try {
        const assignments = await ticketAssignmentService.findByUserId(
            req.params.user_id
        );

        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update ticket assignment
router.put("/:id", async (req, res) => {
    try {
        const assignment = await ticketAssignmentService.update(
            req.params.id,
            req.body
        );

        res.status(200).json(assignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete ticket assignment
router.delete("/:id", async (req, res) => {
    try {
        const result = await ticketAssignmentService.delete(
            req.params.id
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;