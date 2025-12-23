# AGENT_LOG.md

I used Grok and ChatGPT on this project mostly for debugging tricky stuff and getting UI ideas faster.

Biggest help was with Supabase auth in Next.js App Router. I kept hitting "Unauthorized" on edit/preview even after login. Grok helped me through different patterns like client listener, router.refresh(), server actions until we found the combo that really worked.

Also used it for the glassmorphic login page. I described the look I wanted (floating card, blurred background, purple accents) and refined the Tailwind code it gave me until it matched the vibe I had in mind.

Got help with drag-and-drop reordering (react-dnd setup and ref chaining) and fixing TypeScript errors when adding React Quill.

I never copied code blindly... always read it, tweaked it, and made sure I understood what it was doing. AI saved me hours on research and trial-error, but I did the thinking and final decisions.

Learned a bunch about Next.js session sync with Supabase and it was definitely more complicated than I expected at first but it was a great experience.