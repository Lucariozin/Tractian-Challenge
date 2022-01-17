import { Layout } from "antd";
import styles from './styles.module.scss';

import { ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
};

export function Content({ children }: ContentProps) {
  return (
    <Layout.Content className={styles.content}>
      {children}
    </Layout.Content>
  );
}
