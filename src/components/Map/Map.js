import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';

var google = window.google;
let map= google.maps.Map;
let infoWindow= google.maps.InfoWindow;
let GeolocationPosition = null;

export default class Map extends React.Component {
  componentDidMount() {
    this.componentDidUpdate()
  }

  componentDidUpdate() {
    if (this.lastLat == this.props.lat && this.lastLng == this.props.lng) {
      return;
    }

    this.lastLat = this.props.lat;
    this.lastLng = this.props.lng;

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: {
        lat: this.props.lat,
        lng: this.props.lng
      }

    });

    var infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Check your current Location";
    locationButton.classList.add("findMe");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener('click',()=>{
      if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition(
          (position=GeolocationPosition) => {
          const pos = {
            lat:position.coords.latitude,
            lng:position.coords.longitude,
          }
          
          infoWindow.setPosition(pos);
          infoWindow.setContent('You are here!');
          infoWindow.open(map);
          map.setCenter(pos)
          map.setZoom(10)
        },
        () => {
          handleLocationError(true,infoWindow,map.getCenter)
        }
      );
    } else {
      handleLocationError(false, infoWindow, map.getCenter)
    }})

    var marker = new google.maps.Marker({
      position: {
        lat: this.props.lat,
        lng: this.props.lng
      },
      map: map

    })

  }

  render() {

    return (
      <div className='map-holder'>
        <div id='map'></div>
      </div>
    )
  }
}

function handleLocationError(
  browserHasGeolocation = Boolean,
  infoWindow = google.maps.InfoWindow,
  pos= google.maps.LatLng
) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service down"
      : "Error: Your broswer doesn't support geolocation"
  );
  infoWindow.open(map);
}
