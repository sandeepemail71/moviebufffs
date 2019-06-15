import React, { Component } from "react";
import { addReview } from "../../MoviesBuffsApi.js";
import "../CSS/Reviews.css";

export default class Reviews extends Component {
    constructor() {
        super();
        this.state = {
            reviews: [],
            imdbId: ''
        };
        this.addReviewItem = this.addReviewItem.bind(this)
    }

    addReviewItem(event) {
        event.preventDefault()
        if(event.target.reviewText.value.trim() !== "") {
            let reviewData = {
                user_id: JSON.parse(localStorage.sessionDetails).localId,
                imdb_id: this.props.imdbId,
                text: event.target.reviewText.value
            }
            let review = {
                review: [event.target.reviewText.value],
                user_name: JSON.parse(localStorage.sessionDetails).user_name,
            }
            var reviews = this.state.reviews;
            reviews.push(review);
            event.target.reviewText.value = ""
            addReview(reviewData)
            .then(() => {
                this.setState({reviews});
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            reviews: Object.values(nextProps.reviews),
            imdbId: nextProps.imdbId
        })
    }

    componentDidMount() {
        this.setState({
            reviews: Object.values(this.props.reviews),
            imdbId: this.props.imdbId
        })
    }

    render() {
        const element = <div className="main-review-container">
            <div className="tcomment-text">
                <h3><i className="fas fa-comment-alt"></i>&nbsp;Reviews</h3>
            </div>
            <div className="comments-scroll">
                {this.state.reviews.map((review) => {
                    return <Comment key={review} review={review} />
                })}
            </div>
            <div>
                <form onSubmit={this.addReviewItem}>
                    <div className="input-group input-text-margin">
                        <span >
                            <button className="input-group-addon-register add-review-button" type='submit' ><i className="fas fa-comment-alt" /> </button>
                        </span>
                        <input
                            className="form-control height-width"
                            type="text"
                            name='reviewText'
                            placeholder="Add Reviews"
                            value={this.state.firstName}
                            onChange={this.handleFirstNameChange}
                        />
                    </div>
                </form>
            </div>

        </div>
        return element;
    }
}

class Comment extends Component {

    constructor() {
        super()
        this.state = {
            review: []
        }
    }

    componentDidMount() {
        this.setState({
            review: this.props.review.review
        })
    }

    render() {
        const element = <div>
                            {this.state.review.map((review) => {
                                return  <div key={review} className="comment">
                                            <span className="avatar-thumd">
                                                <i className="fas fa-user fa-user-review"></i>
                                            </span>
                                            <div className="comment-text">
                                                <h5>{this.props.review.user_name}</h5>
                                                <p>{review}</p>
                                            </div>
                                        </div>
                            })}
                        </div>
        return element;
    }
}