import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  page: css`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  pageTitle: css`
    margin: 0;
  `,
  grid: css`
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 24px;
  `,
  leftColumn: css`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  card: css`
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  row: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  `,
  upcomingList: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 16px;
  `,
  upcomingItem: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  secondaryText: css`
    color: var(--color-text-secondary);
  `,
  mediumText: css`
    font-weight: 500;
  `,
  tabCard: css`
    border-radius: 16px;
    padding: 24px;
  `,
  monthDataItem: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-radius: 12px;
  `,
}));
