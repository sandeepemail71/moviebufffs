import React, { Component } from "react";
import Iframe from "react-iframe";
import "../CSS/Video.css";
export default class Header extends Component {
    render() {
        const element = (
            <div className="video-container">
                <Iframe
                    url={this.props.data !== undefined && this.props.data.trailer.replace('http://', 'https://')}
                    width="85%"
                    height="85%"
                    frameborder="5px"
                    allowFullScreen
                    ng-show="showvideo"
                />
            </div>

        );
        return element;
    }
}


