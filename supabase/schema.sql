-- Salasar Aluminium & Hardware
-- Supabase Schema for Enquiries & Leads

CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  lead_id TEXT,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  business_type TEXT,
  product_category TEXT,
  sa_product_code TEXT,
  estimated_quantity TEXT,
  preferred_finish TEXT,
  delivery_location TEXT,
  state TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new', -- 'new', 'in_progress', 'contacted', 'closed'
  notes TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous & public submissions to insert enquiries
CREATE POLICY "Allow public insert into enquiries"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow service_role full access (for server API and admin)
CREATE POLICY "Allow service_role full access"
ON public.enquiries
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Indexes for fast searching and sorting
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries (status);
CREATE INDEX IF NOT EXISTS idx_enquiries_phone ON public.enquiries (phone);
