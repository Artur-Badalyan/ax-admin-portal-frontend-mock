import { useState } from 'react';
import { Flex, Card } from 'antd';
import { Mail, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, Typography } from 'antd';
import type { User as LicenseUser } from '@/lib/types/license.type';
import Modal from '@/components/Modal';
import { useStyles } from '../styles';

interface UsersSectionProps {
  users: LicenseUser[];
  onAssignToExistingUser: () => void;
  onInviteAndAssign: () => void;
  onRevokeUser: (userId: string) => void;
}

const UsersSection = ({
  users,
  onAssignToExistingUser,
  onInviteAndAssign,
  onRevokeUser,
}: UsersSectionProps) => {
  const { styles, cx } = useStyles();
  const { t } = useTranslation();
  const { Text, Title } = Typography;

  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<LicenseUser | null>(null);

  const handleRevokeClick = (user: LicenseUser) => {
    console.log('Selected user for revocation:', user);
    setSelectedUser(user);
    setIsRevokeModalOpen(true);
  };

  const handleRevokeConfirm = () => {
    if (selectedUser) {
      onRevokeUser(selectedUser.id);
      setIsRevokeModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleRevokeCancel = () => {
    setIsRevokeModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <Card>
      <Flex justify="space-between" align="center" gap={12}>
        <div className={styles.sectionHeader}>
          <Title level={4} style={{ margin: 0 }}>
            {t('plantToolsPage.users')}
          </Title>
          <Flex gap={12}>
            <Button onClick={onAssignToExistingUser}>
              {t('plantToolsPage.assignToExistingUser')}
            </Button>
            <Button onClick={onInviteAndAssign}>
              {t('plantToolsPage.inviteAndAssign')}
            </Button>
          </Flex>
        </div>

        {/* <Text size="sm" className="text-slate-600 dark:text-slate-400">
          {licenseDetails.usedSeats} {t('plantToolsPage.used')} /{' '}
          {licenseDetails.totalSeats} {t('plantToolsPage.assignable')}
        </Text> */}
      </Flex>

      {/* Users List */}
      {users.length > 0 && (
        <div className={styles.usersList}>
          {users.map((user) => (
            <div key={user.id}>
              <Flex
                align="center"
                justify="between"
                className={cx(styles.userRow, 'glass')}
              >
                <Flex align="center" gap={12} style={{ width: '100%' }}>
                  {user.status === 'invited' ? (
                    <Mail size={20} />
                  ) : (
                    <div className={cx(styles.userAvatar, 'glass')}>
                      <User size={20} />
                    </div>
                  )}
                  <Flex vertical gap={4}>
                    <Text style={{ fontWeight: 500 }}>
                      {user.firstName} {user.lastName}
                    </Text>
                    <Text type="secondary">{user.email}</Text>
                  </Flex>
                </Flex>
                <Button onClick={() => handleRevokeClick(user)}>
                  {t('plantToolsPage.revoke')}
                </Button>
              </Flex>
            </div>
          ))}
        </div>
      )}

      {/* Revoke Confirmation Modal */}
      <Modal
        isOpen={isRevokeModalOpen}
        onClose={handleRevokeCancel}
        title={t('revokeUserModal.title', 'Revoke License Access')}
        size="3"
        maxWidth="500px"
      >
        <Flex vertical gap={16} style={{ marginTop: 16 }}>
          <Text>
            {t(
              'revokeUserModal.message',
              'Are you sure you want to revoke license access for this user?',
            )}
          </Text>
          {selectedUser && (
            <Card style={{ background: 'var(--color-surface-secondary)' }}>
              <Flex align="center" gap={12}>
                {selectedUser.status === 'invited' ? (
                  <Mail size={20} />
                ) : (
                  <div className={cx(styles.userAvatar, 'glass')}>
                    <User size={20} />
                  </div>
                )}
                <Flex vertical gap={4}>
                  <Text style={{ fontWeight: 500 }}>
                    {selectedUser.firstName} {selectedUser.lastName}
                  </Text>
                  <Text type="secondary">{selectedUser.email}</Text>
                </Flex>
              </Flex>
            </Card>
          )}
          <Flex justify="flex-end" gap={12}>
            <Button onClick={handleRevokeCancel}>
              {t('revokeUserModal.cancel', 'Cancel')}
            </Button>
            <Button type="primary" danger onClick={handleRevokeConfirm}>
              {t('revokeUserModal.confirm', 'Revoke Access')}
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </Card>
  );
};

export default UsersSection;
