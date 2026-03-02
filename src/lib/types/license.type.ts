export interface Installation {
  os: string;
  hostName: string;
  osVersion: string;
  ip: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: 'active' | 'invited' | 'inactive';
}

export interface License {
  id: string;
  name: string;
  productName?: string;
  amount: number;
  used: number;
  key: string;
  region: string;
  type: string;
  autoRenew: string;
  cancellationPossible: string;
  package: string;
  price: number;
  installations: Installation[];
  users: User[];
}
