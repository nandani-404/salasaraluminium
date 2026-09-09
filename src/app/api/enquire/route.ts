import { NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/schema';
import { saveEnquiryRecord } from '@/lib/enquiryService';
import { sendEnquiryEmail } from '@/lib/emailService';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request payload using Zod
    const validatedData = enquirySchema.parse(body);

    const leadId = `SAL-${Math.floor(100000 + Math.random() * 900000)}`;

    // 1. Persist lead in Supabase & Backup Store
    const savedRecord = await saveEnquiryRecord(validatedData, leadId);

    // 2. Send Real Email Notification via Resend
    const emailResult = await sendEnquiryEmail(validatedData, leadId);

    return NextResponse.json(
      {
        success: true,
        message: 'Your enquiry has been logged successfully. Our trade team will contact you shortly.',
        leadId,
        recordId: savedRecord.id,
        emailDispatched: emailResult.success,
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
