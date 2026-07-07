const express = require('express');
const sessionMiddleware = require('./middleware/session');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const ticketAssignmentRoutes = require('./routes/ticketAssignmentRoutes');
const ticketActivityRoutes = require('./routes/ticketActivityRoutes');
const teamMembershipRoutes = require('./routes/teamMembershipRoutes');

app = express();

app.use(sessionMiddleware());

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

const PORT = process.env.PORT || 3000;

app.use('/api/users',               userRoutes);
app.use('/api/teams',               teamRoutes);
app.use('/api/teams/membership',    teamMembershipRoutes);
app.use('/api/tickets',             ticketRoutes);
app.use('/api/tickets/assignment',  ticketAssignmentRoutes);
app.use('/api/tickets/activity',    ticketActivityRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}\nhttp://localhost:${PORT}`);
})