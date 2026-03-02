import { Button, Badge, Typography } from 'antd';
import { FileTextIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { invoices } from '@/data/billing';
import { useStyles } from './styles';

type InvoicesListProps = {
  year: '2024' | '2025';
  onDownloadAll: (month: string) => void;
  onDownloadInvoice: (date: string) => void;
};

export function InvoicesList({
  year,
  onDownloadAll,
  onDownloadInvoice,
}: InvoicesListProps) {
  const { Text } = Typography;
  const { t } = useTranslation();
  const { styles, cx } = useStyles();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {invoices[year].map((monthData, monthIndex) => (
        <div
          key={monthIndex}
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
            <Text style={{ fontWeight: 500 }}>{monthData.month}</Text>
            <Button onClick={() => onDownloadAll(monthData.month)}>
              {t('billingPage.downloadAll')}
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {monthData.items.map((invoice, invoiceIndex) => (
              <div
                key={invoiceIndex}
                className={cx(styles.monthDataItem, 'glass')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <FileTextIcon size={20} />
                  <Text>{invoice.date}</Text>
                  <Badge
                    count={invoice.status}
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  />
                </div>
                <Button onClick={() => onDownloadInvoice(invoice.date)}>
                  {t('billingPage.download')}
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
