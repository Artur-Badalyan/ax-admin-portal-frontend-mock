import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Typography } from 'antd';

import { SSOLoginForm } from './components/SSOForm';
import { LoginVariants } from './components/LoginVariants';
import { LocalSignIn } from './components/LocalSignIn';
import { useAuthStyles } from './styles';

export const SignInPage: React.FC = React.memo((): React.ReactElement => {
  const { t } = useTranslation();
  const [isSSO, setIsSSO] = useState(false);
  const { styles } = useAuthStyles();

  // const login = useAuthStore((state) => state.login);
  // const accessToken = useAuthStore((s) => s.token);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {isSSO ? (
          <SSOLoginForm setIsSSO={setIsSSO} />
        ) : (
          <div style={{ width: '100%' }}>
            <Typography.Title level={2} className={styles.title}>
              {t('auth.title')}
            </Typography.Title>
            <Typography.Text>{t('auth.description')}</Typography.Text>
            <Flex gap={32} align="center" className={styles.formContainer}>
              <div className={styles.cryptlexSection}>
                <LocalSignIn />
              </div>
              <LoginVariants />
            </Flex>
          </div>
        )}
      </div>
    </div>
  );
});
