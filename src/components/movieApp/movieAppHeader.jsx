import React from 'react';
import { toast } from 'react-toastify';

const searchTypeOptions = [{text:'Movie',value: 'movie'},{text: 'Series',value: 'series'},{text:'Episode',value:'episode'}]

class MovieAppHeader extends React.Component {

    constructor() {
        super()
        this.state = { title: '', year: '', titleError: false , yearFormatError: false,type: searchTypeOptions[0],titleErrorMessage: 'Title is Mandatory',yearErrorMessage:'Enter the year between 1888(First movie release) and Current Year' };
        this.onChange = this.onChange.bind(this);
        this.search = this.search.bind(this);
        this.validate = this.validate.bind(this);
        this.keyPressValidate = this.keyPressValidate.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    search() {
        this.props.search(this.state);
    }

    keyPressValidate(e) {
        if(e.target.name == 'year' && isNaN(e.target.value)){
            return
        }else {
            this.onChange(e);
        }
    }

    validate() {
        let titleError = false;
        let yearRangeError = false;
        if(!this.state.title) {
            titleError = true;
            toast.error(this.state.titleErrorMessage)
        }else if(this.state.year && ((this.state.year < 1888) || (this.state.year > new Date().getFullYear()))) {
            yearRangeError = true;
            toast.error(this.state.yearErrorMessage)
        }
        if(!titleError && !yearRangeError){this.search();}
    }

    render() {
        const { title } = this.state
        return (
            <div className="search-div" onKeyPress={this.validate}>
                <div className="search-inner">
                    <label>Title:</label>
                    <input type="text" name="title" value={this.state.title} onChange={this.onChange} />
                </div>
                <div className="search-inner">
                    <label>Year:</label>
                    <input type="text" name="year" value={this.state.year} onChange={this.keyPressValidate} />
                </div>
                <div className="search-inner">
                    <select value={this.state.type} onChange={this.onChange} name="type">
                        {searchTypeOptions.map((item,index) => 
                            <option value={item.value}>{item.text}</option>
                        )}
                    </select>
                </div>
                <button disabled={!title} class={!title ? "btn-disabled" : ""} onClick={this.validate}>Search</button>
            </div>
        )
    }
}

export default MovieAppHeader;