import { createStyles } from 'antd-style';

export const useInvitationCardStyles = createStyles(({ css, token }) => ({
  // Card variant styles
  card: css`
    border-radius: 16px;
    box-shadow: 0 10px 16px -12px rgba(15, 23, 42, 0.25);
  `,

  meta: css`
    gap: 8px;
    display: flex;
    flex-direction: column;
    color: ${token.colorTextSecondary};
    margin-bottom: 16px;
  `,

  dataRow: css`
    height: 24px;
    display: flex;
    align-items: center;
    align-content: center;
    gap: 8px;
  `,

  actions: css`
    display: flex;
    gap: 12px;
    margin-top: 16px;
  `,

  // Detailed variant styles
  detailedContainer: css`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,

  header: css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
  `,

  title: css`
    margin: 0 !important;
    font-size: 24px;
    font-weight: 600;
    color: ${token.colorText};
  `,

  statusTag: css`
    font-size: 12px;
    font-weight: 500;
    padding: 4px 12px;
  `,

  metaGrid: css`
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 12px;

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  `,

  metaItem: css`
    border-radius: 8px;
    background-color: ${token.colorBgContainerDisabled};
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    transition: background-color 0.2s;

    [data-theme='dark'] & {
      background-color: rgba(51, 65, 85, 0.6);
    }
  `,

  metaItemHighlight: css`
    background-color: ${token.colorPrimaryBg};
    border: 1px solid ${token.colorPrimaryBorder};
  `,

  metaItemWarning: css`
    background-color: ${token.colorErrorBg};
    border: 1px solid ${token.colorErrorBorder};
  `,

  metaLabel: css`
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${token.colorTextSecondary};
    font-weight: 500;
  `,

  metaValue: css`
    font-size: 14px;
    color: ${token.colorText};
    font-weight: 400;
    word-break: break-word;
  `,
}));
