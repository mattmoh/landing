import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export default function Avatar({ profile, handleAvatarUpload, size = 150 }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (profile?.avatar_url) {
      const downloadImage = async (path) => {
        try {
          const { data, error } = await supabase.storage.from('avatars').download(path);
          if (error) throw error;
          const url = URL.createObjectURL(data);
          setAvatarUrl(url);
        } catch (error) {
          console.log('Error downloading image: ', error.message);
        }
      };
      downloadImage(profile.avatar_url);
    }
  }, [profile]);

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
      if (uploadError) throw uploadError;

      handleAvatarUpload(event, filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {avatarUrl ? (
        <img src={avatarUrl} alt="Avatar" className="avatar-image" style={{ height: size, width: size }} />
      ) : (
        <div className="avatar-no-image" style={{ height: size, width: size }} />
      )}
      <div style={{ width: size }}>
        <input
          style={{ visibility: 'hidden', position: 'absolute' }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
        <button onClick={() => document.getElementById('single').click()} disabled={uploading}>
          {uploading ? 'Uploading ...' : 'Upload'}
        </button>
      </div>
    </div>
  );
}