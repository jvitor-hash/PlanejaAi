const express = require("express");
const router = express.Router();

const teamMembershipService = require("../services/teamMembershipService");

// Create team membership
router.post("/", async (req, res) => {
    try {
        const membership = await teamMembershipService.createTeamMembership(
            req.body
        );

        res.status(201).json(membership);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all team memberships
router.get("/", async (req, res) => {
    try {
        const memberships = await teamMembershipService.getAllTeamMemberships();

        res.status(200).json(memberships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get team membership by ID
router.get("/:id", async (req, res) => {
    try {
        const membership =
            await teamMembershipService.getTeamMembershipById(req.params.id);

        res.status(200).json(membership);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Get membership by team and user
router.get("/team/:team_id/user/:user_id", async (req, res) => {
    try {
        const membership =
            await teamMembershipService.getMembershipByTeamAndUser(
                req.params.team_id,
                req.params.user_id
            );

        if (!membership) {
            return res.status(404).json({
                message: "Team membership not found"
            });
        }

        res.status(200).json(membership);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update team membership
router.put("/:id", async (req, res) => {
    try {
        const membership =
            await teamMembershipService.updateTeamMembership(
                req.params.id,
                req.body
            );

        res.status(200).json(membership);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update membership status
router.patch("/:id/status", async (req, res) => {
    try {
        const membership =
            await teamMembershipService.updateMembershipStatus(
                req.params.id,
                req.body.status
            );

        res.status(200).json(membership);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete team membership
router.delete("/:id", async (req, res) => {
    try {
        const result =
            await teamMembershipService.deleteTeamMembership(
                req.params.id
            );

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Remove member from team
router.delete("/team/:team_id/user/:user_id", async (req, res) => {
    try {
        const result =
            await teamMembershipService.deleteMembershipByTeamAndUser(
                req.params.team_id,
                req.params.user_id
            );

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;