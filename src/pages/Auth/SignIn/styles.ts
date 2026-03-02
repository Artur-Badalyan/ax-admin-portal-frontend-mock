import { createStyles } from 'antd-style';

export const useAuthStyles = createStyles(({ css, token }) => ({
  container: css`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  `,
  wrapper: css`
    max-width: 800px;
    width: 100%;
  `,
  title: css`
    margin-bottom: 8px !important;
  `,
  formContainer: css`
    margin-top: 24px;
    gap: 32px;
    align-items: center;
    width: 100%;
  `,
  cryptlexSection: css`
    width: 100%;
    max-width: 360px;
    padding-right: 24px;
    border-right: 1px solid ${token.colorBorderSecondary};

    @media (max-width: 768px) {
      padding-right: 0;
      border-right: none;
      border-bottom: 1px solid ${token.colorBorderSecondary};
      padding-bottom: 24px;
      margin-bottom: 24px;
    }
  `,
  registerLinks: css`
    margin-top: 16px;
  `,
}));

export const useLoginFormStyles = createStyles(({ css, token }) => ({
  form: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  fieldGroup: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  error: css`
    font-size: 14px;
    color: ${token.colorError};
  `,
  submitButton: css`
    width: 100%;
  `,
  spinner: css`
    display: inline-block;
    height: 16px;
    width: 16px;
    margin-right: 8px;
    border-radius: 50%;
    border: 2px solid currentColor;
    border-right-color: transparent;
    animation: spin 1s linear infinite;

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
}));

export const useLoginVariantsStyles = createStyles(({ css, token }) => ({
  container: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 384px;
  `,
  button: css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  icon: css`
    display: inline-block;
    height: 20px;
    width: 20px;
    margin-right: 8px;
    vertical-align: middle;
  `,
  iconLarge: css`
    display: inline-block;
    height: 32px;
    width: 32px;
    margin-right: 8px;
    vertical-align: middle;
  `,
  error: css`
    font-size: 14px;
    color: ${token.colorError};
  `,
}));

export const useSSOLoginStyles = createStyles(({ css, token }) => ({
  form: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  fieldGroup: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  label: css`
    font-size: 14px;
    font-weight: 500;
    color: ${token.colorText};
  `,
  error: css`
    font-size: 14px;
    color: ${token.colorError};
  `,
  submitButton: css`
    width: 100%;
  `,
  backButton: css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 2px;
    border: 1px solid ${token.colorBorder};
    background-color: ${token.colorFillSecondary}; /* neutral-200 equivalentish */
    color: ${token.colorText};
    box-shadow: ${token.boxShadowSecondary};
    transition: all 0.2s;

    &:hover {
      background-color: ${token.colorFill}; /* neutral-300 */
      border-color: ${token.colorBorderSecondary};
      box-shadow: ${token.boxShadow};
    }

    &:active {
      transform: scale(0.98);
    }
  `,
  spinner: css`
    display: inline-block;
    height: 16px;
    width: 16px;
    margin-right: 8px;
    border-radius: 50%;
    border: 2px solid currentColor;
    border-right-color: transparent;
    animation: spin 1s linear infinite;

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
}));
