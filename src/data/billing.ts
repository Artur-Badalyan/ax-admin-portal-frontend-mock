export const paymentMethod = {
  type: 'Credit Card',
  last4: '*1234',
  expires: '01.02.2027',
};

export const upcomingPayments = [
  { month: 'Jan. 2026', amount: '$849,00' },
  { month: 'Feb. 2026', amount: '$99,00' },
  { month: 'Mar. 2026', amount: '$210,00' },
];

export const invoices = {
  '2025': [
    {
      month: 'Nov. 2025',
      items: [{ date: '2025-11-23', status: 'open' }],
    },
    {
      month: 'Oct. 2025',
      items: [
        { date: '2025-10-23', status: 'payed' },
        { date: '2025-10-23', status: 'payed' },
      ],
    },
  ],
  '2024': [
    {
      month: 'Dec. 2024',
      items: [{ date: '2024-12-15', status: 'payed' }],
    },
  ],
};