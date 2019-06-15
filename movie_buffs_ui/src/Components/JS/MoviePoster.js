import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../CSS/MoviePoster.css";
import "../CSS/movieposter-responsive.css";

export default class MoviePoster extends Component {
    render() {
        if(this.props.marked === false && window.location.href === 'https://rahulpugal.pythonanywhere.com/dashboard')
            return <div></div>
        return (
            <div className="col-md-3 col-sm-6 poster-size">
                <div className="movie-cover-conatiner">
                    <NavLink to={`/desc/${this.props.movie.imdbID}`}>
                        <div className="border-div">
                            <img
                                className="movie-cover"
                                src={this.props.movie.Poster && this.props.movie.Poster}
                                alt={this.props.movie.Title}
                            />
                        </div>
                        <div className="middle">
                            <h4>{this.props.movie.Title}</h4>
                        </div>
                    </NavLink>
                    <div className="star-position">
                        {this.props.marked
                            ? <i onClick={() => this.props.delete(this.props.movie.imdbID,this.props.movie.Title)} className="fas fa-star star-change" />
                            : (<i onClick={() => this.props.notify(this.props.movie.imdbID,this.props.movie.Title)} className="fas fa-star " />)
                        }
                    </div>
                </div>
            </div>
        );

    }
}
