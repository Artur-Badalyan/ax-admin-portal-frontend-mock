import { Button } from 'antd';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

import API_ROUTES from '@/api/routes.api';

import MicrosoftLogo from '@/assets/microsoft-logo.png';
import AutodeskLogo from '@/assets/autodesk.svg';
import { useLoginVariantsStyles } from '../styles';

export function LoginVariants() {
  const { t } = useTranslation();
  const { styles } = useLoginVariantsStyles();

  const handleSignIn = async () => {
    try {
      window.location.href = `http://localhost:3002${API_ROUTES.AUTH_MICROSOFT}`;
    } catch (err) {
      toast.error('Failed to initiate Microsoft SSO login');
    }
  };

  return (
    <div className={styles.container}>
      <Button onClick={handleSignIn} className={styles.button}>
        <img src={MicrosoftLogo} alt="Microsoft Logo" className={styles.icon} />
        {t('auth.form.signInWithMicrosoft')}
      </Button>
      <Button
        // onClick={handleSignInAutodesk}
        className={styles.button}
      >
        <img
          src={AutodeskLogo}
          alt="Autodesk Logo"
          className={styles.iconLarge}
        />
        {t('auth.form.signInWithAutodesk')}
      </Button>
    </div>
  );
}
