import { NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request payload using Zod
    const validatedData = enquirySchema.parse(body);

    // Simulate backend logging & email dispatch (Resend / Database / Supabase)
    console.log('[LEAD ENQUIRY RECEIVED]:', {
      timestamp: new Date().toISOString(),
      ...validatedData,
    });

    // Simulated delay for realism
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json(
      {
        success: true,
        message: 'Your enquiry has been logged successfully. A sales engineer will contact you shortly.',
        leadId: `SAL-${Math.floor(100000 + Math.random() * 900000)}`,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('[ENQUIRY API ERROR]:', error);
    
    if (error && typeof error === 'object' && 'errors' in error) {
      return NextResponse.json(
        { error: 'Invalid form data submitted.', details: (error as { errors: unknown }).errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process enquiry. Please try again later.' },
      { status: 500 }
    );
  }
}
