import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

const handleApiLoaded = (map, maps) => {
  // use map and maps objects
};

const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white',
    background: 'red',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

const GoogleMap = () => (
  <Wrapper>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyCDnt3zhAcYQGXU5YPlUTB-cNT9V7g62AA' }}
      defaultCenter={[43.651070,-79.347015]}
      defaultZoom={10}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      
    >
      <AnyReactComponent />
      <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyCDnt3zhAcYQGXU5YPlUTB-cNT9V7g62AA"></script>
    </GoogleMapReact>
  </Wrapper>
);

// GoogleMap.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.node,
//     PropTypes.arrayOf(PropTypes.node),
//   ]),
// };

// GoogleMap.defaultProps = {
//   children: null,
  
// };

export default GoogleMap;
