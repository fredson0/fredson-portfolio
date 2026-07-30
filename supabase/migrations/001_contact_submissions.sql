-- Contact submissions table for portfolio contact form
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

create extension if not exists "pgcrypto";

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) >= 2),
  email text not null check (char_length(trim(email)) >= 5),
  organization text not null default '',
  services text not null check (char_length(trim(services)) >= 3),
  message text not null check (char_length(trim(message)) >= 10),
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

-- Service role (backend) bypasses RLS. No public policies by default.
-- Inserts/reads happen only via Next.js API using SUPABASE_SERVICE_ROLE_KEY.

comment on table public.contact_submissions is
  'Mensagens do formulário de contato do portfólio Fredson Santana';
