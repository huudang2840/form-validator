// Đối tượng
function Validator(options) {
  var formElement = document.querySelector(options.form);

  if (formElement) {
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        inputElement.onblur = function () {};
      }
    });
  }
}

// Định nghĩa rules
// Nguyên tắc rule
// 1. Khi có lỗi => trả ra message lỗi
//2. Hợp lệ => Không trả ra gì undefine
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {},
  };
};
Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function () {},
  };
};
