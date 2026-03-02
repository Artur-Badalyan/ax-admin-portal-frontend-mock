import React from 'react';
import { Card, Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/common/Button';

const { Title, Text } = Typography;

interface EmptyInvitationsStateProps {
  onCreateOrganization: () => void;
  className?: string;
}

/**
 * Empty state component when user has no pending invitations
 * Encourages creating a new organization
 */
export const EmptyInvitationsState: React.FC<EmptyInvitationsStateProps> = ({
  onCreateOrganization,
  className,
}) => {
  const { t } = useTranslation();

  return (
    <Card className={className}>
      <Flex vertical gap={12} align="center">
        <Title level={4} style={{ textAlign: 'center' }}>
          {t('auth.invitation.noPendingInvitations')}
        </Title>
        <Text type="secondary" style={{ textAlign: 'center' }}>
          {t('auth.invitation.createNewOrganization')}
        </Text>
        <Button onClick={onCreateOrganization}>
          {t('auth.invitation.createOrganization')}
        </Button>
      </Flex>
    </Card>
  );
};
