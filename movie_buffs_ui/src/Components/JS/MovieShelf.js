import React, { Component } from "react";
import "../CSS/MovieShelf.css";
import "../CSS/movieshelf-responsive.css";
import MovieGrid from "./MovieGrid.js";

export default class MovieShelf extends Component {
  render() {
    const element = (
      <div className="movie-shelf">
        <MovieGrid />
      </div>
    );
    return element;
  }
}


