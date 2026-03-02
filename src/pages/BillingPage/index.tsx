import { useState } from 'react';
import { CreditCardIcon, ClockIcon, DollarSignIcon } from 'lucide-react';
import { Space, Tabs, Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { paymentMethod, upcomingPayments } from '@/data/billing';
import { InvoicesList } from './invoices';
import { useStyles } from './styles';

export function BillingPage() {
  const { Text, Title } = Typography;
  const [selectedYear, setSelectedYear] = useState('2025');
  const { t } = useTranslation();
  const { styles, cx } = useStyles();

  const handleDownloadInvoice = (date: string) => {
    console.log('Download invoice:', date);
    // Implement download logic here
  };

  const handleDownloadAll = (month: string) => {
    console.log('Download all for:', month);
    // Implement download all logic here
  };

  return (
    <div className={styles.page}>
      <div>
        <Title level={2} className={styles.pageTitle}>
          {t('billingPage.title')}
        </Title>
      </div>

      <div className={styles.grid}>
        <div className={styles.leftColumn}>
          <div className={cx('glass', styles.card)}>
            <Space className={styles.row}>
              <Space>
                <CreditCardIcon size={20} />
                <Text>
                  {t('billingPage.method')}: {paymentMethod.type}{' '}
                  {paymentMethod.last4}
                </Text>
              </Space>
              <Button>{t('billingPage.change')}</Button>
            </Space>
            <Space>
              <ClockIcon size={20} />
              <Text>
                {t('billingPage.expires')}: {paymentMethod.expires}
              </Text>
            </Space>
          </div>

          <div className={cx('glass', styles.card)}>
            <div className={styles.row}>
              <DollarSignIcon size={20} />
              <Text className={styles.mediumText}>
                {t('billingPage.upcomingPayments')}
              </Text>
            </div>
            <div className={styles.upcomingList}>
              {upcomingPayments.map((payment, index) => (
                <div key={index} className={styles.upcomingItem}>
                  <Text className={styles.secondaryText}>{payment.month}</Text>
                  <Text className={styles.mediumText}>{payment.amount}</Text>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={cx('glass', styles.tabCard)}>
          <Tabs
            activeKey={selectedYear}
            onChange={setSelectedYear}
            items={[
              {
                key: '2025',
                label: '2025',
                children: (
                  <InvoicesList
                    year="2025"
                    onDownloadAll={handleDownloadAll}
                    onDownloadInvoice={handleDownloadInvoice}
                  />
                ),
              },
              {
                key: '2024',
                label: '2024',
                children: (
                  <InvoicesList
                    year="2024"
                    onDownloadAll={handleDownloadAll}
                    onDownloadInvoice={handleDownloadInvoice}
                  />
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
