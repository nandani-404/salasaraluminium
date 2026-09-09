import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminSessionToken } from '@/lib/adminAuth';
import {
  fetchAllEnquiries,
  updateEnquiryRecord,
  deleteEnquiryRecord,
} from '@/lib/enquiryService';

async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('salasar_admin_token')?.value;
  return verifyAdminSessionToken(token);
}

export async function GET() {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const result = await fetchAllEnquiries();
    return NextResponse.json({
      success: true,
      records: result.records,
      isFromSupabase: result.isFromSupabase,
      total: result.records.length,
    });
  } catch (err) {
    console.error('[ADMIN FETCH ERROR]:', err);
    return NextResponse.json({ error: 'Failed to retrieve enquiries' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const { id, status, notes } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing enquiry ID' }, { status: 400 });
    }

    await updateEnquiryRecord(id, {
      ...(status ? { status } : {}),
      ...(notes !== undefined ? { notes } : {}),
    });

    return NextResponse.json({ success: true, message: 'Enquiry updated successfully.' });
  } catch (err) {
    console.error('[ADMIN UPDATE ERROR]:', err);
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing enquiry ID to delete' }, { status: 400 });
    }

    await deleteEnquiryRecord(id);
    return NextResponse.json({ success: true, message: 'Enquiry deleted successfully.' });
  } catch (err) {
    console.error('[ADMIN DELETE ERROR]:', err);
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }
}
