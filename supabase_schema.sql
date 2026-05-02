-- Drop existing tables to ensure a clean slate if re-running
DROP TABLE IF EXISTS booked_dates CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;

-- Create Bookings Table
CREATE TABLE bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  total_price integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  guests integer NOT NULL DEFAULT 2,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Booked Dates Table (Concurrency Safety Magic)
-- The `date` column is the primary key. This physically prevents two bookings 
-- from ever claiming the same exact date at the database engine level.
CREATE TABLE booked_dates (
  date date PRIMARY KEY,
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE
);

-- Enable RLS (Row Level Security) but allow anonymous inserts and reads for now
-- Depending on your exact security needs, you might restrict inserts.
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booked_dates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous read booked_dates" ON booked_dates FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert booked_dates" ON booked_dates FOR INSERT WITH CHECK (true);

-- Create the RPC function for Atomic Booking Transaction
CREATE OR REPLACE FUNCTION create_booking(
  p_name text,
  p_phone text,
  p_start_date date,
  p_end_date date,
  p_guests integer,
  p_total_price integer
) RETURNS uuid AS $$
DECLARE
  v_booking_id uuid;
  v_current_date date;
BEGIN
  -- 1. Insert the main booking record first
  INSERT INTO bookings (name, phone, start_date, end_date, guests, total_price)
  VALUES (p_name, p_phone, p_start_date, p_end_date, p_guests, p_total_price)
  RETURNING id INTO v_booking_id;

  -- 2. Expand the date range and insert each day into booked_dates
  -- Note: We do NOT book the `p_end_date` (checkout day) so that someone else 
  -- can check in on that same day.
  v_current_date := p_start_date;
  WHILE v_current_date < p_end_date LOOP
    -- Attempt to insert the specific date. 
    -- If this fails due to the PRIMARY KEY constraint on `booked_dates`,
    -- PostgreSQL will automatically throw an error and ROLLBACK this entire transaction.
    INSERT INTO booked_dates (date, booking_id)
    VALUES (v_current_date, v_booking_id);
    
    v_current_date := v_current_date + interval '1 day';
  END LOOP;

  -- If we get here, no conflicts occurred.
  RETURN v_booking_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
