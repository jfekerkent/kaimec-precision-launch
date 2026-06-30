-- Restrict access to storage.objects in the private 'quotations' bucket.
-- Service role bypasses RLS, so edge functions continue to work.
-- These policies deny all anon/authenticated access explicitly.

CREATE POLICY "No public select on quotations bucket"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id <> 'quotations');

CREATE POLICY "No public insert on quotations bucket"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id <> 'quotations');

CREATE POLICY "No public update on quotations bucket"
ON storage.objects
FOR UPDATE
TO anon, authenticated
USING (bucket_id <> 'quotations')
WITH CHECK (bucket_id <> 'quotations');

CREATE POLICY "No public delete on quotations bucket"
ON storage.objects
FOR DELETE
TO anon, authenticated
USING (bucket_id <> 'quotations');