var os = require('os');
var fs = require('fs');
var TSL = require('tsl2561_node');
var sensor = new TSL();

sensor.init(function(err, val) {
  if (err) { return console.log(err); }
  setInterval(function () {
    sensor.getLux(function(error, val) {
      if (error) { return console.log(error); }
      fs.appendFileSync('logs/lux.csv', `${new Date().getTime()}, ${val}${os.EOL}`)
      console.log(val + ' lux');
    });
  }, 5000);
});
