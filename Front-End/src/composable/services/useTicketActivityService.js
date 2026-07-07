const { useFetch } = require('../useFetch')

const API_URL = 'http://localhost:3000/api/ticket-activities'


async function createTicketActivity(activityData) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(activityData)
  })

  return {
    data,
    error,
    loading
  }
}


async function getAllTicketActivities() {
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


async function getTicketActivityById(id) {
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


async function getActivitiesByTicketId(ticketId) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/ticket/${ticketId}`, {
    method: 'GET',
    credentials: 'include'
  })

  return {
    data,
    error,
    loading
  }
}


async function updateTicketActivity(id, activityData) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(activityData)
  })

  return {
    data,
    error,
    loading
  }
}


async function deleteTicketActivity(id) {
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


exports.createTicketActivity = createTicketActivity
exports.getAllTicketActivities = getAllTicketActivities
exports.getTicketActivityById = getTicketActivityById
exports.getActivitiesByTicketId = getActivitiesByTicketId
exports.updateTicketActivity = updateTicketActivity
exports.deleteTicketActivity = deleteTicketActivity