/**
 * Test Data Injector for Auto-Fill Feature
 * 
 * Run this in the browser console to simulate verified customer data
 * without going through the verification process.
 * 
 * Usage:
 * 1. Open browser console (F12)
 * 2. Copy and paste this entire script
 * 3. Run: injectTestData()
 * 4. Navigate to /loan-application?step=1
 * 5. Form should be auto-filled with test data
 */

function injectTestData() {
  const testData = {
    // Personal Information
    applicantName: 'Test User Name',
    fullName: 'Test User Name',
    dateOfBirth: '1990-01-15',
    gender: 'male', // Use lowercase code
    identificationNo: '11111001268',
    idNumber: '11111001268',
    identificationType: 'cid', // Use code not label
    idType: 'cid', // Use code not label
    identificationIssueDate: '2015-01-01',
    identityIssuedDate: '2015-01-01',
    identificationExpiryDate: '2030-12-31',
    identityExpiryDate: '2030-12-31',
    maritalStatus: 'single', // Use lowercase code
    nationality: 'bhutanese', // Use lowercase code
    tpn: 'TPN123456',
    tpnNumber: 'TPN123456',
    
    // Banking
    bankName: 'bob',
    bankAccount: '1234567890',
    bankAccountNo: '1234567890',
    
    // Contact Information
    contactNo: '17644572',
    phone: '17644572',
    emailId: 'test@example.com',
    email: 'test@example.com',
    alternateContactNo: '17999999',
    alternatePhone: '17999999',
    
    // Permanent Address
    permCountry: 'bhutan',
    permanentCountry: 'bhutan',
    permDzongkhag: 'thimphu',
    permanentDzongkhag: 'thimphu',
    permGewog: 'changzamtog',
    permanentGewog: 'changzamtog',
    permStreet: 'Main Street',
    permanentStreet: 'Main Street',
    thramNo: 'TH123',
    houseNo: 'H456',
    
    // Current Address
    currCountry: 'bhutan',
    currentCountry: 'bhutan',
    currDzongkhag: 'thimphu',
    currentDzongkhag: 'thimphu',
    currGewog: 'changzamtog',
    currentGewog: 'changzamtog',
    currStreet: 'Main Street',
    currentStreet: 'Main Street',
    currBuildingNo: 'B789',
    currentBuildingNo: 'B789',
    
    // Employment Information
    occupation: 'engineer',
    organizationType: 'government',
    employerType: 'government',
    organizationName: 'Test Organization',
    employerName: 'Test Organization',
    organizationLocation: 'Thimphu',
    employerLocation: 'Thimphu',
    employeeId: 'EMP001',
    natureOfService: 'permanent',
    serviceNature: 'permanent',
    appointmentDate: '2018-06-01',
    designation: 'Senior Engineer',
    grade: 'P3',
    annualIncome: '500000',
    
    // PEP Information
    pepPerson: 'no',
    pepDeclaration: 'not_applicable',
    pepRelated: 'no',
    pepCategory: '',
    pepSubCategory: null,
    relatedToAnyPep: 'No',
    
    // Metadata
    isVerified: true,
    verifiedFields: [
      'fullName', 'applicantName', 'dateOfBirth', 'gender', 
      'idNumber', 'identificationNo', 'nationality', 'phone', 
      'email', 'maritalStatus', 'tpn', 'bankName', 'bankAccount'
    ]
  };

  // Store in sessionStorage
  sessionStorage.setItem('verifiedCustomerData', JSON.stringify(testData));
  
  console.log('✅ Test data injected successfully!');
  console.log('📋 Stored data:', testData);
  console.log('🚀 Navigate to /loan-application?step=1 to see auto-filled form');
  
  return testData;
}

// Auto-run if this script is executed directly
console.log('🧪 Test Data Injector Loaded');
console.log('📝 Run: injectTestData() to populate form with test data');
