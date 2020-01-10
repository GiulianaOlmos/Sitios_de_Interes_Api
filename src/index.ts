import App from './app';

const port = process.env.PORT || 3000;

App.listen(port, function () {
  console.log('App listening on port 3000!');
});