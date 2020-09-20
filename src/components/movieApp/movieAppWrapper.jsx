import React from 'react';
import MovieAppHeader from './movieAppHeader';
import MovieCardList from './movieCardList';
import { toast } from 'react-toastify';

class MovieAppWrapper extends React.Component {

    constructor(props) {
        super()
        this.state = { movieList: [] ,movieDetails: '',isSearched: false}
        this.search = this.search.bind(this);

    }

    search(searchAttributes) {
        var url = 'http://www.omdbapi.com/?apikey=b678de0b&t='+searchAttributes.title+'&y='+searchAttributes.year+ '&type='+searchAttributes.type.value+'&page='+1+'&r='+'json';
        fetch(url)
            .then(res => {
                return res.json();
            }).then(data => {
                this.setState({movieDetails: data, isSearched: true})
            }).then(error => {
                console.log(error);
            })
    }

    showSearchError() {
        toast.error('No movie found')
    }

    render() {
        const { movieDetails, isSearched } = this.state;
        return (
            <React.Fragment>
            <div className="clearfix"></div>
                <div className={(!isSearched || (isSearched && movieDetails.Error))? 'background-image': ''}>
                    <MovieAppHeader search={this.search}/>
                </div>

                {movieDetails  && !movieDetails.Error &&  <MovieCardList movieDetails={movieDetails} />}

                {((!movieDetails || movieDetails.Error)  && isSearched) && this.showSearchError()}

            </React.Fragment>
        )
    }

}

export default MovieAppWrapper;