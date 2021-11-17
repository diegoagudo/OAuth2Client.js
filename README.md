
# OAuth2Client.js

  This lib provides a base for integrating with [OAuth 2.0 / Laravel Passport](https://laravel.com/docs/8.x/passport) service providers.
  
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/diegoagudo/OAuth2Client.js/blob/master/LICENSE)
[![Source Code](https://img.shields.io/badge/source-diegoagudo/OAuth2Client.js-blue.svg?style=flat-square)](https://github.com/diegoagudo/OAuth2Client.js)

---
This OAuth 2.0 client library will work with Laravel Passport provider that conforms to the OAuth 2.0 Authorization Framework.

## Requirements
* [Laravel](https://www.laravel.com)
	* Dont forget, you need:
		* Enable CORS
		* Sessions config:
			* SAME_SITE be `strict`
			* DOMAIN must be `.my.domain` (Yours applications need be subdomain, instead doesn't work)
* [OAuth2ClientService](https://github.com/diegoagudo/OAuth2ClientService)
  
## Usage

### Methods
| Method | Description  |
|--|--|
| getLoginUrl | Returns URL for authenticate |
| checkUserLogged | * Check if user has active session on authorizer |
| transparentLogin | ** Try make transparent authenticate without user action|

##### * Need implement API for check session on Authorizer, something like that
```PHP
Route::middleware('auth')->get('/check-session', function (\Illuminate\Http\Request $request) {  
  return [
		  'name' => $request->user()->name,
		  'email' => $request->user()->email,
  ];  
});
```

##### ** Need OAuth2ClientService for backend requests.

### Lib Initialization

```JS
const client = OAuth2Client({  
	  clientId: 1,  
	  redirectUrl: 'http://application.foo.boo/auth/callback',  
	  host: 'http://auth.foo.boo'  
});
```

## License

The OAuth2Client.js is open source software licensed under [the MIT license](https://opensource.org/licenses/MIT). See the [LICENSE](LICENSE.txt) file for more info.

