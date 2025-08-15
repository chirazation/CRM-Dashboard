'use client';
import React, { useCallback,useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Trash2, Edit2, AlertCircle, CheckCircle } from "lucide-react";
import ContactForm from '@/components/formcontact';
import { ContactService, Contact, CreateContactData } from "@/lib/ContactService";

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

export default function ContactTable() {
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [alert, setAlert] = useState<AlertState>({ show: false, type: 'success', message: '' });
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; contactId: number | null }>({
    show: false,
    contactId: null
  });
  const perPage = 10;
  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: 'success', message: '' }), 5000);
  };


  const loadContacts = useCallback(async () => {
    try {
      const response = await ContactService.getContacts();
      setContacts(response.contacts);
    } catch (error) {
      console.error(error);
      showAlert('error', 'Error while loading contacts');
    } 
  }, []);
  useEffect(() => {
    loadContacts();
}, [loadContacts]); 
  // Créer un nouveau contact
  const handleCreateContact = async (data: CreateContactData) => {
    try {
      await ContactService.createContact(data);
      showAlert('success', 'Contact created successfully');
      setIsOpen(false);
      loadContacts();
    } catch (error) {
      console.error('Error creating contact:', error);
      showAlert('error', 'Error while creating contact');
      throw error; 
    }
  };

  // Mettre à jour un contact existant
  const handleUpdateContact = async (data: CreateContactData) => {
    if (!editingContact) return;
    
    try {
      await ContactService.updateContact(editingContact.id, data);
      showAlert('success', 'Contact updated successfully');
      setIsOpen(false);
      setEditingContact(null);
      loadContacts();
    } catch (error) {
      console.error('Error updating contact:', error);
      showAlert('error', 'Error while updating contact');
      throw error;
    }
  };

  // Ouvrir le formulaire d'édition
  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setIsOpen(true);
  };

  // Confirmer la suppression
  const handleDeleteConfirm = (contactId: number) => {
    setDeleteConfirm({ show: true, contactId });
  };

  // Supprimer un lead
  const handleDelete = async () => {
    if (!deleteConfirm.contactId) return;
    
    try {
      await ContactService.deleteContact(deleteConfirm.contactId);
      showAlert('success', 'Contact deleted successfully');
      setDeleteConfirm({ show: false, contactId: null });
      loadContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
      showAlert('error', 'Error while deleting contact');
    }
  };

  // Fermer le formulaire
  const handleCloseForm = () => {
    setIsOpen(false);
    setEditingContact(null);
  };
  
  // Recherche avec debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1); 
      loadContacts();
    }, 500);

    return () => clearTimeout(timer);
  }, [search,loadContacts]);

  const filteredcontacts = contacts.filter(contact =>
    (contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      contact.companyName && contact.companyName.toLowerCase().includes(search.toLowerCase())) );

  const paginatedContacts = filteredcontacts.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(filteredcontacts.length / perPage);

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
            <button 
              onClick={() => setIsOpen(true)} 
              className='px-4 py-2 text-sm rounded-md bg-[#12284C] text-white font-semibold hover:bg-gray-500 transition duration-200'> 
              + Add new Contact
            </button>        
          
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
              <ContactForm initialData={editingContact || undefined} onSubmit={editingContact ? handleUpdateContact : handleCreateContact} isEditing={!!editingContact}/>
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
                Are you sure you want to delete the contact? This action is irreversible.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirm({ show: false, contactId: null })}
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
              <TableHead>Notes</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedContacts.length > 0 ? (
              paginatedContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{contact.companyName || '-'}</TableCell>
                  <TableCell>{contact.notes || '-'}</TableCell>
                  <TableCell className="flex gap-3">
                    <button
                      aria-label="Edit"
                      className="text-green-600 hover:text-green-900"
                      onClick={() => handleEdit(contact)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      aria-label="Delete"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteConfirm(contact.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-muted-foreground">
                  No contacts found.
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