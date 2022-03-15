// import '.../index.css';
import { Layout, Typography, Card, Input, Row, Col, List, Space, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
const {Header, Content, Footer } = Layout;
const { Title, Link } = Typography;
const { Search } = Input;
const onSearch = value => console.log(value);

const Head = () => {
    return (
        <Header>
            <Row>
                <Col span={8}>
                    <h1 className='headerBand'>
                        August Location Engine
                    </h1>
                </Col>
                <Col span={8} offset={8}>
                    <Search className="searchBar1" placeholder="Enter a place" onSearch={onSearch} enterButton />
                </Col>

            </Row>
        </Header>
    )
}
export default Head;