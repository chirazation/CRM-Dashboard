'use client';
import React, { useCallback,useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Trash2, Edit2, AlertCircle, CheckCircle } from "lucide-react";
import LeadForm from "@/components/formlead";
import { LeadStatus} from '@prisma/client';
import { LeadService, Lead, CreateLeadData } from "@/lib/leadService";

const statusColor = {
  new: "bg-blue-100 text-blue-700 rounded-lg",
  contacted: "bg-yellow-100 text-yellow-700 rounded-lg",
  qualified: "bg-purple-100 text-purple-700 rounded-lg",
  converted: "bg-green-100 text-green-700 rounded-lg",
};

const statusLabels = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified", 
  converted: "Converted",
};

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

export default function LeadTable() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [alert, setAlert] = useState<AlertState>({ show: false, type: 'success', message: '' });
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; leadId: number | null }>({
    show: false,
    leadId: null
  });
  const perPage = 10;
  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: 'success', message: '' }), 5000);
  };


  const loadLeads = useCallback(async () => {
    try {
      const response = await LeadService.getLeads();
      setLeads(response.leads);
    } catch (error) {
      console.error(error);
      showAlert('error', 'Error while loading leads');
    } 
  }, []);


  useEffect(() => {
    loadLeads();
}, [loadLeads]); 
  // Créer un nouveau lead
  const handleCreateLead = async (data: CreateLeadData) => {
    try {
      await LeadService.createLead(data);
      showAlert('success', 'Lead created successfully');
      setIsOpen(false);
      loadLeads();
    } catch (error) {
      console.error('Error creating lead:', error);
      showAlert('error', 'Erreur lors de la création du lead');
      throw error; 
    }
  };

  // Mettre à jour un lead existant
  const handleUpdateLead = async (data: CreateLeadData) => {
    if (!editingLead) return;
    
    try {
      await LeadService.updateLead(editingLead.id, data);
      showAlert('success', 'Lead updated successfully');
      setIsOpen(false);
      setEditingLead(null);
      loadLeads();
    } catch (error) {
      console.error('Error updating lead:', error);
      showAlert('error', 'Error while updating lead');
      throw error;
    }
  };

  // Ouvrir le formulaire d'édition
  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setIsOpen(true);
  };

  // Confirmer la suppression
  const handleDeleteConfirm = (leadId: number) => {
    setDeleteConfirm({ show: true, leadId });
  };

  // Supprimer un lead
  const handleDelete = async () => {
    if (!deleteConfirm.leadId) return;
    
    try {
      await LeadService.deleteLead(deleteConfirm.leadId);
      showAlert('success', 'Lead deleted successfully');
      setDeleteConfirm({ show: false, leadId: null });
      loadLeads();
    } catch (error) {
      console.error('Error deleting lead:', error);
      showAlert('error', 'Error while deleting lead');
    }
  };

  // Fermer le formulaire
  const handleCloseForm = () => {
    setIsOpen(false);
    setEditingLead(null);
  };
  
  // Recherche avec debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1); // Reset à la page 1 lors de la recherche
      loadLeads();
    }, 500);

    return () => clearTimeout(timer);
  }, [search,loadLeads]);

  const filteredLeads = leads.filter(lead =>
    (lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      (lead.companyName && lead.companyName.toLowerCase().includes(search.toLowerCase()))) &&
    (statusFilter === "all" || lead.status === statusFilter)
  );

  const paginatedLeads = filteredLeads.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(filteredLeads.length / perPage);

  return (
    <div className="w-full overflow-x-auto ">
      {/* Alerte */}
      {alert.show && (
        <div className={cn(
          "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 transition-all duration-300",
          alert.type === 'success' 
            ? "bg-green-100 text-green-700 border border-green-200"
            : "bg-red-100 text-red-700 border border-red-200"
        )}>
          {alert.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{alert.message}</span>
          <button 
            onClick={() => setAlert({ show: false, type: 'success', message: '' })}
            className="ml-4 text-lg font-bold hover:opacity-70"
          >
            ×
          </button>
        </div>
      )} 

      <div className="space-y-4 py-6 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or company... "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-90"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Select onValueChange={(value) => setStatusFilter(value)} value={statusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by:" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value={LeadStatus.new}>New</SelectItem>
                <SelectItem value={LeadStatus.contacted}>Contacted</SelectItem>
                <SelectItem value={LeadStatus.qualified}>Qualified</SelectItem>
                <SelectItem value={LeadStatus.converted}>Converted</SelectItem>
              </SelectContent>
            </Select>
            
            <button 
              onClick={() => setIsOpen(true)} 
              className='px-4 py-2 text-sm rounded-md bg-[#12284C] text-white font-semibold hover:bg-gray-500 transition duration-200'
            > 
              + Add new Lead
            </button>        
          </div>
        </div>

        {/* Modal du formulaire */}
        {isOpen && (
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300">
            <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative max-h-[90vh] overflow-y-auto">
              {/* Bouton pour fermer */}
              <button onClick={handleCloseForm} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                ✕
              </button>
              <LeadForm initialData={editingLead || undefined} onSubmit={editingLead ? handleUpdateLead : handleCreateLead} isEditing={!!editingLead}/>
            </div>
            </div>
          </div>
        )}

        {/* Modal de confirmation de suppression */}
        {deleteConfirm.show && (
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300">
            <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Confirm deletion</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete the lead? This action is irreversible.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirm({ show: false, leadId: null })}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
            </div>
          </div>
        )}

        <Table className="rounded-lg border">
          <TableHeader className='bg-gray-200'>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Assigned to</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLeads.length > 0 ? (
              paginatedLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{lead.companyName || '-'}</TableCell>
                  <TableCell>{lead.source || '-'}</TableCell>
                  <TableCell>{lead.user?.name || lead.assignedTo || '-'}</TableCell>
                  <TableCell>{lead.notes || '-'}</TableCell>
                  <TableCell>
                    <span className={cn("px-2 py-1 rounded text-sm font-medium", statusColor[lead.status])}>
                       {statusLabels[lead.status]}
                    </span>
                  </TableCell>
                  <TableCell className="flex gap-3">
                    <button
                      aria-label="Edit"
                      className="text-green-600 hover:text-green-900"
                      onClick={() => handleEdit(lead)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      aria-label="Delete"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteConfirm(lead.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-muted-foreground">
                  No leads found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}