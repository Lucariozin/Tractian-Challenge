import styles from './styles.module.scss';
import { Layout } from "antd";

import { Menu } from "../Menu";

interface SiderProps {
  menuIsOpen: boolean;
};

export function Sider({ menuIsOpen }: SiderProps) {
  return (
    <Layout.Sider
      width={256}
      style={{ display: menuIsOpen ? 'flex' : 'none' }}
      className={styles['side-bar']}
    >
      <Menu />
    </Layout.Sider>
  );
}
