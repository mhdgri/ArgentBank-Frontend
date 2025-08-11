const API_BASE_URL = 'http://localhost:3001/api/v1'

class ApiService {

    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`
        
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        }

        try {
            const response = await fetch(url, config)
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || `Erreur HTTP: ${response.status}`)
            }

            return data
        } catch (error) {
            console.error('Erreur API:', error)
            throw error
        }
    }

    async login(credentials) {
        return this.request('/user/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        })
    }
}

const apiService = new ApiService()

export default apiService