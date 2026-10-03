import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, projectType, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required inquiry fields.' },
        { status: 400 }
      );
    }

    // Log the inquiry for server monitoring
    console.log('[NEW CLIENT INQUIRY RECEIVED]:', {
      timestamp: new Date().toISOString(),
      name,
      email,
      projectType,
      message,
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry received. Lead engineer will review within 12 hours.',
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry.' },
      { status: 500 }
    );
  }
}
