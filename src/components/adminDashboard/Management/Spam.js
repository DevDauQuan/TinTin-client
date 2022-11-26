import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentList from "../ContentList";
import { getSpamPosts } from '../../../redux/actions/adminAction';

const Spam = () => {
  const { auth, admin, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpamPosts(auth.token));

  }, [dispatch, auth.token])


  return (
    <div className="main_admin" style={{ filter: `${theme ? "invert(1)" : "invert(0)"} ` }}>
      <div className="">
        <div className="main__title">
          <div className="main__greeting mx-auto">
            <h2 style={{ filter: `${theme ? "invert(1)" : "invert(0)"} ` }}>Spam Dashboard</h2>
          </div>
        </div>
        <div className="spam">
          <ContentList content={admin.spam_posts} />
        </div>
      </div>
    </div>
  );
};

export default Spam;
