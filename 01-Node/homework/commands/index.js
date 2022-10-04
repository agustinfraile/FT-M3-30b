var fs = require('fs');
const request = require('request');

module.exports = {
    pwd: function(args, done) {done(process.cwd())},
    date: function(args, done) {done(Date()); },
    ls: function (args, done) {
        fs.readdir('.', function(err, files) {
            if (err) throw err;
            var out = '';
            files.forEach(function(file) {
              // process.stdout.write("\n" + file.toString() + "\n");
              out = out + file + '\n'
            })
            // process.stdout.write("prompt > ");
            done(out)
          });
    },
    echo: function(args, done) {
      done(args.join(' '));
    },
    cat: function (file, done) {
      fs.readFile(file[0], 'utf-8', function(err, data){
        if(err) throw err;
        done(data) 
      })
    },
    head: function (file, done) {
      fs.readFile(file[0], 'utf-8', function(err, data){
        if(err) throw err;
        const lines = data.split('\n').slice(0, 9).join('\n')
        done(lines)
      })
    },
    tail: function (file, done) {
      fs.readFile(file[0], 'utf-8', function(err, data){
        if(err) throw err;
        const lines = data.split('\n').slice(-10).join('\n')
        done(lines)
      })
    },
    curl: function(url, done) {
      request(url[0], function(err, res, body) {
        if(err) throw err;
        done(body)
      })
    }


}