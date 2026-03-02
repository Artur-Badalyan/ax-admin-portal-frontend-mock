import { createStyles } from 'antd-style';

export const useStyles = createStyles(
  ({ css, token }) => ({
    page: css`
      min-height: 100vh;
      padding: 48px 16px;
      display: flex;
      justify-content: center;
      background: transparent;
    `,
    container: css`
      width: 100%;
      max-width: 960px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    `,
    header: css`
      display: flex;
      flex-direction: column;
      gap: 8px;
    `,
    cards: css`
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      gap: 16px;

      @media (min-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    `,
    card: css`
      border-radius: 16px;
      box-shadow: 0 10px 16px -12px rgba(15, 23, 42, 0.25);
    `,

    dataRow: css`
      height: 24px;
      display: flex;
      align-items: center;
      align-content: center;
      gap: 8px;
    `,

    meta: css`
      gap: 8px;
      display: flex;
      flex-direction: column;
      color: ${token.colorTextSecondary};
      margin-bottom: 16px;
    `,
    actions: css`
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    `,
    emptyState: css`
      border-radius: 16px;
      padding: 32px;
      border: 1px dashed rgba(148, 163, 184, 0.6);
      background: rgba(248, 250, 252, 0.6);

      [data-theme='dark'] & {
        background: rgba(15, 23, 42, 0.5);
        border-color: rgba(148, 163, 184, 0.3);
      }
    `,
    createButton: css`
      width: fit-content;
    `,
  }),
);
