import {useState, useEffect} from "react"
import axios from 'axios'
import './FetchWeather.css'
import windImage from './wind.png'
import { TextField, Button } from '@mui/material'

const appid = '5f238b939ac71cc2e6f3ae3d40156cdb' //process.env.REACT_APP_API_KEY

function DataFetching() {
    const [city_name, setCity_name] = useState()
    const [country, setCountry] = useState()
    const [icon, setIcon] = useState()
    let icon_path = `http://openweathermap.org/img/wn/${icon}@4x.png`
    const [short_desc, setShort_desc] = useState()
    const [long_desc, setLong_desc] = useState()
    const [weather_id, setWeather_id] = useState()
    const [temp, setTemp] = useState(0)
    const [temp_min, setTemp_min] = useState(0)
    const [temp_max, setTemp_max] = useState(0)
    const [wind_speed, setWind_speed] = useState()
    const [user_input, setInput] = useState('Auckland')
    const [new_input, setNew_input] = useState('Auckland')

    const handleClick = () => {
        setNew_input(user_input)
    }

    const handleKeyPress = (event: any) => {
        if(event.key === 'Enter'){
          handleClick()
        }
      }

    const setBackground = () => {
        if (short_desc === "Clear") {
            document.body.style.backgroundColor = "azure";
         }
        else if (short_desc === "Rain") {
            if (weather_id === 500 || weather_id === 501 || weather_id === 520 || weather_id === 521) {
                document.body.style.backgroundColor = "skyblue";
            }
            else {document.body.style.backgroundColor = "steelblue";}
        }
        else if (short_desc === "Clouds") {
            if(weather_id === 801 || weather_id === 802){
                document.body.style.backgroundColor = "gainsboro";
            }
            else {document.body.style.backgroundColor = "silver";}        
        }
    }

    useEffect(() => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${new_input}&appid=${appid}`)
            .then(res => {
                console.log(res.data)
                setCity_name(res.data.name)
                setCountry(res.data.sys.country)
                setIcon(res.data.weather[0].icon)
                setShort_desc(res.data.weather[0].main)
                setLong_desc(res.data.weather[0].description)
                setWeather_id(res.data.weather[0].id)
                setTemp(res.data.main.temp)
                setTemp_min(res.data.main.temp_min)
                setTemp_max(res.data.main.temp_max)
                setWind_speed(res.data.wind.speed)
            })
            .catch(err => {
                console.error(err)
            })
    }, [new_input])

    setBackground()

    return (  
        <div>
            <div id="submit-component">
                <TextField 
                id="standard-basic" 
                label="City" 
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => handleKeyPress(e)}/>
                <div id="button">
                    <Button variant="contained" color="secondary" onClick={handleClick}>
                        Submit
                    </Button>
                </div>
            </div>
            <p>{city_name}, {country}</p>
            <img id="icon" src={icon_path} alt="weather_icon" />
            <div className="container">
                <p>{Math.round((temp - 273.15) * 10) / 10}&#176;C</p>
                <p>{Math.round((temp_max - 273.15) * 1) / 1}&frasl;{Math.round((temp_min - 273.15) * 1) / 1}&#176; high and low</p>
                    <div id="wind">
                        <img id="wind-icon" src={windImage} height="100px" alt="wind_icon" />
                        <p>{wind_speed} <span id="wind-speed">m/s wind</span></p>
                    </div>
            </div>               
            <br/><p>{long_desc}</p>
        </div>
    )
}

export default DataFetching