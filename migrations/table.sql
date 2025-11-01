-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.applications (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  job_id bigint NOT NULL,
  candidate_id uuid NOT NULL,
  application_date timestamp with time zone DEFAULT now(),
  status text DEFAULT 'INITIAL_SCREENING'::text,
  matching_percentage numeric,
  CONSTRAINT applications_pkey PRIMARY KEY (id),
  CONSTRAINT applications_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidates(id),
  CONSTRAINT applications_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id)
);

CREATE TABLE public.candidates (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  full_name text,
  phone text,
  location text,
  skills jsonb,
  work_experience jsonb,
  education jsonb,
  projects jsonb,
  summary text,
  interests ARRAY,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT candidates_pkey PRIMARY KEY (id)
);
CREATE TABLE public.companies (
  id uuid NOT NULL,
  company_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  gst_number text,
  website text,
  company_size text,
  industry text,
  description text,
  logo_url text,
  address text,
  city text,
  state text,
  country text,
  postal_code text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT companies_pkey PRIMARY KEY (id),
  CONSTRAINT companies_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.jobs (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  company_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  requirements jsonb,
  location text,
  status text DEFAULT 'active'::text,
  current_stage text DEFAULT ''::text,
  decided_stages ARRAY,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  salary_min numeric,
  salary_max numeric,
  job_type text,
  currency text,
  industry text,
  keywords ARRAY,
  CONSTRAINT jobs_pkey PRIMARY KEY (id),
  CONSTRAINT jobs_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id)
);

ALTER TABLE public.jobs 
ADD COLUMN required_submission TEXT[] DEFAULT NULL,
ADD COLUMN assignment_description TEXT DEFAULT NULL,
ADD COLUMN time_limit DATE DEFAULT NULL;