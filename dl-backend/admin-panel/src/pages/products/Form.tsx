import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';
import GalleryUpload from '../../components/GalleryUpload';
import ImageUpload from '../../components/ImageUpload';

interface Upload { id: number; url: string; name: string }
interface KV { label: string; value: string }
interface Variant { type: string; values: string }

interface FormData {
  title: string;
  slug: string;
  description: string;
  rating: number;
  totalRatings: number;
  categoryId: string;
  coreSpecifications: KV[];
  electricalSpecifications: KV[];
  keyFeatures: { value: string }[];
  variants: Variant[];
  daigramDescription: string;
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [gallery, setGallery] = useState<Upload[]>([]);
  const [daigramImage, setDaigramImage] = useState<Upload | null>(null);

  const { register, handleSubmit, setValue, watch, control } = useForm<FormData>({
    defaultValues: {
      coreSpecifications: [{ label: '', value: '' }],
      electricalSpecifications: [{ label: '', value: '' }],
      keyFeatures: [{ value: '' }],
      variants: [{ type: '', values: '' }],
    },
  });

  const coreSpecs = useFieldArray({ control, name: 'coreSpecifications' });
  const elecSpecs = useFieldArray({ control, name: 'electricalSpecifications' });
  const keyFeats = useFieldArray({ control, name: 'keyFeatures' });
  const variants = useFieldArray({ control, name: 'variants' });

  const title = watch('title', '');

  const { data: categories } = useQuery({
    queryKey: ['categories-select'],
    queryFn: async () => {
      const { data } = await api.get('/categories', { params: { 'pagination[pageSize]': 200 } });
      return data.data;
    },
  });

  const { data: existing } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}?populate=*`);
      return data.data;
    },
    enabled: isEdit,
  });

  useEffect(() => {
    if (!existing) return;
    setValue('title', existing.title);
    setValue('slug', existing.slug);
    setValue('description', existing.description ?? '');
    setValue('rating', existing.rating ?? 0);
    setValue('totalRatings', existing.totalRatings ?? 0);
    setValue('categoryId', existing.category?.id?.toString() ?? '');
    if (existing.coreSpecifications?.length) setValue('coreSpecifications', existing.coreSpecifications);
    if (existing.electricalSpecifications?.length) setValue('electricalSpecifications', existing.electricalSpecifications);
    if (existing.keyFeatures?.length) setValue('keyFeatures', existing.keyFeatures);
    if (existing.variants?.length) setValue('variants', existing.variants.map((v: any) => ({ type: v.type, values: Array.isArray(v.values) ? v.values.join(', ') : v.values })));
    if (existing.gallery?.length) setGallery(existing.gallery);
    if (existing.daigram?.imageId) setDaigramImage({ id: existing.daigram.imageId, url: `/uploads/...`, name: 'diagram' });
    setValue('daigramDescription', existing.daigram?.description ?? '');
  }, [existing]);

  const save = useMutation({
    mutationFn: async (values: FormData) => {
      const payload = {
        title: values.title,
        slug: values.slug,
        description: values.description,
        rating: Number(values.rating),
        totalRatings: values.totalRatings ? Number(values.totalRatings) : null,
        categoryId: values.categoryId ? Number(values.categoryId) : null,
        coreSpecifications: values.coreSpecifications.filter((r) => r.label),
        electricalSpecifications: values.electricalSpecifications.filter((r) => r.label),
        keyFeatures: values.keyFeatures.filter((r) => r.value),
        variants: values.variants
          .filter((v) => v.type)
          .map((v) => ({ type: v.type, values: v.values.split(',').map((s) => s.trim()).filter(Boolean) })),
        daigram: { imageId: daigramImage?.id ?? null, description: values.daigramDescription || null },
        galleryIds: gallery.map((u) => u.id),
      };
      if (isEdit) return api.put(`/products/${id}`, payload);
      return api.post('/products', payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] });
      navigate('/products');
    },
  });

  function onTitleBlur() {
    if (!isEdit) setValue('slug', slugify(title));
  }

  const inputCls = 'w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';
  const addBtn = 'text-xs text-blue-600 hover:underline mt-1';
  const removeBtn = 'text-xs text-red-400 hover:underline px-2';

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{isEdit ? 'Edit Product' : 'New Product'}</h1>
      <form onSubmit={handleSubmit((v) => save.mutate(v))} className="space-y-6">

        {/* Basic info */}
        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="font-semibold text-gray-700">Basic Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input {...register('title', { required: true })} onBlur={onTitleBlur} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
              <input {...register('slug', { required: true })} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea {...register('description')} rows={3} className={inputCls} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select {...register('categoryId')} className={inputCls}>
                <option value="">— None —</option>
                {categories?.map((c: any) => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <input type="number" step="0.1" min="0" max="5" {...register('rating')} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Ratings</label>
              <input type="number" {...register('totalRatings')} className={inputCls} />
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Gallery</h2>
          <GalleryUpload value={gallery} onChange={setGallery} />
        </section>

        {/* Variants */}
        <section className="bg-white rounded-xl shadow p-6 space-y-3">
          <h2 className="font-semibold text-gray-700">Variants</h2>
          {variants.fields.map((f, i) => (
            <div key={f.id} className="flex gap-3 items-start">
              <input {...register(`variants.${i}.type`)} placeholder="Type (e.g. Color)" className={`${inputCls} w-40`} />
              <input {...register(`variants.${i}.values`)} placeholder="Values (comma-separated)" className={inputCls} />
              <button type="button" onClick={() => variants.remove(i)} className={removeBtn}>✕</button>
            </div>
          ))}
          <button type="button" onClick={() => variants.append({ type: '', values: '' })} className={addBtn}>+ Add variant</button>
        </section>

        {/* Core Specifications */}
        <section className="bg-white rounded-xl shadow p-6 space-y-3">
          <h2 className="font-semibold text-gray-700">Core Specifications</h2>
          {coreSpecs.fields.map((f, i) => (
            <div key={f.id} className="flex gap-3 items-start">
              <input {...register(`coreSpecifications.${i}.label`)} placeholder="Label" className={`${inputCls} w-40`} />
              <input {...register(`coreSpecifications.${i}.value`)} placeholder="Value" className={inputCls} />
              <button type="button" onClick={() => coreSpecs.remove(i)} className={removeBtn}>✕</button>
            </div>
          ))}
          <button type="button" onClick={() => coreSpecs.append({ label: '', value: '' })} className={addBtn}>+ Add row</button>
        </section>

        {/* Electrical Specifications */}
        <section className="bg-white rounded-xl shadow p-6 space-y-3">
          <h2 className="font-semibold text-gray-700">Electrical Specifications</h2>
          {elecSpecs.fields.map((f, i) => (
            <div key={f.id} className="flex gap-3 items-start">
              <input {...register(`electricalSpecifications.${i}.label`)} placeholder="Label" className={`${inputCls} w-40`} />
              <input {...register(`electricalSpecifications.${i}.value`)} placeholder="Value" className={inputCls} />
              <button type="button" onClick={() => elecSpecs.remove(i)} className={removeBtn}>✕</button>
            </div>
          ))}
          <button type="button" onClick={() => elecSpecs.append({ label: '', value: '' })} className={addBtn}>+ Add row</button>
        </section>

        {/* Key Features */}
        <section className="bg-white rounded-xl shadow p-6 space-y-3">
          <h2 className="font-semibold text-gray-700">Key Features</h2>
          {keyFeats.fields.map((f, i) => (
            <div key={f.id} className="flex gap-3 items-start">
              <input {...register(`keyFeatures.${i}.value`)} placeholder="Feature" className={inputCls} />
              <button type="button" onClick={() => keyFeats.remove(i)} className={removeBtn}>✕</button>
            </div>
          ))}
          <button type="button" onClick={() => keyFeats.append({ value: '' })} className={addBtn}>+ Add feature</button>
        </section>

        {/* Diagram */}
        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="font-semibold text-gray-700">Diagram</h2>
          <ImageUpload value={daigramImage} onChange={setDaigramImage} label="Diagram Image" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diagram Description</label>
            <textarea {...register('daigramDescription')} rows={2} className={inputCls} />
          </div>
        </section>

        <div className="flex gap-3">
          <button type="submit" disabled={save.isPending}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
            {save.isPending ? 'Saving…' : 'Save'}
          </button>
          <button type="button" onClick={() => navigate('/products')}
            className="px-6 py-2 rounded-lg text-sm border hover:bg-gray-50">Cancel</button>
        </div>
        {save.isError && <p className="text-red-500 text-sm">Save failed. Please try again.</p>}
      </form>
    </div>
  );
}
