
export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  companyName: string;
  createdAt: Date;
}

export interface CreateContactData {
  name: string;
  email: string;
  phone: string;
  notes?: string;
  companyName: string;
}

export interface ContactsResponse {
  contacts: Contact[];
}

export class ContactService {
  private static baseUrl = '/api/contacts';
  static async getContacts(): Promise<ContactsResponse> {
    const response = await fetch(this.baseUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }

    return response.json() as Promise<ContactsResponse>;
  }

  // Récupérer un contact par son ID
  static async getContact(id: number): Promise<Contact> {
    const response = await fetch(`${this.baseUrl}/${id}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch contact');
    }

    return response.json();
  }

  // Créer un nouveau contact
  static async createContact(data: CreateContactData): Promise<Contact> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create contact');
    }

    return response.json();
  }

  // Mettre à jour un contact par son ID
  static async updateContact(id: number, data: Partial<CreateContactData>): Promise<Contact> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update contact');
    }

    return response.json();
  }

  // Supprimer un contact par son ID
  static async deleteContact(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete contact');
    }
  }

}
