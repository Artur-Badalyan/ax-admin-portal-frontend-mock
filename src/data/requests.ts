export type RequestItem = {
  id: string;
  requester: string;
  assignment: string;
  email?: string;
  requestDate?: string;
  status?: 'pending' | 'approved' | 'rejected';
  productName?: string;
  licenseType?: string;
  region?: string;
  notes?: string;
};

export const requests: RequestItem[] = [
  {
    id: '1',
    requester: 'Noah Bennett',
    assignment: 'Revit ProjectBox, Business',
    email: 'noah.bennett@example.com',
    requestDate: '2024-02-28',
    status: 'pending',
    productName: 'Revit ProjectBox',
    licenseType: 'Business',
    region: 'US',
    notes: 'Need access for upcoming project',
  },
  {
    id: '2',
    requester: 'Oliver Bradford',
    assignment: 'PlantTools, Starter, EU',
    email: 'oliver.bradford@example.com',
    requestDate: '2024-02-27',
    status: 'pending',
    productName: 'PlantTools',
    licenseType: 'Starter',
    region: 'EU',
    notes: 'Required for team expansion',
  },
];
