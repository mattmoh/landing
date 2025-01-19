import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function encrypt(text) {
  const response = await fetch('/functions/v1/encrypt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  const { encryptedText } = await response.json();
  return encryptedText;
}

async function decrypt(encryptedText) {
  const response = await fetch('/functions/v1/decrypt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ encryptedText }),
  });
  const { decryptedText } = await response.json();
  return decryptedText;
}

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const getCompany = async (companyId) => {
  const { data, error } = await supabase
    .from('companies')
    .select('company_name')
    .eq('company_id', companyId)
    .single();
  return { data, error };
};

export const getCompanyByName = async (companyName) => {
  const { data, error } = await supabase
    .from('companies')
    .select('company_id')
    .eq('company_name', companyName)
    .single();
  return { data, error };
};

export const insertCompany = async (company) => {
  const { data, error } = await supabase
    .from('companies')
    .insert(company)
    .single();
  return { data, error };
};

const isValidHashedString = (str) => {
  try {
    return true;
  } catch (e) {
    return false;
  }
};

export const getTenant = async (companyId) => {
  const { data, error } = await supabase
    .from('credentials')
    .select('*')
    .eq('company_id', companyId)
    .single();
  if (data) {
    try {
      data.workday_tenant = data.workday_tenant ? await decrypt(data.workday_tenant) : null;
      data.client_id = data.client_id ? await decrypt(data.client_id) : null;
      data.isu_username = data.isu_username ? await decrypt(data.isu_username) : null;
      data.isu_password = data.isu_password ? await decrypt(data.isu_password) : null;
      data.client_secret = data.client_secret ? await decrypt(data.client_secret) : null;
      data.refresh_token = data.refresh_token ? await decrypt(data.refresh_token) : null;
      data.base_url = data.base_url ? await decrypt(data.base_url) : null;
    } catch (e) {
      console.error('Decryption error:', e);
    }
  }
  return { data, error };
};

export const updateProfile = async (profile) => {
  const { error } = await supabase.from('profiles').upsert(profile);
  return { error };
};

export const updateTenant = async (tenant) => {
  const tenantUpdates = {
    ...tenant,
    workday_tenant: tenant.workday_tenant ? await encrypt(tenant.workday_tenant) : null,
    client_id: tenant.client_id ? await encrypt(tenant.client_id) : null,
    isu_username: tenant.isu_username ? await encrypt(tenant.isu_username) : null,
    isu_password: tenant.isu_password ? await encrypt(tenant.isu_password) : null,
    client_secret: tenant.client_secret ? await encrypt(tenant.client_secret) : null,
    refresh_token: tenant.refresh_token ? await encrypt(tenant.refresh_token) : null,
    base_url: tenant.base_url ? await encrypt(tenant.base_url) : null,
  };

  const { error } = await supabase.from('credentials').upsert(tenantUpdates);
  return { error };
};

export const fetchBlogPost = async (postId) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('post_id', postId);
  return { data, error };
};

export const fetchBlogPosts = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('post_id, post_title, post_tags, created_at')
    .gt('post_id', 1);
  return { data, error };
};

export const signInWithOtp = async (email) => {
  const { error } = await supabase.auth.signInWithOtp({ email });
  return { error };
};

export { supabase };