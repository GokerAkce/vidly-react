import React from 'react';
import Form from './common/form';
import { getMovie, saveMovie } from '../services/movieService';
import Joi from '@hapi/joi';
import { getGenres } from '../services/genreService';

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

    async populateGenres(){
        const { data: genres } = await getGenres();
        this.setState({genres});
    }

    async populateMovie(){
        const { match, history } = this.props;
        try {
            
            const movieId = match.params.id;
            if(movieId === "new") return;
            const { data : movie } = await getMovie(match.params.id)     
            this.setState({ data: this.mapToViewModel(movie)});
        } catch (ex) {
            if(ex.response && ex.response.status === 404)
                history.replace("/not-found");
        }
    }

    async componentDidMount(){
        await this.populateGenres();
        await this.populateMovie();
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

    async doSubmit(){
        const { history } = this.props;
        await saveMovie(this.state.data);
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