import React from 'react';
import Form from './common/form';
import { getMovie, saveMovie } from '../services/fakeMovieService';
import Joi from '@hapi/joi';
import { getGenres } from '../services/fakeGenreService';

class MovieForm extends Form {
    state = { 
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        genres: [],
        errors: {}
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string().max(45).required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(1).max(10000).required().label('Number In Stock'),
        dailyRentalRate: Joi.number().min(1).max(10).required().label('Rate'),
    }

    componentDidMount(){
        const { match, history } = this.props;
        const genres = getGenres();
        this.setState({genres});

        const movieId = match.params.id;
        if(movieId === "new") return;

        const movie = getMovie(match.params.id) 
        if(!movie) return history.replace("/not-found");

        this.setState({ data: this.mapToViewModel(movie)});

    }

    mapToViewModel(movie){
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    doSubmit(){
        const { history } = this.props;
        saveMovie(this.state.data);
        history.push('/movies')
    }
    render() { 
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelect('genreId', 'Genre', this.state.genres)}
                    {this.renderInput('numberInStock', 'Number In Stock')}
                    {this.renderInput('dailyRentalRate', 'Rate')}
                    {this.renderButton('Save')}
                </form>
            </div>

            // <div>
            //     <h1>{match.params.id}</h1>
            //     <button className="btn btn-primary" onClick={() => history.push('/movies')}>Save</button>
            // </div>
        )
    }
}
 
export default MovieForm;