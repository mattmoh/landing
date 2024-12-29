import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function Avatar({ url, size, onUpload }) {
  const [uploading, setUploading] = useState(false);

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

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl }, error: urlError } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      if (urlError) {
        throw urlError;
      }

      onUpload(publicUrl);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {url ? (
        <img
          src={url}
          alt="Avatar"
          className="avatar image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className="avatar no-image" style={{ height: size, width: size }} />
      )}
      <div style={{ width: size }}>
        <button htmlFor="single" disabled={uploading}>
          {uploading ? 'Uploading ...' : 'Upload'}
        </button>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}