import React, { useState, useEffect, ElementType } from 'react';
import { Layout } from 'antd';
import { RouteComponentProps } from 'react-router';
import './index.scss';

const { Content } = Layout;

type Props = { component: ElementType } & RouteComponentProps;

const PrivateLayout: React.FC<Props> = (props) => {
  const Component = props.component;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ backgroundColor: 'white' }}>
          <Component {...props}></Component>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
