
var gulp = require("gulp");
var karmaServer = require('karma').Server;
const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript');

const rollupObj = require('./rollup.config')

gulp.task('build', function () {
    var ro;
    for(var i=0;i<rollupObj.length;i++){
        ro+=getRollup(rollupObj[i]);
    }
  });

  getRollup = (data)=>{
    return rollup.rollup(
        {
        input: data.input,
      plugins: data.plugins
    })
      .then(function (bundle) {
        bundle.write({
            output:data.output
        });
      })
  }


gulp.task('test', function (done) {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});
