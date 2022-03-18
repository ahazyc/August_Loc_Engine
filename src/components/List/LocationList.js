import React from 'react';
import { Typography,  Input, List, Space, Avatar } from 'antd';
const { Title, Link } = Typography;
const { Search } = Input;
const onSearch = value => console.log(value);


export default class LocationList extends React.Component {

  render(){
    this.props.favorites.push({
      name: this.props.address
    })
    return (
      <List>
        <List.Item>Recent Search: </List.Item>
        {this.props.favorites.map(favorites => <List.Item>{favorites.name}</List.Item>)}
      </List>
    )
  }
}
