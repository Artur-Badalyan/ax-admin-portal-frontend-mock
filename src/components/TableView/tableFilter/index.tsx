import type { TableFilterProps } from '../../../lib/types/table.type';
import FilterItem from './filterItem';

const TableFilter = ({
  filterFields,
  filteredParams,
  onFilterCallback,
}: TableFilterProps) => {
  if (!filterFields || filterFields.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        alignItems: 'flex-end',
      }}
    >
      {filterFields.map((field) => {
        // let show = true;
        // if (field.show) {
        //   if (!field.show({ currentUser })) {
        //     show = false;
        //   }
        // }

        return (
          <FilterItem
            key={field.id}
            field={field}
            searchValue={filteredParams?.filter?.[field.id] || ''}
            filteredParams={filteredParams}
            onFilterCallback={onFilterCallback}
          />
        );
      })}
    </div>
  );
};

export default TableFilter;
