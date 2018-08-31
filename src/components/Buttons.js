import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styles from '../styles/Buttons.scss';

class Buttons extends Component {
  constructor(props) {
    super(props);

    // this.handleDrop = this.handleDrop.bind(this);
  }

  // handleDragOver(e) {
  //   e.preventDefault();

  //   e.dataTransfer.dropEffect = 'copy';
  // }

  // handleDrop(e) {
  //   e.preventDefault();
  //   const articleId = e.dataTransfer.getData('text/plain');

  //   return this.props.onDrop(articleId);
  // }

  render() {
    /** DRAG AND DROP VARIABLES */
    // const { bookmarks } = this.props;
    // const isBookmarkEmpty = bookmarks.length < 1;
    // const bookmarkList = bookmarks.map(articleId => {
    //   const article = document.getElementById(articleId);

    //   return article;
    // });

    return (
      <div className={styles.buttons}>
        <Link to="/favorites">
          <button className={styles.favorites}>
            <i className="fas fa-star"></i>
            <h3>My Favorites</h3>
          </button>
        </Link>
        <Link to="/bookmarks">
          <button className={styles.bookmarks}>
            <i className="fas fa-bookmark"></i>
            <h3>Bookmarks</h3>
          </button>
          {/*<div className={style.drop_area} onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
            {isBookmarkEmpty ? <p>Drop your articles here</p> : <ul>{bookmarkList}</ul>}
      </div>*/}
        </Link>
      </div>
    );
  }
}

export default Buttons;