import React, { Component } from 'react';
import { Card, Input,List, Avatar, Button } from 'antd';

const { Search } = Input;

export default class CurrentLocation extends React.Component {
    toggleFavorite() {
        this.props.onFavoriteToggle(this.props.address);
    }
    render() {
        var starClassName = "glyphicon glyphicon-star-empty";

        if (this.props.favorite) {
            starClassName = "glyphicon glyphicon-star";
        }

        return (
            <Card>
                <List
                    itemLayout="horizontal">
                    <List.Item>
                        <h1 id="save-location">{this.props.address}</h1>
                        <Button className={starClassName} onClick={this.toggleFavorite} aria-hidden="true">Save</Button>
                    </List.Item>
                </List>
                <List>
                    <h4>Saved Locations</h4>
                    
                </List>
            </Card>


        );
    }
}

{/* <List.Item
                        itemLayout="horizontal"
                        dataSource={this.props}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                    title="123"
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    /> */}