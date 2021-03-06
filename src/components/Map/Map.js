import React, { Component } from 'react';
import { Descriptions } from 'antd';

var axios = require('axios');
let GeolocationPosition = null;
let infowindow = null
let map = null


export default class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentAddress: this.currentAddress,
      data: this.data
    }
  }
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

    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    let markers = [];

    ////
    ////

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
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
        this.props.markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })

        );
        this.getTime(place)

        this.props.getMarker(this.props.markers)

        const currentAddress = places[0].formatted_address
        this.props.cFn(currentAddress)


        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      }
      );
      map.fitBounds(bounds);

    });

    ///////////////////////
    //Show my current
    const infoWindow = new google.maps.InfoWindow();
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
    ///////////////////////
    //Show my current
  }


  ///////////////////////
  //get Time Zone
  getTime(place) {

    var currentLat = place.geometry.viewport.wb.h
    var currentLng = place.geometry.viewport.Sa.h
    axios.get(`http://api.geonames.org/timezoneJSON?lat=${currentLat}&lng=${currentLng}&username=ahazyc`)
      .then((response) => {
        response = response.data
        this.setState({
          data: response
        })
      })
      .catch(error => {
        if (error.response) {
          console.log(error.reponse.status)
        } else {
          console.log(error.message)
        }
      })
  }
  ///////////////////////
  //get Time Zone

  render() {

    let localTime = null
    let timeZone = null
    if (this.state.data) {

      localTime = this.state.data.time
      timeZone = this.state.data.timezoneId
    }
    return (
      <div className='map-holder'>
        <Descriptions title="Location info">
          <Descriptions.Item label="Local Time">{localTime}</Descriptions.Item>
          <Descriptions.Item label="Time Zone">{timeZone}</Descriptions.Item>
        </Descriptions>
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
