// ===================
// Samuel Maddox Notes
// ===================
// NOTE: All code I've provided below has not been tested and may have syntax errors. Use it more
// as pseudocode trying to get a point across rather than 100% functional code.
// ===================
// End Samuel Notes
// ===================


// ===================
// Samuel Maddox Notes
// ===================
// I love that you are grouping const variables together and giving header comments. I think these 
// let variables could also be const? Do they ever change value? Also, good job use let and const
// insteaed of var. Using var is considered bad practice these days, and we'll be going over let
// and const here soon I think.
// ===================
// End Samuel Notes
// ===================
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


// ===================
// Samuel Maddox Notes
// ===================
// I like seeing some TODO comments. They can be useful. There can be strong opinions on this. 
// Personally I use them when I know I will be back shortley to remove them. If they're something
// your not going to get to it might be better to make a user story about the work that needs done.
// Again, that's my opinion. Others will differ.
// ===================
// End Samuel Notes
// ===================

//TODO: on click of state and couty modals
//use state abbrev variable to populate state dropdowns

//couty dropdown options
//state selected is state value for county dropdown

//TODO: add event listeners for state and county modals

function renderStateOps(event) {
	event.preventDefault()
	for (let i = 0; i < stateDropdownEl.length; i++) {

		// ===================
		// Samuel Maddox Notes
		// ===================
		// Good idea to remove console logs before releasing.
		// ===================
		// End Samuel Notes
		// ===================

		console.log(stateDropdownEl[i]);

		for (let j = 0; j < stateAbbrvArray.length; j++) {

			let stOptions = document.createElement('a');
			stOptions.setAttribute('class', 'dropdown-item');
			stOptions.setAttribute('href', '#');
			// stOptions.setAttribute('data-boundary', 'scrollParent');
			// stOptions.setAttribute('data-state', stateAbbrvArray[j]);
			stOptions.textContent = stateAbbrvArray[j];

		// ===================
		// Samuel Maddox Notes
		// ===================
		// To aid the readability of this renderStateOps function I would reference a named function
		// instead of defining an inline anonymous function. 
		// EX: stOptions.addEventListener('click', selectState); where selectState is the name of a 
		// function defined above. I'd do the same for the stSubmitBtnEl.addEventListener() line below.
		// ===================
		// End Samuel Notes
		// ===================
			stOptions.addEventListener('click', function (event) {

				let stateSelected = event.target.textContent;
				event.target.parentNode.previousSibling.previousSibling.innerHTML = stateSelected;
			})
			// return stateSelected;
			stateDropdownEl[i].appendChild(stOptions);
		}
	}
	//event listener for SUBMIT STATE modal
	stSubmitBtnEl.addEventListener('click', function (event) {


		for (let i = 0; i < 2; i++) {
			let savedStateInfo = event.target.offsetParent.children[1].childNodes[1][i].textContent;
			localStorage.setItem('stateItem-' + i, savedStateInfo);
		}
		location.href = 'develop/html/results.html';

		// saveStatesSelected.forEach(function (userState, index) {

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
				// let l = i;

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

						console.log(countyDropdownEl, i)
						countyDropdownEl[i].appendChild(coOptions);

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


		for (let m = 0; m < 4; m++) {
			let savedCountyInfo = event.target.offsetParent.children[1].childNodes[1][m].textContent;
			localStorage.setItem('countyItem-' + m, savedCountyInfo);
		}
		location.href = 'develop/html/results.html';
		//call function to render search history within this function for access to needed variables
		// savedSearchArray.push(userInput);
		// renderSearchHistory();
	});
};

stSearchBtnEl.addEventListener('click', renderStateOps);
coSearchBtnEl.addEventListener('click', renderCountyOps);


// ===================
// Samuel Maddox Notes
// ===================
// I'm assuming this is dead code since #search-modal doesn't appear anywhere in index.html. 
// Should be removed if it is.
//
// Even though this isn't used I want to mention that this is using JQUERY to select an HTML 
// element. I'd recomend either using only JavaScript DOM or JQuery DOM, but not both in the same 
// file. If you use both it is easy for bugs to appear because you accidentally try to use a 
// JavaScript DOM method on a JQuery DOM Object. It also makes it harder for a new developer to 
// come in and be productive because they have to know is the object a JavaScrept DOM object or 
// JQuery DOM Object
// ===================
// End Samuel Notes
// ===================

// county/state search form
$('#search-modal').on('show.bs.modal', function (event) {
	var button = $(event.relatedTarget) // Button that triggered the modal
	var countyState = button.data('whatever') // Extract info from data-* attributes
	// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
	var modal = $(this)
	modal.find('.modal-title').text('Search ' + countyState)
	modal.find('.modal-body input').val(countyState)
});
