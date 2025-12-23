# Tech Spec

## Stack Choices

- Next.js 14 App Router - good for server components and SEO on public page
- Supabase - auth, Postgres database, storage for images. Free tier is plenty for this
- Tailwind CSS - fast styling, responsive utilities
- React DnD - for drag-to-reorder sections
- React Quill - rich text editing in sections
- Fuse.js - client-side fuzzy search for jobs

## Architecture

- Client-side auth with Supabase
- Server components for public/preview pages to fetch company and jobs
- Client components for editor (needs state and drag-drop)
- Data stored per company in Supabase Postgres
- Ownership check on edit/preview routes (server-side)

## Database Schema

**companies**
- id (uuid pk)
- slug (text unique)
- name (text)
- user_id (uuid → auth.users)
- theme (jsonb) — primaryColor, secondaryColor, logoUrl, bannerUrl, videoUrl
- sections (jsonb array) — id, title, content (HTML from Quill), order

**jobs**
- id (uuid pk)
- company_id (uuid fk → companies.id)
- title, department, location, job_type, description, posted_at
- Extra from sample sheet: work_policy, employment_type, experience_level, salary_range, posted_days_ago (text)

Used JSONB for theme and sections — easy to extend without schema changes.

## Assumptions

- One company per user (keeps ownership simple)
- Jobs imported once from sample sheet for demo
- No job application flow needed
- Public page is fully public (no auth)

## Test Plan

Tested manually:
- Full flow from login to create company to edit to preview to public
- Section add/reorder/remove/save
- Image upload (logo/banner)
- Job search and filters
- Mobile view in Chrome dev tools
- Edge cases: no jobs, no sections, invalid slug

All worked as expected.