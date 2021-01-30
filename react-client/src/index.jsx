import React from 'react';
import ReactDOM from 'react-dom';
import Animation from './components/Animation.jsx';
import axios from 'axios';
import { useParams } from 'react-router';


let getImagesById = () => {
  let url = window.location.href;
  url = url.split('/');
  let id = url[4] || 1;
  axios.get(`/items/${id}/images`)
  .then((res)=>{
    ReactDOM.render(<Animation slides={res.data.rows}/>, document.getElementById('images'));
  })
  .catch(err=> console.log(err));
}

getImagesById();
