let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let xhr = new XMLHttpRequest();
xhr.open('GET', "https://ipinfo.io/json", true);
xhr.send();
 
xhr.onreadystatechange = processRequest;
 
function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
	    const response = JSON.parse(xhr.responseText);
	    console.log(response.ip);
	    console.log(response);
	}
}