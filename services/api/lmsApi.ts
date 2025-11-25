// LMS API Service
import { API_CONFIG, getAuthHeaders } from './config'

/**
 * Fetch loan data (sectors, sub-sectors, and loan types)
 */
export async function fetchLoanData() {
  try {
    const response = await fetch(`${API_CONFIG.LMS_BASE_URL}/loan-data`, {
      headers: getAuthHeaders(),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    
    console.log('Loan Data API Response:', result)
    
    // The API returns: { status: 'success', data: { loanType: [], loanSector: [] } }
    if (result && result.data) {
      return result.data
    }
    
    console.warn('Unexpected API response structure:', result)
    return { loanType: [], loanSector: [] }
  } catch (error) {
    console.error('Error fetching loan data:', error)
    return { loanType: [], loanSector: [] }
  }
}
