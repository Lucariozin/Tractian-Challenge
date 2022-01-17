import { AppProps } from 'next/app';

import { Layout } from 'antd';

import 'antd/dist/antd.css';
import '../styles/GlobalStyles.scss';

import { Sider } from '../components/Sider';
import { Header } from '../components/Header';
import { Content } from '../components/Content';

import { useState } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function toggleMenu() {
    setMenuIsOpen((oldState) => !oldState);
  }

  return (
    <>
      <Layout>
        <Sider menuIsOpen={menuIsOpen} />

        <Layout>
          <Header menuIsOpen={menuIsOpen} toggleMenu={toggleMenu} />

          <Content>
            <Component {...pageProps} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
