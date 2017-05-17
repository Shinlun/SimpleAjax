SimpleAjax
==========


**SimpleAjax** is a lightweight javascript Ajax library.
It covers all HTTP methods and headers with an easy syntax.


Installation
----------------

Simply include the library to your project in html and you're good to go.
```
<script type="text/javascript" src="/path/to/simpleajax.js"></script>
```

Usage
---------

Generic ajax request syntax

```
SimpleAjax.request('url', options)
```

You can also use `.get` `.post` `.put` `.patch` and `.delete` if you don't feel like passing the HTTP method in your options

```
SimpleAjax.get('url', options)
SimpleAjax.post('url', options)
SimpleAjax.put('url', options)
SimpleAjax.patch('url', options)
SimpleAjax.delete('url', options)
```

Options
-----------

Options are passed as a json:

```
{
  // If using .request(), specify the HTTP method
  method: 'GET' || 'POST || 'PUT' || 'PATCH' || 'DELETE',
  // Headers are passed as json with header name as key
  headers: {},
  // Data are passed as json
  data: {},
  // Success callback
  success: function(response) {
    // Manage request response here
  },
  // Error callback
  error: function(err) {
    // Manage request error here
  }
}
```

Examples
------------

Basic ajax request:

```
SimpleAjax.request('http://myapi.example.org/ressource', {
  method: 'GET',
  success: function(response) {
    console.log('Success', response)
  },
  error: function(err) {
    console.error('Error', err)
  }
})
```

Using specific methods:

```
SimpleAjax.post('/path/to/login.py', {
  headers: {
    'Content-Type': 'application/json'
  },
  data: {
    username: 'JohnDoe',
    password: 'pwd42'
  },
  success: function(response) {
    var user = JSON.parse(response)
    console.log(user.id)
  },
  error: function(err) {
    console.error('Error', err)
  }
})
```

 Notes & TODO
======================

>- I will work on a version with promises
>- Please note that this is a very small, straight to the point ajax tool. It might not be suited for complex requirements
>- Don't hesitate to post issues & pull requests


License
-------

SimpleAjax was conceived and programmed by Ronan Letellier

SimpleAjax is released under the terms of the GNU General Public License v3
(see LICENSE)
Additionnaly, if we meet some day and you think this Software is worth it,
you can buy me a beer in return. (See http://en.wikipedia.org/wiki/Beerware)
