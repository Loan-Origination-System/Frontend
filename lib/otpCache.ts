// Shared OTP cache for verification across API routes
const otpCache = new Map<string, { otp: string; timestamp: number }>();
const OTP_EXPIRY_TIME = 2 * 60 * 1000; // 2 minutes in milliseconds

export function storeOtp(phoneOrEmail: string, otp: string) {
  otpCache.set(phoneOrEmail, { otp, timestamp: Date.now() });
  console.log(`OTP cached for: ${phoneOrEmail}, valid for 2 minutes`);
}

export function verifyOtp(phoneOrEmail: string, otp: string): { success: boolean; message: string } {
  const cachedOtpData = otpCache.get(phoneOrEmail);

  console.log('===== OTP VERIFICATION =====');
  console.log('Phone/Email:', phoneOrEmail);
  console.log('Entered OTP:', otp);
  console.log('Cached OTP:', cachedOtpData?.otp || 'Not found');

  if (!cachedOtpData) {
    console.log('Result: ❌ OTP not found in cache');
    console.log('============================');
    return { 
      success: false, 
      message: 'OTP not found. Please request a new OTP.' 
    };
  }

  // Check if OTP is expired (2 minutes)
  const currentTime = Date.now();
  const elapsed = currentTime - cachedOtpData.timestamp;
  const remainingTime = Math.floor((OTP_EXPIRY_TIME - elapsed) / 1000);

  console.log('Time Remaining:', remainingTime > 0 ? `${remainingTime} seconds` : 'EXPIRED');

  if (elapsed > OTP_EXPIRY_TIME) {
    // Remove expired OTP from cache
    otpCache.delete(phoneOrEmail);
    console.log('Result: ❌ OTP expired');
    console.log('============================');
    return { 
      success: false, 
      message: 'OTP has expired. Please request a new OTP.' 
    };
  }

  // Verify OTP
  if (cachedOtpData.otp === otp) {
    // OTP is valid, remove from cache to prevent reuse
    otpCache.delete(phoneOrEmail);
    console.log('Result: ✅ OTP verified successfully!');
    console.log('============================');
    return {
      success: true,
      message: 'OTP verified successfully'
    };
  } else {
    console.log('Result: ❌ OTP mismatch');
    console.log(`Expected: "${cachedOtpData.otp}" (${cachedOtpData.otp.length} digits)`);
    console.log(`Received: "${otp}" (${otp.length} digits)`);
    console.log('============================');
    return { 
      success: false, 
      message: 'Invalid OTP. Please try again.' 
    };
  }
}

// Clean up expired OTPs periodically (run every minute)
setInterval(() => {
  const currentTime = Date.now();
  for (const [key, value] of otpCache.entries()) {
    if (currentTime - value.timestamp > OTP_EXPIRY_TIME) {
      otpCache.delete(key);
      console.log(`Expired OTP removed for: ${key}`);
    }
  }
}, 60000); // Run every minute

export { OTP_EXPIRY_TIME };
