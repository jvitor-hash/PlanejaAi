const { useFetch } = await import('../useFetch')

const API_URL = 'http://localhost:3000/api/tickets'


export async function createTicket (ticketData) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(ticketData)
  })

  return {
    data,
    error,
    loading
  }
}


export async function getAllTickets (query = {}) {
  const { data, error, loading, execute } = useFetch()

  const params = new URLSearchParams(query).toString()

  await execute(`${API_URL}/${params ? `?${params}` : ''}`, {
    method: 'GET',
    credentials: 'include'
  })

  return {
    data,
    error,
    loading
  }
}


export async function getTicketById (id) {
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


export async function getTicketByNumber (ticketNumber) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/number/${encodeURIComponent(ticketNumber)}`, {
    method: 'GET',
    credentials: 'include'
  })

  return {
    data,
    error,
    loading
  }
}


export async function updateTicket (id, ticketData) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(ticketData)
  })

  return {
    data,
    error,
    loading
  }
}


export async function updateTicketStatus (id, status) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      status
    })
  })

  return {
    data,
    error,
    loading
  }
}


export async function deleteTicket (id) {
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


export async function getTicketsByTeam (teamId) {
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


export async function getTicketsByAuthor (authorId) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/author/${authorId}`, {
    method: 'GET',
    credentials: 'include'
  })

  return {
    data,
    error,
    loading
  }
}