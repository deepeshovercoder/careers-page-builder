export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { createSupabaseServer } from '@/lib/supabaseServer';
import CareersPage from '@/components/CareersPage';
import { Company, Job } from '@/types';

interface Props {
  params: { slug: string };
}

/* ---------- SEO Metadata ---------- */
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const supabase = createSupabaseServer();

  const { data: company } = await supabase
    .from('companies')
    .select('name')
    .eq('slug', params.slug)
    .single();

  return {
    title: company ? `Careers at ${company.name}` : 'Careers',
    description: 'Explore open roles and join our team',
    openGraph: {
      title: company ? `Careers at ${company.name}` : 'Careers',
      description: 'Join our team',
    },
  };
}

/* ---------- Public Careers Page ---------- */
export default async function Careers({ params }: Props) {
  const supabase = createSupabaseServer();

  const { data: company } = await supabase
    .from('companies')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!company) {
    return <div>Company not found</div>;
  }

  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('company_id', company.id);

  const structuredData = jobs?.map((job) => ({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.posted_at,
    employmentType: job.job_type,
    hiringOrganization: {
      '@type': 'Organization',
      name: company.name,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
      },
    },
  }));

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      <CareersPage
        company={company as Company}
        jobs={jobs as Job[]}
      />
    </>
  );
}
