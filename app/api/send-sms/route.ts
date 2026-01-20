import { NextRequest, NextResponse } from 'next/server';
import { storeOtp } from '@/lib/otpCache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, otp } = body;

    if (!to) {
      return NextResponse.json(
        { error: 'Phone number or email is required' },
        { status: 400 }
      );
    }

    // Check if this is for email (has @ symbol) or phone
    const isEmail = to.includes('@');

    // For email, we just cache the provided OTP (no SMS sent)
    if (isEmail) {
      if (!otp) {
        return NextResponse.json(
          { error: 'OTP is required for email' },
          { status: 400 }
        );
      }
      storeOtp(to, String(otp));
      console.log(`Email OTP cached for: ${to}, valid for 2 minutes`);
      return NextResponse.json({ 
        success: true, 
        message: 'OTP cached for email verification',
        otp: otp
      });
    }

    // For phone, call the SMS API

    // SMS API configuration
    const smsApiUrl = 'http://119.2.100.178/api/send-sms';
    const smsApiToken = 'rEwOrW10rgTC75dqY5zfQO0SGgJUcPQU8Ue6x7XuXftaE0V5DgVE8NVe4BFq';

    console.log(`Attempting to send SMS OTP to ${to}`);
    console.log(`SMS API URL: ${smsApiUrl}`);

    // Call the SMS API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const smsResponse = await fetch(smsApiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${smsApiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile_no: to
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!smsResponse.ok) {
        const errorText = await smsResponse.text();
        console.error('SMS API Error Response:', errorText);
        return NextResponse.json(
          { error: 'Failed to send SMS', details: errorText },
          { status: 500 }
        );
      }

      const result = await smsResponse.json().catch(() => ({ success: true }));

      console.log('===== SMS API Response =====');
      console.log(JSON.stringify(result, null, 2));

      // Extract OTP from the SMS API response
      // The API should return the OTP it sent - check common response formats
      let sentOtp = null;
      if (result.otp) {
        sentOtp = result.otp;
      } else if (result.data?.otp) {
        sentOtp = result.data.otp;
      } else if (result.code) {
        sentOtp = result.code;
      } else if (result.data?.code) {
        sentOtp = result.data.code;
      }

      if (sentOtp) {
        // Ensure OTP is 6 digits by padding with leading zeros if needed
        const formattedOtp = String(sentOtp).padStart(6, '0');
        
        // Store the OTP that was actually sent by the SMS API
        storeOtp(to, formattedOtp);
        
        console.log('===== OTP CACHED =====');
        console.log(`Phone Number: ${to}`);
        console.log(`OTP from SMS API: ${sentOtp}`);
        console.log(`Formatted OTP (6-digit): ${formattedOtp}`);
        console.log(`Valid for: 2 minutes`);
        console.log('=====================');
        
        sentOtp = formattedOtp; // Return formatted OTP
      } else {
        console.warn('⚠️ SMS API did not return OTP in response');
        console.log('Full Response:', JSON.stringify(result, null, 2));
      }

      return NextResponse.json({ 
        success: true, 
        message: 'OTP sent successfully',
        otp: sentOtp, // Return the OTP for testing/display purposes
        data: result 
      });

    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        console.error('SMS API request timed out');
        return NextResponse.json(
          { error: 'SMS API request timed out. Please check if the SMS service is running.' },
          { status: 504 }
        );
      }
      
      console.error('SMS API fetch error:', fetchError);
      return NextResponse.json(
        { error: 'Could not connect to SMS service', details: fetchError.message },
        { status: 503 }
      );
    }

  } catch (error: any) {
    console.error('Error sending SMS:', error);
    return NextResponse.json(
      { error: 'Failed to send SMS', details: error.message },
      { status: 500 }
    );
  }
}
