let request = require('request');
let qs = require('querystring')

let params = {email: 'original.logger@example.com'};
let baseOptions = {
  uri: 'http://127.0.0.1:3001/users',
};

function sendRequest1()
{
  let queryParams = {...params};
  queryParams.email = 'billy.b.parker@example.com';

  let requestOptions = {...baseOptions};
  requestOptions.uri += '?' + qs.stringify(queryParams);

  console.log('sendRequest1:', requestOptions.uri);

  request.get(requestOptions, function(error, response, body) 
  {
    let user = JSON.parse(body);
    console.log('user_id:', user.email);
  });
}

function sendRequest2()
{
  let queryParams = {...params};

  let requestOptions = {...baseOptions};
  requestOptions.uri += '?' + qs.stringify(queryParams);

  console.log('sendRequest2:', requestOptions.uri);
  
  request.get(requestOptions, function(error, response, body) 
  {
    let user = JSON.parse(body);
    console.log('user_id:', user.email);
  });
}


setTimeout(() => sendRequest1(), 1000);
setTimeout(() => sendRequest2(), 999);


