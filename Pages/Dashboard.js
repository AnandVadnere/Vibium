// // Pages/LoginPage.js
//  const { clickElement } = require('../Helpers/eleClick');
//  const { typeInElement } = require('../Helpers/eleTypeIn');

// const selectors = {
//   signInButton: [
//     "button[aria-label=\"Sign In\"]",
//   ]
// };


// /**
//  * @param {object} vibe - vibium browserSync instance
//  */
// function clickOnSignIn(vibe){
//   clickElement(vibe, selectors.signInButton, 
//     { attempts: 5, 
//       delay: 500, 
//       takeScreenshot: true, 
//       screenshotName: 'SignInClickError.png',
//       assertVisible:true });
// }

// module.exports = { clickOnSignIn};