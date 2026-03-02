import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  card: css`
    width: 100%;
    text-align: center;
    padding-top: 80px; /* py-20 */
    padding-bottom: 80px;
  `,
  icon: css`
    margin-bottom: 16px; /* mb-4 */
    height: 96px; /* h-24 */
    width: 96px; /* w-24 */
    color: ${token.colorTextSecondary}; /* text-muted-foreground */
  `,
  title: css`
    margin-bottom: 8px; /* mb-2 */
    text-align: center;
    font-size: 24px; /* text-2xl approximation */
    line-height: 32px;
  `,
  description: css`
    text-align: center;
    color: ${token.colorTextSecondary}; /* text-muted-foreground */
  `,
}));
