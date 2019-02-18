// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
	}

	FetchData =()=>
	{
			this.fetchWeatherData.call();
			this.fetchTflData.call();
	}
	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=dc5c2808dc2c8fd769f66c7deaae5130";
		$.ajax({
			url: url,
			dataType: "json",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		// once the data grabbed, hide the button
		this.setState({ display: false });
	}
 fetchTflData = () => {
	 var url_TFL="https://api.tfl.gov.uk/Line/Mode/tube/Status?detail=true&app_id=2cf7f9a8&app_key=%20%20%20%2001aef9b37ed476700c32051e34bc4b83"
	 $.ajax({
		 url: url_TFL,
	   dataType: "json",
		 success : this.parseResponse1,
	   error : function(req, err){ console.log('API call failed ' + err); }
	 })
	 this.setState({ display: false });

	}
	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
					<span class={ style.city } >{ this.state.tfl }</span>
					<span class={ style.city } >{ this.state.tfl1 }</span>

				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }>
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.FetchData }/ > : null }
				</div>
			</div>
		);
	}
	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parseInt(parsed_json['main']['temp']);
		var conditions = parsed_json['weather']['0']['description'];
		var minTemp = parsed_json['main']['temp_min'];
		var maxTemp = parsed_json['main']['temp_max'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions,
			min: minTemp,
			max: maxTemp
		});//statusSeverityDescription
	}
	parseResponse1= (parsed_json_1) => {
		var Tflstatus = parsed_json_1['0']['name']
		var tfl_test= "Hello World"

		this.setState({
			tfl:Tflstatus,
			tfl1:tfl_test

		});
  }
}