import React, { Component } from "react";
import "../CSS/Dashboard.css";
import {getUserMovies,deleteUserMovie } from "../../MoviesBuffsApi";
import Header from "./Header.js";
import MovieGrid from "./MovieGrid";
import {Redirect} from 'react-router-dom'
import Footer from './Footer.js'
import swal from 'sweetalert'
import {NotificationContainer} from 'react-notifications';

export default class DashBoard extends Component {
    constructor() {
      super();
      this.state = {
        movies: [],
       
          };
          this.getUserMovies=this.getUserMovies.bind(this);
          this.removeDashBoard = this.removeDashBoard.bind(this);
    }
   getUserMovies()
   {
    let user_id=(localStorage.sessionDetails) ? (JSON.parse(localStorage.sessionDetails).localId) : null
    if(user_id) {
        getUserMovies(user_id)
        .then((movies) => {
            this.setState({movies: Object.values(movies)});
        })
    } 
   }
   removeDashBoard(imdb)
   {
     
       let id=JSON.parse(localStorage.sessionDetails).localId
       deleteUserMovie(id,imdb).then(this.getAllUserMovie).then(
          swal({
           title: 'Removed from  Dashboard ',
         })
       );
   }

    componentDidMount() {
        this.getUserMovies(this)
       
    }
    
  
    render() {
      if(!localStorage.sessionDetails)
      {
        return <Redirect to="/" />
      }
        const element=
                    <div>
                        <NotificationContainer/>
                        <Header components={{ user: true, browseMovies: true }}/>
                        <div className="main-container-for-search-page">
                          <div className="text-container">
                              <h3 className="recomended-text">{JSON.parse(localStorage.sessionDetails).user_name}'s Favourite</h3>
                          </div>
                          <MovieGrid movies={this.state.movies} icon={this.state.icon} />
                        </div>
                        <Footer />
                    </div>
        return element
    }
}