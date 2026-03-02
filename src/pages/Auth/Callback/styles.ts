import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  container: css`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  `,
  form: css`
    display: flex;
    flex-direction: column;
  `,
  description: css`
    margin-bottom: 16px;
  `,
  errorMessage: css`
    color: ${token.colorError};
    font-size: 14px;
    margin-top: 4px;
  `,
  submitButton: css`
    margin-top: 32px;
  `,
}));
