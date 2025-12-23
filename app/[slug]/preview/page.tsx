import { createSupabaseServer } from '@/lib/supabaseServer';
import CareersPage from '@/components/CareersPage';
import { Company, Job } from '@/types';

interface Props {
  params: { slug: string };
}

export default async function PreviewPage({ params }: Props) {
  const supabase = createSupabaseServer();

  const { data: company } = await supabase
    .from('companies')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!company) return <div>Company not found</div>;

  // Server-side auth check
  const {
  data: { session },
} = await supabase.auth.getSession();

const user = session?.user;

  if (company.user_id !== user?.id) return <div>Unauthorized</div>;

  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('company_id', company.id);

  return <CareersPage company={company as Company} jobs={jobs as Job[]} isPreview={true} />;
}