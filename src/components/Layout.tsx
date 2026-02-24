import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button, Layout as AntLayout, Menu } from 'antd';

import { useAuthStore } from '../store/authStore';

import './Layout.scss';

const { Header, Content } = AntLayout;

const NAV_ITEMS = [
  { key: '/products', label: 'Товары', to: '/products' },
  { key: '/search', label: 'Поиск', to: '/search' },
] as const;

export default function Layout() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AntLayout className="app-layout">
      <Header className="app-header">
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname]}
          className="app-menu"
          items={NAV_ITEMS.map(({ key, label, to }) => ({
            key,
            label: <Link to={to}>{label}</Link>,
          }))}
        />
        <Button type="default" onClick={onLogout} className="app-header__logout">
          Выйти
        </Button>
      </Header>
      <Content className="app-content">
        <Outlet />
      </Content>
    </AntLayout>
  );
}
