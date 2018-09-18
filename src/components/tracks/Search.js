import React, { Component } from 'react';
import { Consumer } from '../../context';
import Axios from 'axios';

class Search extends Component {
  state = {
    trackTitle: '',
    disableSubmitBtn: true
  };

  onChangeHandler = e => {
    // Handling submit button disability
    e.target.value == ''
      ? this.setState({ disableSubmitBtn: true })
      : this.setState({ disableSubmitBtn: false });

    // Setting the track title in the state
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (dispatch, e) => {
    // Prevent the default behavior of form
    e.preventDefault();

    const { data } = await Axios.get(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
        this.state.trackTitle
      }&page_size=10&page=1&s_track_rating=desc&apikey=${
        process.env.REACT_APP_MM_KEY
      }`
    );

    const { track_list } = data.message.body;

    dispatch({ type: 'SEARCH_TRACK', payload: track_list });

    this.setState({ trackTitle: '', disableSubmitBtn: true });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card">
              <div className="card-content">
                <h1 className="title is-2 has-text-centered">
                  <i className="fas fa-music" /> Search for a song
                </h1>
                <p className="has-text-centered">Get the lyrics for any song</p>

                <form
                  onSubmit={this.onSubmit.bind(this, dispatch)}
                  style={{ marginTop: '2em' }}
                >
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Song title..."
                        name="trackTitle"
                        onChange={this.onChangeHandler}
                        value={this.state.trackTitle}
                      />
                    </div>
                  </div>

                  <div className="field ">
                    <div className="control">
                      <button
                        disabled={this.state.disableSubmitBtn}
                        className="button is-link is-fullwidth is-medium"
                        type="submit"
                      >
                        Get Track Lyrics
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
