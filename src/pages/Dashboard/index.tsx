import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  CheckCircleIcon,
  CircleAlertIcon,
  CircleChevronRightIcon,
} from 'lucide-react';

import { useLicensesStore } from '@/store/licenses.store';
import { Badge, Card, Divider, Row, Col, Typography } from 'antd';
import { PageSpinner } from '@/components/Loader';

import { dashboardStats, ProjectTools } from '@/data/dashboard';
import LicenseItem from './LicenseItem';
import { useStyles } from './styles';

export function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { styles, cx } = useStyles();

  const licenses = useLicensesStore((state) => state.licenses);
  const listLoading = useLicensesStore((state) => state.listLoading);
  const getLicenses = useLicensesStore((state) => state.getLicenses);
  const hasFetchedLicenses = useLicensesStore(
    (state) => state.hasFetchedLicenses,
  );

  useEffect(() => {
    if (!hasFetchedLicenses) {
      getLicenses();
    }
  }, [getLicenses, hasFetchedLicenses]);

  const handleNavigate = (link?: string) => {
    if (link) {
      navigate(link);
    }
  };

  if (listLoading) {
    return <PageSpinner />;
  }

  return (
    <div className={styles.container}>
      <Card className="glass">
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <div className={styles.titleGroup}>
              <Typography.Title level={3}>
                {t('dashboard.licenseManagement')}
              </Typography.Title>
            </div>
          </div>

          <Divider size="small" />

          <Row gutter={[12, 12]}>
            {dashboardStats.map((stat) => (
              <Col key={stat.title} xs={24} md={8}>
                <Card
                  hoverable={!!stat.link}
                  onClick={() => handleNavigate(stat.link)}
                  className={cx(
                    'glass',
                    stat.link && styles.statCard,
                    stat.link && 'clickable',
                  )}
                >
                  <div className={styles.statContent}>
                    {stat.icon === 'check' && (
                      <CheckCircleIcon width={32} height={32} />
                    )}
                    {stat.icon === 'issue' && (
                      <CircleAlertIcon width={32} height={32} />
                    )}
                    <div className={styles.statText}>
                      <Typography.Text>{t(stat.title)}</Typography.Text>
                      <Badge
                        count={t(stat.description, { count: 2 })}
                        color={stat.tone === 'positive' ? 'green' : 'orange'}
                      />
                    </div>
                    {stat.link && <CircleChevronRightIcon size={18} />}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Card>

      <div>
        <Row gutter={[24, 24]}>
          {licenses.map((license) => (
            <Col key={license.productName} xs={24} sm={12} md={12} lg={8}>
              <Card size="small" className={cx(styles.licenseCard, 'glass')}>
                <Typography.Title level={3}>
                  {license.productName || license.name}
                </Typography.Title>
                <Row gutter={[12, 12]} className={styles.licenseRow}>
                  {ProjectTools.map((tool, index) => (
                    <Col key={index} xs={24} md={8}>
                      <LicenseItem license={license} data={tool} />
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
