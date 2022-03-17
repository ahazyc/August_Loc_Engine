import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';



let GeolocationPosition = null;
let infowindow = null
let map = null
console.log(window.google.maps)

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
    var google = window.google;
    const map = new google.maps.Map(document.getElementById("map"), {
      
      zoom: 4,
      center: {
        lat: this.props.lat,
        lng: this.props.lng
      },
      mapTypeId: "roadmap"
    });

    ////////
    //search box
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    console.log('OK')
    let markers = google.maps.Marker = [];

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
  
      if (places.length == 0) {
        return;
      }
  
      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];
      markers.push(
      new google.maps.Marker({
        map,
        position: {
              lat: this.props.lat,
              lng: this.props.lng
            }
      })
    )
      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
  
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
  
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
  
        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );
  
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

    ///////////////////////
    //Show my current
    const infoWindow = new google.maps.InfoWindow();

    console.log('OK')

    
    // var marker = new google.maps.Marker({
    //   position: {
    //     lat: this.props.lat,
    //     lng: this.props.lng
    //   },
    //   map: map
    // })

    const locationButton = document.createElement("button");

    locationButton.textContent = "Check your current Location";
    locationButton.classList.add("findMe");

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener('click', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position = GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };


            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here!');
            infoWindow.open(map);
            map.setCenter(pos)
            map.setZoom(10)
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter())
          }
        );
      } else {
        handleLocationError(false, infoWindow, map.getCenter())
      }
    })
  }
  ///////////////////////
  //Show my current


  render() {
    return (
      <div className='map-holder'>
        <div id='map'></div>
      </div>
    )
  }
}

function handleLocationError(
  browserHasGeolocation,
  infoWindow,
  pos
) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service down"
      : "Error: Your broswer doesn't support geolocation"
  );
  infoWindow.open(map);
}
