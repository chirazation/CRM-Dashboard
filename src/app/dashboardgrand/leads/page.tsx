'use client';

import  React,{useState} from 'react';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Trash2, Edit2 } from "lucide-react";
import LeadForm from "@/components/formlead";
// Lead status enum matching your Prisma schema
enum LeadStatus {
  new = "new",
  contacted = "contacted", 
  qualified = "qualified",
  converted = "converted"
}

// Status to color mapping
const statusColor = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  qualified: "bg-orange-100 text-orange-700",
  converted: "bg-green-100 text-green-700",
};

// Status display labels
const statusLabels = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified", 
  converted: "Converted",
};

type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  assignedTo: number;
  source: string;
  createdAt: Date;
  notes: string;
  companyId?: number;
  companyName: string;
  officePhone?: number;
};

// Mock data matching your schema structure
const mockLeads: Lead[] = [
  { 
    id: 1, 
    name: "Ahmed Ben Ali", 
    email: "ahmed@example.com", 
    phone: "+216 12 345 678",
    status: LeadStatus.new,
    assignedTo: 1,
    source: "Website",
    createdAt: new Date(),
    companyName: "Tech Solutions",
    notes: "hhhh"
  },
  { 
    id: 2, 
    name: "Salma Trabelsi", 
    email: "salma@example.com", 
    phone: "+216 98 765 432",
    status: LeadStatus.contacted,
    assignedTo: 1,
    source: "Referral",
    createdAt: new Date(),
    companyName: "Digital Agency",
    notes: "hhhh"
  },
  { 
    id: 3, 
    name: "Youssef Bouazizi", 
    email: "youssef@example.com", 
    phone: "+216 55 123 456",
    status: LeadStatus.converted,
    assignedTo: 1,
    source: "LinkedIn",
    createdAt: new Date(),
    companyName: "StartupHub",
    notes: "hhhh"
  },
  { 
    id: 4, 
    name: "Nada Zayene", 
    email: "nada@example.com", 
    phone: "+216 77 888 999",
    status: LeadStatus.qualified,
    assignedTo: 1,
    source: "Cold Email",
    createdAt: new Date(),
    companyName: "Innovation Labs",
    notes: "hhhh"
  },
];


export default function LeadTable() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const perPage = 10;
   
  const updateLeadStatus = (leadId: number, newStatus: LeadStatus) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? { ...lead, status: newStatus }
          : lead
      )
    );
  };
  const filteredLeads = leads.filter(lead =>
  (lead.name.toLowerCase().includes(search.toLowerCase()) ||
    lead.email.toLowerCase().includes(search.toLowerCase()) ||
    (lead.companyName && lead.companyName.toLowerCase().includes(search.toLowerCase()))) &&
  (statusFilter === "all" || lead.status === statusFilter)
);

  const paginatedLeads = filteredLeads.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(filteredLeads.length / perPage);

  return (
    <div className="w-full overflow-x-auto">
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
        <button onClick={() => setIsOpen(true)} className='px-4 py-2 text-sm rounded-md bg-[#12284C] text-white font-semibold hover:bg-gray-500 transition duration-200'> + Add new Lead</button>        
        {isOpen && (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 px-4">
    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative max-h-[90vh] overflow-y-auto">
      {/* Bouton pour fermer */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>
    
      <LeadForm/>
    </div>
  </div>
)}
    </div>
      </div>

      <Table className="rounded-lg border">
        <TableHeader>
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
                <TableCell>{lead.assignedTo || '-'}</TableCell>
                <TableCell>{lead.notes || '-'}</TableCell>
                <TableCell>
                 <Select 
                    value={lead.status} 
                    onValueChange={(value) => updateLeadStatus(lead.id, value as LeadStatus)}
                  >
                    <SelectTrigger className="w-[132px]">
                      <SelectValue>
                        <span className={cn("px-2 py-1 rounded text-sm font-medium", statusColor[lead.status])}>
                          {statusLabels[lead.status]}
                        </span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={LeadStatus.new}>
                        <span className={cn("px-2 py-1 rounded text-sm font-medium", statusColor.new)}>
                          New
                        </span>
                      </SelectItem>
                      <SelectItem value={LeadStatus.contacted}>
                        <span className={cn("px-2 py-1 rounded text-sm font-medium", statusColor.contacted)}>
                          Contacted
                        </span>
                      </SelectItem>
                      <SelectItem value={LeadStatus.qualified}>
                        <span className={cn("px-2 py-1 rounded text-sm font-medium", statusColor.qualified)}>
                          Qualified
                        </span>
                      </SelectItem>
                      <SelectItem value={LeadStatus.converted}>
                        <span className={cn("px-2 py-1 rounded text-sm font-medium", statusColor.converted)}>
                          Converted
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
               <TableCell className="flex gap-3">
  <button
    aria-label="Edit"
    className="text-blue-600 hover:text-blue-900"
    // onClick={() => handleEdit(lead.id)}
  >
    <Edit2 className="w-4 h-4" />
  </button>

  <button
    aria-label="Delete"
    className="text-red-600 hover:text-red-800"
    // onClick={() => handleDelete(lead.id)}
  >
    <Trash2 className="w-4 h-4" />
  </button>
</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
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
          className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
}