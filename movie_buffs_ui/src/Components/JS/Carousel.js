import React, { Component } from "react";
import "../CSS/Carousel.css";
import MovieGrid from "./MovieGrid";


class Carousel extends Component {

	constructor() {
		super()
		this.state = {
			upcomingMovies: []
		}
	}

	componentDidMount() {

	}
	
	render() {
		const element = (        
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators custom-carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner carasole-width">
                    <div className="carousel-item custom-carousel-item active ">
                        <MovieGrid movies={this.props.upcomingMovies.splice(0, 4)}/>
                    </div>
                    <div className="carousel-item custom-carousel-item">
                        <MovieGrid movies={this.props.upcomingMovies.splice(0, 4)}/>
                    </div>
                    <div className="carousel-item custom-carousel-item">
                        <MovieGrid movies={this.props.upcomingMovies.splice(0, 4)}/>
                    </div>
                </div>
                <a id='prev' className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a id='next' className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
        return element
	}
}

export default Carousel
