// Đối tượng
function Validator(options) {
  var selectorRules = {};
  // Validate
  function validate(inputElement, rule) {
    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
    // Danh sách các rules
    var rules = selectorRules[rule.selector];

    // Xử lí từng rule từ trên xuống
    for (var i = 0; i < rules.length; ++i) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) break;
    }

    // Nếu có lỗi thì thực hiện
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  }

  //  Lấy element cho việc validate
  var formElement = document.querySelector(options.form);

  if (formElement) {
    formElement.onsubmit = function (e) {};
    // Lắng nghe các sự kiện trong rules để xử lý(blur, input)
    options.rules.forEach(function (rule) {
      //Lưu lại các rule cho mỗi input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }
      //   selectorRule[rule.selector] = rule.test;

      var inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        //   Xử lý khi blur
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };

        //   Xử lý khi khi đang nhập input
        inputElement.oninput = function () {
          var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
        };
      }
    });
  }
}

// Định nghĩa rules
// Nguyên tắc rule
// 1. Khi có lỗi => trả ra message lỗi
//2. Hợp lệ => Không trả ra gì undefine
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : message || "Vui lòng nhập trường này";
    },
  };
};
Validator.isEmail = function (selector, message) {
  return {
    selector: selector,

    test: function (value) {
      var regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(value) ? undefined : message || "Trường này phải là email";
    },
  };
};

Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    min: min,
    test: function (value) {
      return value.length >= min ? undefined : message || `Mật khẩu phải có tối thiểu ${min} kí tự`;
    },
  };
};

Validator.isConfirmed = function (selector, getConfirmedValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmedValue()
        ? undefined
        : message || "Mật khẩu không khớp vui lòng nhập lại";
    },
  };
};
