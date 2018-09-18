import React from 'react';
import { Link } from 'react-router-dom';

const Track = ({ track }) => {
  return (
    <div className="card" style={{ marginBottom: '4rem' }}>
      <div className="card-content">
        <div className="content">
          <h5>{track.artist_name}</h5>
          <p>
            <strong>
              <i className="fas fa-play" /> Track
            </strong>
            : {track.track_name}
            <br />
            <strong>
              <i className="fas fa-compact-disc" /> Album
            </strong>
            : {track.album_name}
          </p>
          <Link
            to={`lyrics/track/${track.track_id}`}
            className="button is-fullwidth is-dark"
          >
            <span className="icon">
              <i className="fas fa-chevron-right" />
            </span>
            <span>View Lyrics</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Track;
