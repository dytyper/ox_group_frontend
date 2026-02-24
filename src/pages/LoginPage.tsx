import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Input, message } from 'antd';

import { login as apiLogin } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { AUTH_SUCCESS_MESSAGE } from '../constants/messages';

const SUBDOMAIN = 'toko';

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);

    try {
      const { token } = await apiLogin(
        values.username,
        values.password,
        SUBDOMAIN
      );

      login(token, SUBDOMAIN);

      message.success(AUTH_SUCCESS_MESSAGE);

      navigate('/products', { replace: true });
    } catch (e: unknown) {
      message.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Card title="Вход" className="login-card">
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            username: 'user_task',
            password: 'user_task',
            subdomain: SUBDOMAIN,
          }}
        >
          <Form.Item
            name="username"
            label="Имя пользователя"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Пароль"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="subdomain" hidden>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
