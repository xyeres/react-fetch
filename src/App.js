import React, { Component } from 'react';
import './App.css';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';
import axios from 'axios';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true
    }
  } 

  componentDidMount() {
    this.performSearch();

    // fetch('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
    //   .then(res => res.json())
    //   .then(resData => {
    //     this.setState({gifs: resData.data});
    //   })
    //   .catch(err => {
    //     console.error('Errer fetching data ', err);
    //   })
  }

  performSearch = (query = 'gurren lagen') => {
    axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&limit=25&api_key=dc6zaTOxFJmzC`)
    .then(res => {
        this.setState({
          gifs: res.data.data,
          loading: false
        })
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render() { 

    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch} />      
          </div>   
        </div>    
        <div className="main-content">
        {
          (this.state.loading)
          ? <p>Loading...</p>
          : <GifList data={this.state.gifs} />
        }
        </div>
      </div>
    );
  }
}
