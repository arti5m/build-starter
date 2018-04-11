const $component = $('html');

export default {
  init
};

function init () {
  return (function ($, document, window, undefined) {
    $(document).on('ready', function() {
      bindEvents();
    });
  })(jQuery, document, window);
}

function bindEvents () {
  console.log('Arf!');
};
