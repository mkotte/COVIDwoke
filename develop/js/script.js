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
