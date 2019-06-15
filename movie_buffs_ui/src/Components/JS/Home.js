import React, { Component } from "react";
import "../CSS/Header.css";
import "../CSS/Home.css";
import "../CSS/home-responsive.css";
import { recommendedMovies, upcomingMovies } from "../../MoviesBuffsApi.js";
import { Redirect } from 'react-router-dom'
import Header from "./Header.js"
import Carousel from "./Carousel.js";
import MovieGrid from "./MovieGrid.js";
import Loading from './Loading.js'
import Footer from './Footer.js'
import {NotificationContainer} from 'react-notifications';


export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            recommendedMovies: [],
            upcomingMovies: [],
            loading: true
        };
    }

    componentDidMount() {
        if (localStorage.sessionDetails) {
            Promise.all([recommendedMovies(JSON.parse(localStorage.sessionDetails).localId), upcomingMovies()])
                .then((movies) => {
                    
                    this.setState({
                        recommendedMovies: Object.values(movies[0]),
                        upcomingMovies: Object.values(movies[1]),
                        loading: false
                    })
                });
        }
    }

    render() {
        if (!localStorage.sessionDetails) {
            return <Redirect to="/" />
        }

        if (this.state.loading) {
            return <Loading />
        }

        const element = (
            <div >
                <NotificationContainer/>
                <Header components={{user: true, browseMovies: true}} />
                <div className="main-container">
                    <div className="container-fluid dark-bg hide">
                        <div className="container dark-bg">
                            <Carousel upcomingMovies={this.state.upcomingMovies} />
                        </div>
                    </div>
                    <div className="container-fluid light-bg">
                        <div className="text-container">
                            <h3 className="recomended-text">Recommended Movies</h3>
                        </div>
                        <div className="container size">
                            <MovieGrid movies={this.state.recommendedMovies} />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
        return element;
    }
}

