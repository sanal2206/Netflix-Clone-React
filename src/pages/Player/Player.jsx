import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
const Player = () => {

  const [apiData,setApiData]=useState({
    name:'',
    key:"",
    published_at:"",
    type:''
  })

const {id}=useParams();
const navigate=useNavigate()


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODg2YzE2Y2NkYzRmNmM2YjQ1ODE0NmFhYTU2NmQxYiIsIm5iZiI6MTc0NjI3NzYxMi4zMDgsInN1YiI6IjY4MTYxNGVjMjE0Zjk0YmFlYjkwN2YwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VwWipLL7Dkf5LZ2vMrRd8quW2yv4i1vQteYTgLYxixA'
    }
  };
  
 
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  },[])
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt=""  onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} frameborder="0" title='trailer' allowFullScreen ></iframe>

      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player