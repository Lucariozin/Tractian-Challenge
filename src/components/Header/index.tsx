import styles from './styles.module.scss';

import { Layout, Image } from 'antd';
import Router from 'next/router';

export function Header() {
  return (
    <Layout.Header className={styles.header}>
      <div className={styles.wrapper}>
        
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
