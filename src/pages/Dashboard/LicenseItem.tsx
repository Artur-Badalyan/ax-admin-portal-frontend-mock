import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { UsersIcon, KeyRoundIcon } from 'lucide-react';
import { Card, Divider, Flex, Typography } from 'antd';

import APP_ROUTES from '@/lib/app.routes';

function LicenseItem({ data, license }: { data?: any; license?: any }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { Text, Title } = Typography;

  const handleClick = () => {
    navigate(APP_ROUTES.licenseDetails.path.replace(':licenseId', license.id));
  };

  return (
    <Card
      size="small"
      className="glass"
      hoverable={!!data?.link}
      onClick={handleClick}
    >
      <Flex align="center" justify="space-between" gap={8}>
        {data?.icon === 'users' && <UsersIcon />}
        {data?.icon === 'key' && <KeyRoundIcon />}
        <Flex align="center" gap={8}>
          <Text style={{ color: 'var(--color-text-secondary)' }}>
            {t('dashboard.used')}
          </Text>
          <Text style={{ fontWeight: 600 }}>
            {data?.used}/{data?.count}
          </Text>
        </Flex>
      </Flex>
      <Flex vertical align="center" style={{ marginTop: 16 }}>
        <Title level={5} style={{ margin: '16px 0 0' }}>
          {data?.variant}
        </Title>
        <Divider style={{ margin: '8px 0' }} />
        {data?.list.map((item: string) => (
          <Text key={item}>{item}</Text>
        ))}
        <Divider style={{ margin: '8px 0' }} />
        {data?.listTwo.map((item: string) => (
          <Text key={item}>{item}</Text>
        ))}
      </Flex>
    </Card>
  );
}

export default LicenseItem;
