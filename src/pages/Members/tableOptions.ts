import type { CommonTableConfig } from '../../lib/types/table.type';

const tableOptions = {
  members: {
    fields: [
      {
        id: 'name',
        label: 'membersPage.table.name',
        width: '25%',
        sortable: false,
      },
      {
        id: 'email',
        label: 'membersPage.table.email',
        width: '25%',
        sortable: false,
      },
      {
        id: 'status',
        label: 'membersPage.table.status',
        width: '25%',
        sortable: false,
      },
      {
        id: 'role',
        label: 'membersPage.table.role',
        width: '15%',
        sortable: false,
      },
      {
        id: 'actions',
        label: '',
        width: '40px',
      },
    ],
    rowsPerPageOptions: [5, 10, 25, 50],
  } as CommonTableConfig,
};

export default tableOptions;
