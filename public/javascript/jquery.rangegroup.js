// Licensed under the MIT license (https://raw.githubusercontent.com/jhovgaard/jquery.rangegroup/master/LICENSE)

$(document).on('input', 'input[range-group]', function() {
  selectedRange = $(this);
  var group = selectedRange.attr('range-group');
  var max = selectedRange.attr('range-group-max-sum');

  var ranges = $('input[range-group=' + group + ']');
  var total = 0;
  ranges.each(function(i, item) {
    total += parseInt($(item).val());
  });

  var left = max - total;

  if(left < 0) {

    var half = Math.ceil(left / 2);

    ranges.each(function(i, item) {
      $item = $(item);
      if ($item.get(0) === selectedRange.get(0)) {
        return true;
      };
      var newValue = parseInt($item.val()) + half;
      $item.val(newValue);
      $item.trigger('change');
    });
  }
});
