import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';
import GalleryUpload from '../../components/GalleryUpload';
import ImageUpload from '../../components/ImageUpload';

interface Upload { id: number; url: string; name: string }

interface DescriptionItem { type: string; value: string }

interface FormData {
  title: string;
  slug: string;
  description: string;
  categoryId: string;
  dimensionText: string;
  descriptions: DescriptionItem[];
  sketchTitle: string;
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
  const [dimensionImage, setDimensionImage] = useState<Upload | null>(null);
  const [installationImage, setInstallationImage] = useState<Upload | null>(null);
  const [accessoriesImage, setAccessoriesImage] = useState<Upload | null>(null);
  const [sketchImage1, setSketchImage1] = useState<Upload | null>(null);
  const [sketchImage2, setSketchImage2] = useState<Upload | null>(null);

  const { register, handleSubmit, setValue, watch, control } = useForm<FormData>({
    defaultValues: {
      descriptions: [{ type: '', value: '' }],
    },
  });

  const descs = useFieldArray({ control, name: 'descriptions' });
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
    setValue('categoryId', existing.category?.id?.toString() ?? '');

    if (existing.dimension) {
      setValue('dimensionText', existing.dimension.text ?? '');
      if (existing.dimension.image) setDimensionImage(existing.dimension.image);
    }
    if (existing.installationSteps?.image) setInstallationImage(existing.installationSteps.image);
    if (existing.accessories?.image) setAccessoriesImage(existing.accessories.image);
    if (existing.sketch) {
      setValue('sketchTitle', existing.sketch.title ?? '');
      if (existing.sketch.image1) setSketchImage1(existing.sketch.image1);
      if (existing.sketch.image2) setSketchImage2(existing.sketch.image2);
    }
    if (existing.descriptions?.length) setValue('descriptions', existing.descriptions);
    if (existing.gallery?.length) setGallery(existing.gallery);
  }, [existing]);

  const save = useMutation({
    mutationFn: async (values: FormData) => {
      const payload = {
        title: values.title,
        slug: values.slug,
        description: values.description,
        categoryId: values.categoryId ? Number(values.categoryId) : null,
        dimension: {
          text: values.dimensionText || '',
          image: dimensionImage ? { id: dimensionImage.id, url: dimensionImage.url } : null,
        },
        installationSteps: {
          image: installationImage ? { id: installationImage.id, url: installationImage.url } : null,
        },
        accessories: {
          image: accessoriesImage ? { id: accessoriesImage.id, url: accessoriesImage.url } : null,
        },
        sketch: {
          image1: sketchImage1 ? { id: sketchImage1.id, url: sketchImage1.url } : null,
          title: values.sketchTitle || '',
          image2: sketchImage2 ? { id: sketchImage2.id, url: sketchImage2.url } : null,
        },
        descriptions: values.descriptions.filter((d) => d.type || d.value),
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

        {/* Basic Info */}
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
            <textarea {...register('description')} rows={3} className={inputCls} placeholder="Short product description shown on product page" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select {...register('categoryId')} className={inputCls}>
              <option value="">— None —</option>
              {categories?.map((c: any) => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
        </section>

        {/* Gallery */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Images</h2>
          <GalleryUpload value={gallery} onChange={setGallery} />
        </section>

        {/* Dimension */}
        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="font-semibold text-gray-700">Dimension</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dimension Text (e.g. 120 x 160cms)</label>
            <input {...register('dimensionText')} placeholder="e.g. 120 x 160cms" className={inputCls} />
          </div>
          <ImageUpload value={dimensionImage} onChange={setDimensionImage} label="Dimension Image" />
        </section>

        {/* Installation Steps */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Installation Steps</h2>
          <ImageUpload value={installationImage} onChange={setInstallationImage} label="Installation Steps Image" />
        </section>

        {/* Accessories */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Accessories</h2>
          <ImageUpload value={accessoriesImage} onChange={setAccessoriesImage} label="Accessories Image" />
        </section>

        {/* Sketch */}
        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="font-semibold text-gray-700">Sketch</h2>
          <ImageUpload value={sketchImage1} onChange={setSketchImage1} label="Sketch Image 1" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input {...register('sketchTitle')} placeholder="e.g. T5 New LED Tube" className={inputCls} />
          </div>
          <ImageUpload value={sketchImage2} onChange={setSketchImage2} label="Sketch Image 2" />
        </section>

        {/* Descriptions */}
        <section className="bg-white rounded-xl shadow p-6 space-y-3">
          <h2 className="font-semibold text-gray-700">Descriptions</h2>
          <p className="text-xs text-gray-500">Each entry shows as "Type : Value" on the product page (e.g. "Cutout Size : 66 mm")</p>
          {descs.fields.map((f, i) => (
            <div key={f.id} className="flex gap-3 items-start">
              <input {...register(`descriptions.${i}.type`)} placeholder="Type (e.g. Cutout Size)" className={`${inputCls} w-48`} />
              <input {...register(`descriptions.${i}.value`)} placeholder="Value (e.g. 66 mm or 75 mm)" className={inputCls} />
              <button type="button" onClick={() => descs.remove(i)} className={removeBtn}>✕</button>
            </div>
          ))}
          <button type="button" onClick={() => descs.append({ type: '', value: '' })} className={addBtn}>+ Add description</button>
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
