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

export default function UserTab({ session, profile, company, loading, handleChange, setCompany, updateProfile }) {
  return (
    <>
      <InputField
        id="email"
        label="Email"
        value={session.user.email}
        disabled
      />
      <InputField
        id="first_name"
        label="First Name"
        value={profile.first_name}
        onChange={handleChange}
      />
      <InputField
        id="last_name"
        label="Last Name"
        value={profile.last_name}
        onChange={handleChange}
      />
      <InputField
        id="company_name"
        label="Company Name"
        value={company.company_name}
        onChange={(e) => setCompany({ ...company, company_name: e.target.value })}
      />
      <InputField
        id="updated_at"
        label="Last Updated"
        value={new Date(profile.updated_at).toLocaleString('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}
        disabled
      />
      <div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
    </>
  );
}
