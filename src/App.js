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
      accessToken: 'BQBo1i7wMs-fqxUqIk4PDhfZ9G_993XdMy7IQRPTPG05Wcleu7Sb1V_s8Yor9_5pzTsym2MQZwhMmOzuszWBxSa3l93FPsHXvyCGE2BiDRrrId9-dt5mVO33CB6Hy3A9iCAQTYldgmbj_ujOCEJG81wEZegtCpa83w'
    }
  }

  searchArtist() {
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
    
        this.getToptracks(this.state.id)

      })

    
  }


  getToptracks(id) {
    const BASE_URL = 'https://api.spotify.com/v1/artists/';
    const FETCH_URL = BASE_URL + id + '/top-tracks?country=SE'
    
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

        const tracks = json.tracks;
        this.setState({ tracks });
        

      })

  }

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
    }

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