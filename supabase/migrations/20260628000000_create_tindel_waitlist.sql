CREATE TABLE IF NOT EXISTS public.tindel_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  roast_pref text,
  cadence_pref text,
  consent_flag boolean NOT NULL DEFAULT false,
  consent_timestamp timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.tindel_waitlist ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS, so no policy needed for server-side writes.
-- Add a read policy for authenticated users if needed later.
