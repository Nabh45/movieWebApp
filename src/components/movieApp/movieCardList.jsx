import React from 'react';
import MovieCard from './movieCard';

class MovieCardList extends React.Component {

    constructor(props) {
        super(props)
        this.toggleFavourite = this.toggleFavourite.bind(this);
        this.movieIndexInFavList = this.movieIndexInFavList.bind(this);
        this.getFavMovieList = this.getFavMovieList.bind(this);
        this.updateFavMovieList = this.updateFavMovieList.bind(this);
        this.hideFavouriteList = this.hideFavouriteList.bind(this);
        this.state = { ...props }
    }

    componentDidMount() {
        this.getFavMovieList();
    }

    static getDerivedStateFromProps(props,state) {
        return {
            ...props
        }
    }

    getFavMovieList() {
        var favouriteMovieList = localStorage.getItem('favouriteMovieList');
        favouriteMovieList = favouriteMovieList ? JSON.parse(favouriteMovieList) : [];
        this.setState({ favouriteMovieList: favouriteMovieList })
    }

    updateFavMovieList() {
        var favouriteMovieList = this.state.favouriteMovieList;
        var index = this.movieIndexInFavList();
        if(index != -1) favouriteMovieList.splice(index,1)
        else { favouriteMovieList.push({...this.state.movieDetails,isFavouriteMarked: true})}
        localStorage.setItem('favouriteMovieList',JSON.stringify(favouriteMovieList))
        this.getFavMovieList();
    }

    movieIndexInFavList() {
        let tempIndex = this.state.favouriteMovieList && this.state.favouriteMovieList.length > 0 && this.state.favouriteMovieList.findIndex(item => item.imdbID == this.props.movieDetails.imdbID);
        return tempIndex;
    }

    toggleFavourite() {
        this.updateFavMovieList();
    }

    hideFavouriteList() {
        return window.location.href.split('/')[window.location.href.split('/').length-1] == 'favouriteList'
    }

    render() {
        return (
            <div className="temp">
                {!this.hideFavouriteList() && 
                <div className="card-outer card-direction search-top">
                    <MovieCard currentItem={this.props.movieDetails} enableSelectFavourite={true} toggleFavourite={this.toggleFavourite} movieIndexInFavList={this.movieIndexInFavList}/>
                </div>}

                {this.hideFavouriteList() && 
                    <div className="card-outer card-direction">
                        {this.state.favouriteMovieList && this.state.favouriteMovieList.map((item,index) => 
                            <MovieCard currentItem={item} />
                        )}
                    </div>}
            </div>
        )
    }

}

export default MovieCardList;