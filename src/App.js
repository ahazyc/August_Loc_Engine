import React, { Component } from 'react';

import { Layout, Typography, Card, Input, Row, Col, List, Space, Avatar, Button } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, } from '@ant-design/icons';

// import SimpleMap from './components/Map/Map'
import Head from './components/Header/Head'
import LocationList from './components/List/LocationList';
import CurrentLocation from './components/List/CurrentLocation';
import Map from './components/Map/Map';

const { Search } = Input;
const { Header, Footer } = Layout;
const { Title, Link } = Typography;
const onSearch = value => console.log(value);



export default class App extends React.Component {

  constructor(props) {
    super(props);
    var favorites = [];

    if (localStorage.favorites) {
      favorites = JSON.parse(localStorage.favorites);
    }

    this.state = {
      favorites: this.favorites,
      currentAddress: 'Toronto, ON, Canada',
      mapCoordinates: {
        lat: 43.651070,
        lng: -79.347015
      },
      markers: []
    };
  }

  ///Add List
  toggleFavorite(address) {
    console.log("Working")
    if (this.isAddressInFavorites(address)) {
      this.removeFromFavorites(address);
    }
    else {
      this.addToFavorites(address);
    }
  }

  addToFavorites(address) {
    var favorites = this.state.favorites;
    
    favorites.push({
      address: address,
      timeStamp: Date.now()
    });

    this.setState({
      favorites: favorites
    });

    localStorage.favorites = JSON.stringify(favorites);
  }

  removeFromFavorites(address) {
    var favorites = this.state.favorites;
    var index = -1;
    if (favorites) {
      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].address == address) {
          index = i;
          break;
        }
      }

      if (index !== -1) {

        favorites.splice(index, 1);

        this.setState({
          favorites: favorites
        });

        localStorage.favorites = JSON.stringify(favorites);

      }
    }
  }

  isAddressInFavorites(address) {

    var favorites = this.state.favorites;

    if (favorites) {
      for (var i = 0; i < favorites.length; i++) {

        if (favorites[i].address == address) {
          return true;
        }
      }
    }

    return false;
  }

  cFn(a) {
    this.setState({
      currentAddress: String(a)
    })
  }

  render() {
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
                  id="pac-input"
                  type="text"
                  placeholder="Enter a place"
                  enterButton
                />
                <Button id='delete' type="danger">Delete All Markers!</Button>
                <CurrentLocation address={this.state.currentAddress}
                  favorite={this.isAddressInFavorites(this.state.currentAddress)}
                  onFavoriteToggle={this.toggleFavorite} />
                <LocationList locations={this.state.favorites} activeLocationAddress={this.state.currentAddress}
                  onClick={this.searchForAddress} />
              </Card>
            </Col>
            <Col span={14}>
              <Map cFn={this.cFn.bind(this)} currentAddress={this.state.currentAddress} lat={this.state.mapCoordinates.lat} lng={this.state.mapCoordinates.lng} />
            </Col>
          </Row>
          <Footer></Footer>
        </Layout>
      </>
    )
  }
}




