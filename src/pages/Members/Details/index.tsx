import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Typography, Card, Button, Select } from 'antd';
import { PageSpinner } from '@/components/Loader';
import { useTranslation } from 'react-i18next';
import { FileText, Key } from 'lucide-react';
import EmptyDetails from '@/components/EmptyDetails';
import { Modal } from '@/components/Modal';

import { ORGANIZATION_ROLES } from '@/lib/constants';
import { useMembersStore } from '@/store/member.store';
import { useAuthStore } from '@/store/auth.store';

import type { QueryParams } from '../../../lib/types/table.type';
import CommonTable from '../../../components/TableView';
import AssignLicenseModal from './components/AssignLicenseModal';
import createTableOptions from './tableOptions';
import DetailsHeader from '@/components/DetailsHeader';

export function MemberDetails() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { Text } = Typography;

  const user = useAuthStore((state) => state.user);
  const isProfile = user?.id === id;

  const member = useMembersStore((state) => state.memberDetails);
  const detailsLoading = useMembersStore((state) => state.detailsLoading);
  const setMemberDetails = useMembersStore((state) => state.setMemberDetails);
  const fetchMemberDetails = useMembersStore(
    (state) => state.fetchMemberDetails,
  );
  const removeCustomerFromOrg = useMembersStore(
    (state) => state.removeCustomerFromOrg,
  );

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [changeRoleModalOpen, setChangeRoleModalOpen] = useState(false);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<string>(
    member?.organization?.role || ORGANIZATION_ROLES.MEMBER,
  );
  const [filteredParams, setFilteredParams] = useState<QueryParams>({
    sort: { field: 'product', order: 'asc' },
    filter: {},
    limit: 10,
    offset: 0,
    search: { value: '' },
  });

  useEffect(() => {
    if (id) {
      fetchMemberDetails(id);
    }

    return () => {
      setMemberDetails(null);
    };
  }, [id]);

  const handleConfirmRemoveMember = async () => {
    if (!member?.user?.id) return;
    await removeCustomerFromOrg(member.user.id);
    setIsRemoveModalOpen(false);
  };

  const handleChangeRole = () => {
    setChangeRoleModalOpen(false);
  };

  const handleCloseRole = () => {
    setChangeRoleModalOpen(false);
    setSelectedRole(member?.organization?.role || ORGANIZATION_ROLES.MEMBER);
  };

  const handleRevokeClick = (license: any) => {
    setSelectedLicense(license);
    setIsRevokeModalOpen(true);
  };

  const handleRevokeConfirm = () => {
    if (selectedLicense) {
      console.log('Revoking license:', selectedLicense.licenseId);
      // Call API to revoke license here
      setIsRevokeModalOpen(false);
      setSelectedLicense(null);
    }
  };

  const handleRevokeCancel = () => {
    setIsRevokeModalOpen(false);
    setSelectedLicense(null);
  };

  if (detailsLoading) {
    return <PageSpinner />;
  }

  if (!member) {
    return (
      <EmptyDetails
        title={t('membersPage.details.userNotFoundInCryptlex')}
        description={t('membersPage.details.userNotFoundInCryptlexDescription')}
      />
    );
  }

  return (
    <Flex vertical gap={24}>
      <DetailsHeader
        backUrl="/members"
        title={`${member.user.firstName} ${member.user.lastName}`}
        rightSection={
          !isProfile && (
            <>
              <Button onClick={() => setChangeRoleModalOpen(true)}>
                {t('membersPage.details.changeRole')}
              </Button>
              <Button onClick={() => setIsRemoveModalOpen(true)}>
                {t('membersPage.details.removeFromOrganization')}
              </Button>
            </>
          )
        }
      />

      {/* Hero Card */}
      <Card className="glass">
        <Flex justify="space-between" align="center">
          <Flex gap={16} align="center">
            <div className="glass" style={{ padding: 8, borderRadius: 8 }}>
              <FileText size={28} />
            </div>
            <Flex vertical>
              <Text>{t('membersPage.details.productName')}</Text>
              <Text
                style={{
                  color: 'var(--color-text-secondary)',
                }}
              >
                {t('membersPage.details.productType')}
              </Text>
            </Flex>
          </Flex>
          <Button>{t('membersPage.details.review')}</Button>
        </Flex>
      </Card>

      {/* Licenses Table Section */}
      <Flex vertical gap={16}>
        <Flex justify="space-between" align="flex-end">
          <Typography.Title level={3} style={{ margin: 0 }}>
            {t('membersPage.details.userBasedLicenses')}
          </Typography.Title>
          <Button onClick={() => setIsLicenseModalOpen(true)}>
            {t('membersPage.details.addLicense')}
          </Button>
        </Flex>

        <CommonTable
          tableSource={{
            data: member?.licenses || [],
            count: member?.licenses.length || 0,
          }}
          tableConfig={
            createTableOptions({ onRevoke: handleRevokeClick }).licenses
          }
          selectedRows={[]}
          setSelectedRows={() => {}}
          getDataOnChange={() => {}}
          filteredParams={filteredParams}
          setFilteredParams={setFilteredParams}
          isSelectable={false}
          loading={false}
          rowUniqueKey="id"
        />
      </Flex>

      <AssignLicenseModal
        isOpen={isLicenseModalOpen}
        onClose={() => setIsLicenseModalOpen(false)}
        memberName={`${member?.user.firstName} ${member?.user.lastName}`}
      />
      <Modal
        isOpen={isRemoveModalOpen}
        title={t('membersPage.details.confirmRemoveMember')}
        description={t('membersPage.details.removeMemberDescription')}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={handleConfirmRemoveMember}
      />
      <Modal
        isOpen={changeRoleModalOpen}
        title={t('membersPage.details.changeRoleTitle')}
        description={t('membersPage.details.changeRoleDescription')}
        onClose={handleCloseRole}
        onConfirm={handleChangeRole}
        children={
          <Select
            options={Object.values(ORGANIZATION_ROLES).map((role) => ({
              label: role,
              value: role,
            }))}
            defaultValue={selectedRole || ORGANIZATION_ROLES.MEMBER}
            onChange={(value) => setSelectedRole(value)}
          />
        }
      />

      {/* Revoke License Modal */}
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
          {selectedLicense && (
            <Card style={{ background: 'var(--color-surface-secondary)' }}>
              <Flex align="center" gap={12}>
                <div className="glass" style={{ padding: 8, borderRadius: 8 }}>
                  <Key size={20} />
                </div>
                <Flex vertical gap={4}>
                  <Text style={{ fontWeight: 500 }}>
                    {selectedLicense.productName}
                  </Text>
                  <Text type="secondary">
                    {selectedLicense.licenseType} - {selectedLicense.region}
                  </Text>
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
    </Flex>
  );
}

export default MemberDetails;
