import React, { Component } from 'react';

import { Layout, Typography, Card, Input, Row, Col, List, Space, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, } from '@ant-design/icons';

// import SimpleMap from './components/Map/Map'
import Head from './components/Header/Head'
import LocationList from './components/List/List';
import CurrentLocation from './components/List/CurrentLocation';
import Map from './components/Map/Map';

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
      currentAddress: 'Paris, France',
      mapCoordinates: {
        lat: 48.856614,
        lng: 2.3522219
      }


    };
  }



  toggleFavorite(address) {

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

  searchForAddress(address) {

    var google = window.google;

    var self = this;

    let Geocoder = new google.maps.Geocoder();

    Geocoder.geocode({
      address: address,
      callback(results, status) {

        if (status !== 'OK') return;

        var latlng = results[0].geometry.location;

        self.setState({
          currentAddress: results[0].formatted_address,
          mapCoordinates: {
            lat: latlng.lat(),
            lng: latlng.lng()
          }
        })
      }

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
                <input
                  id="pac-input"
                  className="controls searchBar1"
                  type="text"
                  placeholder="Enter a place"
                />
                {/* <Search onSearch={this.searchForAddress} /> */}
                <CurrentLocation address={this.state.currentAddress}
                  favorite={this.isAddressInFavorites(this.state.currentAddress)}
                  onFavoriteToggle={this.toggleFavorite} />
                <LocationList locations={this.state.favorites} activeLocationAddress={this.state.currentAddress}
                  onClick={this.searchForAddress} />
              </Card>
            </Col>
            <Col span={14}>
              <Map lat={this.state.mapCoordinates.lat} lng={this.state.mapCoordinates.lng} />
            </Col>
          </Row>
          <Footer></Footer>
        </Layout>
      </>
    )
  }
}




