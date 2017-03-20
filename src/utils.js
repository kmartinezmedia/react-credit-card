function getCreditCardType(accountNumber) {

  //start without knowing the credit card type
  var result = "unknown";

  //first check for MasterCard
  // starts with 51
  if (/^5[1-5]/.test(accountNumber))
  {
    result = "mastercard";
  }

  //then check for Visa
  // starts with 4
  else if (/^4/.test(accountNumber))
  {
    result = "visa";
  }

  //then check for AmEx
  // starts with 34
  else if (/^3[47]/.test(accountNumber))
  {
    result = "amex";
  }

  return result;
};

function formatCardNumber(value) {
  // Strip all characters from the input except digits
  return value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()
}

function validateExpMonth(value) {
  const pattern = /(0[1-9]|10|11|12)/g;
  return pattern.test(value);
}

function validateExpYear(value) {
  return value >= 17;
}

export {getCreditCardType, formatCardNumber, validateExpMonth, validateExpYear};