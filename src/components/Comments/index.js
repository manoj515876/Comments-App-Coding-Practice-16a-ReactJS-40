import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    name: '',
    comment: '',
    count: 0,
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const backgroundColor =
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]
    const {name, comment} = this.state
    const addNewComment = {
      id: uuidv4(),
      profile: name[0],

      time: formatDistanceToNow(new Date()),
      name,
      comment,
      background: backgroundColor,
      isLiked: false,
    }
    this.setState(preState => ({
      commentsList: [...preState.commentsList, addNewComment],
      count: preState.count + 1,
      name: '',
      comment: '',
    }))
  }

  onLike = id => {
    const {commentsList} = this.state
    this.setState(preState => ({
      commentsList: preState.commentsList.map(each => {
        if (id === each.id) {
          return {...each, isLiked: !each.isLiked}
        }
        return commentsList
      }),
    }))
  }

  onDelete = id => {
    const {commentsList} = this.state
    const filteredList = commentsList.filter(each => each.id !== id)
    this.setState({commentsList: filteredList})
    this.setState(preState => ({count: preState.count - 1}))
  }

  render() {
    const {name, comment, count, commentsList} = this.state

    return (
      <div className="container">
        <h1 className="heading">Comments</h1>
        <div className="comments-container">
          <form className="form-card" onSubmit={this.onAddComment}>
            <p className="para">Say something about 4.0 Teachnologies </p>

            <input
              value={name}
              type="text"
              onChange={this.onChangeName}
              className="username"
              placeholder="Your Name"
            />
            <textarea
              value={comment}
              type="text"
              onChange={this.onChangeComment}
              placeholder="Your Comment"
              className="comment"
            />
            <button type="submit" className="button">
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comment-img"
          />
        </div>
        <hr className="line" />
        <div className="comments-details-container">
          <div className="count-card">
            <p className="count">{count}</p>
            <p className="comment-para">Comments</p>
          </div>
          <ul className="list-container">
            {commentsList.map(each => (
              <CommentItem
                commentDetails={each}
                key={each.id}
                onLike={this.onLike}
                onDelete={this.onDelete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
