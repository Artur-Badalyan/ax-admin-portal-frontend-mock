import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  container: css`
    .ant-card-body {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    }
  `,
}));
