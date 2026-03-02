import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  container: css`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  cardBody: css`
    padding: 24px;
  `,
  header: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  titleRow: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  `,
  titleGroup: css`
    display: flex;
    align-items: center;
    gap: 12px;
  `,
  statCard: css`
    &.clickable {
      cursor: pointer;
    }
  `,
  statContent: css`
    display: flex;
    gap: 12px;
    align-items: center;
  `,
  statText: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  `,
  licenseRow: css`
    margin-top: 8px;
  `,
  licenseCard: css`
    height: 100%;
    border: none;
    border-radius: 12px;
  `,
}));
