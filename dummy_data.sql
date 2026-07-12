-- =========================================================
-- AssetFlow - Dummy Data for Demo
-- Run this in Supabase Dashboard → SQL Editor
-- =========================================================

-- =====================
-- DEPARTMENTS
-- =====================
insert into public.departments (id, name, description, created_at) values
  ('d1000000-0000-0000-0000-000000000001', 'Engineering', 'Software & hardware engineering team', now()),
  ('d1000000-0000-0000-0000-000000000002', 'Design', 'UI/UX and brand design team', now()),
  ('d1000000-0000-0000-0000-000000000003', 'Finance', 'Accounting and financial operations', now()),
  ('d1000000-0000-0000-0000-000000000004', 'HR & Operations', 'Human resources and admin operations', now()),
  ('d1000000-0000-0000-0000-000000000005', 'Marketing', 'Digital marketing and growth team', now())
on conflict (id) do nothing;

-- =====================
-- ASSETS
-- =====================
insert into public.assets (id, name, category, serial_number, status, department_id, purchase_date, purchase_price, created_at) values
  ('a1000000-0000-0000-0000-000000000001', 'MacBook Pro 16"', 'Laptop', 'SN-MBP-2024-001', 'allocated', 'd1000000-0000-0000-0000-000000000001', '2024-01-10', 245000, now() - interval '60 days'),
  ('a1000000-0000-0000-0000-000000000002', 'Dell XPS 15', 'Laptop', 'SN-DXPS-2024-002', 'available', 'd1000000-0000-0000-0000-000000000001', '2024-02-05', 189000, now() - interval '55 days'),
  ('a1000000-0000-0000-0000-000000000003', 'iPhone 15 Pro', 'Mobile', 'SN-IP15-2024-003', 'allocated', 'd1000000-0000-0000-0000-000000000002', '2024-01-20', 134900, now() - interval '50 days'),
  ('a1000000-0000-0000-0000-000000000004', 'Samsung 27" 4K Monitor', 'Monitor', 'SN-SAM-2024-004', 'available', 'd1000000-0000-0000-0000-000000000001', '2024-03-01', 45000, now() - interval '45 days'),
  ('a1000000-0000-0000-0000-000000000005', 'Sony WH-1000XM5 Headphones', 'Audio', 'SN-SONY-2024-005', 'available', 'd1000000-0000-0000-0000-000000000002', '2024-02-15', 28900, now() - interval '40 days'),
  ('a1000000-0000-0000-0000-000000000006', 'iPad Pro 12.9"', 'Tablet', 'SN-IPAD-2024-006', 'maintenance', 'd1000000-0000-0000-0000-000000000003', '2024-01-25', 112000, now() - interval '35 days'),
  ('a1000000-0000-0000-0000-000000000007', 'HP LaserJet Pro MFP', 'Printer', 'SN-HPLJ-2024-007', 'available', 'd1000000-0000-0000-0000-000000000004', '2023-12-10', 52000, now() - interval '30 days'),
  ('a1000000-0000-0000-0000-000000000008', 'LG 34" UltraWide Monitor', 'Monitor', 'SN-LG34-2024-008', 'allocated', 'd1000000-0000-0000-0000-000000000002', '2024-03-10', 62000, now() - interval '25 days'),
  ('a1000000-0000-0000-0000-000000000009', 'Logitech MX Keys Keyboard', 'Peripheral', 'SN-LGMX-2024-009', 'available', 'd1000000-0000-0000-0000-000000000001', '2024-02-20', 12500, now() - interval '20 days'),
  ('a1000000-0000-0000-0000-000000000010', 'Dell Precision Tower 5860', 'Desktop', 'SN-DPT-2024-010', 'available', 'd1000000-0000-0000-0000-000000000001', '2024-01-05', 320000, now() - interval '15 days'),
  ('a1000000-0000-0000-0000-000000000011', 'Canon EOS R5 Camera', 'Camera', 'SN-CR5-2024-011', 'available', 'd1000000-0000-0000-0000-000000000005', '2024-03-15', 395000, now() - interval '10 days'),
  ('a1000000-0000-0000-0000-000000000012', 'Microsoft Surface Pro 9', 'Laptop', 'SN-MSP-2024-012', 'reserved', 'd1000000-0000-0000-0000-000000000004', '2024-04-01', 156000, now() - interval '5 days')
on conflict (id) do nothing;

-- =====================
-- BOOKINGS (using existing asset IDs)
-- =====================
insert into public.bookings (id, asset_id, start_date, end_date, status, reason, "assetName", created_at) values
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000004', '2026-07-15', '2026-07-18', 'approved', 'Need monitor for client presentation', 'Samsung 27" 4K Monitor', now() - interval '3 days'),
  ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000005', '2026-07-20', '2026-07-22', 'pending', 'Remote work setup for 2 days', 'Sony WH-1000XM5 Headphones', now() - interval '2 days'),
  ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000011', '2026-07-13', '2026-07-14', 'approved', 'Product photoshoot session', 'Canon EOS R5 Camera', now() - interval '1 day'),
  ('b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000002', '2026-07-25', '2026-07-28', 'pending', 'Conference trip laptop', 'Dell XPS 15', now() - interval '4 hours'),
  ('b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000009', '2026-07-10', '2026-07-12', 'completed', 'Temporary keyboard replacement', 'Logitech MX Keys Keyboard', now() - interval '5 days')
on conflict (id) do nothing;

-- =====================
-- MAINTENANCE REQUESTS
-- =====================
insert into public.maintenance_requests (id, asset_id, description, status, priority, "assetName", "assetTag", "reportedByName", created_at) values
  ('m1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000006', 'iPad screen cracked on corner. Touch response degraded near crack area.', 'in_progress', 'high', 'iPad Pro 12.9"', 'ASSET-006', 'Rahul Sharma', now() - interval '7 days'),
  ('m1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'MacBook battery draining very fast. Down to 20% within 2 hours.', 'open', 'medium', 'MacBook Pro 16"', 'ASSET-001', 'Prakhar Kumar', now() - interval '4 days'),
  ('m1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000007', 'Printer paper jam occurs every 10-15 prints. Needs roller cleaning.', 'open', 'low', 'HP LaserJet Pro MFP', 'ASSET-007', 'Anjali Mehta', now() - interval '2 days'),
  ('m1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000003', 'iPhone overheating during calls. Back gets uncomfortably hot.', 'resolved', 'critical', 'iPhone 15 Pro', 'ASSET-003', 'Vikram Singh', now() - interval '10 days'),
  ('m1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000008', 'LG monitor flickering at certain brightness levels. Happens every 5 mins.', 'open', 'medium', 'LG 34" UltraWide Monitor', 'ASSET-008', 'Sneha Patel', now() - interval '1 day')
on conflict (id) do nothing;

-- =====================
-- ALLOCATIONS
-- =====================
insert into public.allocations (id, "assetId", "assetName", "assetTag", category, "employeeName", department, "allocatedAt", "dueDate", status, created_at) values
  ('al100000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'MacBook Pro 16"', 'ASSET-001', 'Laptop', 'Prakhar Kumar', 'Engineering', '2024-01-15', null, 'active', now() - interval '60 days'),
  ('al100000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000003', 'iPhone 15 Pro', 'ASSET-003', 'Mobile', 'Rohan Das', 'Design', '2024-01-22', '2024-12-31', 'active', now() - interval '50 days'),
  ('al100000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000008', 'LG 34" UltraWide Monitor', 'ASSET-008', 'Monitor', 'Aditi Joshi', 'Design', '2024-03-12', null, 'active', now() - interval '25 days')
on conflict (id) do nothing;

-- =====================
-- NOTIFICATIONS (optional demo data)
-- =====================
-- Note: notifications need a valid user_id from auth.users, so skipping for now

select 'Dummy data inserted successfully! 🎉' as status;
