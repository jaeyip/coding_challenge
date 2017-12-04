import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "", // my query
      artist: null,  // my response.
      name: '',
      tracks: null,
      id: '',
      accessToken: 'BQCRKCq7aUy0MY5XLNuF4KjF86zu5vfdRhfjNWTWvrw39YtfGR63HITP956kUKY-bLD2q8E7V9IlpY5o2bJ8Oqdv5zT4XnetVAM86yFUxcdfDFToNlCyniJ4HODTrYPTUmdtA-0gaFIaIkMKqZuUa-mrAtvyBMqjhg'
    }
    
    // this.searchArtist = this.searchArtist.bind(this);

  }

  searchArtist() {
    // console.log('this.state', this.state);
    var BASE_URL = 'https://api.spotify.com/v1/search?';
    var FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
    var accessToken = this.state.accessToken;

    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];   

        this.setState({ artist });
        this.setState({ name: artist.name})
        this.state.id = artist.id;
        // this.setState({ id: artist.id})

        console.log('this.state', this.state);
        console.log('this.id', this.state.id);
        this.getToptracks(this.state.id)

      })

    

  }


  getToptracks(id) {
    const BASE_URL = 'https://api.spotify.com/v1/artists/';
    const FETCH_URL = BASE_URL + id + '/top-tracks?country=SE'
    

    // const FETCH_URL = BASE_URL + this.state.id + '/top-tracks?country=SE'
    var accessToken = this.state.accessToken;

    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        // console.log(json)
        const tracks = json.tracks;
        this.setState({ tracks });
        
        // this.setState({ name: artist.name})
        // this.setState({ id: artist.id})

      })

  }
  // search() {
  //   this.searchArtist()

  //   // this.getToptracks()
    
  // }
  

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  

  render() {
    let tracks = [
      {
        name: '',
        popularity: '',
        album: {
          name: ''
        }
      },
      {
        name: '',
        popularity: '',
        album: {
          name: ''
        }
      },
      {
        name: '',
        popularity: '',
        album: {
          name: ''
        }
      },
      {
        name: '',
        popularity: '',
        album: {
          name: ''
        }
      },
      {
        name: '',
        popularity: '',
        album: {
          name: ''
        }
      },
      {
        name: '',
        popularity: '',
        album: {
          name: ''
        }
      },
      {
        name: '',
        popularity: '',
        album: {
          name: ''
        }
      },
      {
        name: '',
        popularity: '',
        album: {
          name: ''
        }
      },
      {
        name: '',
        popularity: '',
        album: {
          name: ''
        }
      },
      {
        name: '',
        popularity: '',
        album: {
          name: ''
        }
      }
    ]
    if (this.state.tracks !== null) {
      tracks = this.state.tracks;
      // tracks.song = this.state.tracks[0].name
    }

    // const listItems = tracks.map((t, index) =>
    //   <li key={index}>
    //   {t.name}
    // </li>
    // );
    const columns = [
    {
      Header: "Spotify Popularity",
      accessor: 'popularity'
    },
    {
      Header: "Name",
      accessor: 'name'
    }, 
    { 
      id: 'album',
      Header: "Album",
      accessor: d => d.album.name
    }]

    let artist = {
      name: '',
      followers: {
        total: ''
      },
      id: ''
    };

    if (this.state.artist !== null) {
      artist = this.state.artist;
    }

      // <ul>{listItems}</ul>
    return (
      <div className="Custom">
      <div className="col-lg-6">
          Search Your Favorite Artist's Top-10 Tracks on Spotify:
          <div className="input-group">
            <input type="text" 
              onChange={event => { this.setState({ query: event.target.value }) }}
            className="form-control" placeholder="Search for..." />
            <span className="input-group-btn">
              <button 
              onClick={()=> this.searchArtist()}
               className="btn btn-default" type="button">Search</button>
            </span>
          </div>
        </div>
        <hr />
        <div>
          <div> Top-10 Tracks: {artist.name}  </div>
          
        </div>

      
      <ReactTable
        data={tracks}
        columns={columns}
        defaultPageSize={10}
      />
        

        

          </div> 

    );
  }
}
export default App;