// ===================
// Samuel Maddox Notes
// ===================
// Long script files Are hard to read. I'd recomend splitting this up into multiple files. This 
// can aid in readability. If you're not already aware, code that is imported first index.html gets 
// ran first. Also, code imported later in the index.html file can reference variables and 
// functions that are defined in previously imported files. It's a good idea to make a comment at 
// the top of JS files as to what variables/functions it will use from other files, and what those 
// files are. Later on we'llshow you better ways to make use of multiple JS files.

// NOTE: All code I've provided below has not been tested and may have syntax errors. Use it more
// as pseudocode trying to get a point across rather than 100% functional code.
// ===================
// End Samuel Notes
// ===================

const apiKey = '74f4b9b4d698466e88f0f73ba927478d';
const stateUrl = 'https://api.covidactnow.org/v2/states.json?apiKey=' + apiKey;
const stateAbbrv = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];
const countyUrl = "https://api.covidactnow.org/v2/counties.json?apiKey=" + apiKey;
const stateNames = ['Alaska', 'Alabama', 'Arkansas', 'Arizona', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Iowa', 'Idaho', 'Illinois', 'Indiana', 'Kansas', 'Kentucky', 'Louisiana', 'Massachusetts', 'Maryland', 'Maine', 'Michigan', 'Minnesota', 'Missouri', 'Mississippi', 'Montana', 'North Carolina', 'North Dakota', 'Nebraska', 'New Hampshire', 'New Jersey', 'New Mexico', 'Nevada', 'New York', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Virginia', 'Vermont', 'Washington', 'Wisconsin', 'West Virginia', 'Wyoming']
let statesFullName = ''
let resultsContainer = document.getElementById('results')
let statesSaved = [];
let countiesSavedInfo = {
	states: [],
	counties: []
};


// ===================
// Samuel Maddox Notes
// ===================
// I like seeing short function definitions. Short function definitions with meaningful names are 
// easy to read. I don't have to keep a lot of information about your script in my head. Good job
// here.
// ===================
// End Samuel Notes
// ===================
function determineDataPath(){
	if (localStorage.getItem('countyItem-' + 0) && true){
		grabCountyInputs();
	} else if (localStorage.getItem('stateItem-' + 0) && true) {
		grabStateInputs();
	}
};
function grabCountyInputs() {
	for (let i = 0; i < 4; i++){
		if (i % 2 == 0) {
			countiesSavedInfo.states.push(localStorage.getItem('countyItem-' + i))
			console.log(localStorage.getItem('countyItem-' + i))
		}
		else {
			countiesSavedInfo.counties.push(localStorage.getItem('countyItem-' + i))
			console.log(localStorage.getItem('countyItem-' + i))
		}

	}
	for (let i = 0; i < 2; i++){
		grabCountyData( countiesSavedInfo.states[i], countiesSavedInfo.counties[i]);
}};
function grabStateInputs() {
	for (let i = 0; i < 2; i++) {
		// saving input values for states into an array then running the grabStateData function using said values
		statesSaved.push(localStorage.getItem('stateItem-' + i));
		grabStateData(statesSaved[i]);
	};
};

function grabCountyData(stateTarget , countyTarget) {
	fetch(countyUrl).then((response) => {
		return response.json();
	}).then((data) => {
		return data.filter((el) => el.state === stateTarget).filter((el) => el.county === countyTarget);
	}).then((dataObj) => {
	// ===================
	// Samuel Maddox Notes
	// ===================
	// Now we get to this monstrosity of a function. Lets see if you can shorten this up at all.
	// When a function gets this big it might be better to have the function act as a manager and
	// delegate work to smaller functions.
	// ===================
	// End Samuel Notes
	// ===================
		console.log(dataObj)

	// ===================
	// Samuel Maddox Notes
	// ===================
	// I'd create a function outside of this one that parses the data into something easier for us to 
	// work with. Then call that function inside this function. The function I'd created I have 
	//defined below:
	function paraseCountyData(data) {
		return {
			countyTotalCases: dataObj[0].actuals.cases,
			countyTotalDeaths: dataObj[0].actuals.deaths,
			countyDailyCases: dataObj[0].actuals.newCases,
			countyDailyDeaths: dataObj[0].actuals.newDeaths,
			countyInfectionRate: Number.parseFloat((dataObj[0].metrics.infectionRate).toFixed(2);
			// ... all other let varibles here
		}
	}
	// This will return a new object that doesn't have so many nested properties, and more meaningful
	// names, and data that is formated to my liking. I might call this new function in my current 
	// function like this:
	const parsedDataObj = paraseCountyData(dataObj);
	// and I would use that obj as like this:
	parsedDataObj.countyTotalCases;
	// ===================
	// End Samuel Notes
	// ===================


		let countyTotalCases = dataObj[0].actuals.cases;
		let countyTotalDeaths = dataObj[0].actuals.deaths;

		//daily cases per 100k
		let countyDailyCases = dataObj[0].actuals.newCases;
		let countyDailyDeaths = dataObj[0].actuals.newDeaths;

		//infection rate rounded up to hundreths
		let countyInfectionRate = (dataObj[0].metrics.infectionRate)
		Number.parseFloat(countyInfectionRate).toFixed(2);

		//population
		let countyPopulation = dataObj[0].population;


		//vaccination stats should display based on population
		let countyVaccinesCompleted = dataObj[0].actuals.vaccinationsCompleted;
		let countyCompletedNum = (((countyVaccinesCompleted) / countyPopulation) * 100).toFixed(1) + '%';
		let countyVaccinesInitiated = dataObj[0].actuals.vaccinationsInitiated;
		let countyInitiatedNum = (((countyVaccinesInitiated) / countyPopulation) * 100).toFixed(1) + '%';

		// unused at the moment
		let countyVaccinesDistributed = dataObj[0].actuals.vaccinesDistributed;


		//ICU beds
		let countyICUCapacity = dataObj[0].actuals.icuBeds.capacity;
		let countyICUCovidUsage = dataObj[0].actuals.icuBeds.currentUsageCovid;
		let countyICUTotalUsage = dataObj[0].actuals.icuBeds.currentUsageTotal;
		let countyAvailableBeds = countyICUCapacity - countyICUTotalUsage;
		let countyNonCovidBeds = countyICUTotalUsage - countyICUCovidUsage;

		//riskLevel
		let countyRiskLevel = dataObj[0].riskLevels.overall
		console.log('County Risk Level ' + countyRiskLevel)


	//DOM Manipulation Here
	// ===================
	// Samuel Maddox Notes
	// ===================
	// Each one of these DOM Manipulation sections could probably be extracted into their own 
	// functions, and return an object of DOM elements to be passed to where it's needed next. See me 
	// in office hours if you want to go over this a little bit more. 
	//
	// Also, when we learn React a lot of this hardship will become way simpliar. You'll hate that we
	// ever had to do things this way.
	// ===================
	// End Samuel Notes
	// ===================
		// creating +appending information sections to cards
		let countyCardEL = document.createElement('div');
		countyCardEL.setAttribute('class', 'state-card-div');
		countyCardEL.setAttribute('id', '');
		let cardHeader = document.createElement('div');
		cardHeader.setAttribute('class', 'card-header-div');
		cardHeader.setAttribute('id', '');
		let statsWrapper = document.createElement('div');
		statsWrapper.setAttribute('class', 'stats-wrapper');
		let generalStatsDiv = document.createElement('div');
		generalStatsDiv.setAttribute('class', 'general-stats-div');
		generalStatsDiv.setAttribute('id', '');
		let riskLevelDiv = document.createElement('div');
		riskLevelDiv.setAttribute('class', 'risk-level-div');
		riskLevelDiv.setAttribute('id', '');
		let vaccineStatsDiv = document.createElement('div');
		vaccineStatsDiv.setAttribute('class', 'vaccine-stats-div');
		vaccineStatsDiv.setAttribute('id', '');
		let icuStatsDiv = document.createElement('div');
		icuStatsDiv.setAttribute('class', 'icu-stats-div');
		icuStatsDiv.setAttribute('id', '');
		countyCardEL.appendChild(cardHeader);
		countyCardEL.appendChild(statsWrapper);
		statsWrapper.appendChild(generalStatsDiv);
		statsWrapper.appendChild(riskLevelDiv);
		statsWrapper.appendChild(vaccineStatsDiv);
		statsWrapper.appendChild(icuStatsDiv);
		resultsContainer.appendChild(countyCardEL);

		//header section w/ population
		let countyNameEl = document.createElement('h3');
		countyNameEl.setAttribute('class', 'state-name-card-header');
		countyNameEl.setAttribute('id', '');
		countyNameEl.textContent = countyTarget +', ' + stateTarget;
		cardHeader.appendChild(countyNameEl);
		let populationEl = document.createElement('h3');
		populationEl.setAttribute('class', 'pop-card-header');
		populationEl.setAttribute('id', '');
		populationEl.textContent = "Population: " + countyPopulation;
		cardHeader.appendChild(populationEl);

		// general stats card section
		let generalStatsTitle = document.createElement('h3');
		generalStatsTitle.setAttribute('class', 'gen-stats-header');
		generalStatsTitle.setAttribute('id', '');
		generalStatsTitle.textContent = "General Stats";
		generalStatsDiv.appendChild(generalStatsTitle);

		// daily stats container + info
		let dailyStatsDiv = document.createElement('div');
		dailyStatsDiv.setAttribute('class', "daily-stats");
		dailyStatsDiv.setAttribute('id', '');
		generalStatsDiv.appendChild(dailyStatsDiv);
		let newCasesEl = document.createElement('p');
		newCasesEl.setAttribute('class', 'new-cases-txt');
		newCasesEl.setAttribute('id', '');
		newCasesEl.textContent = "New Cases: " + countyDailyCases;
		dailyStatsDiv.appendChild(newCasesEl);
		let newDeathsEl = document.createElement('p')
		newDeathsEl.textContent = "New Deaths: " + countyDailyDeaths;
		dailyStatsDiv.appendChild(newDeathsEl);

		// total stats container + info
		let totalStatsDiv = document.createElement('div');
		totalStatsDiv.setAttribute('class', "total-stats");
		generalStatsDiv.appendChild(totalStatsDiv);
		let totalCasesEl = document.createElement('p');
		totalCasesEl.textContent = "Total Cases: " + countyTotalCases;
		totalStatsDiv.appendChild(totalCasesEl);
		let totalDeathsEl = document.createElement('p');
		totalDeathsEl.textContent = "Total Deaths: " + countyTotalDeaths;
		totalStatsDiv.appendChild(totalDeathsEl);

		// infection rate container and statistics
		let infectionRateDiv = document.createElement('div');
		infectionRateDiv.setAttribute('class', "total-stats");
		generalStatsDiv.appendChild(infectionRateDiv);
		let infectionRateEl = document.createElement('p');
		infectionRateEl.textContent = "Infection Rate: " + countyInfectionRate;
		infectionRateDiv.appendChild(infectionRateEl);

		// risk level Section
		let riskLevelTitle = document.createElement('h3');
		riskLevelTitle.textContent = "Risk Level";
		riskLevelDiv.appendChild(riskLevelTitle);
		let riskDisplayWrapper = document.createElement('div');
		riskDisplayWrapper.setAttribute('id', "risk-wrapper");
		riskDisplayWrapper.style.display ='flex';
		riskLevelDiv.appendChild(riskDisplayWrapper);

		// for loop creating + appending the risk levels display's divs
		//TODO: use CSS to style!
		for (let i = 5; i > 0; i--) {
			let riskDisplay = document.createElement('div');
			riskDisplay.setAttribute("class", "riskLevel-" + i);
			riskDisplay.setAttribute("id", "level-" + i + "-" + countyTarget);
			riskDisplayWrapper.appendChild(riskDisplay);
		};

		// risk level describing text
		let riskLevelDescEl = document.createElement('h3');
		riskLevelDiv.appendChild(riskLevelDescEl);
		let riskLevelTxtEl = document.createElement('p');
		riskLevelDiv.appendChild(riskLevelTxtEl);

		// If statement to determine display bordering in css + text risk level text
		if (countyRiskLevel == 5) {
			riskLevelDescEl.textContent = "Severe outbreak";
			riskLevelTxtEl.textContent = countyTarget + " is currently experiencing a severe outbreak. Take all possible precautions to avoid exposure."
			let riskDisplaySelected = document.getElementById('level-5' + "-" + countyTarget);
			riskDisplaySelected.setAttribute('class', 'selected-level riskLevel-5');
		}
		else if (countyRiskLevel == 4) {
			riskLevelDescEl.textContent = "Active outbreak";
			riskLevelTxtEl.textContent = countyTarget + " is either actively experiencing an outbreak or is at extreme risk. COVID cases are exponentially growing and/or " + countyTarget + " COVID preparedness is significantly below international standards."
			let riskDisplaySelected = document.getElementById('level-4' + "-" + countyTarget);
			riskDisplaySelected.setAttribute('class', 'selected-level riskLevel-4');
		}
		else if (countyRiskLevel == 3) {
			riskLevelDescEl.textContent = "At risk of outbreak";
			riskLevelTxtEl.textContent = countyTarget + " is at risk of an outbreak. COVID cases are either increasing at a rate likely to overwhelm hospitals and/or the state’s COVID preparedness is below international standards."
			let riskDisplaySelected = document.getElementById('level-3' + "-" + countyTarget);
			riskDisplaySelected.setAttribute('class', 'selected-level riskLevel-3');
		}
		else if (countyRiskLevel == 2) {
			riskLevelDescEl.textContent = "Slow disease growth";
			riskLevelTxtEl.textContent = "Covid in " + countyTarget + " is spreading in a slow and controlled fashion, and " + countyTarget + " COVID preparedness meets international standards."
			let riskDisplaySelected = document.getElementById('level-2' + "-" + countyTarget);
			riskDisplaySelected.setAttribute('class', 'selected-level riskLevel-2');
		}
		else {
			riskLevelDescEl.textContent = "On track for containment";
			riskLevelTxtEl.textContent = countyTarget + " is on track to contain COVID. Cases are steadily decreasing and " + countyTarget + " COVID preparedness meets or exceeds international standards."
			let riskDisplaySelected = document.getElementById('level-1' + "-" + countyTarget);
			riskDisplaySelected.setAttribute('class', 'selected-level riskLevel-1');
		};

		// vaccination section
		let vaccinationTitle = document.createElement('h3');
		vaccinationTitle.textContent = "Vaccinations";
		vaccineStatsDiv.appendChild(vaccinationTitle);

		//  vaccination progress bars
		let completedContainer = document.createElement('div');
		completedContainer.setAttribute('class', 'completed');
		vaccineStatsDiv.appendChild(completedContainer);
		let vaccinesCompletedEl = document.createElement('p');
		vaccinesCompletedEl.textContent = "Completed: " + countyVaccinesCompleted;
		completedContainer.appendChild(vaccinesCompletedEl);
		let completedBarContainer = document.createElement('div');
		completedContainer.appendChild(completedBarContainer)
		let completedProgressBar = document.createElement('div');
		completedProgressBar.setAttribute('class', 'completedBar');
		completedBarContainer.appendChild(completedProgressBar);
		let completedPercentageEl = document.createElement('p');
		completedPercentageEl.textContent = countyCompletedNum;
		completedBarContainer.append(completedPercentageEl);
		let completedProgress = document.createElement('div');
		completedProgress.style.width = countyCompletedNum;
		completedProgress.setAttribute('class', 'completedProgress');
		completedProgressBar.appendChild(completedProgress);
		let initiatedContainer = document.createElement('div');
		initiatedContainer.setAttribute('class', 'initiated');
		vaccineStatsDiv.appendChild(initiatedContainer);
		let vaccinesInitiatedEl = document.createElement('p');
		vaccinesInitiatedEl.textContent = "Initiated: " + countyVaccinesInitiated;
		initiatedContainer.appendChild(vaccinesInitiatedEl);
		let initiatedBarContainer = document.createElement('div');
		initiatedContainer.appendChild(initiatedBarContainer)
		let initiatedProgressBar = document.createElement('div');
		initiatedProgressBar.setAttribute('class', 'initiatedBar');
		initiatedBarContainer.appendChild(initiatedProgressBar);
		let initiatedPercentageEl = document.createElement('p');
		initiatedPercentageEl.textContent = countyInitiatedNum;
		initiatedBarContainer.append(initiatedPercentageEl);
		let initiatedProgress = document.createElement('div');
		initiatedProgress.setAttribute('class', 'initiatedProgress')
		initiatedProgress.style.width = countyInitiatedNum;
		initiatedProgressBar.appendChild(initiatedProgress);

		// icu section
		let icuTitle = document.createElement('h3');
		icuTitle.textContent = 'ICU Beds'
		icuStatsDiv.appendChild(icuTitle);
		var chartContainer = document.createElement('canvas')
		chartContainer.setAttribute('id', 'myChart')
		chartContainer.getContext('2d')
		icuStatsDiv.appendChild(chartContainer);
		//graph.js chart
		var icuDonutChart = new Chart(chartContainer, {
			type: 'doughnut',
			data: {
				labels: ['Available Beds', 'Non-Covid Beds', 'Covid Beds'],
				datasets: [{
					label: 'Points',
					// can change colors here
					backgroundColor: ['Green', 'Yellow', 'Red'],
					borderColor: ['Green', 'Yellow', 'Red'],
					borderWidth: 2,
					data: [countyAvailableBeds, countyNonCovidBeds, countyICUCovidUsage]
				}]
			},
			options: {
				cutoutPercentage: 60,
				animation: {
					animateScale: true,
				}
			}
		});
		icuDonutChart.canvas.parentNode.style.width = '300px';
		icuDonutChart.canvas.parentNode.style.height = '300px';
	})
};

function grabStateData(target) {
	fetch(stateUrl).then((response) => {
		return response.json()
	}).then((data) => {
		return data.find((el) => el.state === target);
	}).then((dataObj) => {
	// ===================
	// Samuel Maddox Notes
	// ===================
	// The comments I made for grabCountyData() can also apply here.
	// ===================
	// End Samuel Notes
	// ===================

		console.log(dataObj)
		// STATISTICS
		// total stats
		let totalCases = dataObj.actuals.cases;
		let totalDeaths = dataObj.actuals.deaths;

		// daily cases per 100k
		let dailyCases = dataObj.actuals.newCases;
		let dailyDeaths = dataObj.actuals.newDeaths;

		// infection rate rounded up to hundreths
		let infectionRate = (dataObj.metrics.infectionRate).toFixed(2);

		// population
		let population = dataObj.population

		// vaccination stats should display based on population
		let vaccinesCompleted = dataObj.actuals.vaccinationsCompleted;
		let vaccinesInitiated = dataObj.actuals.vaccinationsInitiated;

		// vaccination percentages
		let vaccinesCompletedNum = (((vaccinesCompleted) / population) * 100).toFixed(1) + '%';
		let vaccinesInitiatedNum = (((vaccinesInitiated) / population) * 100).toFixed(1) + '%';

		// distribution's unused for now
		let vaccinesDistributed = dataObj.actuals.vaccinesDistributed;

		// ICU beds
		let ICUCapacity = dataObj.actuals.icuBeds.capacity
		let ICUCovidUsage = dataObj.actuals.icuBeds.currentUsageCovid
		let ICUTotalUsage = dataObj.actuals.icuBeds.currentUsageTotal
		let ICUAvailableBeds = ICUCapacity - ICUTotalUsage;
		let ICUNonCovidBeds = ICUTotalUsage - ICUCovidUsage;

		// riskLevel
		let riskLevel = dataObj.riskLevels.overall

	//DOM Manipulation Here
		// creating +appending information sections to cards
		let stateCardEL = document.createElement('div');
		stateCardEL.setAttribute('class', 'state-card-div');
		stateCardEL.setAttribute('id', '');
		let cardHeader = document.createElement('div');
		cardHeader.setAttribute('class', 'card-header-div');
		cardHeader.setAttribute('id', '');
		let statsWrapper = document.createElement('div');
		statsWrapper.setAttribute('class', 'stats-wrapper');
		let generalStatsDiv = document.createElement('div');
		generalStatsDiv.setAttribute('class', 'general-stats-div');
		generalStatsDiv.setAttribute('id', '');
		let riskLevelDiv = document.createElement('div');
		riskLevelDiv.setAttribute('class', 'risk-level-div');
		riskLevelDiv.setAttribute('id', '');
		let vaccineStatsDiv = document.createElement('div');
		vaccineStatsDiv.setAttribute('class', 'vaccine-stats-div');
		vaccineStatsDiv.setAttribute('id', '');
		let icuStatsDiv = document.createElement('div');
		icuStatsDiv.setAttribute('class', 'icu-stats-div');
		icuStatsDiv.setAttribute('id', '');
		stateCardEL.appendChild(cardHeader);
		stateCardEL.appendChild(statsWrapper);
		statsWrapper.appendChild(generalStatsDiv);
		statsWrapper.appendChild(riskLevelDiv);
		statsWrapper.appendChild(vaccineStatsDiv);
		statsWrapper.appendChild(icuStatsDiv);
		resultsContainer.appendChild(stateCardEL);

		//header section w/ population
		let stateNameEl = document.createElement('h3');
		stateNameEl.setAttribute('class', 'state-name-card-header');
		stateNameEl.setAttribute('id', '');
		console.log(target);
		let stateNum = stateAbbrv.indexOf('' + target + '');
		stateNameEl.textContent = stateNames[stateNum];
		cardHeader.appendChild(stateNameEl);
		let populationEl = document.createElement('h3');
		populationEl.setAttribute('class', 'pop-card-header');
		populationEl.setAttribute('id', '');
		populationEl.textContent = "Population: " + population;
		cardHeader.appendChild(populationEl);

		// general stats card section
		let generalStatsTitle = document.createElement('h3');
		generalStatsTitle.setAttribute('class', 'gen-stats-header');
		generalStatsTitle.setAttribute('id', '');
		generalStatsTitle.textContent = "General Stats";
		generalStatsDiv.appendChild(generalStatsTitle);

		// daily stats container + info
		let dailyStatsDiv = document.createElement('div');
		dailyStatsDiv.setAttribute('class', "daily-stats");
		dailyStatsDiv.setAttribute('id', '');
		generalStatsDiv.appendChild(dailyStatsDiv);
		let newCasesEl = document.createElement('p');
		newCasesEl.setAttribute('class', 'new-cases-txt');
		newCasesEl.setAttribute('id', '');
		newCasesEl.textContent = "New Cases: " + dailyCases;
		dailyStatsDiv.appendChild(newCasesEl);
		let newDeathsEl = document.createElement('p')
		newDeathsEl.textContent = "New Deaths: " + dailyDeaths;
		dailyStatsDiv.appendChild(newDeathsEl);

		// total stats container + info
		let totalStatsDiv = document.createElement('div');
		totalStatsDiv.setAttribute('class', "total-stats");
		generalStatsDiv.appendChild(totalStatsDiv);
		let totalCasesEl = document.createElement('p');
		totalCasesEl.textContent = "Total Cases: " + totalCases;
		totalStatsDiv.appendChild(totalCasesEl);
		let totalDeathsEl = document.createElement('p');
		totalDeathsEl.textContent = "Total Deaths: " + totalDeaths;
		totalStatsDiv.appendChild(totalDeathsEl);

		// infection rate container and statistics
		let infectionRateDiv = document.createElement('div');
		infectionRateDiv.setAttribute('class', "total-stats");
		generalStatsDiv.appendChild(infectionRateDiv);
		let infectionRateEl = document.createElement('p');
		infectionRateEl.textContent = "Infection Rate: " + infectionRate;
		infectionRateDiv.appendChild(infectionRateEl);

		// risk level Section
		let riskLevelTitle = document.createElement('h3');
		riskLevelTitle.textContent = "Risk Level";
		riskLevelDiv.appendChild(riskLevelTitle);
		let riskDisplayWrapper = document.createElement('div');
		riskDisplayWrapper.setAttribute('id', "risk-wrapper");
		riskDisplayWrapper.style.display = 'flex';
		riskLevelDiv.appendChild(riskDisplayWrapper);

		// for loop creating + appending the risk levels display's divs
		for (let i = 5; i > 0; i--) {
			let riskDisplay = document.createElement('div');
			riskDisplay.setAttribute("class", "riskLevel-" + i);
			riskDisplay.setAttribute("id", "level-" + i + '-' + target);
			riskDisplayWrapper.appendChild(riskDisplay);
		};
		// risk level describing text
		let riskLevelDescEl = document.createElement('h3');
		riskLevelDiv.appendChild(riskLevelDescEl);
		let riskLevelTxtEl = document.createElement('p');
		riskLevelDiv.appendChild(riskLevelTxtEl);


		// ===================
		// Samuel Maddox Notes
		// ===================
		// Look into what a switch statement is. That might be better for this use case for this
		// if/elseif/else chain
		// ===================
		// End Samuel Notes
		// ===================
		// If statement to determine display bordering in css + text risk level text
		if (riskLevel == 5) {
			riskLevelDescEl.textContent = "Severe outbreak";
			riskLevelTxtEl.textContent = stateNames[stateNum] + " is currently experiencing a severe outbreak. Take all possible precautions to avoid exposure."
			let riskDisplaySelected = document.getElementById('level-5' + '-' + target);
			riskDisplaySelected.setAttribute('class', 'selected-level riskLevel-5');
		}
		else if (riskLevel == 4) {
			riskLevelDescEl.textContent = "Active outbreak";
			riskLevelTxtEl.textContent = stateNames[stateNum] + " is either actively experiencing an outbreak or is at extreme risk. COVID cases are exponentially growing and/or " + stateNames[stateNum] + " COVID preparedness is significantly below international standards."
			let riskDisplaySelected = document.getElementById('level-4' + '-' + target);
			riskDisplaySelected.setAttribute('class', 'selected-level riskLevel-4');
		}
		else if (riskLevel == 3) {
			riskLevelDescEl.textContent = "At risk of outbreak";
			riskLevelTxtEl.textContent = stateNames[stateNum] + " is at risk of an outbreak. COVID cases are either increasing at a rate likely to overwhelm hospitals and/or the state’s COVID preparedness is below international standards."
			let riskDisplaySelected = document.getElementById('level-3' + '-' + target);
			riskDisplaySelected.setAttribute('class', 'selected-level riskLevel-3');
		}
		else if (riskLevel == 2) {
			riskLevelDescEl.textContent = "Slow disease growth";
			riskLevelTxtEl.textContent = "Covid in " + stateNames[stateNum] + " is spreading in a slow and controlled fashion, and " + stateNames[stateNum] + " COVID preparedness meets international standards."
			let riskDisplaySelected = document.getElementById('level-2' + '-' + target);
			riskDisplaySelected.setAttribute('class', 'selected-level riskLevel-2');
		}
		else {
			riskLevelDescEl.textContent = "On track for containment";
			riskLevelTxtEl.textContent = stateNames[stateNum] + " is on track to contain COVID. Cases are steadily decreasing and " + stateNames[stateNum] + " COVID preparedness meets or exceeds international standards."
			let riskDisplaySelected = document.getElementById('level-1'+ '-' + target);
			riskDisplaySelected.setAttribute('class', 'selected-level riskLevel-1');
		};

		// vaccination section
		let vaccinationTitle = document.createElement('h3');
		vaccinationTitle.textContent = "Vaccinations";
		vaccineStatsDiv.appendChild(vaccinationTitle);

		//  vaccination progress bars
		let completedContainer = document.createElement('div');
		completedContainer.setAttribute('class', 'completed');
		vaccineStatsDiv.appendChild(completedContainer);
		let vaccinesCompletedEl = document.createElement('p');
		vaccinesCompletedEl.textContent = "Completed: " + vaccinesCompleted;
		completedContainer.appendChild(vaccinesCompletedEl);
		let completedBarContainer = document.createElement('div');
		completedContainer.appendChild(completedBarContainer)
		let completedProgressBar = document.createElement('div');
		completedProgressBar.setAttribute('class', 'completedBar');
		completedBarContainer.appendChild(completedProgressBar);
		let completedPercentageEl = document.createElement('p');
		completedPercentageEl.textContent = vaccinesCompletedNum;
		completedBarContainer.append(completedPercentageEl);
		let completedProgress = document.createElement('div');
		completedProgress.style.width = vaccinesCompletedNum;
		completedProgress.setAttribute('class', 'completedProgress');
		completedProgressBar.appendChild(completedProgress);
		let initiatedContainer = document.createElement('div');
		initiatedContainer.setAttribute('class', 'initiated');
		vaccineStatsDiv.appendChild(initiatedContainer);
		let vaccinesInitiatedEl = document.createElement('p');
		vaccinesInitiatedEl.textContent = "Initiated: " + vaccinesInitiated;
		initiatedContainer.appendChild(vaccinesInitiatedEl);
		let initiatedBarContainer = document.createElement('div');
		initiatedContainer.appendChild(initiatedBarContainer)
		let initiatedProgressBar = document.createElement('div');
		initiatedProgressBar.setAttribute('class', 'initiatedBar');
		initiatedBarContainer.appendChild(initiatedProgressBar);
		let initiatedPercentageEl = document.createElement('p');
		initiatedPercentageEl.textContent = vaccinesInitiatedNum;
		initiatedBarContainer.append(initiatedPercentageEl);
		let initiatedProgress = document.createElement('div');
		initiatedProgress.setAttribute('class', 'initiatedProgress')
		initiatedProgress.style.width = vaccinesInitiatedNum;
		initiatedProgressBar.appendChild(initiatedProgress);

		// icu section
		let icuTitle = document.createElement('h3');
		icuTitle.textContent = 'ICU Beds'
		icuStatsDiv.appendChild(icuTitle);
		var chartContainer = document.createElement('canvas')
		chartContainer.setAttribute('id', 'myChart')
		chartContainer.getContext('2d')
		icuStatsDiv.appendChild(chartContainer);
		//chart.js doughnut chart
		var icuDonutChart = new Chart(chartContainer, {
			type: 'doughnut',
			data: {
				labels: ['Covid Beds', 'Non-Covid Beds', 'Available Beds'],
				datasets: [{
					label: 'Points',
					// can change colors here
					backgroundColor: ['Red', 'Yellow', 'Green'],
					borderColor: ['Red', 'Yellow', 'Green'],
					borderWidth: 2,
					data: [ICUAvailableBeds, ICUNonCovidBeds, ICUCovidUsage]
				}]
			},
			options: {
				cutoutPercentage: 60,
				animation: {
					animateScale: true,
				}
			}
		});
		icuDonutChart.canvas.parentNode.style.width = '300px';
		icuDonutChart.canvas.parentNode.style.height = '300px';
	})
};

function removeSavedStateInfo(){
	console.log(2);
	for (let i = 0; i < 2; i++){
		localStorage.removeItem('stateItem-' + i);
	}
};

function removeSavedCountyInfo(){
	for (let i = 0; i < 4; i++){
	localStorage.removeItem('countyItem-' + i)
	}
};

let returnButton = document.querySelector('#return-btn');
returnButton.addEventListener('click', function(event){
	event.preventDefault;
	removeSavedCountyInfo();
	removeSavedStateInfo();
	location.href = '../../index.html'

})

// removeSavedStateInfo();
// removeSavedCountyInfo()
determineDataPath();
// grabCountyInputs();
// grabStateInputs();


// ===================
// Samuel Maddox Notes
// ===================
// This is honestly well written code. The gigantic functions is the only red flag I see. And 
// everything in a single file is also a problem that we didn't provide you a solution too. So be 
// aware that's a bad practice, but that's not your fault for not knowing yet.
// 
// Both of these problems will be more easily fixed when we teach you React, so I wouldn't get
// into to much of a tizzy over this. Good work on this project. I'm impressed!
// ===================
// End Samuel Notes
// ===================
