// LMS API Service
import { CloudCog } from 'lucide-react'
import { API_CONFIG, getAuthHeaders, fetchWithRetry, getCachedData, setCachedData } from './config'

/**
 * Fetch loan data (sectors, sub-sectors, and loan types)
 * Implements caching and retry logic for rate limit handling
 */
export async function fetchLoanData() {
  const cacheKey = 'loan-data'
  
  try {
    // Check cache first
    const cachedData = getCachedData(cacheKey)
    if (cachedData) {
      return cachedData
    }
    
    // Fetch with retry logic
    const response = await fetchWithRetry(
      `${API_CONFIG.LMS_BASE_URL}/loan-data`,
      { headers: getAuthHeaders() }
    )
    
    if (!response.ok) {
      // Provide specific error messages for different status codes
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.')
      } else if (response.status === 401) {
        throw new Error('Authentication failed. Please check your access token.')
      } else if (response.status >= 500) {
        throw new Error('Server error. Please try again later.')
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    
    // The API returns: { status: 'success', data: { loanType: [], loanSector: [] } }
    if (result && result.data) {
      // Cache successful response
      setCachedData(cacheKey, result.data)
      return result.data
    }
    
    console.warn('Unexpected API response structure:', result)
    return { loanType: [], loanSector: [] }
  } catch (error) {
    console.error('Error fetching loan data:', error)
    
    // Try to return cached data even if expired
    const cachedData = getCachedData(cacheKey)
    if (cachedData) {
      return cachedData
    }
    
    return { loanType: [], loanSector: [] }
    
  }
}
