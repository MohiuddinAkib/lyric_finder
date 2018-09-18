import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_TRACK':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search results'
      };

    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    track_list: [],
    heading: 'Top 10 tracks',
    dispatch: action => this.setState(state => reducer(state, action))
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=it&f_has_lyrics=1&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      );

      const { track_list } = data.message.body;

      this.setState({ track_list });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
