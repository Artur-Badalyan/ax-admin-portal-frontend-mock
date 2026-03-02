import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import APP_ROUTES from '@/lib/app.routes';
import { useAuthStore } from '@/store/auth.store';
import { PageSpinner } from '@/components/Loader';
import {
  InvitationCard,
  CreateOrganizationModal,
  EmptyInvitationsState,
  useInvitationActions,
  usePendingInvitations,
} from '@/pages/Auth/shared';

import { useStyles } from './styles';

const { Title, Text } = Typography;

export const OrganizationSelectionPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { styles } = useStyles();

  const user = useAuthStore((state) => state.user);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const hasOrganization = useMemo(
    () => !!user?.organization?.id,
    [user?.organization?.id],
  );

  // Use shared hooks for invitation management
  const {
    invitations: pendingInvites,
    loading,
    error: errorMessage,
    reload: loadPendingInvites,
  } = usePendingInvitations();

  const {
    handleAccept,
    handleDecline,
    loading: actionLoading,
  } = useInvitationActions({
    onSuccess: loadPendingInvites,
  });

  // Redirect if user already has an organization
  useEffect(() => {
    if (hasOrganization && user?.organization?.id) {
      navigate(
        APP_ROUTES.organizationDetails.path.replace(':id', user.organization.id),
        {
          replace: true,
        },
      );
    }
  }, [hasOrganization, navigate, user?.organization?.id]);

  const handleOrganizationCreated = () => {
    navigate(APP_ROUTES.dashboard.path);
  };

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2}>{t('auth.invitation.chooseYourOrg')}</Title>
          <Text type="secondary">{t('auth.invitation.chooseYourOrgDesc')}</Text>
        </div>

        {errorMessage ? (
          <Card className={styles.emptyState}>
            <Text type="danger">{errorMessage}</Text>
          </Card>
        ) : pendingInvites.length === 0 ? (
          <EmptyInvitationsState
            onCreateOrganization={() => setCreateModalOpen(true)}
            className={styles.emptyState}
          />
        ) : (
          <div className={styles.cards}>
            {pendingInvites.map((invite) => {
              const invitationId = invite.invitationId || invite.id;
              return (
                <InvitationCard
                  key={invitationId}
                  invitation={invite}
                  onAccept={() => handleAccept(invitationId)}
                  onDecline={() => handleDecline(invitationId, true)}
                  loading={actionLoading}
                  variant="card"
                />
              );
            })}
          </div>
        )}
      </div>

      <CreateOrganizationModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={handleOrganizationCreated}
      />
    </div>
  );
};
