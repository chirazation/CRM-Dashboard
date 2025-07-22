'use client';

import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import {TunisiaGovernorateSelect} from '@/components/tunisiaselect';

type Company = {
  id: string;
  name: string;
  industry?: string;
  location?: string;
};

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Company>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetch('/api/companies');
      const data = await res.json();
      setCompanies(data);
    };
    fetchCompanies();
  }, []);

  const openAddModal = () => {
    setFormData({});
    setEditingId(null);
    setModalOpen(true);
  };

  const openEditModal = (company: Company) => {
    setFormData(company);
    setEditingId(company.id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({});
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      alert('Please fill in the required field: name.');
      return;
    }

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/companies/${editingId}` : '/api/companies';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      alert('Failed to save company');
      return;
    }

    const savedCompany: Company = await res.json();

    if (editingId) {
      setCompanies((prev) =>
        prev.map((company) => (company.id === editingId ? savedCompany : company))
      );
    } else {
      setCompanies((prev) => [...prev, savedCompany]);
    }

    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this company?')) {
      await fetch(`/api/companies/${id}`, { method: 'DELETE' });
      setCompanies((prev) => prev.filter((company) => company.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#0a1f44]">Companies</h1>
          <button
            onClick={openAddModal}
            className="bg-[#0a1f44] text-white px-5 py-2 rounded-lg hover:bg-[#12284c] transition"
          >
            + Add Company
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[#0a1f44] text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Industry</th>
                <th className="px-6 py-3 text-left">Location</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No companies found.
                  </td>
                </tr>
              ) : (
                companies.map((company) => (
                  <tr key={company.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{company.name}</td>
                    <td className="px-6 py-4">{company.industry || '—'}</td>
                    <td className="px-6 py-4">{company.location || '—'}</td>
                    <td className="px-6 py-4 text-center space-x-3">
                      <button
                        onClick={() => openEditModal(company)}
                        className="text-[#0f7036] hover:text-blue-600 transition"
                        aria-label="Edit"
                      >
                        <Icon icon="mdi:pencil-outline" className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(company.id)}
                        className="text-red-600 hover:text-red-800 transition"
                        aria-label="Delete"
                      >
                        <Icon icon="mdi:trash-can-outline" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-start overflow-y-auto z-50 py-10 px-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Company' : 'Add Company'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Location</label>
              <TunisiaGovernorateSelect
               value={formData.location || ''}
                onChange={(value:string) =>
                    setFormData((prev) => ({ ...prev, location: value }))
                    }
                 />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0a1f44] text-white rounded-lg hover:bg-[#12284c]"
                >
                  {editingId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
