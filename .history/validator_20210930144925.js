// Đối tượng
function Validator(options) {
  var formElement = document.querySelector(options.form);

  if (formElement){}
}

// Định nghĩa rules
Validator.isRequired = function (selector) {
  return {
    selector,
   test: function(),
  };
};
Validator.isEmail = function (selector) {};
