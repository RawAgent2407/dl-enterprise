import { useState } from 'react';
import { api } from '../api/client';

interface Upload { id: number; url: string; name: string }

interface Props {
  value: Upload | null;
  onChange: (upload: Upload | null) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Image' }: Props) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('files', file);
      const { data } = await api.post<Upload[]>('/upload', fd);
      onChange(data[0]);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {value && (
        <div className="mb-2 flex items-center gap-3">
          <img src={value.url} alt={value.name} className="w-20 h-20 object-cover rounded border" />
          <button type="button" onClick={() => onChange(null)} className="text-xs text-red-500 hover:underline">Remove</button>
        </div>
      )}
      <input type="file" accept="image/*" onChange={handleFile} disabled={uploading}
        className="block text-sm text-gray-500 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
      {uploading && <p className="text-xs text-gray-400 mt-1">Uploading…</p>}
    </div>
  );
}
