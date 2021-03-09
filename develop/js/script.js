let apiKey = '74f4b9b4d698466e88f0f73ba927478d';
let stateUrl = 'https://api.covidactnow.org/v2/states.json?apiKey=' + apiKey;
let stateAbbrv = ["AK",	"AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT","WA", "WI", "WV"];
let countyUrl = "https://api.covidactnow.org/v2/counties.json?apiKey=" + apiKey;



//function grabbing data
function grabData(){
	fetch(stateUrl).then((response) => {
		return response.json()
	}).then((data) => {
		console.log(data)

		return data.find((el) => el.state === "AK");

		// function find(func) {
		// 	for (let i = 0; i < data.length ; i++){
		// 		var value = func(data[i]);
		// 		if (value) {
		// 			return data[i]	}}}			

	}).then((dataObj) => {
		// console.log(dataObj)
		let totalCases = dataObj.actuals.cases;
		console.log('totalCases '+ totalCases );
		let totalDeaths = dataObj.actuals.deaths;
		console.log('totalDeaths ' + totalDeaths);
		//daily cases per 100k
		let dailyCases = dataObj.actuals.newCases;
		console.log('dailyCases ' + dailyCases);

		//infection rate rounded up to hundreths
		let infectionRate = (dataObj.metrics.infectionRate).toFixed(2);
		console.log('infectionRate ' + infectionRate);


		//vaccination stats should display based on population
		let vaccinesCompleted = dataObj.actuals.vaccinationsCompleted;
		console.log('vaccinesCompleted ' + vaccinesCompleted)
		let vaccinesInitiated = dataObj.actuals.vaccinationsInitiated;
		console.log('vaccinesInitiated ' + vaccinesInitiated) 
		let vaccinesDistributed = dataObj.actuals.vaccinesDistributed;
		console.log('vaccinesDistributed ' + vaccinesDistributed)

		//ICU beds
		let ICUCapacity = dataObj.actuals.icuBeds.capacity
		console.log('ICUCapacity ' + ICUCapacity);
		let ICUCovidUsage = dataObj.actuals.icuBeds.currentUsageCovid
		console.log('ICUCovidUsage ' + ICUCovidUsage);
		let ICUTotalUsage = dataObj.actuals.icuBeds.currentUsageTotal
		console.log('ICUTotalUsage ' + ICUTotalUsage);

		//riskLevel
		let riskLevel = dataObj.riskLevels.overall
		console.log('Risk Level ' + riskLevel)

	})
	.then(fetch(countyUrl).then((response) => {
		return response.json();
	}).then((data) => {
		// console.log(data)
		return data.filter((el) => el.state === "AK").filter((el) => el.county === "Haines Borough");
		}).then((dataObj) =>{
		// console.log(dataObj)


		})
	)
};

grabData();

//testing api abilities / formats
function apiTesting(){
	let api= 'https://api.covidactnow.org/v2/state/OH.json?apiKey=' + apiKey;
	let api2= 'https://api.covidactnow.org/v2/state/OH.timeseries.json?apiKey=' + apiKey;
	let api3= 'https://api.covidactnow.org/v2/county/OH.json?apiKey=' + apiKey;
	fetch(api).then((response) => {
		return response.json()
	}).then((data) => {
		console.log(data)
}).then(fetch(api2).then((response) => {
	return response.json()
}).then((data) => {
	console.log(data)
})).then(fetch(api3).then((response) => {
	return response.json()
}).then((data) => {
	console.log(data)
}))
};
apiTesting();




// COVID COMPARISON SITE
// index.html - homepage describing what it is / our mission etc
// homepage includes 2 seperate modals, 1 for state comparisons, the other for counties
// the modals will have dropdown's with options that will plug into the API's

// Second page will be the results page
// On this page we will have the selected states or counties and their statistics displayed on cards in a way that is easy to read 
// Would like to color code the severity of the statistics and create a graphic that we can use to show risk level's

//TODO: psuedo-coding;
// Start the html index page and the modals
//TODO: Figure out how to display the options for different counties based on state selected in the modal's dropdowns (.map, onChange(etc), )
// yt vid for chart.js pi chart for icu beds + css divs on page for risk level
// Find API including counties then use for loop to append options to form (select in bootstrap)

// Add a listener to each form's submit buttons
// bringing to the results page

// Determine which statistics to use from the API's and how to request information
// Append information to the results page


// footer of pages add names / links to github + linkedin





// TODO: Project Plan
// index page - top to bottom - statring all the id's / form buttons
// js - use .map for county options on form
// save selected form options to local storage, grab data on results page
// results page - place cards on top of jumbotron
// grab chart.js  





// county/state search form
$('#search-modal').on('show.bs.modal', function (event) {
	var button = $(event.relatedTarget) // Button that triggered the modal
	var countyState = button.data('whatever') // Extract info from data-* attributes
	// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
	var modal = $(this)
	modal.find('.modal-title').text('Search ' + countyState)
	modal.find('.modal-body input').val(countyState)
  })
  
  // 
  const settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://hotels-com-free.p.rapidapi.com/suggest/v1.7/json?query=San%20Francisco&locale=en_US",
	  "method": "GET",
	  "headers": {
		  "x-rapidapi-key": "81ca9f80d1msh56ba1defc30f345p119d44jsn1b9d7d11291d",
		  "x-rapidapi-host": "hotels-com-free.p.rapidapi.com"
	  }
  };
  
  $.ajax(settings).done(function (response) {
	  console.log(response);
  });