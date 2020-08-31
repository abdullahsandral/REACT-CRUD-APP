import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from '../Shared/Axios/Axios';

import AuthContext from '../Shared/Context/AuthenticationContext';
import Backdrop from '../Shared/UI-Elements/Backdrop';
import Spinner from '../Shared/UI-Elements/Spinner';
import classes from './Posts.module.css';

const NewPost = props => {

  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [postText, setPostText] = useState('');
  const [loading, setLoading] = useState();

  const submitHandler = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      if (postText.trim().length <= 10) { return }
      await Axios.post('posts', { text: postText })
      history.push('/dashboard')
    } catch (err) {
      if (err.response.request.status === 401) { authContext.logout(); }
      history.push('/login')
    } setLoading(false);
  }

  return <>
    {loading &&
      <Backdrop>
        <Spinner />
        <h2 style={{ color: 'gold' }}>Creating Post</h2>
      </Backdrop>
    }
    <div className={classes.newPost}>

      <form onSubmit={submitHandler}>
        <h3>Create New Post</h3>
        <textarea onChange={e => setPostText(e.target.value)} placeholder='Post Description' rows={10} required minLength={10} maxLength={500} />
        <button disabled={postText.trim().length <= 10} type='submit'>CREATE POST</button>
      </form>
    </div>
  </>
}
export default NewPost;