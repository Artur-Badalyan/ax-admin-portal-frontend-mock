import { Flex, Typography, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import APP_ROUTES from '@/lib/app.routes';

export function Organizations() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const organization = user?.organization;

  const handleViewDetails = () => {
    if (organization?.id) {
      navigate(
        APP_ROUTES.organizationDetails.path.replace(':id', organization.id),
      );
    }
  };

  return (
    <Flex vertical gap={24}>
      <Flex vertical gap={8}>
        <Typography.Title level={2}>{t('orgData.title')}</Typography.Title>
        <Typography.Text type="secondary" style={{ fontSize: 16 }}>
          {t('orgData.subtitle')}
        </Typography.Text>
      </Flex>

      {organization && (
        <Card
          hoverable
          style={{ width: 'fit-content', borderRadius: 8 }}
          className="glass"
          onClick={handleViewDetails}
        >
          <Flex justify="space-between" align="center">
            <Flex gap={16} align="center">
              <Flex vertical gap={4}>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  {t('orgData.currentOrganization')}
                </Typography.Text>
                <Typography.Text strong style={{ fontSize: 16 }}>
                  {organization.name}
                </Typography.Text>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      )}

      {!organization && (
        <Card style={{ borderRadius: 8, textAlign: 'center', padding: 32 }}>
          <Flex vertical gap={16} align="center">
            <Building2 className="w-12 h-12 text-gray-400" />
            <Typography.Text type="secondary" style={{ fontSize: 16 }}>
              {t('orgData.noOrganizationDescription')}
            </Typography.Text>
          </Flex>
        </Card>
      )}
    </Flex>
  );
}
