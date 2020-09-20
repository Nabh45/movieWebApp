import React from 'react';

function MovieCard(props) {
    return (
            <div className="card">
                <img class="card-img" src={props.currentItem.Poster} alt="Avatar" />
                <div className="container">
                    <h4><b>{props.currentItem.Title}</b></h4> 
                    <p>{props.currentItem.Released}</p>
                    {props.enableSelectFavourite && <button className="card_btn" onClick={props.toggleFavourite}>{props.movieIndexInFavList() != -1 ? 'Unfavourite' : 'Favourite'}</button>}
                </div>
            </div>
    )
}

export default MovieCard;