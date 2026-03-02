import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button, Input, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import APP_ROUTES from '@/lib/app.routes';
import { signIn } from '@/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { useLoginFormStyles } from '../styles';

const { Text } = Typography;

export function LocalSignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const { styles } = useLoginFormStyles();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await signIn({
        email: data.email,
        password: data.password,
      });
      if (response.access_token && response.user) {
        setAccessToken(response.access_token);
        setUser(response.user);
        navigate(APP_ROUTES.dashboard.path);
      } else {
        toast.error('Invalid response from server');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.fieldGroup}>
        <Text>{t('auth.form.email')}</Text>
        <Controller
          name="email"
          control={control}
          rules={{
            required: t('auth.form.email') + ' is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          }}
          render={({ field }) => (
            <Input
              id="email"
              type="email"
              placeholder={t('auth.form.emailPlaceholder')}
              disabled={isLoading}
              {...field}
            />
          )}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.fieldGroup}>
        <Text>{t('auth.form.password')}</Text>
        <Controller
          name="password"
          control={control}
          rules={{
            required: t('auth.form.password') + ' is required',
          }}
          render={({ field }) => (
            <Input
              id="password"
              type="password"
              placeholder={t('auth.form.passwordPlaceholder')}
              disabled={isLoading}
              {...field}
            />
          )}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <Button
        htmlType="submit"
        disabled={isLoading}
        className={styles.submitButton}
      >
        {isLoading ? (
          <>
            <span className={styles.spinner} />
            {t('auth.form.signingIn')}
          </>
        ) : (
          t('auth.form.logIn')
        )}
      </Button>
    </form>
  );
}
