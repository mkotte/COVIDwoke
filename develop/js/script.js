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
