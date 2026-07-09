const User = require("./userModel");
const Team = require("./teamModel");
const TeamMembership = require("./teamMembershipModel");
const Ticket = require("./ticketModel");
const TicketActivity = require("./ticketActivityModel");
const TicketAssignment = require("./ticketAssignmentModel");

// Team ↔ User through TeamMembership
Team.belongsToMany(User, {
    through: TeamMembership,
    foreignKey: "team_id",
    otherKey: "user_id",
});

User.belongsToMany(Team, {
    through: TeamMembership,
    foreignKey: "user_id",
    otherKey: "team_id",
});

// Ticket ↔ Team
Team.hasMany(Ticket, {
    foreignKey: "team_id",
    onDelete: "CASCADE",
});

Ticket.belongsTo(Team, {
    foreignKey: "team_id",
});

// Ticket ↔ User (author)
User.hasMany(Ticket, {
    foreignKey: "author_id",
});

Ticket.belongsTo(User, {
    foreignKey: "author_id",
    as: "author",
});

// Ticket ↔ TicketActivity
Ticket.hasMany(TicketActivity, {
    foreignKey: "ticket_id",
    onDelete: "CASCADE",
});

TicketActivity.belongsTo(Ticket, {
    foreignKey: "ticket_id",
});

// TicketActivity ↔ User
User.hasMany(TicketActivity, {
    foreignKey: "user_id",
});

TicketActivity.belongsTo(User, {
    foreignKey: "user_id",
});

// TicketAssignment ↔ Team
Team.hasMany(TicketAssignment, {
    foreignKey: "team_id",
    onDelete: "CASCADE",
});

TicketAssignment.belongsTo(Team, {
    foreignKey: "team_id",
});

// TicketAssignment ↔ User
User.hasMany(TicketAssignment, {
    foreignKey: "user_id",
});

TicketAssignment.belongsTo(User, {
    foreignKey: "user_id",
});

module.exports = {
    User,
    Team,
    TeamMembership,
    Ticket,
    TicketActivity,
    TicketAssignment,
};