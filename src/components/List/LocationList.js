import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Checkbox, List } from 'antd';



export default class LocationList extends React.Component {
    
  onChange(e) {
    console.log(`checked = ${e.target.checked}`);
    e.target.className = 'seleted'
    console.log(1)
  }

  handleChange(){
    console.log('inside CheckBOx')
    console.log()
    console.log('**************************')
  }
  

  deleteHandler = () => {
    let a = document.getElementsByClassName('seleted')
    let listHead = a[0].parentNode
    console.log('deleting')
    listHead.parentNode.removeChild(listHead)
    console.log('************')
    console.log(a.length)
    
    // let favorites = this.props.favorites;
    // for (let i = 0; i < favorites.length; i++) {
    //   if (favorites[i].index === 1){
    //     favorites = favorites.splice(i,1);
    //   }
    // }
    // this.setState({
    //   favorites: favorites
    // })
  }

  // delete(e){
  //   this.splice(index, 1);
  // }
  render() {
    this.props.favorites.push({
      name: this.props.address,
      index: this.props.favorites.length
    });
    
    console.log(this)
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
              <input type='checkbox' onChange={this.onChange} onClick={this.handleChange} id={item.index}/> <label htmlFor={item.index}>{item.index} {item.name}</label>
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
