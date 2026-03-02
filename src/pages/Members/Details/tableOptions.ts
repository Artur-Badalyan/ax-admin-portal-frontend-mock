import type { CommonTableConfig } from '../../../lib/types/table.type';
import RevokeButton from './components/RevokeButton';

type TableOptionsConfig = {
  onRevoke?: (data: any) => void;
};

const createTableOptions = (config?: TableOptionsConfig) => ({
  licenses: {
    fields: [
      {
        id: 'productName',
        label: 'Product',
        width: '20%',
        sortable: false,
      },
      {
        id: 'package',
        label: 'Package',
        width: '20%',
        sortable: false,
      },
      {
        id: 'licenseType',
        label: 'Licence-Type',
        width: '20%',
        sortable: false,
      },
      {
        id: 'renewalDate',
        label: 'Renewal date',
        width: '20%',
        sortable: false,
      },
      {
        id: 'region',
        label: 'Region',
        width: '10%',
        sortable: false,
      },
      {
        id: 'actions',
        label: '',
        width: '10%',
        type: 'customComponent',
        component: (props: any) =>
          RevokeButton({
            ...props,
            customProps: { onRevoke: config?.onRevoke },
          }),
      },
    ],
    rowsPerPageOptions: [5, 10, 25],
  } as CommonTableConfig,
});

export default createTableOptions;
