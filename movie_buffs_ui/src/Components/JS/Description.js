import React, { Component } from "react";
import "../CSS/Description.css";
import "../CSS/description-responsive.css";
import { searchId } from "../../MoviesBuffsApi";
import Header from "./Header.js";
import { Redirect } from 'react-router-dom'
import Loading from './Loading.js'
import Footer from './Footer.js'
import Video from './Video.js'
import Details from './Details.js'
import Reviews from './Reviews.js'

export default class Description extends Component {
    constructor() {
        super();
        this.state = {
            movie: {
                movie: {},
            },
            loading: true
        };
        this.clickHandler=this.clickHandler.bind(this);
    }

    componentDidMount()
    {
        
        let id = this.props.match.params.id;
        searchId(id).then(movie => {
          this.setState({ movie: movie, loading: false });
        });
    }

    clickHandler() {
        this.componentDidMount();
    }
    
    render() {
        if (!localStorage.sessionDetails) {
            return <Redirect to="/" />;
        }
        if (this.state.loading) {
            return <Loading />;
        }
        let data = this.state.movie.movie;
        const element =
            <div>
                <Header components={{ user: true, browseMovies: true }} />
                <div className="main-description-container">
                    <div className="row-first">
                        <div className="column-1">
                            <img className="description-img"
                                src={data && data.Poster} alt='' />
                        </div>
                        <Details data={data}  />
                    </div>
                    <Video data={data} />
                    <Reviews reviews={(this.state.movie.movie.reviews) ? 
                        (this.state.movie.movie.reviews) : {}} imdbId={this.props.match.params.id} method={this.clickHandler}/>                </div>
                <Footer />
            </div>
        return element;
    }
}
