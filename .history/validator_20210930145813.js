// Đối tượng
function Validator(options) {
  var formElement = document.querySelector(options.form);

  if (formElement) {
    options.rules.forEach(function (rule) {
      var inputElemet = formElement.querySelector(rule.selector);
      console.log(inputElemet);
    });
  }
}

// Định nghĩa rules
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function () {},
  };
};
Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function () {},
  };
};
