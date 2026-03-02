import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Button, Collapse, Flex, Space } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import {
  Trash2,
  Edit,
  Download,
  Eye,
  Copy,
  Plus,
  Upload,
  ListCheckIcon,
  FileTextIcon,
} from 'lucide-react';

import SimpleSearch from '../SimpleSearch';
import type {
  CommonToolbarType,
  ToolbarActionsProps,
} from '../../../lib/types/table.type';
import TableFilter from '../tableFilter';

const CommonToolbar = ({
  searchValue,
  filterFields,
  numSelected,
  filteredParams,
  toolbarActions = [],
  onSearchCallback,
  onFilterCallback,
}: CommonToolbarType) => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div style={{ marginBottom: 16 }}>
      <Flex
        justify="space-between"
        align="center"
        gap={16}
        style={{ marginBottom: 12 }}
      >
        <Flex align="center" gap={12}>
          {filterFields && filterFields.length > 0 && (
            <Space>
              <Button
                icon={<FilterOutlined />}
                onClick={() => setIsFilterOpen((prev) => !prev)}
              />

              {numSelected > 0 && <Badge count={numSelected} />}
            </Space>
          )}

          <div style={{ flex: 1, maxWidth: 360 }}>
            <SimpleSearch
              searchValue={searchValue}
              onSearchCallback={onSearchCallback}
              placeholder="Search..."
            />
          </div>
        </Flex>

        <Space>{renderToolbarActions(t, toolbarActions, numSelected)}</Space>
      </Flex>

      {filterFields && filterFields.length > 0 && (
        <Collapse
          activeKey={isFilterOpen ? ['filters'] : []}
          items={[
            {
              key: 'filters',
              label: t('table.filters') || 'Filters',
              children: (
                <TableFilter
                  filterFields={filterFields}
                  filteredParams={filteredParams}
                  onFilterCallback={onFilterCallback}
                />
              ),
            },
          ]}
        />
      )}
    </div>
  );
};

// ----------------------------------------------------------------------

function renderToolbarActions(
  t: (key: string) => string,
  actions: ToolbarActionsProps[],
  numSelected: number,
) {
  const { i18n } = useTranslation();

  if (!actions || actions.length === 0) return null;

  return (
    <Space>
      {actions.map((item) => {
        const isTitleView = Object.keys(item).includes('titleView')
          ? item.titleView
          : true;
        return (
          <Button
            key={item.action}
            onClick={() => item.callback()}
            disabled={item.visibleWithoutSelection ? false : numSelected === 0}
          >
            <span style={{ marginRight: 6 }}>
              {getIconForAction(item.action)}
            </span>
            {isTitleView && (
              <span>
                {item.label
                  ? i18n.exists(item.label)
                    ? t(item.label)
                    : item.label
                  : t(`table.actions.${item.action}`)}
              </span>
            )}
          </Button>
        );
      })}
    </Space>
  );
}

function getIconForAction(action: string) {
  const classes = 'h-4 w-4';

  switch (action) {
    case 'delete':
      return <Trash2 className={classes} />;
    case 'edit':
      return <Edit className={classes} />;
    case 'download':
      return <Download className={classes} />;
    case 'open':
      return <Eye className={classes} />;
    case 'clone':
      return <Copy className={classes} />;
    case 'create':
      return <Plus className={classes} />;
    case 'upload':
      return <Upload className={classes} />;
    case 'view':
      return <Eye className={classes} />;
    case 'check':
      return <ListCheckIcon className={classes} />;
    case 'print':
      return <FileTextIcon className={classes} />;
    case 'compare':
      return <Copy className={classes} />;
    case 'convert':
      return <Upload className={classes} />;
    default:
      return null;
  }
}

export default CommonToolbar;
