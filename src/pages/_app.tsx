import { AppProps } from 'next/app';

import { Layout } from 'antd';

import 'antd/dist/antd.css';
import '../styles/GlobalStyles.scss';

import { Sider } from '../components/Sider';
import { Header } from '../components/Header';
import { Content } from '../components/Content';

import { MenuProvider } from '../hooks/useMenu';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MenuProvider>
      <Layout>
        <Sider />

        <Layout>
          <Header />

          <Content>
            <Component {...pageProps} />
          </Content>
        </Layout>
      </Layout>
    </MenuProvider>
  );
}
