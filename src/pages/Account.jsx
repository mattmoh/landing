import { useState, useEffect } from 'react';
import { supabase } from '../components/supabaseClient';
import Auth from '../components/Auth';
import Submenu from '../components/Submenu';
import UserTab from '../components/UserTab';
import CompanyTab from '../components/CompanyTab';
import AvatarTab from '../components/AvatarTab';
import '../components/Submenu.css';

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    email: null,
    first_name: null,
    last_name: null,
    company_id: null,
    company_verified: null,
    avatar_url: null,
  });
  const [company, setCompany] = useState({
    company_id: null,
    company_name: null,
  });
  const [tenant, setTenant] = useState({
    workday_tenant: null,
    prism_client_id: null,
    ISU_username: null,
    ISU_password: null,
    prism_client_secret: null,
    prism_refresh_token: null,
    base_url: null,
  });
  const [activeTab, setActiveTab] = useState('user');
  const [showISUPassword, setShowISUPassword] = useState(false);
  const [showClientSecret, setShowClientSecret] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      if (!session) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const { user } = session;

      const { data: user_data, error } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('id', user.id)
        .single();

      if (error) {
        console.warn(error);
        setLoading(false);
        return;
      }

      const { data: company_data, error: company_error } = await supabase
        .from('companies')
        .select('company_name')
        .eq('company_id', user_data.company_id)
        .single();

      if (company_error) {
        console.warn(company_error);
      }

      const { data: tenant_data, error: tenant_error } = await supabase
        .from('credentials')
        .select('*')
        .eq('company_id', user_data.company_id)
        .single();

      if (tenant_error) {
        console.warn(tenant_error);
      }

      if (!ignore) {
        setProfile(user_data);
        setCompany(company_data);
        setTenant(tenant_data);
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();
    setLoading(true);
    const { user } = session;

    const updates = {
      ...profile,
      id: user.id,
      first_name: profile.first_name || user.user_metadata.full_name,
      last_name: profile.last_name || user.user_metadata.full_name,
      company_verified: profile.company_verified || false,
      avatar_url: avatarUrl || profile.avatar_url,
      updated_at: new Date(),
      created_at: profile.created_at || new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setProfile((prevProfile) => ({ ...prevProfile, avatar_url: avatarUrl }));
    }
    setLoading(false);
  }

  async function updateCompany(event) {
    event.preventDefault();
    setLoading(true);

    const updates = {
      ...company,
      Updated_at: new Date(),
    };

    const { error } = await supabase.from('companies').upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setCompany((prevCompany) => ({ ...prevCompany, ...updates }));
    }

    setLoading(false);
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [id]: value }));
  };

  const handleAvatarUpload = (url) => {
    setProfile((prevProfile) => ({ ...prevProfile, avatar_url: url }));
    updateProfile(new Event('submit'), url);
  };

  return (
    <main className='signup'>
      {session && (
        <Submenu setActiveTab={setActiveTab} />
      )}
      {!session ? (
        <Auth />
      ) : (
        <>
            <form className="form-container" onSubmit={activeTab === 'user' ? updateProfile : updateCompany}>
              {activeTab === 'user' && <UserTab session={session} profile={profile} company={company} loading={loading} handleChange={handleChange} setCompany={setCompany} updateProfile={updateProfile} />}
              {activeTab === 'company' && <CompanyTab profile={profile} company={company} tenant={tenant} loading={loading} setCompany={setCompany} setTenant={setTenant} showISUPassword={showISUPassword} setShowISUPassword={setShowISUPassword} showClientSecret={showClientSecret} setShowClientSecret={setShowClientSecret} />}
              {activeTab === 'avatar' && <AvatarTab profile={profile} handleAvatarUpload={handleAvatarUpload} />}
            </form>
        </>
      )}
    </main>
  );
}
