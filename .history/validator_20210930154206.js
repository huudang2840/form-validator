// Đối tượng
function Validator(options) {
  // Validate
  function validate(inputElement, rule) {
    var errorMessage = rule.test(inputElement.value);
    var errorElement =
      inputElement.parentElement.querySelector(".form-message");

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  }

  //   Onblur
  var formElement = document.querySelector(options.form);

  if (formElement) {
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        inputElement.onblur = function () {
          validate(inputElement, rule);
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
    test: function () {
        var regex =
    },
  };
};
