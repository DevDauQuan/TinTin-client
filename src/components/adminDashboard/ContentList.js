import React from 'react';
import Avatar from '../Avatar';
import { Link } from 'react-router-dom'
import { deleteSpamPost } from '../../redux/actions/adminAction';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const ContentList = ({ content }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeletePost = (post) => {
    dispatch(deleteSpamPost({ post, auth, socket }));
  };
  return (
    <div>
      {content.length > 0 ? (
        content.map((post) => (

          <div className="admin_content_display d-flex justify-content-around">
            <span className="spam_report">
              Reports: {post.reports.length}
            </span>

            <div className="d-flex align-items-center">
              <Avatar size="big-avatar" src={post.user.avatar} />
              <div className="d-flex flex-column ms-3 username_spam">
                <span className="spam_username">{post.user.username}</span>
                <span className="spam_email">{post.user.email}</span>
              </div>
              <Link to={`/post/${post._id}`} className='spam_link'>Link</Link>
              <span className="spam_time text-muted my-auto">
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
            <div
              className="ms-auto d-flex flex-column "
              style={{ cursor: "pointer" }}
              onClick={() => handleDeletePost(post)}
            >
              <div className='d-flex my-auto'>
                <span className="material-icons text-danger">delete</span>Remove
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>Nothing to display</h1>
      )}
    </div>
  );
}

export default ContentList
