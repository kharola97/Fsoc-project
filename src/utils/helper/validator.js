const isValidateEmail = (email)=> {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };
  const passwordVal = (password)=> {
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}$"
    );
    /*at least 1 lowercase, at least 1 uppercase,contain at least1 numeric character,
      at least one special character, range between 8-12*/
    return strongRegex.test(password);
  };
  const isValidName = (name) =>{
    const nameRegex = /^[a-zA-Z_ ]+$/;
    return nameRegex.test(name);
  };

  const isValidTime = (time)=>{
    const timeRegex = /^\d+$/
    return timeRegex.test(time)
  }
  
  const isValidNo = (number)=> {
    
    const validnumber = /^[6-9]\d{9}$/;
    return validnumber.test(number);
  };
  
  const isValidString = (input)=> {
    if (typeof input == "number" || input == null || input == undefined) {
      return false;
    }
    if (typeof input == "string" && input.trim().length == 0) {
      return false;
    }
  
    return true;
  };
const isValidData = (input)=>{
  const validData = /^[\w\s.,!?"'-]+$/
  return validData.test(input)
}
  const isValidRating = (number) =>{
    const validnumber = /^[0-5]$/;
    return validnumber.test(number);
  };
  
  
  module.exports = {
    isValidateEmail,
    passwordVal,
    isValidName,
    isValidNo,
    isValidString,
    isValidRating,
    isValidData,
    isValidTime
  };