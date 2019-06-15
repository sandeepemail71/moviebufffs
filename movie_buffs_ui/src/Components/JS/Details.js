import React, { Component } from "react";
import "../CSS/Description.css";
import "../CSS/description-responsive.css";

export default class Details extends Component {  
    render() {

        let data = this.props.data;
        const element = <div className="column-2">
            <div className="row-1">
                <h3 className="movie-name"> {data && data.Title}</h3>
                {(data.currently_playing) ?
                    <div className="float-right btn-div">
                        <a target='_blank' href={`https://in.bookmyshow.com/bengaluru/movies/${
                            data.Title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').split(
                                ' ').join('-')}/${data.bms_id}`}>
                            <button type="button" class="btn-sm btn-div btn-danger">Book Now</button>
                        </a>
                    </div>
                    : <div></div>}
                <div className="height-bw-name-year" />
                <h4 className="year">{data && data.Year}</h4>
                <h6 className="movie-type">{data && data.Actors}</h6>
                <h6 className="movie-type">{data && data.Genre}</h6>
            </div>
            <div className="height-bw-year-rating" />
            <div>
                <i className="fab fa-imdb imdb-icon-font" />
                <h4 className="rating-text">{data && data.imdbRating}</h4>

            </div>
            <div>
                <i className="far fa-money-bill-alt icon-size" />
                <h4 className="rating-text">{data && data.BoxOffice}</h4>
            </div>
            <div>
                <div className="height-bw-rating-plot" />
                <h4 className="plot"> Plot </h4>
                <p className="movie-description-para">{data && data.Plot}</p>
            </div>
        </div>
        return element;
    }
}