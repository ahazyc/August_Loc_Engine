import React, { Component } from 'react';
import { Card, Input,List, Avatar, Button } from 'antd';

export default class CurrentLocation extends React.Component {
    
    render() {
        console.log(this)
        return (
            <Card>
                <List
                    itemLayout="horizontal">
                    <List.Item>
                        <h1 id="save-location">{this.props.address}</h1>
                    </List.Item>
                </List>
                <List>
                    <h4>Current Location</h4>
                </List>
            </Card>
        );
    }
}