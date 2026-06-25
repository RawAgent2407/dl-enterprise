import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';

async function count(path: string) {
  const { data } = await api.get(path, { params: { 'pagination[pageSize]': 1 } });
  return data.meta.pagination.total as number;
}

export default function Dashboard() {
  const { data: products } = useQuery({ queryKey: ['count-products'], queryFn: () => count('/products') });
  const { data: categories } = useQuery({ queryKey: ['count-categories'], queryFn: () => count('/categories') });
  const { data: contacts } = useQuery({ queryKey: ['count-contacts'], queryFn: () => count('/contacts') });

  const stats = [
    { label: 'Products', value: products ?? '–', color: 'bg-blue-500' },
    { label: 'Categories', value: categories ?? '–', color: 'bg-purple-500' },
    { label: 'Contacts', value: contacts ?? '–', color: 'bg-green-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
            <div className={`${s.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold`}>
              {s.label[0]}
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
