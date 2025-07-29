import { LeadStatus } from '@prisma/client';

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  assignedTo: number;
  source: string;
  notes?: string;
  companyName: string;
  officePhone?: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface CreateLeadData {
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  assignedTo: number;
  source: string;
  notes?: string;
  companyName: string;
  officePhone?: string;
}

export interface LeadsResponse {
  leads: Lead[];
}

export class LeadService {
  private static baseUrl = '/api/leads';
  static async getLeads(): Promise<LeadsResponse> {
    const response = await fetch(this.baseUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch leads');
    }

    return response.json() as Promise<LeadsResponse>;
  }

  // Récupérer un lead par son ID
  static async getLead(id: number): Promise<Lead> {
    const response = await fetch(`${this.baseUrl}/${id}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch lead');
    }

    return response.json();
  }

  // Créer un nouveau lead
  static async createLead(data: CreateLeadData): Promise<Lead> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create lead');
    }

    return response.json();
  }

  // Mettre à jour un lead par son ID
  static async updateLead(id: number, data: Partial<CreateLeadData>): Promise<Lead> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update lead');
    }

    return response.json();
  }

  // Supprimer un lead par son ID
  static async deleteLead(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete lead');
    }
  }

  // Mise à jour spécifique du status du lead (optionnel)
  static async updateLeadStatus(id: number, status: LeadStatus): Promise<Lead> {
    return this.updateLead(id, { status });
  }
}
