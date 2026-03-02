import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Typography, Card, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { Building2, Shield } from 'lucide-react';

import { PageSpinner } from '@/components/Loader';
import EmptyDetails from '@/components/EmptyDetails';

import { useAuthStore } from '@/store/auth.store';
import DetailsHeader from '@/components/DetailsHeader';
import { ORGANIZATION_ROLES } from '@/lib/constants';

export function OrganizationDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { Text } = Typography;

  const user = useAuthStore((state) => state.user);
  const organization = user?.organization;
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    // If no user organization is available, redirect back
    if (!isLoading && !organization) {
      navigate('/organizations');
    }
  }, [isLoading, organization, navigate]);

  if (isLoading) {
    return <PageSpinner />;
  }

  if (!organization) {
    return (
      <EmptyDetails
        title={t('orgData.noOrganization')}
        description={t('orgData.noOrganizationDescription')}
      />
    );
  }

  const getRoleColor = (role?: string) => {
    switch (role?.toUpperCase()) {
      case ORGANIZATION_ROLES.ADMIN:
        return 'red';
      case ORGANIZATION_ROLES.MEMBER:
        return 'blue';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
        return 'green-inverse';
      case 'INACTIVE':
        return 'default';
      default:
        return 'processing';
    }
  };

  return (
    <Flex vertical gap={24}>
      <DetailsHeader title={organization.name} />
      <Card
        title={
          <Flex align="center" gap={8}>
            <Building2 className="w-5 h-5" />
            <Text strong>{t('orgData.organizationDetails')}</Text>
          </Flex>
        }
        className="glass"
      >
        <Flex vertical gap={16}>
          {/* Organization ID */}
          <Flex vertical gap={4}>
            <Text type="secondary">{t('orgData.organizationId')}</Text>
            <Text strong>{organization.id}</Text>
          </Flex>

          {/* Organization Name */}
          <Flex vertical gap={4}>
            <Text type="secondary">{t('orgData.organizationName')}</Text>
            <Text strong>{organization.name}</Text>
          </Flex>

          {/* User Role */}
          {organization.role && (
            <Flex vertical gap={4}>
              <Text type="secondary">{t('orgData.yourRole')}</Text>
              <Flex>
                <Tag color={getRoleColor(organization.role)}>
                  {organization.role}
                </Tag>
              </Flex>
            </Flex>
          )}

          {/* Status */}
          {organization.status && (
            <Flex vertical gap={4}>
              <Text type="secondary">{t('orgData.status')}</Text>
              <Flex>
                <Tag color={getStatusColor(organization.status)}>
                  {organization.status}
                </Tag>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Card>

      {/* User Info Card */}
      <Card
        title={
          <Flex align="center" gap={8}>
            <Shield className="w-5 h-5" />
            <Text strong>{t('orgData.yourInformation')}</Text>
          </Flex>
        }
        className="glass"
      >
        <Flex vertical gap={16}>
          {/* User Name */}
          <Flex vertical gap={4}>
            <Text type="secondary">{t('orgData.fullName')}</Text>
            <Text strong>
              {user?.firstName} {user?.lastName}
            </Text>
          </Flex>

          {/* User Email */}
          <Flex vertical gap={4}>
            <Text type="secondary">{t('orgData.email')}</Text>
            <Text strong>{user?.email}</Text>
          </Flex>

          {/* User ID */}
          <Flex vertical gap={4}>
            <Text type="secondary">{t('orgData.userId')}</Text>
            <Text strong>{user?.id}</Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
