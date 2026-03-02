import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, Typography } from 'antd';
import useDebounce from '../../../../../lib/hooks/useDebounce';

interface FieldOption {
  id?: string | number;
  value?: string | number;
  title: string;
}

interface Field {
  id: string;
  label: string;
  maxWidth?: number;
  selectedClassName?: string;
  insteadNone?: string;
  options: FieldOption[] | ((params: any) => Promise<any>);
  adapterCallback: (data: any) => FieldOption[];
}

interface CustomFilterSelectProps {
  field: Field;
  onFilterCallback?: (value: Record<string, any>) => void;
  searchValue: any;
  sx?: React.CSSProperties;
  className?: string;
}

const CustomFilterSelect: React.FC<CustomFilterSelectProps> = ({
  field,
  onFilterCallback,
  searchValue,
  sx = {},
  className,
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] =
    React.useState<Record<string, any>>(searchValue);
  const debouncedValue = useDebounce(
    typeof searchTerm === 'object' ? searchTerm : { [field?.id]: searchTerm },
    1000,
  );
  const [modifiedOptions, setModifiedOptions] = useState<FieldOption[]>([]);

  useEffect(() => {
    setSearchTerm({ [field.id]: searchValue });
  }, [field, searchValue]);

  useEffect(() => {
    if (onFilterCallback) {
      onFilterCallback(debouncedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useEffect(() => {
    if (typeof field.options === 'function') {
      const newParams = {};
      field.options(newParams).then((res: any) => {
        setModifiedOptions(field.adapterCallback(res.data.data));
      });
    } else {
      setModifiedOptions(field.options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field]);

  const handleValueChange = (value: string) => {
    const actualValue = value === '__none__' ? '' : value;
    setSearchTerm({ [field.id]: actualValue });
  };

  return (
    <div
      style={{ minWidth: 200, marginRight: 16, ...sx }}
      className={className}
    >
      {field.label && (
        <Typography.Text style={{ display: 'block', marginBottom: 6 }}>
          {t(field.label) || field.label}
        </Typography.Text>
      )}
      <Select
        value={
          searchTerm?.[field.id] ? String(searchTerm[field.id]) : '__none__'
        }
        onChange={handleValueChange}
        style={{ width: '100%' }}
        options={[
          {
            value: '__none__',
            label: field.insteadNone || t('common.none') || 'None',
          },
          ...modifiedOptions.map((opt) => ({
            value: String(opt.id ?? opt.value),
            label: opt.title,
          })),
        ]}
      />
    </div>
  );
};

export default CustomFilterSelect;
