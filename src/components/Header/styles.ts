import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  header: css`
    height: var(--header-height);
    padding: 0;
    height: auto;
    background: transparent;
    border: none;
  `,
  logo: css`
    height: 48px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    background: var(--color-primary-bg);
    color: var(--color-primary);
    cursor: pointer;
  `,
  nav: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 16px;
    padding: 16px;
    border-radius: 16px;
    flex-wrap: nowrap;
  `,
  brand: css`
    display: flex;
    align-items: center;
    gap: 48px;
    min-width: 0;

    @media (max-width: 992px) {
      gap: 16px;
    }
  `,
  actions: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  drawerActions: css`
    padding: 16px;
    border-top: 1px solid var(--color-border-secondary);
  `,
  menu: css`
    flex: 1;
    justify-content: center;
    align-items: flex-start;
    border-bottom: none;
    background-color: transparent;
    color: var(--color-primary);

    &.ant-menu-horizontal {
      > .ant-menu-item {
        padding-inline: 12px;
      }

      > .ant-menu-item-selected {
        color: var(--color-primary);
        background-color: transparent !important;
      }
    }

    @media (max-width: 992px) {
      display: none;
    }
  `,
  mobileToggle: css`
    display: none;

    @media (max-width: 992px) {
      display: inline-flex;
    }
  `,
  actionsTrigger: css`
    @media (max-width: 992px) {
      display: none;
    }
  `,
  drawer: css`
    .ant-drawer-body {
      padding: 0;
    }
  `,
  mobileMenu: css`
    border-inline-end: none !important;
  `,
  billingPage: css`
    height: 100vh;
    padding: 0;
    margin: 0;
    border: none;
  `,
  monthDataItem: css`
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
    border-radius: 16px;
    background: var(--color-primary-bg);
    color: var(--color-primary);
  `,
}));
