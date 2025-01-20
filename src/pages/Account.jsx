import { useState, useEffect } from 'react';
import { getProfile, getCompany, getTenant, updateProfile, updateTenant, getCompanyByName, insertCompany } from '../components/supabaseClient';
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
    client_id: null,
    isu_username: null,
    isu_password: null,
    client_secret: null,
    refresh_token: null,
    base_url: null,
  });
  const [activeTab, setActiveTab] = useState('user');
  const [showisuPassword, setShowisuPassword] = useState(false);
  const [showClientSecret, setShowClientSecret] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      if (!session) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const { user } = session;

      const { data: user_data, error: user_error } = await getProfile(user.id);
      if (user_error) {
        console.warn(user_error);
        setLoading(false);
        return;
      }

      const { data: company_data, error: company_error } = await getCompany(user_data.company_id);
      if (company_error) {
        console.warn(company_error);
      }

      const { data: tenant_data, error: tenant_error } = await getTenant(user_data.company_id);
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
    fetchData();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function handleUpdateProfile(event, avatarUrl) {
    event.preventDefault();
    setLoading(true);
    const { user } = session;

    let companyId = company.company_id;
    if (company.company_name) {
      const { data: existingCompany, error: existingCompanyError } = await getCompanyByName(company.company_name);
      if (existingCompany) {
        companyId = existingCompany.company_id;
      } else {
        const { data: newCompany, error: newCompanyError } = await insertCompany({ company_name: company.company_name });
        if (newCompanyError && newCompanyError.code === '23505') { // Unique constraint violation
          const { data: existingCompanyAfterError } = await getCompanyByName(company.company_name);
          if (existingCompanyAfterError) {
            companyId = existingCompanyAfterError.company_id;
          } else {
            alert(newCompanyError.message);
            setLoading(false);
            return;
          }
        } else if (newCompany) {
          companyId = newCompany.company_id;
        } else {
          alert(newCompanyError.message);
          setLoading(false);
          return;
        }
      }
    }

    const updates = {
      ...profile,
      id: user.id,
      first_name: profile.first_name || user.user_metadata.full_name,
      last_name: profile.last_name || user.user_metadata.full_name,
      company_id: companyId,
      company_verified: false,
      avatar_url: avatarUrl || profile.avatar_url,
      updated_at: new Date(),
      created_at: profile.created_at || new Date(),
    };

    const { error } = await updateProfile(updates);

    if (error) {
      alert(error.message);
    } else {
      setProfile((prevProfile) => ({ ...prevProfile, avatar_url: avatarUrl }));
    }
    setLoading(false);
  }

  // async function handleUpdateCompany(event) {
  //   event.preventDefault();
  //   setLoading(true);

  //   const companyUpdates = {
  //     ...company,
  //     updated_at: new Date(),
  //   };

  //   const { error: companyError } = await updateCompany(companyUpdates);

  //   if (companyError) {
  //     alert(companyError.message);
  //   } else {
  //     setCompany((prevCompany) => ({ ...prevCompany, ...companyUpdates }));
  //   }

  //   setLoading(false);
  // }

  async function handleUpdateTenant(event) {
    event.preventDefault();
    setLoading(true);

    let companyId = company.company_id;
    if (company.company_name) {
      const { data: existingCompany, error: existingCompanyError } = await getCompanyByName(company.company_name);
      if (existingCompany) {
        companyId = existingCompany.company_id;
      } else {
        const { data: newCompany, error: newCompanyError } = await insertCompany({ company_name: company.company_name });
        if (newCompanyError && newCompanyError.code === '23505') { // Unique constraint violation
          const { data: existingCompanyAfterError } = await getCompanyByName(company.company_name);
          if (existingCompanyAfterError) {
            companyId = existingCompanyAfterError.company_id;
          } else {
            alert(newCompanyError.message);
            setLoading(false);
            return;
          }
        } else if (newCompany) {
          companyId = newCompany.company_id;
        } else {
          alert(newCompanyError.message);
          setLoading(false);
          return;
        }
      }
    }

    const tenantUpdates = {
      ...tenant,
      company_id: companyId,
      workday_tenant: tenant.workday_tenant ? await encrypt(tenant.workday_tenant) : null,
      client_id: tenant.client_id ? await encrypt(tenant.client_id) : null,
      isu_username: tenant.isu_username ? await encrypt(tenant.isu_username) : null,
      isu_password: tenant.isu_password ? await encrypt(tenant.isu_password) : null,
      client_secret: tenant.client_secret ? await encrypt(tenant.client_secret) : null,
      refresh_token: tenant.refresh_token ? await encrypt(tenant.refresh_token) : null,
      base_url: tenant.base_url ? await encrypt(tenant.base_url) : null,
    };

    const { error: tenantError } = await updateTenant(tenantUpdates);

    if (tenantError) {
      alert(tenantError.message);
    } else {
      setTenant((prevTenant) => ({ ...prevTenant, ...tenantUpdates }));
    }

    setLoading(false);
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [id]: value }));
  };

  const handleAvatarUpload = (url) => {
    setProfile((prevProfile) => ({ ...prevProfile, avatar_url: url }));
    handleUpdateProfile(new Event('submit'), url);
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
            <form className="form-container" onSubmit={activeTab === 'user' ? handleUpdateProfile : activeTab === 'company' ? handleUpdateTenant : () => {}}>
              {activeTab === 'user' && <UserTab session={session} profile={profile} company={company} loading={loading} handleChange={handleChange} setCompany={setCompany} updateProfile={handleUpdateProfile} />}
              {activeTab === 'company' && <CompanyTab profile={profile} company={company} tenant={tenant} loading={loading} setCompany={setCompany} setTenant={setTenant} showisuPassword={showisuPassword} setShowisuPassword={setShowisuPassword} showClientSecret={showClientSecret} setShowClientSecret={setShowClientSecret} />}
              {activeTab === 'avatar' && <AvatarTab profile={profile} handleAvatarUpload={handleAvatarUpload} />}
            </form>
        </>
      )}
    </main>
  );
}
