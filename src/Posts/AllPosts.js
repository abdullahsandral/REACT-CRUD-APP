import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Axios from '../Shared/Axios/Axios';
import ReactDataTable from 'react-data-table-component'

import classes from './Posts.module.css';
import Backdrop from '../Shared/UI-Elements/Backdrop';
import Spinner from '../Shared/UI-Elements/Spinner';
import AuthenticationContext from '../Shared/Context/AuthenticationContext';
import Notification from '../Shared/Notification/Notification';
import Moment from 'moment';


const AllPosts = props => {

  const AuthContext = useContext(AuthenticationContext);
  const [allPosts, setAllPosts] = useState([])
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('LOADING POSTS');
  const [showModel, setShowModel] = useState(false);
  const [postID, setPostID] = useState();

  const deleteHandler = async id => {
    setShowModel(false)
    setLoading(true);
    setLoadingText('DELETING POST')
    try {
      const response = await Axios.delete('posts/' + postID);
      if (response.data) {
        const newPosts = allPosts.filter(post => post._id !== postID);
        setAllPosts(newPosts);
      }
    } catch (error) { alert('POST COULD NOT BE DELETED') }
    setLoading(false);
  }

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await Axios.get('posts');
        setAllPosts(response.data);
      } catch (error) { Notification('error', 'FAILED', 'Fetching Posts Failed') }
      setLoading(false)
    }
    getAllPosts();
  }, [])

  const dragHandler = e => {
    const data = { id: e.target.id, Y: e.clientY };
    e.dataTransfer.setData('text/JSON', JSON.stringify(data));
    e.target.parentElement.id = 'Parent'
  }

  const dragoverHandler = e => e.preventDefault()

  const dropHandler = e => {
    const data = JSON.parse(e.dataTransfer.getData('text/JSON'))
    const { id, Y } = data;
    const draggedElement = document.getElementById(id);
    const targetElement = e.target.parentElement
    if (!draggedElement || !targetElement) return;
    const parentElement = targetElement.parentNode;
    if (!parentElement || parentElement.id !== 'Parent') return;
    if (Y > e.clientY) { parentElement.insertBefore(draggedElement, targetElement) }
    else parentElement.insertBefore(draggedElement, targetElement.nextSibling)
  }
  useEffect(() => {
    const rows = document.getElementsByClassName('doBktq');
    for (let row of rows) {
      row.draggable = true;
    }
  })

  useEffect(() => {
    document.addEventListener('dragstart', dragHandler)
    document.addEventListener("dragover", dragoverHandler)
    document.addEventListener('drop', dropHandler);

    return () => {
      document.removeEventListener('dragstart', dragHandler)
      document.removeEventListener("dragover", dragoverHandler)
      document.removeEventListener('drop', dropHandler);
    }
  }, [])

  const columns = [
    {
      name: 'POST ID',
      selector: '_id',
      sortable: true,
      cell: p => <h4><Link className={classes.postLink} to={`post/${p._id}`}>{p._id}</Link></h4>
    },
    {
      name: 'POST TEXT',
      selector: 'text',
      wrap: true,
      sortable: true,
      cell: p => <h4><Link className={classes.postLink} to={`post/${p._id}`}>{p.text}</Link></h4>
    },
    {
      name: 'USER ID',
      selector: 'user',
      wrap: true,
      sortable: true,
      cell: p => <h4><Link className={classes.postLink} to={`post/${p._id}`}>{p.user}</Link></h4>
    },
    {
      name: 'DATE',
      selector: 'date',
      wrap: true,
      sortable: true,
      cell: p => <h4><Link className={classes.postLink} to={`post/${p._id}`}>{Moment(p.date).format('DD/MM/YYYY - hh:mm:ss A')}</Link></h4>
    },
    {
      name: 'ACTIONS',
      button: true,
      cell: p => <button disabled={p.user !== AuthContext.userId} onClick={() => { setShowModel(true); setPostID(p._id) }}
        className={classes.DeleteBtn}>DELETE</button>
    },
  ];

  return <>
    {loading &&
      <Backdrop>
        <Spinner />
        <h2 style={{ color: 'gold' }}>{loadingText}</h2>
      </Backdrop>
    }
    {showModel &&
      <Backdrop>
        <div className={classes.Modal}>
          <h3>ARE YOU SURE</h3>
          <button onClick={deleteHandler}>YES</button>
          <button onClick={() => setShowModel(false)}>NO</button>
        </div>
      </Backdrop>
    }
    <div className={classes.mainDiv}>
      {!loading && allPosts.length <= 0 && <div className={classes.allPosts}><p> No Post Found</p></div>}
      {!loading && allPosts.length > 0 && <ReactDataTable
        title="ALL POSTS LIST"
        columns={columns}
        data={allPosts}
        pagination
        paginationRowsPerPageOptions={[5, 10, 15, 20,]}
      />}
    </div>

  </>
}

export default AllPosts;
