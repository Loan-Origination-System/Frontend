// Debug script to test auto-fill functionality
// Run this in the browser console after verification

console.log('=== Auto-Fill Debug Info ===');

// Check if data exists in sessionStorage
const verifiedData = sessionStorage.getItem('verifiedCustomerData');
console.log('1. SessionStorage data exists:', verifiedData ? 'YES' : 'NO');

if (verifiedData) {
  try {
    const parsed = JSON.parse(verifiedData);
    console.log('2. Parsed data structure:', parsed);
    console.log('3. Key fields present:');
    console.log('   - applicantName:', parsed.applicantName);
    console.log('   - dateOfBirth:', parsed.dateOfBirth);
    console.log('   - identificationNo:', parsed.identificationNo);
    console.log('   - phone:', parsed.phone);
    console.log('   - email:', parsed.email);
    console.log('   - isVerified:', parsed.isVerified);
    console.log('4. All keys:', Object.keys(parsed));
  } catch (error) {
    console.error('Error parsing sessionStorage data:', error);
  }
} else {
  console.log('No verified customer data found in sessionStorage');
  console.log('Please complete the verification process first at /verify');
}

console.log('=== End Debug Info ===');
