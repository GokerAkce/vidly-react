import React, { Component } from 'react';
import MoviesTable from './moviesTable';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService'
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate';
import ListGroup from './common/listGroup'
import _ from 'lodash';
class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' }
      }

    componentDidMount(){
        const genres = [{_id: "", name: "All Genres"},...getGenres()]
        this.setState({movies: getMovies(), genres, selectedGenre: genres[0]});
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].liked = !movie.liked;
        this.setState({movies})
    }

    handlePageChange = page =>{
        this.setState({currentPage : page})
    }

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, currentPage: 1});
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    }

    getPagedData = () =>{
        const {
            pageSize,
            currentPage, 
            movies: allMovies, 
            selectedGenre,
            sortColumn 
        } = this.state;

        const filtered = selectedGenre && selectedGenre._id 
        ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
        : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies};
    }

    render() { 
        const {
            pageSize,
            currentPage, 
            genres, 
            selectedGenre,
            sortColumn 
        } = this.state;

        if(this.state.movies.length === 0) return <p>No movies in the database.</p>;

        const {totalCount, data: movies} = this.getPagedData();

        return ( 
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <ListGroup 
                            items={genres}
                            selectedItem={selectedGenre}
                            onItemSelect={this.handleGenreSelect}
                        />
                    </div>
                    <div className="col">
                        <p>Showing {totalCount} in the database.</p>
                        <MoviesTable 
                            movies={movies} 
                            sortColumn={sortColumn}
                            onLike={this.handleLike} 
                            onDelete={this.handleDelete}
                            onSort={this.handleSort}
                        />

                        <Pagination 
                            itemsCount={totalCount} 
                            pageSize={pageSize} 
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Movies;