import React from 'react';
import moment from 'moment'

export default class LocationItem extends React.Component {
    handleClick(){
        this.props.onClick(this.props.address);
    }

    render(){
        var cn = 'list-group-item';

        if(this.props.active){
            cn += ' active-loction';
        }

        return (
            <a className={cn} onClick={this.handleClick}>
                {this.props.address}
                <span className="createdAt">{ moment(this.props.timestamp).fromNow() }</span>
                <span className="glyphicon glyphicon-menu-right"></span>
            </a>
        )
    }
}