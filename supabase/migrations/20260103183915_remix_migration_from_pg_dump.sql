CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
BEGIN;

--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'super_admin',
    'district_admin',
    'booth_admin',
    'volunteer'
);


--
-- Name: gender_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.gender_type AS ENUM (
    'male',
    'female',
    'other'
);


--
-- Name: support_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.support_status AS ENUM (
    'supporter',
    'neutral',
    'opponent',
    'postal_voter',
    'dead',
    'deleted'
);


--
-- Name: ticket_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.ticket_status AS ENUM (
    'open',
    'in_progress',
    'closed'
);


--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name', NEW.email);
  
  -- Assign default volunteer role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'volunteer');
  
  RETURN NEW;
END;
$$;


--
-- Name: has_role(uuid, public.app_role); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;


--
-- Name: is_admin(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.is_admin(_user_id uuid) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('super_admin', 'district_admin', 'booth_admin')
  )
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: booth_assignments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.booth_assignments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    volunteer_id uuid NOT NULL,
    booth_id uuid NOT NULL,
    assigned_at timestamp with time zone DEFAULT now()
);


--
-- Name: booths; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.booths (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    booth_number text NOT NULL,
    booth_type text,
    booth_domain text,
    booth_index numeric(10,2),
    district_id uuid,
    latitude numeric(10,8),
    longitude numeric(11,8),
    total_voters integer DEFAULT 0,
    total_doors integer DEFAULT 0,
    total_pages integer DEFAULT 0,
    bjp_members integer DEFAULT 0,
    bjp_supporters integer DEFAULT 0,
    doors_covered integer DEFAULT 0,
    pages_covered integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: districts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.districts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    name_tamil text,
    code text,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: doors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.doors (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    door_number text NOT NULL,
    page_id uuid,
    is_covered boolean DEFAULT false,
    covered_at timestamp with time zone,
    notes text,
    assigned_volunteer_id uuid,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: feedback; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.feedback (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    category text NOT NULL,
    subject text NOT NULL,
    description text,
    attachment_url text,
    status public.ticket_status DEFAULT 'open'::public.ticket_status,
    admin_response text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: pages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    page_number integer NOT NULL,
    street_id uuid,
    total_doors integer DEFAULT 0,
    doors_covered integer DEFAULT 0,
    assigned_volunteer_id uuid,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    full_name text,
    phone text,
    email text,
    avatar_url text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: streets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.streets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    name_tamil text,
    booth_id uuid,
    total_pages integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role DEFAULT 'volunteer'::public.app_role NOT NULL
);


--
-- Name: voters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.voters (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    voter_id text,
    name text NOT NULL,
    name_tamil text,
    father_name text,
    father_name_tamil text,
    age integer,
    gender public.gender_type,
    address text,
    phone text,
    photo_url text,
    door_id uuid,
    booth_id uuid,
    page_number integer,
    door_number text,
    support_status public.support_status DEFAULT 'neutral'::public.support_status,
    religion text,
    community text,
    is_member boolean DEFAULT false,
    is_family_member boolean DEFAULT false,
    care_taker_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: booth_assignments booth_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.booth_assignments
    ADD CONSTRAINT booth_assignments_pkey PRIMARY KEY (id);


--
-- Name: booth_assignments booth_assignments_volunteer_id_booth_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.booth_assignments
    ADD CONSTRAINT booth_assignments_volunteer_id_booth_id_key UNIQUE (volunteer_id, booth_id);


--
-- Name: booths booths_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.booths
    ADD CONSTRAINT booths_pkey PRIMARY KEY (id);


--
-- Name: districts districts_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.districts
    ADD CONSTRAINT districts_code_key UNIQUE (code);


--
-- Name: districts districts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.districts
    ADD CONSTRAINT districts_pkey PRIMARY KEY (id);


--
-- Name: doors doors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doors
    ADD CONSTRAINT doors_pkey PRIMARY KEY (id);


--
-- Name: feedback feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (id);


--
-- Name: pages pages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: streets streets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.streets
    ADD CONSTRAINT streets_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: voters voters_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.voters
    ADD CONSTRAINT voters_pkey PRIMARY KEY (id);


--
-- Name: voters voters_voter_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.voters
    ADD CONSTRAINT voters_voter_id_key UNIQUE (voter_id);


--
-- Name: booths update_booths_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_booths_updated_at BEFORE UPDATE ON public.booths FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: feedback update_feedback_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_feedback_updated_at BEFORE UPDATE ON public.feedback FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: profiles update_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: voters update_voters_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_voters_updated_at BEFORE UPDATE ON public.voters FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: booth_assignments booth_assignments_booth_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.booth_assignments
    ADD CONSTRAINT booth_assignments_booth_id_fkey FOREIGN KEY (booth_id) REFERENCES public.booths(id) ON DELETE CASCADE;


--
-- Name: booth_assignments booth_assignments_volunteer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.booth_assignments
    ADD CONSTRAINT booth_assignments_volunteer_id_fkey FOREIGN KEY (volunteer_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: booths booths_district_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.booths
    ADD CONSTRAINT booths_district_id_fkey FOREIGN KEY (district_id) REFERENCES public.districts(id) ON DELETE CASCADE;


--
-- Name: doors doors_assigned_volunteer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doors
    ADD CONSTRAINT doors_assigned_volunteer_id_fkey FOREIGN KEY (assigned_volunteer_id) REFERENCES auth.users(id);


--
-- Name: doors doors_page_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doors
    ADD CONSTRAINT doors_page_id_fkey FOREIGN KEY (page_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: feedback feedback_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: pages pages_assigned_volunteer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_assigned_volunteer_id_fkey FOREIGN KEY (assigned_volunteer_id) REFERENCES auth.users(id);


--
-- Name: pages pages_street_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_street_id_fkey FOREIGN KEY (street_id) REFERENCES public.streets(id) ON DELETE CASCADE;


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: streets streets_booth_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.streets
    ADD CONSTRAINT streets_booth_id_fkey FOREIGN KEY (booth_id) REFERENCES public.booths(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: voters voters_booth_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.voters
    ADD CONSTRAINT voters_booth_id_fkey FOREIGN KEY (booth_id) REFERENCES public.booths(id) ON DELETE CASCADE;


--
-- Name: voters voters_care_taker_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.voters
    ADD CONSTRAINT voters_care_taker_id_fkey FOREIGN KEY (care_taker_id) REFERENCES auth.users(id);


--
-- Name: voters voters_door_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.voters
    ADD CONSTRAINT voters_door_id_fkey FOREIGN KEY (door_id) REFERENCES public.doors(id) ON DELETE SET NULL;


--
-- Name: booth_assignments Admins can manage assignments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage assignments" ON public.booth_assignments TO authenticated USING (public.is_admin(auth.uid()));


--
-- Name: booths Admins can manage booths; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage booths" ON public.booths TO authenticated USING (public.is_admin(auth.uid()));


--
-- Name: districts Admins can manage districts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage districts" ON public.districts TO authenticated USING (public.is_admin(auth.uid()));


--
-- Name: doors Admins can manage doors; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage doors" ON public.doors TO authenticated USING (public.is_admin(auth.uid()));


--
-- Name: pages Admins can manage pages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage pages" ON public.pages TO authenticated USING (public.is_admin(auth.uid()));


--
-- Name: streets Admins can manage streets; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage streets" ON public.streets TO authenticated USING (public.is_admin(auth.uid()));


--
-- Name: voters Admins can manage voters; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage voters" ON public.voters TO authenticated USING (public.is_admin(auth.uid()));


--
-- Name: profiles Admins can view all profiles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));


--
-- Name: districts Anyone can view districts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view districts" ON public.districts FOR SELECT TO authenticated USING (true);


--
-- Name: doors Authenticated users can update door coverage; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can update door coverage" ON public.doors FOR UPDATE TO authenticated USING (true);


--
-- Name: voters Authenticated users can update voters; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can update voters" ON public.voters FOR UPDATE TO authenticated USING (true);


--
-- Name: booths Authenticated users can view booths; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view booths" ON public.booths FOR SELECT TO authenticated USING (true);


--
-- Name: doors Authenticated users can view doors; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view doors" ON public.doors FOR SELECT TO authenticated USING (true);


--
-- Name: pages Authenticated users can view pages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view pages" ON public.pages FOR SELECT TO authenticated USING (true);


--
-- Name: streets Authenticated users can view streets; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view streets" ON public.streets FOR SELECT TO authenticated USING (true);


--
-- Name: voters Authenticated users can view voters; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view voters" ON public.voters FOR SELECT TO authenticated USING (true);


--
-- Name: user_roles Super admins can manage all roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Super admins can manage all roles" ON public.user_roles TO authenticated USING (public.has_role(auth.uid(), 'super_admin'::public.app_role));


--
-- Name: feedback Users can create feedback; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create feedback" ON public.feedback FOR INSERT TO authenticated WITH CHECK ((user_id = auth.uid()));


--
-- Name: profiles Users can insert their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK ((auth.uid() = id));


--
-- Name: feedback Users can update their own feedback; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own feedback" ON public.feedback FOR UPDATE TO authenticated USING (((user_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: profiles Users can update their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING ((auth.uid() = id));


--
-- Name: booth_assignments Users can view assignments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view assignments" ON public.booth_assignments FOR SELECT TO authenticated USING (true);


--
-- Name: feedback Users can view their own feedback; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own feedback" ON public.feedback FOR SELECT TO authenticated USING (((user_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: profiles Users can view their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT TO authenticated USING ((auth.uid() = id));


--
-- Name: user_roles Users can view their own roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING ((user_id = auth.uid()));


--
-- Name: booth_assignments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.booth_assignments ENABLE ROW LEVEL SECURITY;

--
-- Name: booths; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.booths ENABLE ROW LEVEL SECURITY;

--
-- Name: districts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;

--
-- Name: doors; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.doors ENABLE ROW LEVEL SECURITY;

--
-- Name: feedback; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

--
-- Name: pages; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: streets; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.streets ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- Name: voters; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.voters ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--




COMMIT;