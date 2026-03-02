import { useState, useMemo, useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout, Menu, Button, Flex, Popover, Typography, Drawer } from 'antd';
import {
  LayoutDashboardIcon,
  ChevronsLeftRightEllipsisIcon,
  UsersRoundIcon,
  CreditCardIcon,
  TextSearchIcon,
  MenuIcon,
} from 'lucide-react';

import { useThemeStore } from '@/store/theme.store';
import { useAuthStore } from '@/store/auth.store';
import APP_ROUTES, { hasRouteAccess } from '@/lib/app.routes';
import { useStyles } from './styles';

const { Header } = Layout;
const { Text } = Typography;

const NAV_ITEMS = [
  {
    path: APP_ROUTES.dashboard.path,
    label: APP_ROUTES.dashboard.navLabel,
    icon: LayoutDashboardIcon,
    route: APP_ROUTES.dashboard,
  },
  {
    path: APP_ROUTES.requests.path,
    label: APP_ROUTES.requests.navLabel,
    icon: ChevronsLeftRightEllipsisIcon,
    route: APP_ROUTES.requests,
  },
  {
    path: APP_ROUTES.members.path,
    label: APP_ROUTES.members.navLabel,
    icon: UsersRoundIcon,
    route: APP_ROUTES.members,
  },
  {
    path: APP_ROUTES.billing.path,
    label: APP_ROUTES.billing.navLabel,
    icon: CreditCardIcon,
    route: APP_ROUTES.billing,
  },
  {
    path: APP_ROUTES.organizations.path,
    label: APP_ROUTES.organizations.navLabel,
    icon: TextSearchIcon,
    route: APP_ROUTES.organizations,
  },
];

const AppHeader = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { styles, cx } = useStyles();
  const navigate = useNavigate();

  const { appearance, toggle } = useThemeStore();
  const logout = useAuthStore((s) => s.logout);

  const user = useAuthStore((s) => s.user);
  const isSuperAdmin = useAuthStore((s) => s.isSuperAdmin);
  const userRole = user?.organization?.role;

  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = useMemo(
    () =>
      NAV_ITEMS.filter((item) => hasRouteAccess(item.route, userRole)).map(
        (item) => {
          const isOrgDetailItem = item.route === APP_ROUTES.organizations;
          const detailsRoute = APP_ROUTES.organizationDetails.path.replace(
            ':id',
            user?.organization?.id || '',
          );

          console.log('User Role:', userRole);
          const path = isSuperAdmin()
            ? item.path
            : isOrgDetailItem
              ? detailsRoute
              : item.path;

          return {
            key: path,
            icon: <item.icon size={18} />,
            label: <NavLink to={path}>{t(item.label!)}</NavLink>,
          };
        },
      ),
    [t, userRole, user?.organization?.id],
  );

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const handleMenuClose = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleMenuOpen = useCallback(() => {
    setMobileOpen(true);
  }, []);

  const actionsPopover = (
    <Flex vertical gap={12}>
      <Flex gap={8}>
        {Object.keys(i18n.options.resources ?? {}).map((lang) => (
          <Button
            key={lang}
            disabled={i18n.language === lang}
            onClick={() => i18n.changeLanguage(lang)}
          >
            {lang}
          </Button>
        ))}
      </Flex>

      <Button onClick={toggle}>
        {appearance === 'light' ? '🌙 Dark mode' : '☀️ Light mode'}
      </Button>

      <Button color="danger" onClick={handleLogout}>
        {t('auth.signOut')}
      </Button>
    </Flex>
  );

  const handleClickLogo = useCallback(() => {
    // Navigate to dashboard on logo click
    if (location.pathname !== APP_ROUTES.dashboard.path) {
      navigate(APP_ROUTES.dashboard.path);
    }
  }, [location.pathname]);

  return (
    <Header className={cx(styles.header, 'glass')}>
      <div className={cx(styles.nav, 'glass')}>
        <div className={styles.brand}>
          <Flex align="center" gap={12}>
            <div className={styles.logo} onClick={handleClickLogo}>
              <LayoutDashboardIcon size={22} />
            </div>
            <Flex vertical>
              <Text strong>{t('brand.title')}</Text>
              <Text>{user?.organization?.name}</Text>
            </Flex>
          </Flex>

          <Menu
            mode="horizontal"
            items={menuItems}
            selectedKeys={[location.pathname]}
            className={styles.menu}
            theme={appearance === 'light' ? 'light' : 'dark'}
            disabledOverflow
          />
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button
            className={styles.mobileToggle}
            type="text"
            aria-label="Open navigation menu"
            icon={<MenuIcon size={18} />}
            onClick={handleMenuOpen}
          />

          <Popover
            placement="bottomRight"
            trigger="click"
            content={actionsPopover}
          >
            <Button
              className={styles.actionsTrigger}
              type="text"
              aria-label="Open user menu"
              icon={<MenuIcon size={18} />}
            />
          </Popover>
        </div>
      </div>

      <Drawer
        open={mobileOpen}
        onClose={handleMenuClose}
        placement="left"
        className={styles.drawer}
        title={t('brand.title')}
      >
        <Menu
          mode="inline"
          disabledOverflow
          items={menuItems}
          onClick={handleMenuClose}
          selectedKeys={[location.pathname]}
          className={styles.mobileMenu}
        />

        <div className={styles.drawerActions}>{actionsPopover}</div>
      </Drawer>
    </Header>
  );
};

export default AppHeader;
