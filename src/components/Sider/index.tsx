import styles from './styles.module.scss';
import { Layout } from "antd";

import { Menu } from "../Menu";

export function Sider() {
  return (
    <Layout.Sider width={256} className={styles['side-bar']}>
      <Menu />
    </Layout.Sider>
  );
}
