const { useFetch } = require('../useFetch')

const API_URL = 'http://localhost:3000/api/users'


async function createUser(userData) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  return { data, error, loading }
}


async function loginUser(credentials) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(credentials)
  })

  return { data, error, loading }
}


async function getUsers() {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/`, {
    method: 'GET',
    credentials: 'include'
  })

  return { data, error, loading }
}


async function getUserById(id) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/${id}`, {
    method: 'GET',
    credentials: 'include'
  })

  return { data, error, loading }
}


async function getUserByEmail(email) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/email/${encodeURIComponent(email)}`, {
    method: 'GET',
    credentials: 'include'
  })

  return { data, error, loading }
}


async function updateUser(id, userData) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(userData)
  })

  return { data, error, loading }
}


async function deleteUser(id) {
  const { data, error, loading, execute } = useFetch()

  await execute(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })

  return { data, error, loading }
}


exports.createUser = createUser
exports.loginUser = loginUser
exports.getUsers = getUsers
exports.getUserById = getUserById
exports.getUserByEmail = getUserByEmail
exports.updateUser = updateUser
exports.deleteUser = deleteUser