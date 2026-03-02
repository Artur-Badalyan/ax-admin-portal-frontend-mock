import type { License } from '@/lib/types/license.type';

export const mockLicenses: License[] = [
  {
    id: 'lic-1',
    name: 'PlantTools Starter US',
    productName: 'PlantTools',
    amount: 3,
    used: 2,
    key: 'PT-STARTER-US-001',
    region: 'US',
    type: 'Starter',
    autoRenew: '2025-12-31',
    cancellationPossible: '2025-11-30',
    package: 'Starter',
    price: 299,
    installations: [
      {
        os: 'Windows',
        hostName: 'PC-JOHN-001',
        osVersion: '10',
        ip: '192.168.1.10',
      },
      {
        os: 'Windows',
        hostName: 'PC-JANE-002',
        osVersion: '11',
        ip: '192.168.1.11',
      },
    ],
    users: [
      {
        id: 'user-1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        status: 'active',
      },
      {
        id: 'user-2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        status: 'active',
      },
    ],
  },
  {
    id: 'lic-2',
    name: 'PlantTools Business US',
    productName: 'PlantTools',
    amount: 5,
    used: 3,
    key: 'PT-BUSINESS-US-002',
    region: 'US',
    type: 'Business',
    autoRenew: '2025-12-31',
    cancellationPossible: '2025-11-30',
    package: 'Business',
    price: 799,
    installations: [
      {
        os: 'Windows',
        hostName: 'PC-JOHN-001',
        osVersion: '10',
        ip: '192.168.1.10',
      },
      {
        os: 'Windows',
        hostName: 'PC-CHARLIE-005',
        osVersion: '11',
        ip: '192.168.1.15',
      },
      {
        os: 'macOS',
        hostName: 'MAC-CHARLIE-006',
        osVersion: '14.2',
        ip: '192.168.1.16',
      },
    ],
    users: [
      {
        id: 'user-1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        status: 'active',
      },
      {
        id: 'user-5',
        firstName: 'Charlie',
        lastName: 'Brown',
        email: 'charlie.brown@example.com',
        status: 'active',
      },
    ],
  },
  {
    id: 'lic-3',
    name: 'Revit ProjectBox Business US',
    productName: 'Revit ProjectBox',
    amount: 10,
    used: 5,
    key: 'RPB-BUSINESS-US-003',
    region: 'US',
    type: 'Business',
    autoRenew: '2026-06-30',
    cancellationPossible: '2026-05-31',
    package: 'Business',
    price: 1299,
    installations: [
      {
        os: 'Windows',
        hostName: 'PC-BOB-003',
        osVersion: '11',
        ip: '192.168.1.13',
      },
      {
        os: 'Windows',
        hostName: 'PC-BOB-004',
        osVersion: '11',
        ip: '192.168.1.14',
      },
      {
        os: 'Windows',
        hostName: 'LAPTOP-BOB-005',
        osVersion: '10',
        ip: '192.168.1.25',
      },
      {
        os: 'Windows',
        hostName: 'VM-SERVER-01',
        osVersion: 'Server 2022',
        ip: '192.168.1.50',
      },
      {
        os: 'Windows',
        hostName: 'VM-SERVER-02',
        osVersion: 'Server 2022',
        ip: '192.168.1.51',
      },
    ],
    users: [
      {
        id: 'user-3',
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob.johnson@example.com',
        status: 'active',
      },
    ],
  },
  {
    id: 'lic-4',
    name: 'PlantTools Starter EU',
    productName: 'PlantTools',
    amount: 5,
    used: 0,
    key: 'PT-STARTER-EU-004',
    region: 'EU',
    type: 'Starter',
    autoRenew: '2025-12-31',
    cancellationPossible: '2025-11-30',
    package: 'Starter',
    price: 349,
    installations: [],
    users: [],
  },
];

export const mockLicenseDetails: Record<string, License> = mockLicenses.reduce(
  (acc, license) => {
    acc[license.id] = license;
    return acc;
  },
  {} as Record<string, License>,
);
