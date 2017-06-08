(function() {
  /*
   * Initialization
   */
  function SimpleAjax () {
    this.authorizedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    this.authorizedHeaders = [
      'accept',
      'accept-charset',
      'accept-encoding',
      'accept-language',
      'accept-datetime',
      'authorization',
      'cache-control',
      'connection',
      'cookie',
      'content-length',
      'content-md5',
      'content-type',
      'date',
      'expect',
      'forwarded',
      'from',
      'host',
      'if-match',
      'if-modified-since',
      'if-none-match',
      'if-range',
      'if-unmodified-since',
      'max-forwards',
      'origin',
      'pragma',
      'proxy-authorization',
      'range',
      'referer',
      'te',
      'user-agent',
      'upgrade',
      'via',
      'warning',
      'x-requested-with',
      'dnt',
      'x-forwarded-for',
      'x-forwarded-host',
      'x-forwarded-proto',
      'front-end-https',
      'x-http-method-override',
      'x-att-deviceid',
      'x-wap-profile',
      'proxy-connection',
      'x-uidh',
      'x-csrf-token',
      'x-request-id',
      'x-correlation-id'
    ]

    this.options = {}
    this.error = null
    this.warnings = []
  }

  /*
   * Public methods
   */

  // Generic ajax request, method must be passed in options
  SimpleAjax.prototype.request = function(url, options) {
    this.url = url
    options = options || {}

    // Default options
    this.options = options && typeof options === 'object' ? options : {}

    checkOptions(this)
    execute(this)
  }

  // GET ajax request
  SimpleAjax.prototype.get = function (url, options) {
    options = options || {}
    options.method = 'GET'
    this.request(url, options)
  }

  // POST ajax request
  SimpleAjax.prototype.post = function (url, options) {
    options = options || {}
    options.method = 'POST'
    this.request(url, options)
  }

  // PUT ajax request
  SimpleAjax.prototype.put = function (url, options) {
    options = options || {}
    options.method = 'PUT'
    this.request(url, options)
  }

  // PATCH ajax request
  SimpleAjax.prototype.patch= function (url, options) {
    options = options || {}
    options.method = 'PATCH'
    this.request(url, options)
  }

  // DELETE ajax request
  SimpleAjax.prototype.delete = function (url, options) {
    options = options || {}
    options.method = 'DELETE'
    this.request(url, options)
  }

  /*
   * Private methods
   */

  // Executing ajax request if we have no error
  function execute (instance) {
    // Displaying errors in console
    if (instance.error) {
      console.error('Simple Ajax: ' + instance.error)
      return
    } else if (instance.warnings) {
      // Displaying warnings in console
      instance.warnings.forEach(function (warning) {
        console.warn('Simple Ajax: ' + warning)
      })
    }

    // HTTP Request
    var xhr = new XMLHttpRequest()

    xhr.open(instance.options.method, instance.url)

    if (instance.options.headers) {
      Object.keys(instance.options.headers).forEach(function (key) {
        xhr.setRequestHeader(key, instance.options.headers[key])
      })
    }

    // Callbacks
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        instance.options[xhr.status.toString().match(/^2[0-9]{2}/) ? 'success' : 'error'](xhr.responseText || xhr)
      }
    }

    var str = instance.options.data ? JSON.stringify(instance.options.data) : null
    str = str ? str.slice(1, str.length - 1).replace(/:/g, '=').replace(/"/g, '').replace(/,/g, '&') : null

    xhr.send(str)
  }

  // Checking options passed
  function checkOptions (instance) {
    // Errors
    if (instance.options.method) {
      instance.options.method = instance.options.method.toUpperCase()
    }
    if (!instance.options.method) {
      instance.error = 'You need to specify a method in your options'
    } else if (instance.authorizedMethods.indexOf(instance.options.method) === -1) {
      instance.error = 'Authorized HTTP methods are: ' + instance.authorizedMethods.join(', ')
    }

    // Warnings
    var hasContentType = false
    if (instance.options.headers) {
      Object.keys(instance.options.headers).forEach(function (key) {
        if (key.toLowerCase() === 'content-type') hasContentType = true

        if (instance.authorizedHeaders.indexOf(key.toLowerCase()) === -1) {
          delete instance.options.headers[key]
          instance.warnings.push('Unknown HTTP header: ' + key + '. Header was removed from request.')
        }
      })
    }
    if (!hasContentType) {
      instance.options.headers = instance.headers ? instance.headers : {}
      instance.options.headers['content-type'] = 'application/x-www-form-urlencoded'
    }

    if (!instance.options.success) {
      instance.options.success = function() {}
      instance.warnings.push('No success callback specified')
    }

    if (!instance.options.error) {
      instance.options.success = function() {}
      instance.warnings.push('No error callback specified')
    }

    if (instance.options.method !== 'GET' && !instance.options.data) {
      instance.warnings.push('No data passed in HTTP request')
    }

    if (instance.options.method === 'GET' && instance.options.data) {
      instance.options.data = null
      instance.warnings.push("GET method, data won't be sent")
    }
  }

  this.SimpleAjax = new SimpleAjax()
})()
