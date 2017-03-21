(function(d) {
  var config = {
    kitId: 'rrj1ryd',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);
  
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