'use client';

import * as React from 'react';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { cn } from "@/lib/utils";

// Status to color mapping
const statusColor = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-yellow-100 text-yellow-700",
  Converted: "bg-green-100 text-green-700",
};

type Lead = {
  id: string;
  name: string;
  email: string;
  status: keyof typeof statusColor;
};

const mockLeads: Lead[] = [
  { id: "1", name: "Ahmed Ben Ali", email: "ahmed@example.com", status: "New" },
  { id: "2", name: "Salma Trabelsi", email: "salma@example.com", status: "Contacted" },
  { id: "3", name: "Youssef Bouazizi", email: "youssef@example.com", status: "Converted" },
  { id: "4", name: "Nada Zayene", email: "nada@example.com", status: "New" },
];

export default function LeadTable() {
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string>("");

  const [currentPage, setCurrentPage] = React.useState(1);
  const perPage = 3;

  const filteredLeads = mockLeads.filter(lead =>
    (lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === "" || lead.status === statusFilter)
  );

  const paginatedLeads = filteredLeads.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(filteredLeads.length / perPage);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <Select onValueChange={(value) => setStatusFilter(value)} value={statusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="Converted">Converted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table className="rounded-lg border">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedLeads.length > 0 ? (
            paginatedLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>
                  <span className={cn("px-2 py-1 rounded text-sm font-medium", statusColor[lead.status])}>
                    {lead.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground">
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
  );
}
