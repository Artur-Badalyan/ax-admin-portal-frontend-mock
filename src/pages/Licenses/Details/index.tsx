import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  User,
  Package,
  Globe,
  Calendar,
  DollarSign,
  FileText,
} from 'lucide-react';
import { Flex, Button, Typography } from 'antd';
import { PageSpinner } from '@/components/Loader';
import { useLicensesStore } from '@/store/licenses.store';

import InviteViaEmailModal from './components/InviteModal';
import AssignAndInviteModal from './components/AssignModal';
import UsersSection from './components/UsersSection';

import { useStyles } from './styles';

export function LicenseDetails() {
  const { styles } = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { licenseId } = useParams<{ licenseId: string }>();
  const { Text, Title } = Typography;

  const licenseDetails = useLicensesStore((state) => state.licenseDetails);
  const detailsLoading = useLicensesStore((state) => state.detailsLoading);
  const getLicenseDetails = useLicensesStore(
    (state) => state.getLicenseDetails,
  );

  const [showAssignAndInviteModal, setShowAssignAndInviteModal] =
    useState(false);
  const [showInviteViaEmailModal, setShowInviteViaEmailModal] = useState(false);

  useEffect(() => {
    if (licenseId) {
      getLicenseDetails(licenseId);
    }
  }, [licenseId]);

  const handleAssignToExistingUser = () => {
    setShowAssignAndInviteModal(true);
  };

  const handleInviteAndAssign = () => {
    setShowInviteViaEmailModal(true);
  };

  const handleInviteUser = (_email: string) => {
    // TODO: implement invite user flow
  };

  const handleRevokeUser = (_userId: string) => {
    // Remove from invited users if it's an invited user
    // setInvitedUsers(invitedUsers.filter((user) => user.id !== userId));
    // Note: For active users, you would typically call an API to revoke
    // For now, we only handle invited users removal
  };

  if (detailsLoading || !licenseDetails) {
    return <PageSpinner />;
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <Flex align="center" gap={12}>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Title
          level={2}
          className="text-slate-900 dark:text-white"
          style={{ margin: 0 }}
        >
          {licenseDetails?.name}
        </Title>
      </Flex>

      {/* Main Content */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
          gap: 24,
        }}
      >
        {/* Left Column - License Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            className="glass"
            style={{
              borderRadius: 16,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <Flex align="center" gap={12}>
              <User size={20} />
              <Text>{licenseDetails?.type}</Text>
              <Button>{t('plantToolsPage.changeSeats')}</Button>
            </Flex>

            <Flex align="center" gap={12}>
              <Package size={20} />
              <Text>
                {t('plantToolsPage.package')}: {licenseDetails?.package}
              </Text>
            </Flex>

            <Flex align="center" gap={12}>
              <Globe size={20} />
              <Text>
                {t('plantToolsPage.region')}: {licenseDetails?.region}
              </Text>
            </Flex>
          </div>
        </div>

        {/* Right Column - Subscription Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            className="glass"
            style={{
              padding: 24,
              borderRadius: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <Flex align="center" gap={12}>
              <Calendar size={20} />
              <Text>
                {t('plantToolsPage.autoRenew')}: {licenseDetails?.autoRenew}
              </Text>
            </Flex>

            <Flex align="center" gap={12}>
              <DollarSign size={20} />
              <Text>
                {t('plantToolsPage.price')}: {licenseDetails?.price}
              </Text>
            </Flex>

            <Flex align="center" gap={12}>
              <FileText size={20} />
              <Text>
                {t('plantToolsPage.cancellationDate')}:{' '}
                {licenseDetails?.cancellationPossible}
              </Text>
            </Flex>

            <Button>{t('plantToolsPage.cancelSubscription')}</Button>
          </div>
        </div>
      </div>

      <UsersSection
        users={licenseDetails.users}
        onAssignToExistingUser={handleAssignToExistingUser}
        onInviteAndAssign={handleInviteAndAssign}
        onRevokeUser={handleRevokeUser}
      />
      <AssignAndInviteModal
        isOpen={showAssignAndInviteModal}
        onClose={() => setShowAssignAndInviteModal(false)}
      />
      <InviteViaEmailModal
        isOpen={showInviteViaEmailModal}
        onClose={() => setShowInviteViaEmailModal(false)}
        onInvite={handleInviteUser}
      />
    </div>
  );
}
