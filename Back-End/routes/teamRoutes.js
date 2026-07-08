const express = require("express");
const router = express.Router();

const teamService = require("../services/teamService");

// Create team
router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        const team = await teamService.createTeam(data);
        res.status(201).json(team);
    } catch (err) {
        res.status(500).json({ message: "Failed to create team" });
    }
});

// Get all teams
router.get("/", async (req, res) => {
    try {
        const teams = await teamService.getAllTeams();
        res.json(teams);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch teams" });
    }
});

// Get team by ID
router.get("/:id", async (req, res) => {
    try {
        const team = await teamService.getTeamById(req.params.id);

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.json(team);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch team" });
    }
});

// Get teams by author
router.get("/author/:author_id", async (req, res) => {
    try {
        const teams = await teamService.getTeamsByAuthor(req.params.author_id);

        res.json(teams);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch teams by author" });
    }
});

// Update team
router.put("/:id", async (req, res) => {
    try {
        const team = await teamService.updateTeam(
            req.params.id,
            req.body
        );

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.json(team);
    } catch (err) {
        res.status(500).json({ message: "Failed to update team" });
    }
});

// Update team status
router.patch("/:id/status", async (req, res) => {
    try {
        const team = await teamService.updateTeamStatus(
            req.params.id,
            req.body.status
        );

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.json(team);
    } catch (err) {
        res.status(500).json({ message: "Failed to update team status" });
    }
});

// Delete team
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await teamService.deleteTeam(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.json({ message: "Team deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete team" });
    }
});

module.exports = router;