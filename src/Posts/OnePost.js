import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import Axios from '../Shared/Axios/Axios';
import Moment from 'moment';

import classes from './Posts.module.css';
import Backdrop from '../Shared/UI-Elements/Backdrop';
import Spinner from '../Shared/UI-Elements/Spinner';
import Notification from '../Shared/Notification/Notification';

const OnePost = props => {

  const id = useParams().pid;
  const [post, setPost] = useState();

  useEffect(() => {

    const getOnePost = async () => {
      try {
        const response = await Axios.get('posts/' + id);
        setPost(response.data);
      } catch (error) {
        Notification('error', 'POST FETCHING', 'FAILED', 1000)
      }
    }; getOnePost()
  }, [id])

  if (!post)
    return <Backdrop>
      <Spinner />
      <h2 style={{ color: 'gold' }}>Loading Post</h2>
    </Backdrop>

  else
    return <div className='mainDiv'>
      <div className={classes.outerDiv}>
        <div className={classes.onePost}>
          <h2>POST INFORMATION</h2>
          <div >
            <h3>POST ID : </h3>
            <p>{post._id}</p>
          </div>
          <div>
            <h3>TEXT : </h3>
            <p>{post.text}</p>
          </div>
          <div>
            <h3>USER ID : </h3>
            <p>{post.user}</p>
          </div>
          <div>
            <h3>DATE : </h3>
            <p>{Moment(post.date).format('DD/MM/YYYY')}</p>
          </div>

          <Link to='/'>BACK</Link>
        </div>

      </div>

    </div>
}

export default OnePost;