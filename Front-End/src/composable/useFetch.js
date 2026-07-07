import { ref } from 'vue'

export function useFetch() {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const execute = async (url, options = {}) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`)
      }

      data.value = await response.json()
      return data.value
    } catch (err) {
      error.value = err.message || 'Something went wrong'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    error,
    loading,
    execute
  }
}