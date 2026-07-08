const { useFetch } = await import('../useFetch')

const API_URL = 'http://localhost:3000/api/ticket-assignments'

export async function createTicketAssignment(assignmentData) {
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


export async function getAllTicketAssignments() {
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


export async function getTicketAssignmentById(id) {
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


export async function getTicketAssignmentsByTeam(teamId) {
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


export async function getTicketAssignmentsByUser(userId) {
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


export async function updateTicketAssignment(id, assignmentData) {
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


export async function deleteTicketAssignment(id) {
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