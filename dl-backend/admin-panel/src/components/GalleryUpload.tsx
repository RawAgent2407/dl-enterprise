import { useState } from 'react';
import { api } from '../api/client';

interface Upload { id: number; url: string; name: string }

interface Props {
  value: Upload[];
  onChange: (uploads: Upload[]) => void;
}

export default function GalleryUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    try {
      const uploaded: Upload[] = [];
      for (const file of files) {
        const fd = new FormData();
        fd.append('files', file);
        const { data } = await api.post<Upload[]>('/upload', fd);
        uploaded.push(data[0]);
      }
      onChange([...value, ...uploaded]);
    } finally {
      setUploading(false);
    }
  }

  function remove(id: number) {
    onChange(value.filter((u) => u.id !== id));
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Gallery</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((u) => (
          <div key={u.id} className="relative group">
            <img src={u.url} alt={u.name} className="w-20 h-20 object-cover rounded border" />
            <button type="button" onClick={() => remove(u.id)}
              className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-bl px-1 opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
          </div>
        ))}
      </div>
      <input type="file" accept="image/*" multiple onChange={handleFiles} disabled={uploading}
        className="block text-sm text-gray-500 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
      {uploading && <p className="text-xs text-gray-400 mt-1">Uploading…</p>}
    </div>
  );
}
