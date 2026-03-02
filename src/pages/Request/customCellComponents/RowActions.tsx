import { Dropdown, Button, Flex } from 'antd';
import { MoreVertical } from 'lucide-react';

import { type RequestItem } from '@/data/requests';

type RowActionsProps = {
  data: RequestItem;
  onModify?: (data: RequestItem) => void;
};

const RowActions = ({ data, onModify }: RowActionsProps) => (
  <Flex justify="flex-end" align="center">
    <Dropdown
      menu={{
        items: [
          {
            key: 'accept',
            label: 'Accept',
            onClick: () => console.log('Accept', data.id),
          },
          {
            key: 'reject',
            label: 'Reject',
            onClick: () => console.log('Reject', data.id),
          },
          {
            key: 'modify',
            label: 'Modify',
            onClick: () => {
              if (onModify) {
                onModify(data);
              } else {
                console.log('Modify', data.id);
              }
            },
          },
        ],
      }}
      trigger={['click']}
    >
      <Button type="text" icon={<MoreVertical size={16} />} />
    </Dropdown>
  </Flex>
);

export default RowActions;
