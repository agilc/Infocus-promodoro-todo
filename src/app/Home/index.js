import React from 'react';
import { Layout } from 'antd';

import SidebarContent from 'components/SidebarContent';

const { Header, Footer, Sider, Content } = Layout;

let Home = () => {
  return (
    <Layout className="home-layout">
      <Layout>
        <Sider width={250}>
          <SidebarContent />
        </Sider>
        <Content>Content</Content>
      </Layout>
    </Layout>
  )
}

export default Home;