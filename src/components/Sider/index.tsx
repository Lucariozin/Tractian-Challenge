import styles from './styles.module.scss';
import { Layout } from "antd";

import { Menu } from "../Menu";
import { useMenu } from '../../hooks/useMenu';

export function Sider() {
  const { menuIsOpen } = useMenu();

  return (
    <Layout.Sider
      width={275}
      style={{ display: menuIsOpen ? 'flex' : 'none' }}
      className={styles['side-bar']}
    >
      <Menu />
    </Layout.Sider>
  );
}
