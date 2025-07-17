'use client';

import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'New' | 'Contacted' | 'Qualified';
  assignedTo: number;
  source?: string;
  notes?: string;
  companyId?: number;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Lead>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data);
    };
    fetchLeads();
  }, []);

  const openAddModal = () => {
    setFormData({});
    setEditingId(null);
    setModalOpen(true);
  };

  const openEditModal = (lead: Lead) => {
    setFormData(lead);
    setEditingId(lead.id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({});
    setEditingId(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'assignedTo' || name === 'companyId') {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.status ||
      !formData.assignedTo
    ) {
      alert('Please fill in all required fields (name, email, phone, status, assignedTo).');
      return;
    }

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/leads/${editingId}` : '/api/leads';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      alert('Failed to save lead');
      return;
    }

    const savedLead: Lead = await res.json();

    if (editingId) {
      setLeads((prev) => prev.map((lead) => (lead.id === editingId ? savedLead : lead)));
    } else {
      setLeads((prev) => [...prev, savedLead]);
    }

    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#0a1f44]">Leads</h1>
          <button
            onClick={openAddModal}
            className="bg-[#0a1f44] text-white px-5 py-2 rounded-lg hover:bg-[#12284c] transition"
          >
            + Add Lead
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[#0a1f44] text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Assigned To</th>
                <th className="px-6 py-3 text-left">Source</th>
                <th className="px-6 py-3 text-left">Company ID</th>
                <th className="px-6 py-3 text-left">Notes</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-6 text-gray-500">
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{lead.name}</td>
                    <td className="px-6 py-4">{lead.email}</td>
                    <td className="px-6 py-4">{lead.phone}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          lead.status === 'New'
                            ? 'bg-green-100 text-green-800'
                            : lead.status === 'Contacted'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{lead.assignedTo}</td>
                    <td className="px-6 py-4">{lead.source || '—'}</td>
                    <td className="px-6 py-4">{lead.companyId ?? '—'}</td>
                    <td className="px-6 py-4">{lead.notes || '—'}</td>
                    <td className="px-6 py-4 text-center space-x-3">
                      <button
                        onClick={() => openEditModal(lead)}
                        className="text-[#0f7036] hover:text-blue-600 transition"
                        aria-label="Edit"
                      >
                        <Icon icon="mdi:pencil-outline" className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
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
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Lead' : 'Add Lead'}</h2>
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
                <label className="block font-medium mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Phone *</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Status *</label>
                <select
                  name="status"
                  value={formData.status || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                >
                  <option value="" disabled>Select status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Assigned To (User ID) *</label>
                <input
                  type="number"
                  name="assignedTo"
                  value={formData.assignedTo ?? ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                  min={1}
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Source</label>
                <input
                  type="text"
                  name="source"
                  value={formData.source || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Company ID</label>
                <input
                  type="number"
                  name="companyId"
                  value={formData.companyId ?? ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  min={1}
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  rows={3}
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
