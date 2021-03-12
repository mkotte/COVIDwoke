let apiKey = '74f4b9b4d698466e88f0f73ba927478d';
let stateUrl = 'https://api.covidactnow.org/v2/states.json?apiKey=' + apiKey;
let stateAbbrvArray = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];
let countyUrl = "https://api.covidactnow.org/v2/counties.json?apiKey=" + apiKey;

//MAIN SEARCH BUTTONS
const stSearchBtnEl = document.querySelector('#search-state-btn');
const coSearchBtnEl = document.querySelector('#search-county-btn');


//STATE MODAL button + input field
const stSubmitBtnEl = document.querySelector('#st-submit-btn');
const stateDropdownEl = document.querySelectorAll('.state-dropdown');
const stInputTxtEl = document.querySelectorAll('.state_input_txt');

console.log(stateDropdownEl);

//COUNTY MODAL buttons + input field
const coSubmitBtnEl = document.querySelector('#co-submit-btn');
const coStateDropdownEl = document.querySelectorAll('.co-state-dropdown');
const countyDropdownEl = document.querySelectorAll('.county-dropdown');
const coStInputTxtEl = document.querySelectorAll('.co_state_input_txt');
const coInputTxtEl = document.querySelectorAll('.co_input_txt');

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
	for (let i = 0; i < stateDropdownEl.length; i++) {

		console.log(stateDropdownEl[i]);

		for (let j = 0; j < stateAbbrvArray.length; j++) {

			let stOptions = document.createElement('a');
			stOptions.setAttribute('class', 'dropdown-item');
			stOptions.setAttribute('href', '#');
			// stOptions.setAttribute('data-state', stateAbbrvArray[j]);
			stOptions.textContent = stateAbbrvArray[j];

			stOptions.addEventListener('click', function (event) {

				let stateSelected = event.target.textContent;
				event.target.parentNode.previousSibling.previousSibling.innerHTML = stateSelected;
				console.log(event.target.parentNode.previousSibling.previousSibling);
				console.log(event.target.textContent);
			})
			// return stateSelected;
			stateDropdownEl[i].appendChild(stOptions);
		}
	}
	//event listener for SUBMIT STATE modal
	stSubmitBtnEl.addEventListener('click', function (event) {
		

		for (let i=0; i < 4; i++){
			let savedStateInfo = event.target.offsetParent.children[1].childNodes[1][i].textContent;
			localStorage.setItem('stateItem-' + i, savedStateInfo);
		}
		// saveStatesSelected.forEach(function (userState, index) {


		// })

		//call function to render search history within this function for access to needed variables
		// savedSearchArray.push(userInput);

		// renderSearchHistory();
	});

}

function renderCountyOps() {

	for (let i = 0; i < coStateDropdownEl.length; i++) {


		for (let j = 0; j < stateAbbrvArray.length; j++) {

			let coStOptions = document.createElement('a');
			coStOptions.setAttribute('class', 'dropdown-item');
			coStOptions.setAttribute('href', '#');
			// coStOptions.setAttribute('data-state', stateAbbrvArray[i])
			coStOptions.textContent = stateAbbrvArray[j];

			coStateDropdownEl[i].appendChild(coStOptions);

			coStOptions.addEventListener('click', function (event) {
				let coStateSelected = event.target.textContent;

				//regain value of i in scope
				let l = i;

				event.target.parentNode.previousSibling.previousSibling.innerHTML = coStateSelected;

				let countyApi = 'https://api.covidactnow.org/v2/county/' + coStateSelected + '.json?apiKey=' + apiKey;
				fetch(countyApi).then((response) => {
					return response.json()
				}).then((data) => {

					//counties to populate dropdown
					let counties = data.map((countyData) => countyData.county);
					console.log(counties);

					//append a tag as options for the dropdown
					for (let k = 0; k < counties.length; k++) {

						let coOptions = document.createElement('a');
						coOptions.setAttribute('class', 'dropdown-item');
						coOptions.setAttribute('href', '#');
						coOptions.textContent = counties[k];

						console.log(countyDropdownEl, l)
						countyDropdownEl[l].appendChild(coOptions);

						coOptions.addEventListener('click', function (event) {

							let countySelected = event.target.textContent;
							// coInputTxtEl.innerHTML = countySelected;
							event.target.parentNode.previousSibling.previousSibling.innerHTML = countySelected;
						})

					}
				})
			})
		}
	}
	//event listener SUBMIT COUNTY modal
	coSubmitBtnEl.addEventListener('click', function (event) {
		event.preventDefault();

		//use event to access user input
		
		
		for (let m=0; m < 8; m++){
			let savedCountyInfo = event.target.offsetParent.children[1].childNodes[1][m].textContent;
			localStorage.setItem('countyItem-' + m, savedCountyInfo);
		}

		//call function to render search history within this function for access to needed variables
		// savedSearchArray.push(userInput);

		// renderSearchHistory();
	});

};

stSearchBtnEl.addEventListener('click', renderStateOps);
coSearchBtnEl.addEventListener('click', renderCountyOps);




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
