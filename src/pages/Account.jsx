import { useState, useEffect } from 'react';
import { supabase } from '../components/supabaseClient';
import Avatar from '../components/Avatar';
import Auth from '../components/Auth';
import '../pages/Signup.css';

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    email: null,
    first_name: null,
    last_name: null,
    company_id: null,
    avatar_url: null,
  });
  const [company, setCompany] = useState({
    company_id: null,
    company_name: null,
    workday_tenant: null,
    prism_client_id: null,
    ISU_username: null,
    ISU_password: null,
    prism_client_secret: null,
    prism_refresh_token: null,
    workday_base_url: null,
  });
  const [activeTab, setActiveTab] = useState('user');

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
        .limit(1)
        .single();

      if (user_data) {
        const { data: company_data, error: company_error } = await supabase
          .from('companies')
          .select('company_name')
          .eq('company_id', user_data.company_id)
          .single();

        if (company_error) {
          console.warn(company_error);
        } else {
          setCompany(company_data);
        }
      }

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (user_data) {
          console.log(`Company ID: ${user_data.company_id}`);
          setProfile(user_data);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session, profile.company_id]);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      ...profile,
      id: user.id,
      avatar_url: avatarUrl || profile.avatar_url,
      Updated_at: new Date(),
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

  const renderUserTab = () => (
    <>
      <div>
        <input type="text" value={session.user.email} disabled />
        <label>Email</label>
      </div>
      <div>
        <input
          id="first_name"
          type="text"
          value={profile.first_name || ''}
          onChange={handleChange}
        />
        <label htmlFor="first_name">First Name</label>
      </div>
      <div>
        <input
          id="last_name"
          type="text"
          value={profile.last_name || ''}
          onChange={handleChange}
        />
        <label htmlFor="last_name">Last Name</label>
      </div>
      <div>
        <input
          id="Updated_at"
          type="text"
          value={new Date(profile.Updated_at).toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
          disabled
        />
        <label htmlFor="Updated_at">Last Updated</label>
      </div>
      <div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
    </>
  );

  const renderCompanyTab = () => (
    <>
      <div>
        <input
            id="company_name"
            type="text"
            value={company.company_name || ''}
            onChange={(e) => setCompany({ ...company, company_name: e.target.value })}
            disabled
          />
        <label htmlFor="company_name">Company Name</label>
      </div>
      <div>
        <input
          type="text"
          value={company.workday_tenant || ''}
          onChange={(e) => setCompany({ ...company, workday_tenant: e.target.value })}
        />
        <label>Workday Tenant</label>
      </div>
      <div>
        <input
          type="text"
          value={company.prism_client_id || ''}
          onChange={(e) => setCompany({ ...company, prism_client_id: e.target.value })}
        />
        <label>Client ID</label>
      </div>
      <div>
        <input
          type="text"
          value={company.ISU_username || ''}
          onChange={(e) => setCompany({ ...company, ISU_username: e.target.value })}
        />
        <label>ISU Username</label>
      </div>
      <div>
        <input
          type="password"
          value={company.ISU_password || ''}
          onChange={(e) => setCompany({ ...company, ISU_password: e.target.value })}
        />
        <label>ISU Password</label>
      </div>
      <div>
        <input
          type="text"
          value={company.workday_base_url || ''}
          onChange={(e) => setCompany({ ...company, workday_base_url: e.target.value })}
        />
        <label>Base URL</label>
      </div>
      <div>
        <input
          type="password"
          value={company.prism_client_secret || ''}
          onChange={(e) => setCompany({ ...company, prism_client_secret: e.target.value })}
        />
        <label>Client Secret</label>
      </div>
      <div>
        <input
          type="text"
          value={company.prism_refresh_token || ''}
          onChange={(e) => setCompany({ ...company, prism_refresh_token: e.target.value })}
        />
        <label>Refresh Token</label>
      </div>
      <div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
    </>
  );

  const renderAvatarTab = () => (
    <>
      <Avatar
        className='signup'
        url={profile.avatar_url}
        size={150}
        onUpload={handleAvatarUpload}
      />
    </>
  );

  return (
    <main className='signup'>
      {session && (
        <div className="signout">
          <button className="signout" type="button" onClick={() => supabase.auth.signOut()}>
            Sign Out
          </button>
        </div>
      )}
      {!session ? (
        <Auth />
      ) : (
        <>
          <div className="tabs">
            <a onClick={() => setActiveTab('user')}>User</a>
            <a onClick={() => setActiveTab('company')}>Company</a>
            <a onClick={() => setActiveTab('avatar')}>Avatar</a>
          </div>
          {activeTab === 'avatar' && renderAvatarTab()}
          <form onSubmit={activeTab === 'user' ? updateProfile : updateCompany}>
            {activeTab === 'user' && renderUserTab()}
            {activeTab === 'company' && renderCompanyTab()}
          </form>
        </>
      )}
    </main>
  );
}
