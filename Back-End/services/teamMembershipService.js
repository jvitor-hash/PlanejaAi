const TeamMembership = require("../models/teamMembershipModel");

exports.createTeamMembership = async (data) => {
    try {
        const membership = await TeamMembership.create(data);
        return membership;
    } catch (error) {
        throw error;
    }
};

exports.getAllTeamMemberships = async () => {
    try {
        const memberships = await TeamMembership.findAll();
        return memberships;
    } catch (error) {
        throw error;
    }
};

exports.getTeamMembershipById = async (id) => {
    try {
        const membership = await TeamMembership.findByPk(id);

        if (!membership) {
            throw new Error("Team membership not found");
        }

        return membership;
    } catch (error) {
        throw error;
    }
};

exports.getMembershipByTeamAndUser = async (team_id, user_id) => {
    try {
        const membership = await TeamMembership.findOne({
            where: {
                team_id,
                user_id
            }
        });

        return membership;
    } catch (error) {
        throw error;
    }
};

exports.updateTeamMembership = async (id, data) => {
    try {
        const membership = await TeamMembership.findByPk(id);

        if (!membership) {
            throw new Error("Team membership not found");
        }

        await membership.update(data);

        return membership;
    } catch (error) {
        throw error;
    }
};

exports.updateMembershipStatus = async (id, status) => {
    try {
        const membership = await TeamMembership.findByPk(id);

        if (!membership) {
            throw new Error("Team membership not found");
        }

        membership.status = status;
        await membership.save();

        return membership;
    } catch (error) {
        throw error;
    }
};

exports.deleteTeamMembership = async (id) => {
    try {
        const membership = await TeamMembership.findByPk(id);

        if (!membership) {
            throw new Error("Team membership not found");
        }

        await membership.destroy();

        return {
            message: "Team membership deleted successfully"
        };
    } catch (error) {
        throw error;
    }
};

exports.deleteMembershipByTeamAndUser = async (team_id, user_id) => {
    try {
        const membership = await TeamMembership.findOne({
            where: {
                team_id,
                user_id
            }
        });

        if (!membership) {
            throw new Error("Team membership not found");
        }

        await membership.destroy();

        return {
            message: "Team member removed successfully"
        };
    } catch (error) {
        throw error;
    }
};