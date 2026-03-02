export type StatItem = {
  title: string;
  description: string;
  icon: 'check' | 'issue';
  link?: string;
  tone: 'positive' | 'caution';
};

export type ProjectTools = {
  used: number;
  count: number;
  variant: 'Starter' | 'Business';
  list: string[];
  listTwo: string[];
  link?: string;
  icon?: 'users' | 'key';
};

export const dashboardStats: StatItem[] = [
  {
    title: 'dashboard.management.firstElement.title',
    description: 'dashboard.management.firstElement.description',
    icon: 'check',
    tone: 'positive',
  },
  {
    title: 'dashboard.management.secondElement.title',
    description: 'dashboard.management.secondElement.description',
    icon: 'issue',
    link: '/members',
    tone: 'positive',
  },
  {
    title: 'dashboard.management.thirdElement.title',
    description: 'dashboard.management.thirdElement.description',
    icon: 'issue',
    link: '/billing',
    tone: 'caution',
  },
];

export const ProjectTools: ProjectTools[] = [
  {
    used: 3,
    count: 3,
    variant: 'Starter',
    list: ['Manage users', 'Quick assign'],
    listTwo: ['Change Seats'],
    link: '/plant-tools',
    icon: 'users',
  },
  {
    used: 2,
    count: 5,
    variant: 'Business',
    list: ['Manage users', 'Quick assign'],
    listTwo: ['Change Seats'],
    link: '/plant-tools',
    icon: 'users',
  },
  {
    used: 8,
    count: 10,
    variant: 'Business',
    list: ['Installations'],
    listTwo: ['Copy Key'],
    link: '/revit-project-box',
    icon: 'key',
  },
];

export const ProjectBox: ProjectTools[] = [
  {
    used: 5,
    count: 10,
    variant: 'Business',
    list: ['Manage users'],
    listTwo: ['Change Seats'],
    link: '/plant-tools',
    icon: 'users',
  },
  {
    used: 3,
    count: 5,
    variant: 'Starter',
    list: ['Installations'],
    listTwo: ['Copy Key'],
    link: '/revit-project-box',
    icon: 'key',
  },
];

