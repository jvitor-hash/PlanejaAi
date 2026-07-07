const { useFetch } = require('../useFetch')

const API_URL = 'http://localhost:3000/api/ticket-assignments'


async function createTicketAssignment(assignmentData) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(assignmentData)
  })

  return {
    data,
    error,
    loading
  }
}


async function getAllTicketAssignments() {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/`, {
    method: 'GET',
    credentials: 'include'
  })

  return {
    data,
    error,
    loading
  }
}


async function getTicketAssignmentById(id) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/${id}`, {
    method: 'GET',
    credentials: 'include'
  })

  return {
    data,
    error,
    loading
  }
}


async function getTicketAssignmentsByTeam(teamId) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/team/${teamId}`, {
    method: 'GET',
    credentials: 'include'
  })

  return {
    data,
    error,
    loading
  }
}


async function getTicketAssignmentsByUser(userId) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/user/${userId}`, {
    method: 'GET',
    credentials: 'include'
  })

  return {
    data,
    error,
    loading
  }
}


async function updateTicketAssignment(id, assignmentData) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(assignmentData)
  })

  return {
    data,
    error,
    loading
  }
}


async function deleteTicketAssignment(id) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })

  return {
    data,
    error,
    loading
  }
}


exports.createTicketAssignment = createTicketAssignment
exports.getAllTicketAssignments = getAllTicketAssignments
exports.getTicketAssignmentById = getTicketAssignmentById
exports.getTicketAssignmentsByTeam = getTicketAssignmentsByTeam
exports.getTicketAssignmentsByUser = getTicketAssignmentsByUser
exports.updateTicketAssignment = updateTicketAssignment
exports.deleteTicketAssignment = deleteTicketAssignment