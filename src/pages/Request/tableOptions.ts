import type { CommonTableConfig } from '../../lib/types/table.type';
import type { RequestItem } from '@/data/requests';
// import RowActions from './customCellComponents/RowActions';

type TableOptionsConfig = {
  onModify?: (data: RequestItem) => void;
};

const createTableOptions = (_config?: TableOptionsConfig) => ({
  requests: {
    fields: [
      { id: 'requester', label: 'Requester', width: '30%', sortable: false },
      { id: 'assignment', label: 'Assignment', width: '70%', sortable: false },
      // {
      //   id: 'actions',
      //   label: '',
      //   width: '40px',
      //   type: 'customComponent',
      //   component: (props: any) =>
      //     RowActions({ ...props, onModify: config?.onModify }),
      // },
    ],
    rowsPerPageOptions: [2, 5, 10, 25, 50, 100],
  } as CommonTableConfig,
});

export default createTableOptions;
