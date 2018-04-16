import React, { Component } from "react";

class Playlist extends Component {
  state = {
    songs: []
  };

  componentDidMount() {
    return fetch("/playlist", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        const previousSongs = this.state.songs;
        const updatedSongs = previousSongs.concat(data);

        return this.setState({ songs: updatedSongs });
      });
  }

  handleSongSelect = e => {
    e.preventDefault();
    const newSong = e.target.title;
    this.props.onSelectSong(newSong);
  };

  render() {
    return (
      <div className="playlist-wrapper">
        <h2>Playlist</h2>
        <ul className="playlist">
          {this.state.songs.map(song => {
            return (
              <li key={song} className="playlist-item">
                <a title={song} onClick={this.handleSongSelect}>
                  {song}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Playlist;
