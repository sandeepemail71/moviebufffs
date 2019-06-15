import React, { Component } from "react";
import '../CSS/Loading.css'

export default class Loading extends Component {
	render() {
		const element = <div>
							<div className = "centered">
								<div className = "blob-1"></div>
                                <div className = "blob-2"></div>
							</div>
						</div>
		return element;
	}
}