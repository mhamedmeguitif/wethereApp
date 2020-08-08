import React from 'react';
import './App.css';
import Axios from "axios" ; 
import "bootstrap/dist/css/bootstrap.min.css" ; 
import DisplayWether from "./component/DisplayWethere"
import NavBar from "./component/NavBar"
class App extends React.Component{
   
  state = {
    coords :{
      latitude : 45, 
      longitude : 60 
    } , 
    data  : {

    }, 
    InputData : ""
  }
  componentDidMount(){
    //get device location 
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position )=>{
      let newCoords = {
        latitude : position.coords.latitude , 
        longitude : position.coords.longitude 
      }
        this.setState({coords : newCoords}) ; 
        // API Call  
        let key = ""; 
        Axios.get(`http://api.weatherstack.com/current?access_key=c098c90f970ccd9de59e322a1f73f4c9&query=${this.state.coords.latitude} , ${this.state.coords.longitude}`)
        .then((res)=>{
             console.log(res);
             let WathereData =  {

              location :  res.data.location.name  , 
              temperature : res.data.current.temperature ,
              description : res.data.current.weather_descriptions[0],
              region: res.data.location.region ,
              country : res.data.location.country , 
              wind_speed : res.data.current.wind_speed, 
              pressure  :  res.data.current.pressure , 
              precip : res.data.current.precip , 
              humidity : res.data.current.humidity, 
              imge: res.data.current.weather_icons   
             }
              this.setState({data:WathereData}); 
        })
      });  
    }else{
      console.log("Not  supported"); 
    }
    console.log("Monted");
  }
  // track the input field 
  change =(value)=>{
    this.setState({InputData :value})
    }
    changewher = (event )=>{
      event.preventDefault(); 
   
   //API Call  
   Axios.get(`http://api.weatherstack.com/current?access_key=c098c90f970ccd9de59e322a1f73f4c9&query=${this.state.InputData}`)
   .then(res=>{
     console.log(res); 
     
     let WathereData =  {

      location :  res.data.location.name  , 
      temperature : res.data.current.temperature ,
      description : res.data.current.weather_descriptions[0],
      region: res.data.location.region ,
      country : res.data.location.country , 
      wind_speed : res.data.current.wind_speed, 
      pressure  :  res.data.current.pressure , 
      precip : res.data.current.precip , 
      humidity : res.data.current.humidity, 
      imge: res.data.current.weather_icons   
     }
     this.setState({data:WathereData});
    })
    }
  
  render(){
    return(
      <div className="App container">
      <NavBar changewher={this.changewher} changeRegion =  {this.change}/>
     <DisplayWether weather={ this.state.data}/> 
      </div>  
    ); 
  }
}

export default App;
