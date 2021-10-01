// Đối tượng
function Validator(options) {
  var formElement = document.querySelector(options.form);

  if (formElement){
      options.rule.forEach(function(rule){
          console.log(rule)
      })        
  }
}

// Định nghĩa rules
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test = function()
  };
};
Validator.isEmail = function (selector) {};
