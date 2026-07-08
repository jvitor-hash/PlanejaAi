const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

async function hashPassword(password) {
  const saltRounds = 12; // 10-14
  return await bcrypt.hash(password, saltRounds);
}

const userService = require("../services/userService");

// Create user
router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Missing credentials",
            });
        }

        const hashedPassword = await hashPassword(password);
        const existingUser = await userService.findByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists",
            });
        }

        const user = await userService.createUser({
            name: name,
            email: email,
            passwordHash: hashedPassword,
        });

        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: "Failed to create user" });
    }
});

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await userService.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Missing credentials",
            });
        }

        const passwordHashed = await hashPassword(password);
        const user = await userService.findByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const passwordMatches = await bcrypt.compare(password, user.passwordHash);
        
        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid credentials.",
            });
        }

        req.session.user = {
            id: user.id,
            name: user.name,
        };

        req.session.save((err) => {
            if (err) {
                return res.status(500).json({ message: "Session save failed" });
            }
        
            res.json({
                id: user.id,
                name: user.name,
            });
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch user" });
    }
})

// User Logout
router.post("/logout", async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie("connect.sid");
        res.json({ message: "Logout successful" });
    });
})

// Get user by ID
router.get("/:id", async (req, res) => {
    try {
        const user = await userService.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch user" });
    }
});

// Get user by email
router.get("/email/:email", async (req, res) => {
    try {
        const user = await userService.findByEmail(req.params.email);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch user" });
    }
});

// Update user
router.put("/:id", async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Failed to update user" });
    }
});

// Delete user
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await userService.deleteUser(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete user" });
    }
});

module.exports = router;