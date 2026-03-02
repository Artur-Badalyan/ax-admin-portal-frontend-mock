import qs from 'qs';
import { useState } from 'react';
import { Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { requests, type RequestItem } from '@/data/requests';
import CommonTable from '@/components/TableView';
import type { QueryParams } from '@/lib/types/table.type';
import ROUTES from '@/lib/app.routes';
import createTableOptions from './tableOptions';
import ModifyAssignedLicenseModal from './components/ModifyAssignedLicenseModal';

export function RequestsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMemberName, setSelectedMemberName] = useState('');

  const handleSelect = (rows: string[]) => {
    setSelectedFiles(rows);
  };

  const handleModify = (data: RequestItem) => {
    setSelectedMemberName(data.requester);
    setIsModalOpen(true);
  };

  const pageParams = qs.parse(location.search, { ignoreQueryPrefix: true });

  const queryParams = {
    sort: pageParams?.sort || { field: 'id', order: 'asc' },
    filter: pageParams?.filter || {},
    limit: pageParams?.limit || 10,
    offset: pageParams?.offset || 0,
    search: pageParams?.search || '',
  } as unknown as QueryParams;

  const selectedCount = selectedFiles.length;

  const tableOptions = createTableOptions({ onModify: handleModify });

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={2} style={{ margin: 0 }}>
        {t('requestsPage.title')}
      </Typography.Title>

      <CommonTable
        tableSource={{ data: requests, count: requests.length }}
        tableConfig={tableOptions.requests}
        toolbarActions={[
          {
            action: 'accept',
            label: t('table.actions.accept', { acceptCount: selectedCount }),
            visibleWithoutSelection: true,
            callback: () => {
              console.log('Accepting:', selectedFiles);
            },
          },
          {
            action: 'reject',
            label: t('table.actions.reject', { rejectCount: selectedCount }),
            visibleWithoutSelection: true,
            callback: () => {
              console.log('Rejecting:', selectedFiles);
            },
          },
        ]}
        selectedRows={selectedFiles}
        setSelectedRows={handleSelect}
        onRowClick={(row) =>
          navigate(ROUTES.requestDetails.path.replace(':id', row.id))
        }
        getDataOnChange={() => {}}
        filteredParams={queryParams}
        setFilteredParams={() => {}}
        isSelectable
        loading={false}
        rowUniqueKey="id"
      />

      <ModifyAssignedLicenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        memberName={selectedMemberName}
      />
    </Flex>
  );
}
