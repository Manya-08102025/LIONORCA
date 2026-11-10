-- Lionorca Architeriors - Supabase SQL Schema
-- Run this in your Supabase Dashboard -> SQL Editor

-- 1. Architects Table
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
create policy "Allow public read access" on public.architects for select using (true);
create policy "Allow authenticated admin insert" on public.architects for insert with check (true);
create policy "Allow authenticated admin update" on public.architects for update using (true);
create policy "Allow authenticated admin delete" on public.architects for delete using (true);

-- 2. Signature Projects Table
create table if not exists public.projects (
  id text primary key,
  title text not null,
  subtitle text not null,
  description text not null,
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.projects enable row level security;
create policy "Allow public read access" on public.projects for select using (true);
create policy "Allow authenticated admin insert" on public.projects for insert with check (true);
create policy "Allow authenticated admin update" on public.projects for update using (true);
create policy "Allow authenticated admin delete" on public.projects for delete using (true);

-- 3. Media & Insights Articles Table
create table if not exists public.articles (
  id text primary key,
  title text not null,
  date date not null default current_date,
  cover_image text not null,
  body text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.articles enable row level security;
create policy "Allow public read access" on public.articles for select using (true);
create policy "Allow authenticated admin insert" on public.articles for insert with check (true);
create policy "Allow authenticated admin update" on public.articles for update using (true);
create policy "Allow authenticated admin delete" on public.articles for delete using (true);

