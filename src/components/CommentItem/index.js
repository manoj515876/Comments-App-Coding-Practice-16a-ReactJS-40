import './index.css'

const CommentItem = props => {
  let likeClass = null
  let likeImage = null
  const {commentDetails, onLike, onDelete} = props
  const {id, profile, isLiked, time, name, comment, background} = commentDetails
  const onClicked = () => {
    onLike(id)
  }

  const deleteComment = () => {
    onDelete(id)
  }

  if (isLiked) {
    likeClass = 'liked'
    likeImage =
      'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
  } else {
    likeClass = ''
    likeImage =
      'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  }
  console.log(isLiked)

  return (
    <li>
      <div className="card">
        <p className={`profile ${background}`}>{profile}</p>
        <p className="heading">{name}</p>
        <p className="para">{time}</p>
      </div>
      <p className="comment-describe">{comment}</p>
      <div className="final-card">
        <button type="button" onClick={onClicked} className="like-card">
          <img src={likeImage} alt="like" className="like-img" />
          <p className={`like ${likeClass}`}>Like</p>
        </button>
        <button
          data-testid="delete"
          type="button"
          className="delete-button"
          onClick={deleteComment}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="line" />
    </li>
  )
}

export default CommentItem
