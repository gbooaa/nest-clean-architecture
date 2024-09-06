const crudGenerator = require('./components/crud/rest');
const eventsGenerator = require('./components/crud/sockets');

module.exports = (plop) => {
  plop.setGenerator('crud', crudGenerator);
  plop.setGenerator('sockets', eventsGenerator);
};
