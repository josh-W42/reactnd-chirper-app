import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti';

class Tweet extends Component {
  render() {
    const { tweet } = this.props;

    const handleLike = e => {
      e.preventDefault();

      // handle the like tweet
    }
    
    const toParent = (e, id) => {
      e.preventDefault();
      // todo: Redirect to the parent tweet
    }

    if (tweet === null) {
      return <p>This Tweet Doesn't Exist</p>
    }

    const {
      name, avatar, timestamp, text, hasLiked, likes, replies, parent
    } = tweet;

    return (
      <div className='tweet'>
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className="avatar"
        />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button className="replying-to" onClick={(e) => this.toParent(e, parent.id)}>
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked
              ? <TiHeartFullOutline color="#e0245e" className='tweet-icon' />
              : <TiHeartOutline className="tweet-icon" />}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </div>
    )
  }
}

// { what is in the store }, { current object props }
function mapStateToProps({ authedUser, users, tweets }, { id }) {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  return {
    authedUser,
    tweet: tweet
    ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
    : null,
  }
}

export default connect(mapStateToProps)(Tweet);