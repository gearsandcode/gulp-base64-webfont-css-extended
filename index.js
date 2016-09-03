var through2 = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var template = [
      '@font-face {\n',
      '  font-family: "{{fontName}}";\n',
      '  font-style: {{fontStyle}};\n',
      '  font-weight: {{fontWeight}};\n',
      '  src: url("data:application/x-font-{{fontType}};base64,{{base64}}") format("{{fontType}}");\n',
      '}'
    ].join('');

module.exports = function (list) {
  'use strict';

  var files = [],
  transform = function (file, encoding, callback) {
    if (file.isNull()) {
      this.push(file);
      return callback();
    }
    files.push(file);

    callback();
  },
  flush = function (callback) {
    files.forEach(function (file, idx) {
      var filePath = file.path;
      var fileName = path.basename(filePath);
      var fileExt = path.extname(filePath);
      var fontType = fileExt.substring(1);
      var fontParts = filePath.split('_');
      var fontName = fontParts[0].replace('-', ' ');
      var fontWeight = fontParts[1];
      var fontStyle = fontParts[2];
      var base64 = file.contents.toString('base64');
      var tmpl = template
             .replace(/{{fontName}}/g, fontName)
             .replace(/{{fontType}}/g, fontType)
             .replace(/{{fontStyle}}/g, fontStyle)
             .replace(/{{fontWeight}}/g, fontWeight)
             .replace('{{base64}}', base64);
      var output = new gutil.File({
        cwd: file.cwd,
        base: file.base,
        path: file.base + fontType + '/' + fileName + '.css'
      });

      output.contents = new Buffer(tmpl);
      this.push(output);
    }.bind(this));

    callback();
  };

  return through2.obj(transform, flush);

};
