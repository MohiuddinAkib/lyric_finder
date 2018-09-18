import React, { Component } from 'react';
import Axios from 'axios';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  };

  async componentDidMount() {
    // Getting id param from url
    const { id } = this.props.match.params;
    // Fetching data from musixmatch with async await
    try {
      // Fetching lyrics
      const lyricsResponse = await Axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      );

      // Fetching track
      const trackResponse = await Axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      );

      // Destructuring lyrics out of lyrics response
      const { lyrics } = lyricsResponse.data.message.body;
      // Destructuring track out of lyrics response
      const { track } = trackResponse.data.message.body;
      // Setting the state after fetching lyrics and track
      this.setState({ lyrics, track });
    } catch (error) {
      // Cathing and then showing error
      console.log(error);
    }
  }

  render() {
    const { track, lyrics } = this.state;
    console.log(track, lyrics);
    let output =
      Object.keys(track).length === 0 || Object.keys(lyrics).length === 0 ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <Link
            to="/"
            className="button is-small is-dark"
            style={{ marginBottom: '4em' }}
          >
            Go back
          </Link>

          <div className="card">
            <header class="card-header">
              <p class="card-header-title">
                {track.track_name} by
                <span
                  className="has-text-grey-darker"
                  style={{ marginLeft: '0.3em' }}
                >
                  {track.artist_name}
                </span>
              </p>
            </header>
            <div className="card-content">
              <div className="content"> {lyrics.lyrics_body}</div>
            </div>
          </div>

          <article class="message" style={{ marginTop: '2em' }}>
            <div class="message-body content">
              <ul>
                <li>
                  <strong>Album ID</strong>: {track.album_id}
                </li>

                <li>
                  <strong>Song genre</strong>:{' '}
                  {track.primary_genres.music_genre_list.length !== 0
                    ? track.primary_genres.music_genre_list[0].music_genre
                        .music_genre_name
                    : 'N/A'}
                </li>
                <li>
                  <strong>Explicit Words</strong>:{' '}
                  {track.explicit === 0 ? 'No' : 'Yes'}
                </li>
                <li>
                  <strong>Release Date</strong>:{' '}
                  <Moment format="DD/MM/YYYY">
                    {track.first_release_date}
                  </Moment>
                </li>
              </ul>
            </div>
          </article>
        </React.Fragment>
      );

    return <section className="section">{output}</section>;
  }
}

export default Lyrics;
