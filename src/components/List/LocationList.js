import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Checkbox, List } from 'antd';



export default class LocationList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      deletedItems : []
    };
  }
  onChange(e) {
    e.target.className = 'seleted'
  }

  handleChange() {
    console.log('inside CheckBOx')
    console.log('**************************')
  }


  deleteHandler = () => {
    let a = document.getElementsByClassName('seleted')
    console.log('deleted list')
    console.log(this)
    let b = this.state.deletedItems
    while (a[0]) {
      let listHead = a[0].parentNode
      b.push(a[0].id)
      listHead.parentNode.removeChild(listHead)
      console.log('deleted list')
      console.log(b)
      console.log(this)
    }
  }
  

  render() {


    if (this.props.address !== '') {
      this.props.favorites.push({
        name: this.props.address,
        index: this.props.favorites.length
      })
      console.log('inside pusher')
    };
    console.log('inside render')
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
              <input type='checkbox' onChange={this.onChange} onClick={this.handleChange} id={item.index} /> <label htmlFor={item.index}>{item.index} {item.name}</label>
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