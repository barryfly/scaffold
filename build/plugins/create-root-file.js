/**
 * 文件拼接插件
 *
 * @author Barry@gmail.com
 * @date 2021-10-01
 */

let fs = require("fs");
let _ = require("lodash");
let utils = require("../utils.js");
var UglifyJS = require("uglify-js");

function CreateRootFile(options) {
  this.name = "contact-file";
  this.options = options;
}

CreateRootFile.prototype.apply = function(compiler) {
  let ops = this.options;
  let getFileContent = function(sourceObj, filePath) {
    let keys = Object.keys(sourceObj);

    for (let i = 0, len = keys.length; i < len; i++) {
      if (keys[i].indexOf(filePath) > -1) {
        return sourceObj[keys[i]];
      }
    }

    return "";
  };
  compiler.hooks.emit.tap("emit", function(compilation) {
    let fileContent = [];
    let { entry, output, src } = ops;
    let assetsMap = compilation.assets;

    _.each(entry, (fileName) => {
      let sourceContent = getFileContent(assetsMap, fileName);
      if (sourceContent) {
        fileContent.push(sourceContent.source());
      }
    });

    _.each(src, (file) => {
      file = utils.resolve(file);
      file = fs.readFileSync(file, "utf8");

      if (typeof file === "string" && file.length) {
        fileContent.push(UglifyJS.minify(file).code);
        // if(compilation.mode === "production") {
        // }else{
        //   fileContent.push(file.toString())
        // }
      }
    });

    fileContent = fileContent.join(";");

    assetsMap[output] = {
      source() {
        return fileContent;
      },

      size() {
        return Buffer.byteLength(fileContent, "utf8");
      },
    };
  });
};

module.exports = CreateRootFile;
