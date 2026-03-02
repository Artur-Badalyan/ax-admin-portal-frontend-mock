import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Table, Tooltip, Button } from 'antd';
import { Check, X, Edit, Trash2, Eye, Download, Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type {
  QueryParams,
  CommonTableProps,
  SortObj,
  TableField,
} from '../../lib/types/table.type';

import CommonToolbar from './toolbar';

const CommonTable = ({
  tableSource,
  tableConfig,
  filteredParams,
  isSelectable = false,
  selectedRows = [],
  rowUniqueKey = 'id',
  emptyMessage = 'No data available.',
  withOpenAction = false,
  withEditAction = false,
  withDownloadAction = false,
  withCloneAction = false,
  withRemoveAction = false,
  withPagination = true,
  loading = false,

  toolbarActions = [],

  openPath,
  handleClickIcon,
  handleOpenAction,
  handleEditAction,
  handleDownloadAction,
  handleRemoveAction,
  setSelectedRows,
  setFilteredParams,

  onSearchCallback,
  onFilterCallback,

  onRowClick,
  getDataOnChange,
}: CommonTableProps) => {
  const { t } = useTranslation();
  const { fields, filterFields, rowsPerPageOptions } = tableConfig;
  const { data: tableData, count } = tableSource;

  const { limit = 10, offset = 0 } = filteredParams ?? {};
  const sortObj = filteredParams?.sort as SortObj | undefined;

  useEffect(() => {
    if (!filteredParams?.limit) {
      const next = { ...filteredParams, limit: 10, offset: 0 } as QueryParams;
      setFilteredParams(next);
      getDataOnChange(next);
    }
  }, []);

  const currentPage = Math.floor(Number(offset) / Number(limit)) + 1;

  const columns = useMemo(() => {
    const baseColumns = fields.map((field: TableField) => {
      const id = field.orderField || field.id;
      const sortOrder =
        sortObj?.field === id
          ? sortObj.order === 'asc'
            ? 'ascend'
            : 'descend'
          : undefined;

      return {
        title: field.label ? t(field.label) : '',
        dataIndex: field.id,
        key: field.id,
        align: field.headAlign || 'left',
        width: field.width,
        sorter: !!field.sortable,
        sortOrder,
        render: (_: unknown, record: Record<string, any>) => {
          const rawValue = field.getValue
            ? field.getValue(record)
            : record[field.id];

          if (field.type === 'customComponent' && field.component) {
            return field.component({
              data: record,
              cellItem: field,
              filteredParams,
            });
          }

          if (field.type === 'link' && field.route) {
            const routeId = field.routeIdKey
              ? record[field.routeIdKey]
              : record.id;
            const to = `${field.route}/${routeId}`;
            return field.newTab ? (
              <a href={to} target="_blank" rel="noreferrer">
                {rawValue}
              </a>
            ) : (
              <Link to={to}>{rawValue}</Link>
            );
          }

          if (field.type === 'img') {
            return (
              <img
                src={rawValue}
                alt=""
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            );
          }

          if (field.type === 'bool') {
            return rawValue ? <Check size={16} /> : <X size={16} />;
          }

          const content = rawValue ?? '';
          return field.withTooltip ? (
            <Tooltip title={content}>
              <span>{content}</span>
            </Tooltip>
          ) : (
            <span>{content}</span>
          );
        },
      };
    });

    const actionColumns = [] as any[];

    if (withEditAction) {
      actionColumns.push({
        title: '',
        key: 'edit',
        width: 48,
        render: (_: unknown, record: any) => (
          <Button
            type="text"
            icon={<Edit size={16} />}
            onClick={() => handleEditAction?.(record.id)}
          />
        ),
      });
    }

    if (withDownloadAction) {
      actionColumns.push({
        title: '',
        key: 'download',
        width: 48,
        render: (_: unknown, record: any) => (
          <Button
            type="text"
            icon={<Download size={16} />}
            onClick={() => handleDownloadAction?.(record.id)}
          />
        ),
      });
    }

    if (withOpenAction) {
      actionColumns.push({
        title: '',
        key: 'open',
        width: 48,
        render: (_: unknown, record: any) => {
          if (handleOpenAction) {
            return (
              <Button
                type="text"
                icon={<Eye size={16} />}
                onClick={() => handleOpenAction(record)}
              />
            );
          }
          if (openPath) {
            return (
              <Link to={openPath(record)}>
                <Button type="text" icon={<Eye size={16} />} />
              </Link>
            );
          }
          if (handleClickIcon) {
            return (
              <Button
                type="text"
                icon={<Eye size={16} />}
                onClick={() => handleClickIcon(record)}
              />
            );
          }
          return null;
        },
      });
    }

    if (withCloneAction) {
      actionColumns.push({
        title: '',
        key: 'clone',
        width: 48,
        render: (_: unknown, record: any) => (
          <Button
            type="text"
            icon={<Copy size={16} />}
            onClick={() => handleClickIcon?.(record)}
          />
        ),
      });
    }

    if (withRemoveAction) {
      actionColumns.push({
        title: '',
        key: 'remove',
        width: 48,
        render: (_: unknown, record: any) => (
          <Button
            type="text"
            danger
            icon={<Trash2 size={16} />}
            onClick={() => handleRemoveAction?.(record.id)}
          />
        ),
      });
    }

    return [...baseColumns, ...actionColumns];
  }, [
    fields,
    sortObj?.field,
    sortObj?.order,
    filteredParams,
    withEditAction,
    withDownloadAction,
    withOpenAction,
    withCloneAction,
    withRemoveAction,
    handleEditAction,
    handleDownloadAction,
    handleRemoveAction,
    handleOpenAction,
    handleClickIcon,
    openPath,
    t,
  ]);

  const rowSelection = isSelectable
    ? {
        selectedRowKeys: selectedRows,
        onChange: (keys: React.Key[]) => setSelectedRows?.(keys as any),
      }
    : undefined;

  const handleTableChange = (
    pagination: { current?: number; pageSize?: number },
    _filters: any,
    sorter: any,
  ) => {
    const next: QueryParams = {
      ...filteredParams,
      limit: pagination.pageSize ?? limit,
      offset: ((pagination.current ?? 1) - 1) * (pagination.pageSize ?? limit),
    };

    if (sorter?.field && sorter?.order) {
      next.sort = {
        field: sorter.field,
        order: sorter.order === 'ascend' ? 'asc' : 'desc',
      };
    }

    setFilteredParams(next);
    getDataOnChange(next);
  };

  return (
    <div>
      <CommonToolbar
        searchValue={filteredParams?.search?.value || ''}
        numSelected={selectedRows.length}
        filterFields={filterFields}
        filteredParams={filteredParams}
        toolbarActions={toolbarActions}
        onSearchCallback={onSearchCallback}
        onFilterCallback={onFilterCallback}
      />

      <Table
        rowKey={rowUniqueKey}
        columns={columns}
        dataSource={tableData}
        loading={loading}
        rowSelection={rowSelection}
        onChange={handleTableChange}
        locale={{ emptyText: emptyMessage }}
        onRow={(record) => ({
          onClick: () => onRowClick?.(record),
        })}
        pagination={
          withPagination
            ? {
                current: currentPage,
                pageSize: Number(limit),
                total: count,
                showSizeChanger: true,
                pageSizeOptions: rowsPerPageOptions?.map(String),
              }
            : false
        }
        style={{
          borderRadius: 8,
          overflow: 'hidden',
        }}
      />
    </div>
  );
};

export default CommonTable;
