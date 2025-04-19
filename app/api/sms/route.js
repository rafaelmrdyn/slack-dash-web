import { NextResponse } from 'next/server';

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(accountSid, authToken);

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate required fields
    if (!body.to || !body.body) {
      return NextResponse.json(
        { error: 'Missing required fields: to and body are required' },
        { status: 400 }
      );
    }

    // Set up message parameters
    const messageParams = {
      body: body.body,
      to: body.to,
      from: '+15179032606', // Default Twilio number
      // Use messagingServiceSid if provided, otherwise use from
      ...(body.messagingServiceSid && { messagingServiceSid: body.messagingServiceSid }),
      ...(body.from && !body.messagingServiceSid && { from: body.from }),
    };

    // Send the message using Twilio
    const message = await twilioClient.messages.create(messageParams);

    // Return success response with message SID
    return NextResponse.json({
      success: true,
      messageSid: message.sid,
      status: message.status,
    });
  } catch (error) {
    console.error('Error sending SMS:', error);

    // Return appropriate error response
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to send SMS',
        code: error.code,
      },
      { status: error.status || 500 }
    );
  }
}
