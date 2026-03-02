import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  container: css`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,

  /* Users Section */
  sectionHeader: css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  `,
  usersList: css`
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  userRow: css`
    width: 100%;
    padding: 8px 12px;
    border-radius: 8px;
  `,
  userAvatar: css`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  assignModalContent: css`
    max-height: 400px;
    overflow-y: auto;
    padding-right: 8px;
  `,
  assignModalUserRow: css`
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 8px 12px;
    border-radius: 8px;
    background-color: var(--ant-bg-container);
  `,
}));
