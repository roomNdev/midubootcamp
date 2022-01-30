/* eslint-disable no-unused-vars */
import React, {useState,useEffect} from "react";
import axios from "axios";
const api_key = process.env.REACT_APP_API_KEY


const Countries = ({country}) =>{
  const [showMore,setShowMore] = useState(false)

  
  const handleShowInfo = ()=>{
    setShowMore(!showMore)
  }

  if(showMore){
    return(
        <>
      <p key={country.name}>{country.name}<button onClick={handleShowInfo}>{showMore ? 'hide' : 'show'}</button></p>
      <SpecificCountry name={country.name} capital={country.capital} population={country.population} languages={country.languages} flags={country.flags.svg} flag={country.flag}/>
        </>)
      }
  return(
        <>
      <p key={country.name}>{country.name}<button onClick={handleShowInfo}>{showMore ? 'hide' : 'show'}</button></p>
        </>)
      }
      


const SpecificCountry =(props)=>{
  const [weather, setWeather] = useState()

  useEffect(()=>{
    const params ={
      access_key : api_key,
      query : props.capital
    }
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    return(
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${params.query}&units=metric&appid=${params.access_key}`)
      .then(res => {setWeather(res.data)}))
  },[])

  return(
    <>
      <h1>{props.name}</h1>
      <p>Capital: {props.capital}</p>
      <p>Population: {props.population}</p>
      <h3>Languages</h3>
      <ul>{props.languages.map( (language, i) =><li key={i}>{language.name}</li> )}</ul>
      <img src={props.flags} width={'200px'} alt={props.flag}></img>
      {weather ?<>
      <h2>Weather in {weather.name}</h2>
      <p><strong>Temperature: </strong>{weather.main.temp}°Celsius</p>
      <p><strong>wind: </strong>{weather.wind.speed} km/h</p>
      </>
      : 'loading weather...'
      }
    </>
  )
}

function App() {
  const [filter,setFilter] = useState('')
  const [countries,setCountries] = useState([])

  const handleChangeFilter = (e)=>{
    setFilter(e.target.value)
  }
  


  useEffect(()=>{
    axios.get('https://restcountries.com/v2/all')
      .then((response)=>{setCountries(response.data)})
      .catch((error) => console.error(error));
  },[])

  const countriesToShow =
  filter === ""
    ? []
    : countries.filter((country) =>
        country.name.toLowerCase().startsWith(filter.toLowerCase())
      );

  return (
    <div>
      <div>find countries<input value={filter} onChange={handleChangeFilter}/></div>
      {filter === "" ? 'Please specify a country' :
      countriesToShow.length > 10 ? 'Too many matches, specify another filter' 
      : countriesToShow.length <= 10 && countriesToShow.length !== 1 ? 
      countriesToShow.map((country)=>
        <Countries key={country.name} country={country}/>
      )
      // <Countries country={countriesToShow} handleShowInfo={handleShowInfo} showMore={showMore}/>
      : <SpecificCountry name={countriesToShow[0].name} capital={countriesToShow[0].capital} population={countriesToShow[0].population} languages={countriesToShow[0].languages} flags={countriesToShow[0].flags.svg} flag={countriesToShow[0].flag}/>
    }
    </div>
  );
}

export default App;
