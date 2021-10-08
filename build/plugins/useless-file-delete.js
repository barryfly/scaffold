/**
 * 删除打包后生成的无用文件
 *
 * @author Barry@gmail.com
 * @date 2021-10-01
 */

let _ = require("lodash");
let rm = require("rimraf");
let utils = require("../utils.js");

function UselessFileDelete(options) {
  this.name = "useless-file-del";
  this.options = options;
}

UselessFileDelete.prototype.apply = function(compiler) {
  let ops = this.options;

  compiler.hooks.emit.tap("done", function(compilation) {
    _.each(ops.paths, (filePath) => {
      rm.sync(utils.resolve(filePath));
    });
  });
};

module.exports = UselessFileDelete;
