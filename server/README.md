
## Medborgerskabsprove.dk server side

This is server side of Medborgerskabsprove.dk, which serves a list of api calls.

## Installation or requirements:
we need to have composor to integrate stripe and PHPMailer modules. 
Stripe module takes care of payment operations and PHPMailer module helps to send an email, which is being 
used for password reset. Moreover jwt.php is also required to generate and decode jason web token.

## Configuration:
A file called config.php which resides in app->backend->auth folder is being used to hold configuration like
base-url, database configs, servery key ....

## Folder Structure:
There are two main forlders in app folder called frontend and backend. 

frontend contains one sub-folder called pages, which contains files serving all the api end points.
backend contains following sub-folders auth(contains configs), business(contains all the files having business logic in), 
core(contains core classes i.e. database, helpers, jwt..), models(contains model classes) and PHPMailer.

## Routing:
index.php is the entry point and serves as a controller. It redirects coming request to respective file. 
index.php works with the help of router.php file. This file basically performs routing operation. 

.htaccess file helps to redirect all the coming requests to index.php which with the help of router.php determines destination 
