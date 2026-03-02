import qs from 'qs';
import { useEffect, useState } from 'react';
import { Flex, Typography, Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Modal from '@/components/Modal';
import ROUTES from '@/lib/app.routes';

import CommonTable from '@/components/TableView';
import type { SortObj } from '@/lib/types/table.type';
import { useMembersStore } from '@/store/member.store';
import { useAuthStore } from '@/store/auth.store';
import { inviteOrganizationMember } from '@/api/organization.api';

import tableOptions from './tableOptions';

const { Text } = Typography;

export function MembersPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Use store instead of local state
  const {
    members,
    listLoading,
    selectedMembers,
    filteredParams,
    setSelectedMembers,
    setFilteredParams,
    fetchMembers,
  } = useMembersStore();
  const { user } = useAuthStore();

  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm<{ email: string }>({
    defaultValues: {
      email: '',
    },
  });

  const handleSelect = (rows: string[]) => {
    setSelectedMembers(rows);
  };

  const handleInviteMember = async (data: { email: string }) => {
    if (!user?.organization?.id) return;

    try {
      await inviteOrganizationMember(user.organization.id, data.email);
      toast.success(t('membersPage.inviteMemberModal.successToast'));
      setInviteModalOpen(false);
      reset();

      fetchMembers(user.organization.id);
    } catch (error) {
      toast.error(
        (error as Error)?.message ||
          t('membersPage.inviteMemberModal.errorToast'),
      );
    }
  };

  // Initialize filteredParams from URL on mount
  useEffect(() => {
    const pageParams = qs.parse(location.search, { ignoreQueryPrefix: true });

    setFilteredParams({
      sort: (pageParams?.sort as unknown as SortObj) || {
        field: 'name',
        order: 'asc',
      },
      filter: (pageParams?.filter as Record<string, string>) || {},
      limit: Number(pageParams?.limit) || 10,
      offset: Number(pageParams?.offset) || 0,
      search: {
        value: (pageParams?.search as { value?: string })?.value || '',
      },
    });
  }, [location.search, setFilteredParams]);

  // Fetch members when component mounts or user changes
  useEffect(() => {
    if (user?.organization?.id) {
      fetchMembers(user.organization.id);
    }
  }, [user?.organization?.id, fetchMembers]);

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={2} style={{ margin: 0 }}>
        {t('membersPage.title')}
      </Typography.Title>

      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => {
          setInviteModalOpen(false);
          reset();
        }}
        title={t('membersPage.inviteMemberModal.title')}
      >
        <form onSubmit={handleSubmit(handleInviteMember)}>
          <Flex vertical gap={16}>
            <Text>{t('membersPage.inviteMemberModal.description')}</Text>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  placeholder={t(
                    'membersPage.inviteMemberModal.emailPlaceholder',
                  )}
                  {...field}
                />
              )}
            />
            <Button htmlType="submit">{t('common.confirm')}</Button>
          </Flex>
        </form>
      </Modal>

      <CommonTable
        tableSource={{ data: members, count: members.length }}
        tableConfig={tableOptions.members}
        toolbarActions={[
          {
            action: 'create',
            label: 'membersPage.inviteButton',
            visibleWithoutSelection: true,
            callback: () => {
              setInviteModalOpen(true);
            },
          },
        ]}
        selectedRows={selectedMembers}
        setSelectedRows={handleSelect}
        onRowClick={(row) =>
          navigate(ROUTES.memberLicenses.path.replace(':id', row.id))
        }
        getDataOnChange={() => {}}
        filteredParams={filteredParams}
        setFilteredParams={setFilteredParams}
        loading={listLoading}
        rowUniqueKey="id"
      />
    </Flex>
  );
}

export default MembersPage;
