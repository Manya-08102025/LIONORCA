-- Lionorca Architeriors - Supabase SQL Schema
-- Run this in your Supabase Dashboard -> SQL Editor

-- ═══════════════════════════════════════════════════════════════
-- 1. Architects Table
-- ═══════════════════════════════════════════════════════════════
create table if not exists public.architects (
  id text primary key,
  name text not null,
  location text not null,
  specialization text not null,
  bio text,
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.architects enable row level security;
drop policy if exists "Allow public read access" on public.architects;
drop policy if exists "Allow authenticated admin insert" on public.architects;
drop policy if exists "Allow authenticated admin update" on public.architects;
drop policy if exists "Allow authenticated admin delete" on public.architects;

create policy "Allow public read access" on public.architects for select using (true);
create policy "Allow authenticated admin insert" on public.architects for insert with check (true);
create policy "Allow authenticated admin update" on public.architects for update using (true);
create policy "Allow authenticated admin delete" on public.architects for delete using (true);

-- ═══════════════════════════════════════════════════════════════
-- 2. Signature Projects Table
-- ═══════════════════════════════════════════════════════════════
create table if not exists public.projects (
  id text primary key,
  title text not null,
  subtitle text,
  typology text,
  location text,
  description text not null,
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add optional columns if table already exists
alter table public.projects add column if not exists subtitle text;
alter table public.projects add column if not exists typology text;
alter table public.projects add column if not exists location text;

-- Enable RLS
alter table public.projects enable row level security;
drop policy if exists "Allow public read access" on public.projects;
drop policy if exists "Allow authenticated admin insert" on public.projects;
drop policy if exists "Allow authenticated admin update" on public.projects;
drop policy if exists "Allow authenticated admin delete" on public.projects;

create policy "Allow public read access" on public.projects for select using (true);
create policy "Allow authenticated admin insert" on public.projects for insert with check (true);
create policy "Allow authenticated admin update" on public.projects for update using (true);
create policy "Allow authenticated admin delete" on public.projects for delete using (true);

-- ═══════════════════════════════════════════════════════════════
-- 3. Media & Insights (Articles) Table
-- ═══════════════════════════════════════════════════════════════
create table if not exists public.articles (
  id text primary key,
  title text not null,
  category text default 'Architecture',
  date date not null default current_date,
  cover_image text not null,
  body text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.articles add column if not exists category text default 'Architecture';

-- Enable RLS
alter table public.articles enable row level security;
drop policy if exists "Allow public read access" on public.articles;
drop policy if exists "Allow authenticated admin insert" on public.articles;
drop policy if exists "Allow authenticated admin update" on public.articles;
drop policy if exists "Allow authenticated admin delete" on public.articles;

create policy "Allow public read access" on public.articles for select using (true);
create policy "Allow authenticated admin insert" on public.articles for insert with check (true);
create policy "Allow authenticated admin update" on public.articles for update using (true);
create policy "Allow authenticated admin delete" on public.articles for delete using (true);

-- Also create media_insights view for seamless naming compatibility
create or replace view public.media_insights as select * from public.articles;

-- ═══════════════════════════════════════════════════════════════
-- 4. Storage Bucket Setup ('public-assets')
-- ═══════════════════════════════════════════════════════════════
-- Insert public-assets bucket into storage.buckets if not exists
insert into storage.buckets (id, name, public)
values ('public-assets', 'public-assets', true)
on conflict (id) do update set public = true;

-- Storage RLS Policies for public-assets
create policy "Public Access" on storage.objects for select using (bucket_id = 'public-assets');
create policy "Admin Upload" on storage.objects for insert with check (bucket_id = 'public-assets');
create policy "Admin Update" on storage.objects for update using (bucket_id = 'public-assets');
create policy "Admin Delete" on storage.objects for delete using (bucket_id = 'public-assets');


