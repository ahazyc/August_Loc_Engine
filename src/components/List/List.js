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
        <List.Item>Saved Locations</List.Item>
        {locations}
      </List>
    )
  }
}

// const ListTable = () => {
//     const listData = [];
//     for (let i = 0; i < 23; i++) {
//       listData.push({
//         href: 'https://ant.design',
//         title: `Fake data place ${i}`,
//         avatar: 'https://joeschmoe.io/api/v1/random',
//         description:
//           'Fake place',
//         content:
//           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quas ut numquam veritatis harum fugit. Minima harum vero quasi pariatur, necessitatibus dolor repellendus eum dolorum aperiam! Ipsam officiis sapiente veniam?',
//       });
//     }
  
//     const IconText = ({ icon, text }) => (
//       <Space>
//         {React.createElement(icon)}
//         {text}
//       </Space>
//     );
  
//     return (
//       <List
//         itemLayout="vertical"
//         size="large"
//         pagination={{
//           onChange: page => {
//             console.log(page);
//           },
//           pageSize: 6,
//         }}
//         dataSource={listData}
  
//         renderItem={item => (
//           <List.Item
//             key={item.title}
//           >
//             <List.Item.Meta
//               avatar={<Avatar src={item.avatar} />}
//               title={<a href={item.href}>{item.title}</a>}
//               description={item.description}
//             />
//             {item.content}
//           </List.Item>
//         )}
//       />
//     )
//   }

// export default ListTable;