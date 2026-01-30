import $ from 'jquery';

const PATCH_FLAG = '__metisMenuJquery4EventAddShim';

if ($?.event?.add && !$.event.add[PATCH_FLAG]) {
  const originalAdd = $.event.add;

  $.event.add = function(elem, types, handler, data, selector) {
    // jQuery 4 expects selector to be a string; guard to avoid selector.replace errors.
    if (selector != null && typeof selector !== 'string') {
      selector = undefined;
    }

    return originalAdd.call(this, elem, types, handler, data, selector);
  };

  $.event.add[PATCH_FLAG] = true;
}
