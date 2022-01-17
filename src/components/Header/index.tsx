import styles from './styles.module.scss';

import { Layout, Image, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import Router from 'next/router';

interface HeaderProps {
  menuIsOpen: boolean;
  toggleMenu: () => void;
};

export function Header({ menuIsOpen, toggleMenu }: HeaderProps) {
  return (
    <Layout.Header className={styles.header}>
      <div className={styles.wrapper}>

        <Button
          type="primary"
          onClick={toggleMenu}
        >
          {menuIsOpen ? (
            <MenuUnfoldOutlined />
          ) : (
            <MenuFoldOutlined />
          )}
        </Button>

        <div className={styles['logo-container']} onClick={() => Router.push('/')}>
          <Image
            src="/tractian-logo.svg"
            alt="Tractian Logo"
            preview={false}
          />
        </div>

      </div>
    </Layout.Header>
  );
}
