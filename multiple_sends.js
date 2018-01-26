let request = require('request');
let qs = require('querystring');

let jwt = '';
let baseOptions = {
  uri: 'http://127.0.0.1:3001',
};

function postAuth()
{
  let requestOptions = {...baseOptions};
  let postBody = {
    email: 'BigBen@example.com',
    password: 'password!!',
  };

  requestOptions.uri += '/auth';
  requestOptions.json = true;
  requestOptions.form = postBody;

  request.post(requestOptions, function(error, response, body)
  {
    let jwtResponse = body; //JSON.parse(body);
    console.log('sendRequest1 - jwt:', jwtResponse);

    jwt = jwtResponse;
    // console.log('sendRequest1 - user_id:', user.user_id);
  });
}
function sendRequest1(userId)
{
  let requestOptions = {...baseOptions};
  requestOptions.auth = {
    bearer: jwt,
  };


  requestOptions.uri += '/users/' + userId;

  request.get(requestOptions, function(error, response, body)
  {
    let user = body; //JSON.parse(body);
    console.log('sendRequest1 - user:', user);
    // console.log('sendRequest1 - user_id:', user.user_id);
  });
}

function sendRequest2(userId)
{
  let requestOptions = {...baseOptions};
  requestOptions.auth = {
    bearer: jwt,
  };


  requestOptions.uri += '/users/' + userId;

  request.get(requestOptions, function(error, response, body)
  {
    let user = body; //JSON.parse(body);
    console.log('sendRequest1 - user:', user);
    // console.log('sendRequest1 - user_id:', user.user_id);
  });
}

function sendRequest3()
{
  let user = {user_id: '12345678-1234-1234-1234-123456789abe'};

  let requestOptions = {...baseOptions};
  requestOptions.uri += '/' + user.user_id;

  request.get(requestOptions, function(error, response, body)
  {
    let user = JSON.parse(body);
    console.log('sendRequest3 - user_id:', user.user_id);
  });
}
function sendRequest4()
{
  let user = {user_id: '12345678-1234-1234-1234-123456789abf'};

  let requestOptions = {...baseOptions};
  requestOptions.uri += '/' + user.user_id;

  request.get(requestOptions, function(error, response, body)
  {
    let user = JSON.parse(body);
    console.log('sendRequest4 - user_id:', user.user_id);
  });
}
function sendRequest5()
{
  let user = {user_id: '33325de4-a072-498a-a694-dcfe6b06766a'};

  let requestOptions = {...baseOptions};
  requestOptions.uri += '/' + user.user_id;

  request.get(requestOptions, function(error, response, body)
  {
    let user = JSON.parse(body);
    console.log('sendRequest5 - user_id:', user.user_id);
  });
}
function sendRequest6()
{
  let user = {user_id: '4b6447f9-0be4-48ae-b5dd-1d74ed8985a3'};

  let requestOptions = {...baseOptions};
  requestOptions.uri += '?' + qs.stringify(queryParams);

  request.get(requestOptions, function(error, response, body)
  {
    let user = JSON.parse(body);
    console.log('sendRequest6 - user_id:', user.user_id);
  });
}
function sendRequest7()
{
  let user = {user_id: '4b6447f9-0be4-48ae-b5dd-1d74ed8985a3'};


  let requestOptions = {...baseOptions};
  requestOptions.uri += '/' + user.user_id;

  request.get(requestOptions, function(error, response, body)
  {
    let user = JSON.parse(body);
    console.log('sendRequest7 - user_id:', user.user_id);
  });
}
function sendRequest8()
{
  let user = {user_id: '12345678-1234-1234-1234-123456789abc'};

  let requestOptions = {...baseOptions};
  requestOptions.uri += '?' + qs.stringify(queryParams);

  request.get(requestOptions, function(error, response, body)
  {
    let user = JSON.parse(body);
    console.log('sendRequest8 - user_id:', user.user_id);
  });
}

function sendRequestBad(userId)
{
  let requestOptions = {...baseOptions};
  requestOptions.auth = {
    bearer: jwt,
  };


  requestOptions.uri += '/users/' + userId;

  request.get(requestOptions, function(error, response, body)
  {
    let user = JSON.parse(body);

    if (! user.hasOwnProperty('user_id')) {
      console.log('error: ', user);
      return;
    }
    console.log('sendRequestBad - user:', user);
    // console.log('sendRequest1 - user_id:', user.user_id);
  });
}

setTimeout(() => postAuth(), 100);
setTimeout(() => sendRequest1('12345678-1234-1234-1234-123456789abc'), 1000);
setTimeout(() => sendRequest2('12345678-1234-1234-1234-123456789abd'), 1000);
// setTimeout(() => sendRequest3(), 1000);
// setTimeout(() => sendRequest4(), 1000);
// setTimeout(() => sendRequest5(), 1000);
// setTimeout(() => sendRequest6(), 1000);
// setTimeout(() => sendRequest7(), 1000);
// setTimeout(() => sendRequest8(), 1000);
setTimeout(() => sendRequestBad('12345678-1234-1234-1234-123456789000'), 1000);
