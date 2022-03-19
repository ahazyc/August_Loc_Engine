import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Checkbox, List } from 'antd';



export default class LocationList extends React.Component {
  onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  deleteHandler = (itemIndex) => {
    const favorites = this.props.favorites;
    favorites.splice(itemIndex, 1);
    this.setState({
      favorites: favorites
    })
  }

  // delete(e){
  //   this.splice(index, 1);
  // }
  render() {
    this.props.favorites.push({
      name: this.props.address,
    });

    return (
      <div>
        <Button onClick={this.deleteHandler}>Delete</Button>
        <List
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={this.props.favorites}
          renderItem={item => (
            <List.Item>
              <Checkbox key={item.index} onChange={this.onChange} >{item.name}</Checkbox>
            </List.Item>
          )}
        />
      </div>
    )
  }
}

// return (
//   <List
//     pagination={{
//       onChange: page => {
//         console.log(page);
//       },
//       pageSize: 3,
//     }}>
//     <List.Item >Recent Search: </List.Item>
//     renderItem={this.props.favorites.map((favorites, index) => <List.Item key={index} >{favorites.name}</List.Item>)}
//   </List>
// )
// }
// }
