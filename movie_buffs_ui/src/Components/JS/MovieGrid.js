import React, { Component } from "react";
import "../CSS/MovieGrid.css";
import MoviePoster from "./MoviePoster.js";
import 'react-notifications/lib/notifications.css';
import {addUserMovie, getUserMovies, deleteUserMovie } from "../../MoviesBuffsApi";
import { NotificationManager} from 'react-notifications';

class MovieGrid extends Component {

    constructor() {
        super();
        this.state = {
            movie: []
        }
        this.getAddDashBoard = this.getAddDashBoard.bind(this)
        this.removeDashBoard = this.removeDashBoard.bind(this);
        this.getAllUserMovie = this.getAllUserMovie.bind(this);
    }

    getAddDashBoard(imdb,title) {

        let id = JSON.parse(localStorage.sessionDetails).localId
        addUserMovie(id, imdb).then(this.getAllUserMovie).then(
            NotificationManager.success(title, 'Added ')
        );
    }

    removeDashBoard(imdb,title) {
        let id = JSON.parse(localStorage.sessionDetails).localId
        deleteUserMovie(id, imdb).then(this.getAllUserMovie).then(
            NotificationManager.success(title, 'Removed ')
        );
    }

    getAllUserMovie() {
        let user_id = (JSON.parse(localStorage.sessionDetails).localId) ? (JSON.parse(localStorage.sessionDetails).localId) : null
        if (user_id) {
            getUserMovies(user_id)
            .then((movies) => {
                this.setState({ movie: Object.values(movies) });
            })
        }
    }

    componentDidMount() {
        this.getAllUserMovie(this);
    }

    render() {
        let imdbData=this.state.movie.map(e=> e.imdbID);
       
        const element = <div className="movie-shelf-container">
                            <div className="row">
                                {this.props.movies && this.props.movies.map((movie) => 
                                {
                                   
                                            if (imdbData.includes(movie.imdbID))
                                            {
                                                 return <MoviePoster key={movie.imdbID} movie={movie}  notify={this.getAddDashBoard}  delete={this.removeDashBoard} 
                                                         marked={true}/>
                                            }
                                     else
                                             {
                                                   return <MoviePoster key={movie.imdbID} movie={movie}  notify={this.getAddDashBoard} delete={this.removeDashBoard} marked={false}/>  
                                             }
                                       
                                })
                            }
                                
                            </div>
                        </div>
        return element;
    }
}

export default MovieGrid;
