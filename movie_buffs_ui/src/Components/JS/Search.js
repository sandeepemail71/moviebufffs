import React, { Component } from "react";
import "../CSS/MovieGrid.css";
import "../CSS/SearchPage.css";
import { searchTitle } from "../../MoviesBuffsApi";
import Header from "./Header";
import MovieGrid from "./MovieGrid";
import { DebounceInput } from "react-debounce-input";
import {Redirect} from 'react-router-dom'
import Footer from './Footer.js'

export default class SearchItem extends Component 
{
  constructor() 
  {
    super();
    this.state =
    {
      MovieSearch: [],
      error: ''
    };
    this.getMovieSearch = this.getMovieSearch.bind(this);
  }

  getMovieSearch(event) 
  {
    let title = event.target.value;
    if (title.length === 0) 
     {
         this.setState({ MovieSearch: [] });
     }
    else 
    {
      searchTitle(title)
      .then(movie =>
        {  
           this.setState({ MovieSearch: movie, error: '' });
        })
      .catch(() => 
        {
           this.setState({ MovieSearch: [], error: "No movies found" })
        })
    }
  }

  render() 
    {
      if(!localStorage.sessionDetails)
      {
         return <Redirect to="/" />
      }
      let MovieItems = [];
   
        const element=  <div>
                            <Header components={{ user:true, browseMovies: false }} />
                            <div className="main-container-for-search-page">
                                <div className="input-group search-postion">
                                    <span className="input-group-addon">
                                    <i class="fas fa-search"></i>
                                    </span>
                                    <DebounceInput
                                    className="form-control search-input"
                                    minLength={2}
                                    debounceTimeout={500}
                                    onChange={event => this.getMovieSearch(event)}
                                    />
                                </div>
                                <div className="error-message">
                                    <span>{this.state.error}</span>
                                </div>
                                {this.state.MovieSearch && this.state.MovieSearch.forEach((movie) => {
                                    if (movie.Poster !== "N/A" && movie.Poster !== " ") {
                                        MovieItems.push(movie);
                                    }
                                })}
                                <MovieGrid movies={MovieItems} />
                            </div>
                            <Footer />
                        </div>
        return element;
    }
}
