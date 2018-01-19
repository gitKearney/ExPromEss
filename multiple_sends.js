let request = require('request');
let qs = require('querystring');

let params = {email: 'original.logger@example.com'};
let baseOptions = {
  uri: 'http://127.0.0.1:3001/users',
};

function sendRequest1()
{
  let queryParams = {...params};
  let requestOptions = {...baseOptions};
  requestOptions.uri += '?' + qs.stringify(queryParams);

  request.get(requestOptions, function(error, response, body)
  {
    let user = JSON.parse(body);
    console.log('sendRequest1 - user_id:', user.user_id);
  });
}

function sendRequest2()
{
  let queryParams = {...params};
  queryParams.email = 'billy.b.parker@example.com';
  let requestOptions = {...baseOptions};
  requestOptions.uri += '?' + qs.stringify(queryParams);

  request.get(requestOptions, function(error, response, body)
  {
    let user = JSON.parse(body);
    console.log('sendRequest2 - user_id:', user.user_id);
  });
}

function sendRequest3()
{
  let queryParams = {...params};
  queryParams.email = 'aaron.burr@example.com';

  let requestOptions = {...baseOptions};
  requestOptions.uri += '?' + qs.stringify(queryParams);

  request.get(requestOptions, function(error, response, body)
  {
    let user = JSON.parse(body);
    console.log('sendRequest3 - user_id:', user.user_id);
  });
}
function sendRequest4()
{
  let queryParams = {...params};
  queryParams.email = 'g.w@example.com';
  let requestOptions = {...baseOptions};
  requestOptions.uri += '?' + qs.stringify(queryParams);

  request.get(requestOptions, function(error, response, body)
  {
    let user = JSON.parse(body);
    console.log('sendRequest4 - user_id:', user.user_id);
  });
}
function sendRequest5()
{
  let queryParams = {...params};
  queryParams.email = 'tom.jefferson@example.com';
  let requestOptions = {...baseOptions};
  requestOptions.uri += '?' + qs.stringify(queryParams);

  request.get(requestOptions, function(error, response, body)
  {
    let user = JSON.parse(body);
    console.log('sendRequest5 - user_id:', user.user_id);
  });
}
function sendRequest6()
{
  let queryParams = {...params};
  queryParams.email = 'alex.hamilton@example.com';
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
  let queryParams = {...params};

  let requestOptions = {...baseOptions};
  requestOptions.uri += '?' + qs.stringify(queryParams);

  request.get(requestOptions, function(error, response, body)
  {
    let user = JSON.parse(body);
    console.log('sendRequest7 - user_id:', user.user_id);
  });
}
function sendRequest8()
{
  let queryParams = {id: '12345678-1234-1234-1234-123456789abc'};

  let requestOptions = {...baseOptions};
  requestOptions.uri += '?' + qs.stringify(queryParams);

  request.get(requestOptions, function(error, response, body)
  {
    let user = JSON.parse(body);
    console.log('sendRequest8 - user_id:', user.user_id);
  });
}

function sendRequestBad()
{
  let queryParams = {userID: '12345678-1234-1234-1234-123456789abc'};

  let requestOptions = {...baseOptions};
  requestOptions.uri += '?' + qs.stringify(queryParams);

  request.get(requestOptions, function(error, response, body)
  {
    let user = JSON.parse(body);
    if (user.user_id === null) {
      console.log('sendRequestBad - error:', user.message);
      return;
    }

    console.log('sendRequestBad - user_id:', user.user_id);
  });
}

setTimeout(() => sendRequestBad(), 1000);
// setTimeout(() => sendRequest1(), 1000);
// setTimeout(() => sendRequest2(), 1000);
// setTimeout(() => sendRequest3(), 1000);
// setTimeout(() => sendRequest4(), 1000);
// setTimeout(() => sendRequest5(), 1000);
// setTimeout(() => sendRequest6(), 1000);
// setTimeout(() => sendRequest7(), 1000);
// setTimeout(() => sendRequest8(), 1000);
