const { useFetch } = await import('../useFetch')

const API_URL = 'http://localhost:3000/api/tickets/activity'

export async function createTicketActivity(activityData) {
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


export async function getAllTicketActivities() {
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


export async function getTicketActivityById(id) {
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


export async function getActivitiesByTicketId(ticketId) {
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


export async function updateTicketActivity(id, activityData) {
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


export async function deleteTicketActivity(id) {
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