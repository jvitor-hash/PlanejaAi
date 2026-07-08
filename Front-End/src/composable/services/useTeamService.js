const { useFetch } = await import('../useFetch')

const API_URL = 'http://localhost:3000/api/teams'

export async function createTeam(teamData) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(teamData)
  })

  return {
    data,
    error,
    loading
  }
}


export async function getAllTeams() {
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


export async function getTeamById(id) {
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


export async function getTeamsByAuthor(authorId) {
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


export async function updateTeam(id, teamData) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(teamData)
  })

  return {
    data,
    error,
    loading
  }
}


export async function updateTeamStatus(id, status) {
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


export async function deleteTeam(id) {
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