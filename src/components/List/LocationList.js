import React from 'react';
import { List } from 'antd';



export default class LocationList extends React.Component {

  render() {
    this.props.favorites.push({
      name: this.props.address,
    });

    console.log(this.props.favorites)
    return (
      <List >
        <List.Item>Recent Search: </List.Item>
        {this.props.favorites.map((favorites, index) => <List.Item key={index}>{favorites.name}</List.Item>)}
      </List>
    )
  }
}
