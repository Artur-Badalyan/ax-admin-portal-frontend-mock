import React from 'react';
import { useTranslation } from 'react-i18next';
// Note: The following UI components need to be created in src/components/ui/
// For now, these imports will cause errors until the components are created
import { Pagination, Select, Flex } from 'antd';

interface CustomPaginationProps {
  currentPage: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  totalCount: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  rowsPerPage,
  rowsPerPageOptions,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const { t } = useTranslation();
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalCount);

  return (
    <Flex align="center" justify="space-between" style={{ width: '100%' }}>
      <Flex align="center" gap={8}>
        <span>{t('table.rowsPerPage')}:</span>
        <Select
          value={rowsPerPage.toString()}
          onChange={(value) => onRowsPerPageChange(parseInt(value, 10))}
          options={rowsPerPageOptions.map((option) => ({
            value: option.toString(),
            label: option.toString(),
          }))}
          style={{ width: 80 }}
        />
      </Flex>

      <Flex align="center" gap={16}>
        <span>
          {t('table.previousPageOfTotalPages', {
            startItem: startItem,
            endItem: endItem,
            totalCount: totalCount,
          })}
        </span>
        <Pagination
          current={currentPage}
          total={totalCount}
          pageSize={rowsPerPage}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      </Flex>
    </Flex>
  );
};

export default CustomPagination;
