import React, { Component } from 'react';
import MoviesTable from './moviesTable';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService'
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate';
import ListGroup from './common/listGroup'
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        searchQuery: "",
        selectedGenre: null,
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
        this.setState({selectedGenre: genre, searchQuery:"", currentPage: 1});
    }

    handleSearch = query => {
        const { genres } = this.state;
        console.log(query)
        this.setState({searchQuery: query, selectedGenre: genres[0], currentPage: 1})
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    }

    getPagedData = () =>{
        const {
            pageSize,
            currentPage, 
            movies: allMovies, 
            searchQuery,
            selectedGenre,
            sortColumn 
        } = this.state;

        let filtered = allMovies;

        if(searchQuery){
            filtered = allMovies.filter(m =>m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        }else{
            filtered = selectedGenre && selectedGenre._id 
            ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
            : allMovies;
        }

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies};
    }

    render() { 
        const {
            pageSize,
            currentPage, 
            genres, 
            searchQuery,
            selectedGenre,
            sortColumn 
        } = this.state;

        if(this.state.movies.length === 0) return <p>No movies in the database.</p>;

        const {totalCount, data: movies} = this.getPagedData();

        return ( 
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <ListGroup 
                            items={genres}
                            selectedItem={selectedGenre}
                            onItemSelect={this.handleGenreSelect}
                        />
                    </div>
                    <div className="col">
                        <Link to="/movies/new">
                            <button className="btn btn-primary">New Movie</button>
                        </Link>

                        <p style={{margin: "10px 0px -10px 0"}}>Showing {totalCount} in the database.</p>
                        <SearchBox value={searchQuery} onChange={this.handleSearch}></SearchBox>
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