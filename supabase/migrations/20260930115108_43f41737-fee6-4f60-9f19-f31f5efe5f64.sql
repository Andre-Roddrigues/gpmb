CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  company text CHECK (company IS NULL OR char_length(company) <= 120),
  email text NOT NULL CHECK (char_length(email) <= 255),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 40),
  subject text NOT NULL CHECK (subject IN ('quote', 'information', 'partnership', 'other')),
  message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 2000),
  locale text NOT NULL CHECK (locale IN ('pt', 'en')),
  consent boolean NOT NULL CHECK (consent = true),
  request_fingerprint text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE INDEX contact_submissions_fingerprint_created_idx ON public.contact_submissions (request_fingerprint, created_at DESC);