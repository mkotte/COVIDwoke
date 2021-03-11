let apiKey = '74f4b9b4d698466e88f0f73ba927478d';
let stateUrl = 'https://api.covidactnow.org/v2/states.json?apiKey=' + apiKey;
let stateAbbrvArray = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];
let countyUrl = "https://api.covidactnow.org/v2/counties.json?apiKey=" + apiKey;

//MAIN SEARCH BUTTONS
const stSearchBtnEl = document.querySelector('#search-state-btn');
const coSearchBtnEl = document.querySelector('#search-county-btn');


//STATE MODAL button + input field
const stSubmitBtnEl = document.querySelector('#st-submit-btn');
const stateDropdownEl = document.querySelector('#state-dropdown');
const stInputTxtEl = document.querySelector('.state_input_txt');

//COUNTY MODAL buttons + input field
const coSubmitBtnEl = document.querySelector('#co-submit-btn');
const coStateDropdownEl = document.querySelector('#co-state-dropdown');
const countyDropdownEl = document.querySelector('#county-dropdown');
const coStInputTxtEl = document.querySelector('.co_state_input_txt');
const coInputTxtEl = document.querySelector('.co_input_txt');

let statesSelected = [];
let countiesSelected = {

	state:[],
	county:[]
};

//function grabbing data
function grabData() {
	fetch(stateUrl).then((response) => {
		return response.json()
	}).then((data) => {
		// console.log(data)

		return data.find((el) => el.state === "AK");

		// function find(func) {
		// 	for (let i = 0; i < data.length ; i++){
		// 		var value = func(data[i]);
		// 		if (value) {
		// 			return data[i]	}}}

	}).then((dataObj) => {
		console.log(dataObj)
		let totalCases = dataObj.actuals.cases;
		console.log('totalCases ' + totalCases);
		let totalDeaths = dataObj.actuals.deaths;
		console.log('totalDeaths ' + totalDeaths);
		//daily cases per 100k
		let dailyCases = dataObj.actuals.newCases;
		console.log('dailyCases ' + dailyCases);

		//infection rate rounded up to hundreths
		let infectionRate = (dataObj.metrics.infectionRate).toFixed(2);
		console.log('infectionRate ' + infectionRate);

		let population = dataObj.population
		console.log(population);

		//vaccination stats should display based on population
		let vaccinesCompleted = dataObj.actuals.vaccinationsCompleted;
		console.log('vaccinesCompleted ' + vaccinesCompleted)
		let vaccinesCompletedNum = (((vaccinesCompleted) / population ) * 100).toFixed(1) + '%'
		console.log(vaccinesCompletedNum);

		let vaccinesInitiated = dataObj.actuals.vaccinationsInitiated;

		console.log('vaccinesInitiated ' + vaccinesInitiated)
		let vaccinesInitiatedNum = (((vaccinesInitiated) / population ) * 100).toFixed(1) + '%'
		console.log(vaccinesInitiatedNum)

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
			return data.filter((el) => el.state === "OH").filter((el) => el.county === "Franklin County");
		}).then((dataObj) => {
			console.log(dataObj)

			let countyTotalCases = dataObj[0].actuals.cases;
			console.log('County totalCases ' + countyTotalCases);
			let countyTotalDeaths = dataObj[0].actuals.deaths;
			console.log('County totalDeaths ' + countyTotalDeaths);
			//daily cases per 100k
			let countyDailyCases = dataObj[0].actuals.newCases;
			console.log('County dailyCases ' + countyDailyCases);

			//infection rate rounded up to hundreths
			let countyInfectionRate = (dataObj[0].metrics.infectionRate).toFixed(2);
			console.log('County infectionRate ' + countyInfectionRate);

			let countyPopulation = dataObj[0].population;


			//vaccination stats should display based on population
			let countyVaccinesCompleted = dataObj[0].actuals.vaccinationsCompleted;
			console.log('County vaccinesCompleted ' + countyVaccinesCompleted)
			let countyCompletedNum = (((countyVaccinesCompleted) / countyPopulation ) * 100).toFixed(1) + '%';
			console.log(countyCompletedNum);

			let countyVaccinesInitiated = dataObj[0].actuals.vaccinationsInitiated;
			console.log('County vaccinesInitiated ' + countyVaccinesInitiated)
			let countyInitiatedNum = (((countyVaccinesInitiated) / countyPopulation ) * 100).toFixed(1) + '%';
			console.log(countyInitiatedNum);

			let countyVaccinesDistributed = dataObj[0].actuals.vaccinesDistributed;
			console.log('County vaccinesDistributed ' + countyVaccinesDistributed)

			//ICU beds
			let countyICUCapacity = dataObj[0].actuals.icuBeds.capacity
			console.log('County ICUCapacity ' + countyICUCapacity);
			let countyICUCovidUsage = dataObj[0].actuals.icuBeds.currentUsageCovid
			console.log('County ICUCovidUsage ' + countyICUCovidUsage);
			let countyICUTotalUsage = dataObj[0].actuals.icuBeds.currentUsageTotal
			console.log('County ICUTotalUsage ' + countyICUTotalUsage);

			//riskLevel
			let countyRiskLevel = dataObj[0].riskLevels.overall
			console.log('County Risk Level ' + countyRiskLevel)
		})
		)
};

//results page
grabData();



//testing api abilities / formats
// function apiTesting(){
// 	let api= 'https://api.covidactnow.org/v2/state/OH.json?apiKey=' + apiKey;
// 	let api2= 'https://api.covidactnow.org/v2/state/OH.timeseries.json?apiKey=' + apiKey;
// 	let api3= 'https://api.covidactnow.org/v2/county/OH.json?apiKey=' + apiKey;
// 	fetch(api).then((response) => {
// 		return response.json()
// 	}).then((data) => {
// 		console.log(data)
// 	}).then(fetch(api2).then((response) => {
// 	return response.json()
// 	}).then((data) => {
// 	console.log(data)
// 	})).then(fetch(api3).then((response) => {
// 	return response.json()
// 	}).then((data) => {
// 	console.log(data)

	//county map to iterate through each dropdown option
// 	let counties = data.map((countyData) => countyData.county);
// 	console.log(counties)

//  	}
// ))
// };
// apiTesting();

//TODO: on click of state and couty modals
//use state abbrev variable to populate state dropdowns

//couty dropdown options
//state selected is state value for county dropdown

//TODO: add event listeners for state and county modals

function renderStateOps(event) {
	event.preventDefault()

	for (let i = 0; i < stateAbbrvArray.length; i++) {

		let stOptions = document.createElement('a');
		stOptions.setAttribute('class', 'dropdown-item');
		stOptions.setAttribute('href', '#');
		stOptions.textContent = stateAbbrvArray[i];

		stateDropdownEl.appendChild(stOptions);

		stOptions.addEventListener('click', function (event) {

			let stateSelected = event.target.textContent;
			// renderCountyOps(stateSelected);
			stInputTxtEl.innerHTML = stateSelected; //not working
			// console.log(stateSelected);
			console.log(event.target.textContent);


		})


		// return stateSelected;
	}
}

function renderCountyOps() {

	for (let i = 0; i < stateAbbrvArray.length; i++) {

		let coStOptions = document.createElement('a');
		coStOptions.setAttribute('class', 'dropdown-item');
		coStOptions.setAttribute('href', '#');
		coStOptions.textContent = stateAbbrvArray[i];

		coStateDropdownEl.appendChild(coStOptions);

		coStOptions.addEventListener('click', function (event) {
			let coStateSelected = event.target.textContent;
			coStInputTxtEl.innerHTML = coStateSelected;

			let countyApi = 'https://api.covidactnow.org/v2/county/' + coStateSelected + '.json?apiKey=' + apiKey;
			fetch(countyApi).then((response) => {
				return response.json()
			}).then((data) => {
				let counties = data.map((countyData) => countyData.county);
				// declare append a tag options for the dropdown
				console.log(counties);

				for (let i = 0; i < counties.length; i++) {
					//counties to populate dropdown
					let coOptions = document.createElement('a');
					coOptions.setAttribute('class', 'dropdown-item');
					coOptions.setAttribute('href', '#');
					coOptions.textContent = counties[i];

					countyDropdownEl.appendChild(coOptions);

					coOptions.addEventListener('click', function (event) {

						let countySelected = event.target.textContent;
						coInputTxtEl.innerHTML = countySelected;
					})

				}
			})
		})
	}
};

stSearchBtnEl.addEventListener('click', renderStateOps);
coSearchBtnEl.addEventListener('click', renderCountyOps);

//event listener for SUBMIT STATE modal
stSubmitBtnEl.addEventListener('click', function (event) {
	event.preventDefault();

	//use event to access user input
	console.log(event);
	let userInput = stateDropdownEl.value;

	//call function to render search history within this function for access to needed variables
	// savedSearchArray.push(userInput);

	// renderSearchHistory();
});

//event listener SUBMIT COUNTY modal
coSubmitBtnEl.addEventListener('click', function (event) {
	event.preventDefault();

	//use event to access user input
	console.log(event);

	let userInput = coStateDropdownEl.value + countyDropdownEl.value;

	//render county options based on state input
	renderCountyOps(userInput);

	//call function to render search history within this function for access to needed variables
	// savedSearchArray.push(userInput);

	// renderSearchHistory();
});



//TODO: store search history in local storage


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
// index page - top to bottom - starting with all the id's / form buttons
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
});
