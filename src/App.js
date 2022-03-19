import React, { Component } from 'react';

import { Layout, Card, Checkbox, Input, Row, Col, Button,List } from 'antd';

import Head from './components/Header/Head'
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
        lastTimeZone: ''
      },
      markers: [],
      deletedItems: []
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

  getMarker(marker) {
    this.setState({
      marker: marker
    })
    this.state.favorites.pop()
  }

  onChange(e) {
    e.target.className = 'seleted'
  }

  handleChange() {
    console.log('inside CheckBOx')
    console.log('**************************')
  }


  deleteHandler = () => {
    let a = document.getElementsByClassName('seleted')
    console.log('deleted list')
    console.log(this)
    let b = this.state.deletedItems
    while (a[0]) {
      let listHead = a[0].parentNode
      b.push(a[0].id)
      listHead.parentNode.removeChild(listHead)
      console.log('deleted list')
      console.log(b)
      console.log(this)
    }
    let deletedItems = this.state.deletedItems
    for (var i = 0; i < this.state.marker.length; i++) {
      this.state.marker[[deletedItems[i]]].setMap(null);
    }
  }


  render() {

    if (this.state.currentAddress !== '') {
      this.state.favorites.push({
        name: this.state.currentAddress,
        index: this.state.favorites.length
      })
    };

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
                <CurrentLocation address={this.state.currentAddress} />
                <Card>
                  <Button id='delete' type="info" onClick={this.deleteHandler.bind(this)}>Delete Selected Records</Button>
                  <Button id='delete' type="danger" onClick={this.deleteAllRecords.bind(this)}>Delete All Records</Button>
                  <List
                    pagination={{
                      onChange: page => {
                        console.log(page);
                      },
                      pageSize: 10,
                    }}
                    dataSource={this.state.favorites}
                    renderItem={item => (
                      <List.Item>
                        <input type='checkbox' onChange={this.onChange} onClick={this.handleChange} id={item.index} /> <label htmlFor={item.index}>{item.name}</label>
                      </List.Item>
                    )}
                  />
                </Card>
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



