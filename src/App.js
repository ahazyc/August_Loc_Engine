import React, { Component } from 'react';

import { Layout, Card,Checkbox , Input, Row, Col, Button } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, } from '@ant-design/icons';

// import SimpleMap from './components/Map/Map'
import Head from './components/Header/Head'
import LocationList from './components/List/LocationList';
import CurrentLocation from './components/List/CurrentLocation';
import Map from './components/Map/Map';
const { Search } = Input;
const { Footer } = Layout;
const onSearch = value => console.log(value);



export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      currentAddress: '',
      mapCoordinates: {
        lat: 43.651070,
        lng: -79.347015,
        lastTimeZone:''
      },
      markers: []
    };
  }

  cFn(a) {
    this.setState({
      currentAddress: String(a)
    })
  }

  deleteAllRecords() {
    this.setState({
      currentAddress:'',
      favorites: [],
    })
    for (var i = 0; i < this.state.marker.length; i++) {
      this.state.marker[i].setMap(null);
    }
  }

  getMarker(marker){
    this.setState({
      marker: marker
    })
    this.state.favorites.pop()
  }

  onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  render() {
    
    return (
      <>
        <Layout className="layout">
          <Head />
          <Row>
            <Col span={10}>
              <Card>
                <Search
                  id="pac-input"
                  type="text"
                  placeholder="Enter a place"
                  enterButton
                />
                <Button id='delete' type="danger" onClick={this.deleteAllRecords.bind(this)}>Delete Recent Records</Button>
                <CurrentLocation address={this.state.currentAddress} />
                <LocationList favorites={this.state.favorites} address={this.state.currentAddress} />
              </Card>
            </Col>
            <Col span={14}>
              <Map
                cFn={this.cFn.bind(this)}
                getMarker={this.getMarker.bind(this)}
                currentAddress={this.state.currentAddress}
                lat={this.state.mapCoordinates.lat}
                lng={this.state.mapCoordinates.lng}
                mapCoordinates={this.state.mapCoordinates}
                markers={this.state.markers} />
            </Col>
          </Row>
          <Footer>Power by August Zheng</Footer>
        </Layout>
      </>
    )
  }
}




