// import '.../index.css';
import { Layout, Typography, Input, Row, Col} from 'antd';

const {Header} = Layout;
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
            </Row>
        </Header>
    )
}
export default Head;