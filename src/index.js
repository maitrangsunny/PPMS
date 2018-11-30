window.jQuery = window.$ = require("jquery");
window.moment = require("moment");
window._ = require("lodash");

import "jquery-ui-npm/jquery-ui.min.js";

require("bootstrap");

if (module.hot) {
  module.hot.accept();
}

require.ensure([], () => {
  require("./scenes");
});
