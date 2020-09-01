import React from 'react';
import { Layout } from 'antd';

import SidebarContent from 'components/SidebarContent';
import MainContent from 'components/MainContent';
import Header from 'components/Header';

const { Sider, Content } = Layout;

let Home = () => {
  return (
    <Layout className="home-layout">
      <Sider width={250}>
        <SidebarContent />
      </Sider>
      <Content>
        <Header/>
        <MainContent />
      </Content>
    </Layout>
  )
}

export default Home;