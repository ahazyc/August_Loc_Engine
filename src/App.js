import React, { Component } from 'react';

import { Layout, Typography, Card, Input, Row, Col, List, Space, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, } from '@ant-design/icons';

// import SimpleMap from './components/Map/Map'
import Head from './components/Header/Head'
import ListTable from './components/List/List';
import Map from './components/Map/Map';

const { Header, Footer } = Layout;
const { Title, Link } = Typography;
const { Search } = Input;
const onSearch = value => console.log(value);


const App = () => {
  return (
    <>
      <Layout className="layout">
        <Head />
        <Row>
          <Col span={10}>
            <Card
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Search
                placeholder="Enter a place"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
              />
              <ListTable />
            </Card>
          </Col>
          <Col span={14}><Map lat={50} lng={50} /></Col>
        </Row>
        <Footer></Footer>
      </Layout>
    </>
  )
}
<script src="//maps.googleapis.com/maps/api/js?key=AIzaSyCDnt3zhAcYQGXU5YPlUTB-cNT9V7g62AA"></script>
export default App;




