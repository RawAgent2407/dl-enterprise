import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';

export default function ContactsList() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['contacts', page],
    queryFn: async () => {
      const { data } = await api.get('/contacts', { params: { 'pagination[page]': page, 'pagination[pageSize]': 20 } });
      return data;
    },
  });

  const del = useMutation({
    mutationFn: (id: number) => api.delete(`/contacts/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['contacts'] }),
  });

  if (isLoading) return <p className="text-gray-500">Loading…</p>;

  const { data: contacts, meta } = data ?? { data: [], meta: { pagination: { page: 1, pageCount: 1, total: 0 } } };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Contacts</h1>
        <span className="text-sm text-gray-500">{meta.pagination.total} total</span>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Email</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Phone</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Product</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Message</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {contacts?.map((c: any) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{c.name}</td>
                <td className="px-4 py-3 text-gray-500">{c.email ?? '–'}</td>
                <td className="px-4 py-3 text-gray-500">{c.phone}</td>
                <td className="px-4 py-3 text-gray-500">{c.productName ?? '–'}</td>
                <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{c.message ?? '–'}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => confirm('Delete?') && del.mutate(c.id)} className="text-red-500 hover:underline text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {meta.pagination.pageCount > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            className="px-3 py-1 border rounded text-sm disabled:opacity-40">← Prev</button>
          <span className="px-3 py-1 text-sm text-gray-500">{page} / {meta.pagination.pageCount}</span>
          <button onClick={() => setPage((p) => Math.min(meta.pagination.pageCount, p + 1))} disabled={page === meta.pagination.pageCount}
            className="px-3 py-1 border rounded text-sm disabled:opacity-40">Next →</button>
        </div>
      )}
    </div>
  );
}
