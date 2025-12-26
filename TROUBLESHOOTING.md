# Auto-Fill Troubleshooting Guide

## Problem: No data shown in the pages after verification

### Steps to Debug:

1. **Complete the verification process:**
   - Go to `/verify` page
   - Fill in ID type, ID number, and contact method
   - Click "Proceed"
   - Complete the OTP verification

2. **Check Browser Console for logs:**
   After verification, you should see these logs in order:

   ```
   Verify - API Response: {...}
   mapCustomerDataToForm - Input response: {...}
   mapCustomerDataToForm - Extracted customerData: {...}
   mapCustomerDataToForm - Destructured sections: {...}
   mapCustomerDataToForm - Final mapped data: {...}
   Verify - Mapped Data: {...}
   Verify - Data stored in sessionStorage
   ```

3. **Check sessionStorage:**
   Open Browser DevTools → Application tab → Storage → Session Storage
   Look for key: `verifiedCustomerData`
   - If it exists, click to view the JSON data
   - If it doesn't exist, the verification didn't complete properly

4. **After OTP verification:**
   You should be redirected to `/loan-application?step=1`
   Check console for:
   ```
   Loaded verified customer data: {...}
   Loan Application - Merged formData: {...}
   PersonalDetail - Received formData: {...}
   PersonalDetail - Merged data: {...}
   ```

### Common Issues & Solutions:

#### Issue 1: No logs appear
**Solution:** Make sure you're looking at the browser console (F12 or right-click → Inspect → Console tab)

#### Issue 2: "Customer not found or invalid response"
**Solution:** 
- Check if the API is returning data
- Verify the ID number is correct
- Check if `result?.success && result?.data` is true in the API response

#### Issue 3: Data in sessionStorage but not showing in forms
**Solution:**
- Check if field names match between mapper and components
- Verify the component's `data` state is being updated
- Look for the "PersonalDetail - Merged data" log to see if fields are populated

#### Issue 4: API returns data but mapping fails
**Solution:**
- Check the API response structure in console
- Verify the path: `response?.data?.data` or `response?.data`
- Check if `personal`, `address`, `contact`, etc. exist in the response

### Manual Testing in Console:

Run this in browser console after verification:
```javascript
// Check what's stored
const stored = sessionStorage.getItem('verifiedCustomerData');
console.log('Stored data:', JSON.parse(stored));

// Check key fields
const data = JSON.parse(stored);
console.log('Name:', data.applicantName || data.fullName);
console.log('DOB:', data.dateOfBirth);
console.log('ID:', data.identificationNo || data.idNumber);
console.log('Phone:', data.phone || data.contactNo);
console.log('Email:', data.email || data.emailId);
```

### Field Name Reference:

The mapper creates BOTH versions of field names for compatibility:

| API Field | Component Field (Primary) | Component Field (Alias) |
|-----------|---------------------------|-------------------------|
| party_name | applicantName | fullName |
| party_identity_no | identificationNo | idNumber |
| party_identity_type | identificationType | idType |
| party_date_of_birth | dateOfBirth | - |
| pty_ctc_contact_no | contactNo | phone |
| pty_ctc_email_id | emailId | email |
| party_tpn_number | tpn | tpnNumber |
| party_bank_account_no | bankAccount | bankAccountNo |

### What the Changes Fixed:

1. **Added sessionStorage loading** in loan-application page
2. **Improved data structure** - Now properly spreads verified data to all form sections
3. **Simplified useEffect dependencies** - Removed complex nested property checks
4. **Added comprehensive logging** - Can now track data flow at every step

### Expected Behavior:

After successful verification:
1. Data stored in sessionStorage ✓
2. User completes OTP ✓
3. Redirected to Personal Details page ✓
4. All verified fields auto-populated ✓
5. User can edit any field if needed ✓
6. Data persists as user moves through form steps ✓

### Still Having Issues?

Please provide:
1. Console logs from the browser
2. Screenshot of sessionStorage content
3. API response structure (check Network tab → customer-onboarded-details)
