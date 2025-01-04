import React from 'react';
import { FiEye, FiEyeOff } from "react-icons/fi";

const InputField = ({ id, label, type = "text", value, onChange, disabled = false, showPassword, toggleShowPassword }) => (
  <div style={{ position: 'relative' }}>
    <div className='input-group'>
      <input
        id={id}
        type={showPassword !== undefined ? (showPassword ? 'text' : 'password') : type}
        value={value || ''}
        onChange={onChange}
        disabled={disabled}
        style={{ paddingRight: '2rem' }}
      />
      {toggleShowPassword && (
        <span className='input-group-icon'
          onClick={toggleShowPassword}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-100%)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      )}
    </div>
    <label htmlFor={id}>{label}</label>
  </div>
);

export default function CompanyTab({ profile, company, tenant, loading, setCompany, setTenant, showISUPassword, setShowISUPassword, showClientSecret, setShowClientSecret }) {
  return (
    <>
      <InputField
        id="company_name"
        label="Company Name"
        value={company.company_name}
        onChange={(e) => setCompany({ ...company, company_name: e.target.value })}
        disabled
      />
      <InputField
        id="company_verified"
        label="Verified"
        value={profile.company_verified ? 'Verified' : 'Not Verified'}
        disabled
      />
      {profile.company_verified && (
        <>
          <InputField
            id="workday_tenant"
            label="Workday Tenant"
            value={tenant.workday_tenant}
            onChange={(e) => setTenant({ ...tenant, workday_tenant: e.target.value })}
          />
          <InputField
            id="base_url"
            label="Base URL"
            value={tenant.base_url}
            onChange={(e) => setTenant({ ...tenant, base_url: e.target.value })}
          />
          <InputField
            id="isu_username"
            label="ISU Username"
            value={tenant.isu_username}
            onChange={(e) => setTenant({ ...tenant, isu_username: e.target.value })}
          />
          <InputField
            id="isu_password"
            label="ISU Password"
            value={tenant.isu_password}
            onChange={(e) => setTenant({ ...tenant, isu_password: e.target.value })}
            showPassword={showISUPassword}
            toggleShowPassword={() => setShowISUPassword(!showISUPassword)}
          />
          <InputField
            id="client_id"
            label="Client ID"
            value={tenant.client_id}
            onChange={(e) => setTenant({ ...tenant, client_id: e.target.value })}
          />
          <InputField
            id="client_secret"
            label="Client Secret"
            value={tenant.client_secret}
            onChange={(e) => setTenant({ ...tenant, client_secret: e.target.value })}
            showPassword={showClientSecret}
            toggleShowPassword={() => setShowClientSecret(!showClientSecret)}
          />
          <InputField
            id="refresh_token"
            label="Refresh Token"
            value={tenant.refresh_token}
            onChange={(e) => setTenant({ ...tenant, refresh_token: e.target.value })}
          />
          <div>
            <button
              type="submit"
              disabled={loading || !profile.company_verified}
              className={loading || !profile.company_verified ? 'no-hover' : ''}
              >
              {loading ? 'Loading ...' : 'Update'}
            </button>
          </div>
        </>
      )}
    </>
  );
}
