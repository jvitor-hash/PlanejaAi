const Team = require("../models/teamModel");

exports.createTeam = async (data) => {
    try {
        const team = await Team.create(data);
        return team;
    } catch (error) {
        throw error;
    }
};

exports.getAllTeams = async () => {
    try {
        const teams = await Team.findAll();
        return teams;
    } catch (error) {
        throw error;
    }
};

exports.getTeamById = async (id) => {
    try {
        const team = await Team.findByPk(id);

        if (!team) {
            throw new Error("Team not found");
        }

        return team;
    } catch (error) {
        throw error;
    }
};

exports.updateTeam = async (id, data) => {
    try {
        const team = await Team.findByPk(id);

        if (!team) {
            throw new Error("Team not found");
        }

        await team.update(data);

        return team;
    } catch (error) {
        throw error;
    }
};

exports.deleteTeam = async (id) => {
    try {
        const team = await Team.findByPk(id);

        if (!team) {
            throw new Error("Team not found");
        }

        await team.destroy();

        return {
            message: "Team deleted successfully"
        };
    } catch (error) {
        throw error;
    }
};

exports.updateTeamStatus = async (id, status) => {
    try {
        const team = await Team.findByPk(id);

        if (!team) {
            throw new Error("Team not found");
        }

        team.team_status = status;
        await team.save();

        return team;
    } catch (error) {
        throw error;
    }
};

exports.getTeamsByAuthor = async (author_id) => {
    try {
        const teams = await Team.findAll({
            where: {
                author_id
            }
        });

        return teams;
    } catch (error) {
        throw error;
    }
};