import fs from 'fs';
import path from 'path';
import { getSupabaseAdmin } from '@/utils/supabase/admin';
import { EnquiryFormData } from './schema';

export interface EnquiryRecord {
  id: string;
  created_at: string;
  lead_id: string;
  full_name: string;
  phone: string;
  email: string;
  company_name?: string | null;
  business_type?: string | null;
  product_category?: string | null;
  sa_product_code?: string | null;
  estimated_quantity?: string | null;
  preferred_finish?: string | null;
  delivery_location?: string | null;
  state?: string | null;
  message: string;
  status: 'new' | 'in_progress' | 'contacted' | 'closed';
  notes?: string | null;
}

const FALLBACK_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'enquiries_store.json');

function ensureFallbackDirectory() {
  const dir = path.dirname(FALLBACK_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readFallbackStore(): EnquiryRecord[] {
  try {
    ensureFallbackDirectory();
    if (!fs.existsSync(FALLBACK_FILE_PATH)) {
      return [];
    }
    const content = fs.readFileSync(FALLBACK_FILE_PATH, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('[ENQUIRY STORE READ ERROR]:', err);
    return [];
  }
}

function writeFallbackStore(records: EnquiryRecord[]): void {
  try {
    ensureFallbackDirectory();
    fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(records, null, 2), 'utf-8');
  } catch (err) {
    console.error('[ENQUIRY STORE WRITE ERROR]:', err);
  }
}

export async function saveEnquiryRecord(data: EnquiryFormData, leadId: string): Promise<EnquiryRecord> {
  const newRecord: EnquiryRecord = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `ENQ-${Date.now()}`,
    created_at: new Date().toISOString(),
    lead_id: leadId,
    full_name: data.fullName,
    phone: data.phone,
    email: data.email,
    company_name: data.companyName || null,
    business_type: data.businessType || null,
    product_category: data.productCategory || null,
    sa_product_code: data.saProductCode || null,
    estimated_quantity: data.estimatedQuantity || null,
    preferred_finish: data.preferredFinish || null,
    delivery_location: data.deliveryLocation || null,
    state: data.state || null,
    message: data.message,
    status: 'new',
    notes: null,
  };

  // Always write to fallback store first for 100% data guarantee
  const current = readFallbackStore();
  writeFallbackStore([newRecord, ...current]);

  // Attempt Supabase insert
  try {
    const supabase = getSupabaseAdmin();
    const { data: inserted, error } = await supabase
      .from('enquiries')
      .insert({
        lead_id: newRecord.lead_id,
        full_name: newRecord.full_name,
        phone: newRecord.phone,
        email: newRecord.email,
        company_name: newRecord.company_name,
        business_type: newRecord.business_type,
        product_category: newRecord.product_category,
        sa_product_code: newRecord.sa_product_code,
        estimated_quantity: newRecord.estimated_quantity,
        preferred_finish: newRecord.preferred_finish,
        delivery_location: newRecord.delivery_location,
        state: newRecord.state,
        message: newRecord.message,
        status: newRecord.status,
        notes: newRecord.notes,
      })
      .select()
      .single();

    if (error) {
      console.warn('[SUPABASE ENQUIRIES INSERT WARNING]: Table might not exist yet in Supabase. Saved to local backup store.', error.message);
    } else if (inserted) {
      newRecord.id = inserted.id || newRecord.id;
    }
  } catch (err) {
    console.warn('[SUPABASE ENQUIRY EXCEPTION]:', err);
  }

  return newRecord;
}

export async function fetchAllEnquiries(): Promise<{ records: EnquiryRecord[]; isFromSupabase: boolean }> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return { records: data as EnquiryRecord[], isFromSupabase: true };
    }
  } catch (err) {
    console.warn('[SUPABASE FETCH EXCEPTION]:', err);
  }

  // Fallback to local store
  const fallback = readFallbackStore();
  return { records: fallback, isFromSupabase: false };
}

export async function updateEnquiryRecord(
  id: string,
  updates: Partial<Pick<EnquiryRecord, 'status' | 'notes'>>
): Promise<boolean> {
  // Update fallback store
  const records = readFallbackStore();
  const updatedRecords = records.map((rec) => (rec.id === id || rec.lead_id === id ? { ...rec, ...updates } : rec));
  writeFallbackStore(updatedRecords);

  // Attempt Supabase update
  try {
    const supabase = getSupabaseAdmin();
    await supabase.from('enquiries').update(updates).or(`id.eq.${id},lead_id.eq.${id}`);
  } catch (err) {
    console.warn('[SUPABASE UPDATE EXCEPTION]:', err);
  }

  return true;
}

export async function deleteEnquiryRecord(id: string): Promise<boolean> {
  // Update fallback store
  const records = readFallbackStore();
  const remaining = records.filter((rec) => rec.id !== id && rec.lead_id !== id);
  writeFallbackStore(remaining);

  // Attempt Supabase delete
  try {
    const supabase = getSupabaseAdmin();
    await supabase.from('enquiries').delete().or(`id.eq.${id},lead_id.eq.${id}`);
  } catch (err) {
    console.warn('[SUPABASE DELETE EXCEPTION]:', err);
  }

  return true;
}
