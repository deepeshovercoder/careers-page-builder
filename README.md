# Careers Page Builder

This is my take on the Careers Page Builder assignment. It's a tool that lets recruiters 
1. log in, 
2. create a company, 
3. and build a branded careers page with custom colors, logo, banner, video, and content sections. Candidates can then visit the public page to see the company story and browse open jobs with search and filters.

I used the sample job data from the Google Sheet then imported it into Supabase so the public page has real listings with locations, salaries, remote tags, etc.

## Live Demo

https://your-netlify-site.netlify.app (replace with your actual Netlify URL once deployed)

## How to Run Locally

1. Clone the repo
   git clone https://github.com/deepeshovercoder/careers-page-builder.git
   cd careers-page-builder

2. Install dependencies
   npm install

3. Create a .env.local file in the root with your Supabase keys:
   NEXT_PUBLIC_SUPABASE_URL=https://dmhggbbunqibcmngdeuf.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtaGdnYmJ1bnFpYmNtbmdkZXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzOTg2ODcsImV4cCI6MjA4MTk3NDY4N30.qYX5Y5L8BILoDRfl-f55TyD5lEQf-TIzQeQPNTF4XIE

4. Start the dev server
   npm run dev

5. Open http://localhost:3000

## What I Built:

- Login/signup with Supabase Auth (password-based)
- Dashboard to create company and access edit/preview/public links
- Edit page: change primary color, upload logo/banner, add culture video URL, add/reorder/remove rich text sections with        drag-and-drop
- Preview mode to see exactly what candidates will see
- Public careers page with branded banner overlay, content sections, and real job listings
- Job cards show title, department, location, type, salary, experience, remote tag, posted time
- Search by title + filters for location and job type
- Fully responsive — looks good on mobile

## Things I'd Improve Next

- Let recruiters add/edit jobs directly in the app instead of manual import
- Support multiple companies per user
- More section types (image gallery, team photos, testimonials)
- Analytics on page views
- Dark mode option
- Better error handling and loading states

## Quick User Guide

1. Go to /login - sign up with any email and password (Supabase creates the account)
2. On dashboard, create your company (name auto-generates slug)
3. Click "Edit Page" - customize colors, upload logo/banner, add sections (use the rich text editor for bold, bullets, links)
4. Drag sections to reorder, click Save
5. Click "Preview" to see the candidate view
6. Share the "Public Link" — anyone can visit it, see branding, read sections, and browse/filter jobs

I had a lot of fun building this — especially getting the glassmorphic login and the branded banner overlay to look nice. Hope you like it!