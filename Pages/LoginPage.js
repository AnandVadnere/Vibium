// Pages/LoginPage.js
 const { clickElement } = require('../Helpers/eleClick');
 const { typeInElement } = require('../Helpers/eleTypeIn');

const selectors = {
  signInButton: [
    ['button', { text: 'Sign In' }],
    "'button', { text: 'Sign In' }"
  ],
  emailInput: [
    "#login-username", 
    "input[name=\"email\"]", 
    "input[type=\"email\"]"
  ],
  passwordInput: [
    "#login-password", 
    "input[name=\"password\"]"
  ],
  submitButton: [
    "button[type=\"submit\"]", 
    "button[aria-label=\"submit\"]"
  ]
};
/**
 * @param {object} vibe - vibium browserSync instance
 */
function clickOnSignIn(vibe){
  clickElement(vibe, selectors.signInButton, 
    { attempts: 5, 
      delay: 500, 
      takeScreenshot: true, 
      screenshotName: 'SignInClickError.png',
      assertVisible:true });
}

function typeInEmail(vibe){
  typeInElement(vibe, selectors.emailInput, email, {
    attempts: 1,
    delay: 800,
    clearFirst: true
  });
}

function typeInPassword(vibe){
  typeInElement(vibe, selectors.passwordInput, password, {
    attempts: 1,
    delay: 800,
    clearFirst: true
  });
}

function clickOnSubmit(vibe){
  clickElement(vibe, selectors.submitButton, 
    { attempts: 5,
      delay: 500,
      takeScreenshot: true,
      screenshotName: 'SubmitClickError.png',
      assertVisible:true });
}

module.exports = { clickOnSignIn, typeInEmail, typeInPassword,clickOnSubmit };