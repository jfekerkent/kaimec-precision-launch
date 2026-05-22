CREATE POLICY "No public insert to leads" ON public.chat_leads FOR INSERT TO public WITH CHECK (false);
CREATE POLICY "No public update to leads" ON public.chat_leads FOR UPDATE TO public USING (false) WITH CHECK (false);
CREATE POLICY "No public delete to leads" ON public.chat_leads FOR DELETE TO public USING (false);

CREATE POLICY "No public insert to escalations" ON public.chat_escalations FOR INSERT TO public WITH CHECK (false);
CREATE POLICY "No public update to escalations" ON public.chat_escalations FOR UPDATE TO public USING (false) WITH CHECK (false);
CREATE POLICY "No public delete to escalations" ON public.chat_escalations FOR DELETE TO public USING (false);

CREATE POLICY "No public insert to logs" ON public.chat_logs FOR INSERT TO public WITH CHECK (false);
CREATE POLICY "No public update to logs" ON public.chat_logs FOR UPDATE TO public USING (false) WITH CHECK (false);
CREATE POLICY "No public delete to logs" ON public.chat_logs FOR DELETE TO public USING (false);