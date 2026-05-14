CREATE TABLE public.chat_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  machine_of_interest TEXT,
  application TEXT,
  timeline TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.chat_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "No public access to leads" ON public.chat_leads FOR SELECT USING (false);

CREATE TABLE public.chat_escalations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  summary TEXT NOT NULL,
  urgency TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.chat_escalations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "No public access to escalations" ON public.chat_escalations FOR SELECT USING (false);

CREATE TABLE public.chat_logs (
  session_id TEXT NOT NULL PRIMARY KEY,
  history JSONB NOT NULL DEFAULT '[]'::jsonb,
  turn_count INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "No public access to logs" ON public.chat_logs FOR SELECT USING (false);

CREATE INDEX idx_chat_leads_created ON public.chat_leads(created_at DESC);
CREATE INDEX idx_chat_escalations_created ON public.chat_escalations(created_at DESC);