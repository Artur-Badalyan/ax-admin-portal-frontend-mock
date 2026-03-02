import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  button: css`
    font-weight: 500;
    border-radius: var(--ant-border-radius);
  `,

  variantSolid: css`
    color: var(--ant-color-text-light-solid);
  `,
  variantOutline: css`
    background: transparent;
  `,
  variantGhost: css`
    background: transparent;
    border-color: transparent;
  `,
  variantLink: css`
    padding: 0;
    border: none;
  `,

  solidPrimary: css`
    background: var(--color-primary);
  `,
  solidSuccess: css`
    background: var(--color-success);
  `,
  solidWarning: css`
    background: var(--color-warning);
  `,
  solidDanger: css`
    background: var(--color-error);
  `,
  solidInfo: css`
    background: var(--color-info);
  `,

  outlinePrimary: css`
    color: var(--color-primary);
    border-color: var(--color-primary);
  `,
  outlineSuccess: css`
    color: var(--color-success);
    border-color: var(--color-success);
  `,

  ghostPrimary: css`
    color: var(--color-primary);
  `,
}));
