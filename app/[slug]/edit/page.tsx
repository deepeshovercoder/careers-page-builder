import { createSupabaseServer } from '@/lib/supabaseServer';
import Editor from '@/components/Editor';
import { Company } from '@/types';

interface Props {
  params: { slug: string };
}

export default async function EditPage({ params }: Props) {
  const supabase = createSupabaseServer();

  const { data: company } = await supabase
    .from('companies')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!company) return <div>Company not found</div>;

  // Server-side auth check with debug
 const {
  data: { session },
} = await supabase.auth.getSession();

const user = session?.user;

  
  // DEBUG
  console.log('DEBUG Edit - User ID:', user?.id);
  console.log('DEBUG Edit - Company user_id:', company.user_id);
  
  if (!user) return <div>❌ No user session found</div>;
  if (company.user_id !== user.id) return <div>❌ Unauthorized: {company.user_id} !== {user.id}</div>;

return <Editor company={company as Company} />;
}