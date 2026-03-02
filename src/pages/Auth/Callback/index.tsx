import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Typography, Input, Button } from 'antd';

import { PageSpinner } from '@/components/Loader';
import Modal from '@/components/Modal';

import APP_ROUTES from '@/lib/app.routes';
import { createOrganization } from '@/api/organization.api';
import { useAuthStore } from '@/store/auth.store';

import { useStyles } from './styles';

type OrganizationFormData = {
  organizationName: string;
};

const { Text } = Typography;

export const CallbackPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { styles } = useStyles();

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const fetchMe = useAuthStore((state) => state.fetchMe);
  const handleOrganizationCallback = useAuthStore(
    (state) => state.handleOrganizationCallback,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationFormData>({
    defaultValues: {
      organizationName: '',
    },
  });

  const onSubmit = async (data: OrganizationFormData) => {
    await createOrganization(data.organizationName);
    await fetchMe();
    navigate(APP_ROUTES.dashboard.path, { replace: true });
    setCreateModalOpen(false);
    toast.success(t('common.successFullyCreated'));
  };

  useEffect(() => {
    const handleOrganizationCallbackRequest = async () => {
      try {
        const code = searchParams.get('code');
        if (!code) {
          toast.error(t('auth.form.noAuthorizationCode'));
          return;
        }

        const result = await handleOrganizationCallback(code);
        if (result.status === 'error') {
          toast.error(result.message || t('auth.form.failedToSignIn'));
          return;
        } else if (result.status === 'no-access') {
          toast.error(t('auth.form.noAccessPleaseTryAgain'));
          return;
        }

        if (result.has_pending_invites) {
          navigate(APP_ROUTES.organizationSelection.path, { replace: true });
          return;
        } else if (result.user.organization?.id) {
          navigate(
            APP_ROUTES.organizationDetails.path.replace(
              ':id',
              result.user.organization.id,
            ),
            { replace: true },
          );
          return;
        }

        setCreateModalOpen(true);
      } catch (err: any) {
        toast.error(err.message || t('auth.form.failedToSignIn'));
        navigate(APP_ROUTES.signIn.path, { replace: true });
      }
    };

    handleOrganizationCallbackRequest();
  }, [handleOrganizationCallback, navigate, searchParams, t]);

  return (
    <div className={styles.container}>
      <PageSpinner />
      <Modal
        title={t('auth.form.createOrganizationModalTitle')}
        isOpen={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          navigate(APP_ROUTES.signIn.path, { replace: true });
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Text className={styles.description}>
            {t('auth.form.createOrganizationModalDescription')}
          </Text>
          <Controller
            name="organizationName"
            control={control}
            rules={{
              required: t('auth.form.organizationNameIsRequired') as string,
              minLength: {
                value: 3,
                message: t('auth.form.organizationNameMinLength') as string,
              },
            }}
            render={({ field }) => (
              <Input
                type="text"
                placeholder={t('auth.form.organizationNamePlaceholder')}
                {...field}
              />
            )}
          />
          {errors.organizationName && (
            <Text className={styles.errorMessage}>
              {errors.organizationName.message}
            </Text>
          )}
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
          >
            {t('auth.form.createOrganization')}
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default CallbackPage;
