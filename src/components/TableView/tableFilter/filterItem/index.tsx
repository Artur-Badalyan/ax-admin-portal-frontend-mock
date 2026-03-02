import FilterSelectField from './filterSelect';

interface FilterItemProps {
  field: {
    id: string;
    type?: string;
    label: string;
    [key: string]: any;
  };
  searchValue: any;
  filteredParams?: any;
  onFilterCallback?: (filters: any) => void;
}

const FIELD_TYPE_COMPONENT_MAP = [
  {
    types: ['select'],
    component: FilterSelectField,
    extraProps: {},
  },
];

const FilterItem = ({
  field,
  searchValue,
  filteredParams,
  onFilterCallback,
}: FilterItemProps) => {
  const config = FIELD_TYPE_COMPONENT_MAP.find(
    (cfg) => field.type && cfg.types.includes(field.type),
  );
  if (!config) return null;

  const { component: Component, extraProps } = config;
  const additionalProps =
    typeof extraProps === 'function' ? extraProps(field) : extraProps;

  return (
    <Component
      field={field}
      onFilterCallback={onFilterCallback}
      searchValue={searchValue}
      filteredParams={filteredParams}
      className="w-[200px]"
      {...additionalProps}
    />
  );
};

export default FilterItem;
