// API Configuration
export const API_CONFIG = {
  CDMS_BASE_URL: 'http://119.2.100.178/api/cdms',
  LMS_BASE_URL: 'http://119.2.100.178/api/lms',
  ACCESS_TOKEN: 'rEwOrW10rgTC75dqY5zfQO0SGgJUcPQU8Ue6x7XuXftaE0V5DgVE8NVe4BFq',
}

// Helper function to get headers with auth token
export function getAuthHeaders() {
  return {
    'Authorization': `Bearer ${API_CONFIG.ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  }
}
