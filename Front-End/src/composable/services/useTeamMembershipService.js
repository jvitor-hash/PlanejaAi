const { useFetch } = await import('../useFetch')

const API_URL = 'http://localhost:3000/api/team-memberships'

export async function createTeamMembership(membershipData) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(membershipData)
  })

  return {
    data,
    error,
    loading
  }
}


export async function getAllTeamMemberships() {
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


export async function getTeamMembershipById(id) {
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


export async function getMembershipByTeamAndUser(teamId, userId) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/team/${teamId}/user/${userId}`, {
    method: 'GET',
    credentials: 'include'
  })

  return {
    data,
    error,
    loading
  }
}


export async function updateTeamMembership(id, membershipData) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(membershipData)
  })

  return {
    data,
    error,
    loading
  }
}


export async function updateMembershipStatus(id, status) {
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


export async function deleteTeamMembership(id) {
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


export async function deleteMembershipByTeamAndUser(teamId, userId) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/team/${teamId}/user/${userId}`, {
    method: 'DELETE',
    credentials: 'include'
  })

  return {
    data,
    error,
    loading
  }
}