import React from 'react';
import GoogleMapReact from 'google-map-react';

const ReactGoogleMap = props => {

  return <div style={{ width: '100vw', height: 'calc(100vh - 4rem)' }}>
    <GoogleMapReact
      defaultCenter={{ lat: 32.355482, lng: 72.406900 }}
      defaultZoom={15}
    >

    </GoogleMapReact>
  </div>
}
export default ReactGoogleMap;