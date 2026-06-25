import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';
import ImageUpload from '../../components/ImageUpload';

interface Upload { id: number; url: string; name: string }
interface FormData { title: string; slug: string; description: string }

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function CategoryForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [image, setImage] = useState<Upload | null>(null);
  const [bannerImage, setBannerImage] = useState<Upload | null>(null);

  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const title = watch('title', '');

  const { data: existing } = useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      const { data } = await api.get(`/categories/${id}?populate=*`);
      return data.data;
    },
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      setValue('title', existing.title);
      setValue('slug', existing.slug);
      setValue('description', existing.description ?? '');
      if (existing.image) setImage(existing.image);
      if (existing.banner_image) setBannerImage(existing.banner_image);
    }
  }, [existing]);

  const save = useMutation({
    mutationFn: async (values: FormData) => {
      const payload = { ...values, imageId: image?.id ?? null, bannerImageId: bannerImage?.id ?? null };
      if (isEdit) return api.put(`/categories/${id}`, payload);
      return api.post('/categories', payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['categories'] });
      navigate('/categories');
    },
  });

  function onTitleBlur() {
    if (!isEdit) setValue('slug', slugify(title));
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{isEdit ? 'Edit Category' : 'New Category'}</h1>
      <form onSubmit={handleSubmit((v) => save.mutate(v))} className="bg-white rounded-xl shadow p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input {...register('title', { required: true })} onBlur={onTitleBlur}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
          <input {...register('slug', { required: true })}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea {...register('description')} rows={3}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <ImageUpload value={image} onChange={setImage} label="Image" />
        <ImageUpload value={bannerImage} onChange={setBannerImage} label="Banner Image" />
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={save.isPending}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
            {save.isPending ? 'Saving…' : 'Save'}
          </button>
          <button type="button" onClick={() => navigate('/categories')}
            className="px-5 py-2 rounded-lg text-sm border hover:bg-gray-50">Cancel</button>
        </div>
        {save.isError && <p className="text-red-500 text-sm">Save failed. Please try again.</p>}
      </form>
    </div>
  );
}
