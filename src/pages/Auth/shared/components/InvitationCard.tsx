import React from 'react';
import { Card, Divider, Flex, Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { cx } from 'antd-style';

import { Button } from '@/components/common/Button';
import type { PendingInvitation, InviteMeta } from '@/lib/types/auth.type';

import { useInvitationCardStyles } from '../styles/InvitationCard.styles';

const { Title, Text } = Typography;

interface InvitationCardProps {
  invitation: PendingInvitation | InviteMeta;
  onAccept: () => void;
  onDecline: () => void;
  loading?: boolean;
  variant?: 'card' | 'detailed';
  showActions?: boolean;
}

/**
 * Reusable invitation card component
 * Supports both list view (OrganizationSelection) and single view (AuthInvitation)
 */
export const InvitationCard: React.FC<InvitationCardProps> = ({
  invitation,
  onAccept,
  onDecline,
  loading = false,
  variant = 'card',
  showActions = true,
}) => {
  const { t } = useTranslation();
  const { styles } = useInvitationCardStyles();

  const isExpired = invitation.isExpired ?? false;
  const statusLabel = isExpired ? 'Expired' : invitation.status || 'Pending';

  const organizationName =
    (invitation as any).organizationName ||
    (invitation as any).organization?.name ||
    'Organization';

  const inviterName =
    (invitation as any).inviterName ||
    (invitation as any).inviterEmail ||
    t('auth.invitation.unknown');

  const invitedAt =
    (invitation as any).invitedAt || (invitation as any).createdAt;
  const expiresAt = invitation.expiresAt;
  const email = (invitation as any).email;

  if (variant === 'detailed') {
    return (
      <div className={styles.detailedContainer}>
        <div className={styles.header}>
          <Title level={3} className={styles.title}>
            Join {organizationName}
          </Title>
          <Tag color={isExpired ? 'red' : 'gold'} className={styles.statusTag}>
            {statusLabel}
          </Tag>
        </div>

        <div className={styles.metaGrid}>
          <MetaItem
            label={t('auth.invitation.organizationName')}
            value={organizationName}
          />
          {email && (
            <MetaItem label={t('auth.invitation.invitedEmail')} value={email} />
          )}
          <MetaItem
            label={t('auth.invitation.invitedBy')}
            value={inviterName}
          />
          <MetaItem
            label={t('auth.invitation.status')}
            value={statusLabel}
            highlight
          />
          {invitedAt && (
            <MetaItem
              label={t('auth.invitation.invitedDate')}
              value={new Date(invitedAt).toLocaleString()}
            />
          )}
          {expiresAt && (
            <MetaItem
              label={t('auth.invitation.expires')}
              value={new Date(expiresAt).toLocaleString()}
              warning={isExpired}
            />
          )}
        </div>

        {showActions && (
          <div className={styles.actions}>
            <Button
              variant="solid"
              onClick={onAccept}
              disabled={isExpired || loading}
            >
              {t('common.accept')}
            </Button>
            <Button variant="outline" onClick={onDecline} disabled={loading}>
              {t('common.reject')}
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Card variant for list view
  return (
    <Card
      className={cx(styles.card, 'glass')}
      title={organizationName}
      extra={<Tag color={isExpired ? 'red' : 'gold'}>{statusLabel}</Tag>}
    >
      <div className={styles.meta}>
        <Flex gap={4} align="center" className={styles.dataRow}>
          <Title level={5}>{t('auth.invitation.invitedBy')}</Title>
          <Divider vertical style={{ borderWidth: 1, height: '100%' }} />
          <Text>{inviterName}</Text>
        </Flex>
        {invitedAt && (
          <Flex gap={4} align="center" className={styles.dataRow}>
            <Title level={5}>{t('auth.invitation.invitedDate')}</Title>
            <Divider vertical style={{ borderWidth: 1, height: '100%' }} />
            <Text>{new Date(invitedAt).toLocaleString()}</Text>
          </Flex>
        )}
        {expiresAt && (
          <Flex gap={4} align="center" className={styles.dataRow}>
            <Title level={5}>{t('auth.invitation.expires')}</Title>
            <Divider vertical style={{ borderWidth: 1, height: '100%' }} />
            <Text>{new Date(expiresAt).toLocaleString()}</Text>
          </Flex>
        )}
      </div>

      {showActions && (
        <div className={styles.actions}>
          <Button
            disabled={isExpired || loading}
            onClick={onAccept}
            variant="outline"
          >
            {t('common.accept')}
          </Button>
          <Button onClick={onDecline} disabled={loading} variant="outline">
            {t('common.reject')}
          </Button>
        </div>
      )}
    </Card>
  );
};

/**
 * Meta item component for detailed view
 */
interface MetaItemProps {
  label: string;
  value: string;
  highlight?: boolean;
  warning?: boolean;
}

const MetaItem: React.FC<MetaItemProps> = ({
  label,
  value,
  highlight,
  warning,
}) => {
  const { styles } = useInvitationCardStyles();

  return (
    <div
      className={cx(
        styles.metaItem,
        highlight && styles.metaItemHighlight,
        warning && styles.metaItemWarning,
      )}
    >
      <Text className={styles.metaLabel}>{label}</Text>
      <Text className={styles.metaValue}>{value}</Text>
    </div>
  );
};
