import React from 'react';
import { Typography,  Input, List, Space, Avatar } from 'antd';
import LocationItem from './LocationItem'
const { Title, Link } = Typography;
const { Search } = Input;
const onSearch = value => console.log(value);


export default class LocationList extends React.Component {

  render(){
    var self = this;
    if(this.locations){
    console.log("this.location")
    console.log(this.location)
      var locations = this.props.locations.map(function (l) {
        var active = self.props.activeLocationAddress == l.address;
        
        return <LocationItem address ={l.address} timestamp={l.timestamp} active={active} onClick ={self.props.onClick} />
      });
      if(!locations.length){
        return null;
      }
    }

    return (
      <List>
        <List.Item>Saved Locations11</List.Item>
        {locations}
      </List>
    )
  }
}
