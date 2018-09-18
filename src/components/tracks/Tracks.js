import React, { Component } from 'react';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';
import Track from './Track';

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { heading, track_list } = value;
          return track_list.length === 0 ? (
            <Spinner />
          ) : (
            <React.Fragment>
              <h3 className="has-text-centered title">{heading}</h3>
              <div className="columns" style={{ flexWrap: 'wrap' }}>
                {track_list.map(({ track }) => (
                  <div className="column is-6" key={track.track_id}>
                    <Track track={track} />
                  </div>
                ))}
              </div>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Tracks;
