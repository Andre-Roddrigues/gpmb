CREATE POLICY "Service role manages contact submissions"
ON public.contact_submissions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);