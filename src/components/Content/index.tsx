import { Layout } from "antd";
import { ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
};

export function Content({ children }: ContentProps) {
  return (
    <Layout.Content style={{ marginTop: '8rem' }}>
      {children}
    </Layout.Content>
  );
}
