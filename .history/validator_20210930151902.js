// Đối tượng
function Validator(options) {
  var formElement = document.querySelector(options.form);

  if (formElement) {
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);
      var errorElement =
        inputElement.parentElement.querySelector(".form-message");

      if (inputElement) {
        inputElement.onblur = function () {
          var errorMessage = rule.test(inputElement.value);

          console.log(inputElement.parentElement);
        };
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
    test: function (value) {
      return value.trim() ? undefined : "Vui lòng nhập trường này";
    },
  };
};
Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function () {},
  };
};
