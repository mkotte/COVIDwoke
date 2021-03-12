let apiKey = '74f4b9b4d698466e88f0f73ba927478d';
let stateUrl = 'https://api.covidactnow.org/v2/states.json?apiKey=' + apiKey;
let stateAbbrv = ["AK",	"AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA",  "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT","WA", "WI", "WV", "WY"];
let countyUrl = "https://api.covidactnow.org/v2/counties.json?apiKey=" + apiKey;
let stateNames= ['Alaska','Alabama','Arkansas','Arizona','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Iowa','Idaho','Illinois','Indiana','Kansas','Kentucky','Louisiana','Massachusetts','Maryland','Maine','Michigan','Minnesota','Missouri','Mississippi','Montana','North Carolina','North Dakota','Nebraska','New Hampshire','New Jersey','New Mexico','Nevada','New York','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Virginia','Vermont','Washington','Wisconsin','West Virginia','Wyoming']
let resultsContainer = document.getElementById('results')
let statesSaved = [];
let countiesSavedInfo = {
	states : [],
	counties: []
};

// creating the responsive cards displaying results info

function grabData(){
	fetch(stateUrl).then((response) => {
		return response.json()
	}).then((data) => {
		return data.find((el) => el.state === "AK");

	}).then((dataObj) => {
		console.log(dataObj)

		// STATISTICS
		// total stats
        let totalCases = dataObj.actuals.cases;
		console.log('totalCases '+ totalCases );
		let totalDeaths = dataObj.actuals.deaths;
		console.log('totalDeaths ' + totalDeaths);
		
        // daily cases per 100k
		let dailyCases = dataObj.actuals.newCases;
		console.log('dailyCases ' + dailyCases);
		let dailyDeaths = dataObj.actuals.newDeaths;


		// infection rate rounded up to hundreths
		let infectionRate = (dataObj.metrics.infectionRate).toFixed(2);
		console.log('infectionRate ' + infectionRate);

        // population
		let population = dataObj.population
		console.log(population);

		// vaccination stats should display based on population
		let vaccinesCompleted = dataObj.actuals.vaccinationsCompleted;
		console.log('vaccinesCompleted ' + vaccinesCompleted)
		let vaccinesInitiated = dataObj.actuals.vaccinationsInitiated;
		console.log('vaccinesInitiated ' + vaccinesInitiated)
       
        // vaccination percentages
        let vaccinesCompletedNum = (((vaccinesCompleted) / population ) * 100).toFixed(1) + '%'
		console.log(vaccinesCompletedNum);
		let vaccinesInitiatedNum = (((vaccinesInitiated) / population ) * 100).toFixed(1) + '%'
		console.log(vaccinesInitiatedNum) 
		
        // distribution's unused for now
		let vaccinesDistributed = dataObj.actuals.vaccinesDistributed;
		console.log('vaccinesDistributed ' + vaccinesDistributed)

		// ICU beds
		let ICUCapacity = dataObj.actuals.icuBeds.capacity
		console.log('ICUCapacity ' + ICUCapacity);
		let ICUCovidUsage = dataObj.actuals.icuBeds.currentUsageCovid
		console.log('ICUCovidUsage ' + ICUCovidUsage);
		let ICUTotalUsage = dataObj.actuals.icuBeds.currentUsageTotal
		console.log('ICUTotalUsage ' + ICUTotalUsage);
		let ICUAvailableBeds = ICUCapacity - ICUTotalUsage;
		let ICUNonCovidBeds = ICUTotalUsage - ICUCovidUsage ;
		

		// riskLevel
		let riskLevel = dataObj.riskLevels.overall
		console.log('Risk Level ' + riskLevel)

		// creating +appending information sections to cards
		let stateCardEL = document.createElement('div');
		let cardHeader = document.createElement('div')
		let generalStatsDiv = document.createElement('div');
		let riskLevelDiv = document.createElement('div');
		let vaccineStatsDiv  = document.createElement('div');
		let icuStatsDiv  = document.createElement('div');
		stateCardEL.appendChild(cardHeader);
		stateCardEL.appendChild(generalStatsDiv);
		stateCardEL.appendChild(riskLevelDiv);
		stateCardEL.appendChild(vaccineStatsDiv);
		stateCardEL.appendChild(icuStatsDiv);
		resultsContainer.appendChild(stateCardEL);

	//header section w/ population
		//TODO: use selected state w text variable stateName to display name of state
		let stateNameEl = document.createElement('h3');
		stateNameEl.textContent = "" //TODO: link state searched here, tbd how
		cardHeader.appendChild(stateNameEl);
		let populationEl = document.createElement('h3')
		populationEl.textContent = "Population: " + population;
		cardHeader.appendChild(populationEl);

	// general stats card section
		let generalStatsTitle = document.createElement('h3');
		generalStatsTitle.textContent = "General Stats";
		generalStatsDiv.appendChild(generalStatsTitle)

		// daily stats container + info
		let dailyStatsDiv = document.createElement('div');
		dailyStatsDiv.setAttribute('class', "daily-stats");
		generalStatsDiv.appendChild(dailyStatsDiv);
		let newCasesEl = document.createElement('p');
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
		let totalDeathsEl = document.createElement('p')
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
		let riskDisplayDiv = document.createElement('div');
		riskLevelDiv.appendChild(riskDisplayDiv);

	
		// for loop creating + appending the risk levels display's divs
		//TODO: use CSS to style!
		for (let i = 5; i > 0 ; i--){
			let riskDisplay = document.createElement('div');
			riskDisplay.setAttribute("class" , "riskLevel-" + i);
			riskDisplay.setAttribute("id" , "level-" + i);
			riskDisplayDiv.appendChild(riskDisplay);
		};

		// risk level describing text 
		let riskLevelDescEl = document.createElement('h3');
		riskLevelDiv.appendChild(riskLevelDescEl);
		let riskLevelTxtEl = document.createElement('p');
		riskLevelDiv.appendChild(riskLevelTxtEl);
		
		//delete after solving
		let stateNameTBD = "Placeholder"

		// If statement to determine display bordering in css + text risk level text
		// TODO: determine how to link state name from full name array
		if (riskLevel == 5){
			riskLevelDescEl.textContent = "Severe outbreak";
			riskLevelTxtEl.textContent = stateNameTBD + " is currently experiencing a severe outbreak. Take all possible precautions to avoid exposure."
			let riskDisplaySelected = document.getElementById('level-5');
			riskDisplaySelected.setAttribute('class', 'selected-level riskLevel-5');
		}
		else if (riskLevel == 4){
			riskLevelDescEl.textContent = "Active outbreak";
			riskLevelTxtEl.textContent = stateNameTBD + " is either actively experiencing an outbreak or is at extreme risk. COVID cases are exponentially growing and/or "+ stateNameTBD + " COVID preparedness is significantly below international standards."
			let riskDisplaySelected = document.getElementById('level-4');
			riskDisplaySelected.setAttribute('class', 'selected-level riskLevel-4');
		}
		else if (riskLevel == 3){
			riskLevelDescEl.textContent = "At risk of outbreak";
			riskLevelTxtEl.textContent = stateNameTBD + " is at risk of an outbreak. COVID cases are either increasing at a rate likely to overwhelm hospitals and/or the state’s COVID preparedness is below international standards."
			let riskDisplaySelected = document.getElementById('level-3');
			riskDisplaySelected.setAttribute('class', 'selected-level riskLevel-3');
		}
		else if (riskLevel == 2){
			riskLevelDescEl.textContent = "Slow disease growth";
			riskLevelTxtEl.textContent = "Covid in " +stateNameTBD + "s spreading in a slow and controlled fashion, and " + stateNameTBD + " COVID preparedness meets international standards."
			let riskDisplaySelected = document.getElementById('level-2');
			riskDisplaySelected.setAttribute('class', 'selected-level riskLevel-2');
		}
		else {
			riskLevelDescEl.textContent = "On track for containment";
			riskLevelTxtEl.textContent = stateNameTBD + "is on track to contain COVID. Cases are steadily decreasing and " + stateNameTBD + " COVID preparedness meets or exceeds international standards."
			let riskDisplaySelected = document.getElementById('level-1');
			riskDisplaySelected.setAttribute('class', 'selected-level riskLevel-1');
		};

	// vaccination section 
		let vaccinationTitle = document.createElement('h3');
		vaccinationTitle.textContent = "Vaccinations";
		vaccineStatsDiv.appendChild(vaccinationTitle);

		//  vaccination progress bars
		// TODO: delete all styling except width of our progress elements once properly styled in CSS
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
		
	
		var icuDonutChart = new Chart(chartContainer, {
			type: 'doughnut',
			data: {
				labels: ['Available Beds','Non-Covid Beds','Covid Beds'],
				datasets: [{
					label: 'Points',
					// can change colors here
					backgroundColor: ['Red', 'Blue', 'Green'],
					borderColor:['Red', 'Blue', 'Green'],
					borderWidth: 2,
					data: [ICUAvailableBeds, ICUNonCovidBeds, ICUCovidUsage]

				}]
			}, 
			options: {
				cutoutPercentage: 60,
				animation:{
					animateScale : true,
				}
			}	
		});
		
		icuDonutChart.canvas.parentNode.style.width = '300px';
		icuDonutChart.canvas.parentNode.style.height = '300px';






	})
	.then(fetch(countyUrl).then((response) => {
		return response.json();
	}).then((data) => {
		// console.log(data)
		return data.filter((el) => el.state === "TX").filter((el) => el.county === "Hartley County");
		}).then((dataObj) =>{
			console.log(dataObj)
		
			let countyTotalCases = dataObj[0].actuals.cases;
			console.log('County totalCases '+ countyTotalCases );
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



			// county card info goes here
			

		})
	)
};





function grabCountyInputs(){
	for(var i=0; i < 8 ; i++){        
		if(i % 2 == 0){
			countiesSavedInfo.states.push(localStorage.getItem('countyItem-' + i))
		} 
		else{
			countiesSavedInfo.counties.push(localStorage.getItem('countyItem-' + i))
		} 
	 }
};

function grabStateInputs(){
	for (let i = 0; i < 4 ; i++){
		statesSaved.push(localStorage.getItem('stateItem-' + i));
	}
}
console.log(countiesSavedInfo);

grabCountyInputs();

grabStateInputs();

grabData();