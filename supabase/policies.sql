-- ENABLE RLS
alter table profiles enable row level security;
alter table bookings enable row level security;
alter table reviews enable row level security;
alter table messages enable row level security;

-- PROFILES
create policy "Users can view their profile"
on profiles for select
using (auth.uid() = id);

create policy "Users can update their profile"
on profiles for update
using (auth.uid() = id);

-- BOOKINGS
create policy "Customers see own bookings"
on bookings for select
using (auth.uid() = customer_id);

create policy "Pros see assigned bookings"
on bookings for select
using (auth.uid() = pro_id);

-- INSERT booking (customer)
create policy "Customer creates booking"
on bookings for insert
with check (auth.uid() = customer_id);

-- REVIEWS
create policy "Customer creates review"
on reviews for insert
with check (auth.uid() = customer_id);

-- MESSAGES
create policy "Chat participants access messages"
on messages for select
using (
  auth.uid() = sender_id
);
