import React from 'react'
import  './Home.css'
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [name, setname] = useState("")
  const [error, seterror] = useState('')
  const [data,setData] = useState({
    celcius: 10,
    name:"London",
    humidity:10,
    speed:2,
    image:'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather03-512.png'
  })

const handleSubmit = ()=>{
  if(name!=="") {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=768dc00a830e4d189098f258949d098c&units=metric`;
    axios.get(apiUrl)
    .then(res => {
      let imagePath = '';
      if(res.data.weather[0].main == "Clouds"){
        imagePath = 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather03-512.png'
      }else if (res.data.weather[0].main == "Clear"){
        imagePath = 'https://img.freepik.com/free-vector/blue-sky-clouds-background-with-text-space_1017-26306.jpg'
      }else if(res.data.weather[0].main == "Rain"){
        imagePath = "https://www.freepnglogos.com/uploads/rain-png/cloud-rain-sky-transparent-picture-12.png"
      }else if(res.data.weather[0].main == "Drizzle"){
        imagePath ="https://cdn-icons-png.flaticon.com/512/2675/2675897.png"
      }else if(res.data.weather[0].main == "Mist"){
        imagePath ="https://cdn-icons-png.flaticon.com/512/1197/1197102.png"
      }else {
        imagePath ="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather03-512.png"
      }


      console.log(res.data);
      setData({...data,celcius: res.data.main.temp, name: res.data.name,
         humidity: res.data.main.humidity, speed: res.data.wind.speed,
        image: imagePath })
        seterror('')
    })
    .catch(err => {
      if(err.response.status == 404){
        seterror('Invalid city name')
      }else{
        seterror('')
      }
      console.log(err)})
  }
}
  return (
    <div className='container' >
        <div className="weather">
            <div className="search">
                <input type="text" placeholder='Enter City Name' onChange={e => setname(e.target.value)} />
                <button onClick={handleSubmit} > <SearchIcon/> </button>
            </div >
            <div className='error' >
                <p>{error}</p>
            </div>
            <div className="winfo" >
              <img src={data.image} alt="" />
              <h1>{Math.round(data.celcius)}°C</h1>
              <h2>{data.name}</h2>
              <div className="details">
                <div className="col">
                  <img src="https://cdn-icons-png.flaticon.com/512/3059/3059933.png" alt="" /> 
                  <div className='humidity'>
                    <p>{Math.round(data.humidity)}%</p>
                    <p>Humidity</p>
                  </div>
                </div>
                <div className="col">
                  <img src="https://cdn-icons-png.flaticon.com/512/1247/1247975.png" alt="" /> 
                  <div className='wind' >
                    <p>{Math.round(data.speed)} km/h</p>
                    <p>Wind</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Home