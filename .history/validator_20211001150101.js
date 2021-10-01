// Đối tượng
function Validator(options) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }
  var selectorRules = {};
  // Validate
  function validate(inputElement, rule) {
    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(
      options.errorSelector
    );
    var errorMessage;
    // Danh sách các rules
    var rules = selectorRules[rule.selector];

    // Xử lí từng rule từ trên xuống
    for (var i = 0; i < rules.length; ++i) {
      switch (inputElement.type) {
        case "radio":
        case "checkbox":
        default:
      }

      errorMessage = rules[i](inputElement.value);
      if (errorMessage) break;
    }

    // Nếu có lỗi thì thực hiện
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      getParent(inputElement, options.formGroupSelector).classList.add("invalid");
    } else {
      errorElement.innerText = "";
      getParent(inputElement, options.formGroupSelector).classList.remove("invalid");
    }

    return !errorMessage;
  }

  //  Lấy element cho việc validate
  var formElement = document.querySelector(options.form);

  if (formElement) {
    formElement.onsubmit = function (e) {
      e.preventDefault();

      var isFormValid = true;

      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        var isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        if (typeof options.onSubmit === "function") {
          var enableInputs = formElement.querySelectorAll("[name]");
          var formValues = Array.from(enableInputs).reduce(function (values, input) {
            values[input.name] = input.value;
            return values;
          }, {});

          options.onSubmit(formValues);
        }
      }
    };
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
          var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(
            options.errorSelector
          );
          errorElement.innerText = "";
          getParent(inputElement, options.formGroupSelector).classList.remove("invalid");
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
