# Auto-Population Implementation Guide

## Overview
This implementation provides automatic form auto-population after customer verification API call in a Next.js application.

## Architecture

```
Verify Page → API Call → Map Data → Store in SessionStorage → Loan Application → Auto-populate Form
```

## Files Created/Modified

### 1. **Mapper Utility** (`lib/mapCustomerData.ts`)
Reusable function to transform API response to form-compatible data.

**Key Features:**
- Type-safe interfaces
- Safe null/undefined handling with optional chaining
- Date formatting (YYYY-MM-DD)
- Tracks verified fields for readonly functionality

**Usage Example:**
```typescript
import { mapCustomerDataToForm, MappedFormData } from '@/lib/mapCustomerData';

const apiResponse = await fetchCustomerDetails();
const mappedData: MappedFormData = mapCustomerDataToForm(apiResponse);
```

### 2. **Next.js API Proxy** (`app/api/customer-onboarded-details/route.ts`)
Server-side API route that handles CSRF tokens and proxies requests to external API.

**Benefits:**
- Avoids CORS issues
- Handles CSRF tokens automatically
- Keeps credentials secure (not exposed to browser)

### 3. **Verification Component** (`components/Verify.tsx`)
Updated to:
- Call Next.js API proxy instead of external API directly
- Map API response to form format
- Store mapped data in sessionStorage
- Navigate to loan application after OTP verification

**Key Code:**
```typescript
const response = await fetch('/api/customer-onboarded-details', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});

const result = await response.json();

if (result?.success) {
  const mappedData = mapCustomerDataToForm(result);
  sessionStorage.setItem('verifiedCustomerData', JSON.stringify(mappedData));
  setShowOtpModal(true);
}
```

### 4. **Loan Application Page** (`app/loan-application/page.tsx`)
Updated to:
- Load verified customer data from sessionStorage on mount
- Auto-populate form fields
- Pass data to child form components

**Key Code:**
```typescript
useEffect(() => {
  const verifiedDataStr = sessionStorage.getItem('verifiedCustomerData');
  if (verifiedDataStr) {
    const verifiedData: MappedFormData = JSON.parse(verifiedDataStr);
    setFormData((prev) => ({ ...prev, ...verifiedData }));
  }
}, []);
```

## Complete Flow Example

### Step 1: User Verification (Verify.tsx)
```typescript
// User fills form: ID type, ID number, email/phone
const payload = {
  type: "I",
  identity_no: "11111001268",
  contact_no: "",
  email_id: "user@example.com"
};

// Call Next.js API proxy
const response = await fetch('/api/customer-onboarded-details', {
  method: 'POST',
  body: JSON.stringify(payload)
});

const result = await response.json();
```

### Step 2: API Response
```json
{
  "success": true,
  "data": {
    "personal": {
      "party_name": "Mr Tshering Jatsho",
      "party_date_of_birth": "2000-01-12",
      "party_gender": "Male",
      "party_identity_no": "11111001268"
    },
    "contact": {
      "pty_ctc_contact_no": "17644572",
      "pty_ctc_email_id": "user@example.com"
    },
    "address": { ... },
    "employment": { ... }
  }
}
```

### Step 3: Data Mapping
```typescript
const mappedData = mapCustomerDataToForm(result);
// Result:
{
  fullName: "Mr Tshering Jatsho",
  dateOfBirth: "2000-01-12",
  gender: "Male",
  idNumber: "11111001268",
  phone: "17644572",
  email: "user@example.com",
  isVerified: true,
  verifiedFields: ["fullName", "dateOfBirth", "gender", ...]
}
```

### Step 4: Store and Navigate
```typescript
sessionStorage.setItem('verifiedCustomerData', JSON.stringify(mappedData));
// Show OTP modal, after verification navigate to /loan-application?step=1
```

### Step 5: Auto-populate Form
```typescript
// In loan-application/page.tsx
useEffect(() => {
  const verifiedData = sessionStorage.getItem('verifiedCustomerData');
  if (verifiedData) {
    const parsedData = JSON.parse(verifiedData);
    setFormData((prev) => ({ ...prev, ...parsedData }));
  }
}, []);

// Form fields are now pre-filled!
```

## Field Mapping Reference

| API Field | Mapped Field | Type |
|-----------|--------------|------|
| `personal.party_name` | `fullName` | string |
| `personal.party_date_of_birth` | `dateOfBirth` | string (YYYY-MM-DD) |
| `personal.party_gender` | `gender` | string |
| `personal.party_identity_no` | `idNumber` | string |
| `personal.party_identity_type` | `idType` | string |
| `personal.party_marital_status` | `maritalStatus` | string |
| `personal.party_nationality` | `nationality` | string |
| `contact.pty_ctc_contact_no` | `phone` | string |
| `contact.pty_ctc_email_id` | `email` | string |
| `contact.pty_ctc_alternate_contact_no` | `alternatePhone` | string |
| `address.Permanent_address.*` | `permanent*` | string |
| `address.resident_address.*` | `current*` | string |
| `employment.pty_empl_organization_name` | `employerName` | string |
| `employment.pty_empl_designation` | `designation` | string |
| `employment.pty_empl_occupation` | `occupation` | string |
| `employment.pty_empl_annual_income` | `annualIncome` | string |
| `pep.related_to_any_pep` | `relatedToAnyPep` | string |
| `pep.pep_category` | `pepCategory` | string |

## Making Fields Readonly (Optional)

To lock verified fields as readonly:

```typescript
import { isFieldVerified } from '@/lib/mapCustomerData';

// In your form component
const verifiedData = JSON.parse(sessionStorage.getItem('verifiedCustomerData') || '{}');

<input
  type="text"
  value={formData.fullName}
  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
  readOnly={isFieldVerified('fullName', verifiedData)}
  className={isFieldVerified('fullName', verifiedData) ? 'bg-gray-100' : ''}
/>
```

## Error Handling

The implementation includes comprehensive error handling:

### Client-side (Verify.tsx)
```typescript
try {
  const response = await fetch('/api/customer-onboarded-details', ...);
  
  if (!response.ok) {
    const error = await response.json();
    alert(error.error || 'Failed to verify customer');
    return;
  }
  
  // Success flow...
} catch (error) {
  console.error('Error verifying customer:', error);
  alert('Failed to verify customer. Please try again.');
}
```

### Server-side (API Route)
```typescript
// Validates required fields
if (!body.type || !body.identity_no) {
  return NextResponse.json(
    { error: 'Missing required fields' },
    { status: 400 }
  );
}

// Handles CSRF token fetch failure gracefully
// Returns proper error messages for API failures
```

## Testing

### Test the complete flow:

1. **Navigate to verification page**: `/verify`
2. **Fill in form**:
   - Select ID type
   - Enter ID number: `11111001268`
   - Select contact method
   - Enter email/phone
3. **Click Proceed**
4. **Verify OTP** (currently any 6 digits work)
5. **Check console logs**:
   ```
   Customer data: {...}
   Mapped form data: {...}
   Loading verified customer data: {...}
   ```
6. **Verify form is auto-populated** in Personal Details step

## Benefits

✅ **Type-safe**: Full TypeScript support with interfaces  
✅ **Reusable**: Mapper function works for any API response  
✅ **Safe**: Handles null/undefined gracefully  
✅ **Flexible**: Easy to add/modify field mappings  
✅ **Secure**: API credentials hidden in server-side route  
✅ **No CORS issues**: Proxy handles server-to-server communication  
✅ **Production-ready**: Includes error handling and validation  

## Extending the Implementation

### Add more fields:
```typescript
// In mapCustomerData.ts
export interface MappedFormData {
  // ... existing fields
  newField?: string; // Add new field
}

export function mapCustomerDataToForm(response: CustomerApiResponse): MappedFormData {
  return {
    // ... existing mappings
    newField: customerData?.someData?.new_field || '', // Add mapping
  };
}
```

### Use with react-hook-form:
```typescript
import { useForm } from 'react-hook-form';
import { mapCustomerDataToForm } from '@/lib/mapCustomerData';

const { setValue } = useForm();

const mappedData = mapCustomerDataToForm(apiResponse);
Object.entries(mappedData).forEach(([key, value]) => {
  setValue(key, value);
});
```

## Troubleshooting

**Data not loading?**
- Check browser console for errors
- Verify sessionStorage: `sessionStorage.getItem('verifiedCustomerData')`
- Ensure OTP verification completes before navigation

**Fields not mapping correctly?**
- Check API response structure in console
- Verify field names match in mapper function
- Update mapper if API structure changed

**CSRF errors?**
- Ensure API proxy is running (Next.js dev server)
- Check `/api/csrf-token` endpoint is accessible
- Verify Bearer token is correct in `route.ts`
