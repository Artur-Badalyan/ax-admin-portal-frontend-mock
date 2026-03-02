import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, Input } from 'antd';

import { startCryptlexSSO } from '@/api/auth.api';
import { useSSOLoginStyles } from '../styles';

export function SSOLoginForm({
  setIsSSO,
}: {
  setIsSSO: (value: boolean) => void;
}) {
  const { styles } = useSSOLoginStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ accountAlias: string }>({
    defaultValues: {
      accountAlias: '',
    },
  });

  const onSubmit = async (data: { accountAlias: string }) => {
    setIsLoading(true);
    setLocalError(null);

    try {
      const response = await startCryptlexSSO(data.accountAlias);
      if (response.loginUrl) {
        window.location.href = response.loginUrl;
      } else {
        throw new Error('No login URL returned from SSO start');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setLocalError(errorMessage);
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setIsSSO(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.fieldGroup}>
        <label htmlFor="accountAlias" className={styles.label}>
          Enter your Cryptlex account alias
        </label>
        <Controller
          name="accountAlias"
          control={control}
          rules={{ required: 'Account alias is required' }}
          render={({ field }) => (
            <Input
              id="accountAlias"
              type="text"
              placeholder="account alias"
              disabled={isLoading}
              {...field}
            />
          )}
        />
        {errors.accountAlias && (
          <p className={styles.error}>{errors.accountAlias.message}</p>
        )}
      </div>

      {localError && <p className={styles.error}>{localError}</p>}

      <Button
        htmlType="submit"
        disabled={isLoading}
        className={styles.submitButton}
      >
        {isLoading ? (
          <>
            <span className={styles.spinner} />
            Signing in...
          </>
        ) : (
          'Continue'
        )}
      </Button>

      <Button
        htmlType="button"
        onClick={handleBackToLogin}
        className={styles.backButton}
      >
        Back to Login
      </Button>
    </form>
  );
}
