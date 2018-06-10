//import fetch from 'node-fetch';
// or
const fetch = require('node-fetch');
 
// if you are using your own Promise library, set it through fetch.Promise. Eg.
 
// import Bluebird from 'bluebird';
// fetch.Promise = Bluebird;
 
// plain text or html
 
fetch('https://github.com/')
    .then(res => res.text())
    .then(body => console.log(body));
 
// json
 
fetch('https://api.github.com/users/github')
    .then(res => res.json())
    .then(json => console.log(json));
 
// catching network error
// 3xx-5xx responses are NOT network errors, and should be handled in then()
// you only need one catch() at the end of your promise chain
 
fetch('http://domain.invalid/')
    .catch(err => console.error(err));
 
// stream
// the node.js way is to use stream when possible
 
fetch('https://assets-cdn.github.com/images/modules/logos_page/Octocat.png')
    .then(res => {
        const dest = fs.createWriteStream('./octocat.png');
        res.body.pipe(dest);
    });
 
// buffer
// if you prefer to cache binary data in full, use buffer()
// note that buffer() is a node-fetch only API
 
// import fileType from 'file-type';
 
// fetch('https://assets-cdn.github.com/images/modules/logos_page/Octocat.png')
//     .then(res => res.buffer())
//     .then(buffer => fileType(buffer))
//     .then(type => { /* ... */ });
 
// meta
 
fetch('https://github.com/')
    .then(res => {
        console.log(res.ok);
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.headers.raw());
        console.log(res.headers.get('content-type'));
    });
 
// post
 
fetch('http://httpbin.org/post', { method: 'POST', body: 'a=1' })
    .then(res => res.json())
    .then(json => console.log(json));
 
// post with stream from file
 
// import { createReadStream } from 'fs';
 
// const stream = createReadStream('input.txt');
// fetch('http://httpbin.org/post', { method: 'POST', body: stream })
//     .then(res => res.json())
//     .then(json => console.log(json));
 
// post with JSON
 
var body = { a: 1 };
fetch('http://httpbin.org/post', { 
    method: 'POST',
    body:    JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
})
    .then(res => res.json())
    .then(json => console.log(json));
 
// post form parameters (x-www-form-urlencoded)
 
// import { URLSearchParams } from 'url';
 
// const params = new URLSearchParams();
// params.append('a', 1);
// fetch('http://httpbin.org/post', { method: 'POST', body: params })
//     .then(res => res.json())
//     .then(json => console.log(json));
 
// post with form-data (detect multipart)
 
// import FormData from 'form-data';
 
// const form = new FormData();
// form.append('a', 1);
// fetch('http://httpbin.org/post', { method: 'POST', body: form })
//     .then(res => res.json())
//     .then(json => console.log(json));
 
// post with form-data (custom headers)
// note that getHeaders() is non-standard API
 
// import FormData from 'form-data';
 
// const form = new FormData();
// form.append('a', 1);
// fetch('http://httpbin.org/post', { method: 'POST', body: form, headers: form.getHeaders() })
//     .then(res => res.json())
//     .then(json => console.log(json));
 
// node 7+ with async function
 
(async function () {
    const res = await fetch('https://api.github.com/users/github');
    const json = await res.json();
    console.log(json);
})();