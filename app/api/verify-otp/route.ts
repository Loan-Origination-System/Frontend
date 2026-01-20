import { NextRequest, NextResponse } from 'next/server';
import { verifyOtp } from '@/lib/otpCache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneOrEmail, otp } = body;

    if (!phoneOrEmail || !otp) {
      return NextResponse.json(
        { error: 'Phone/Email and OTP are required' },
        { status: 400 }
      );
    }

    // Verify OTP using shared cache
    const result = verifyOtp(phoneOrEmail, otp);

    if (result.success) {
      console.log(`OTP verified successfully for: ${phoneOrEmail}`);
      return NextResponse.json({
        success: true,
        message: result.message
      });
    } else {
      const statusCode = 
        result.message.includes('expired') ? 410 :
        result.message.includes('not found') ? 404 :
        401;
      
      return NextResponse.json(
        { 
          success: false, 
          error: result.message 
        },
        { status: statusCode }
      );
    }

  } catch (error: any) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP', details: error.message },
      { status: 500 }
    );
  }
}
