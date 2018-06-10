require('whatwg-fetch');

// fetch('http://example.com/movies.json')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     console.log(myJson);
//   });

async function logFetch(url) {
	try {
		const response = await fetch(url);
		console.log(await response.text());
	}
	catch (err) {
		console.log('fetch failed', err);
	}
}

logFetch('https://www.google.com/');