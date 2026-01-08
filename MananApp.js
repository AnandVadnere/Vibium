const fs = require('fs');
const { clickElement } = require('./Helpers/eleClick');
const assert = require('assert');
const { browserSync } = require('vibium');
require('dotenv').config(); 
const { clickOnSignIn } = require('./Pages/LoginPage');
const { typeInElement } = require('./Helpers/eleTypeIn');

const vibe = browserSync.launch();

function sleep(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) { }
}

// Read credentials from .env
const email = process.env.MANAN_EMAIL;
const password = process.env.MANAN_PASSWORD;
assert.ok(email, 'MANAN_EMAIL must be set in .env');
assert.ok(password, 'MANAN_PASSWORD must be set in .env');

// ----------------- Launch Manan App -----------------
vibe.go(process.env.URL);
console.log("Loaded Manan's website!");

// ----------------- Login -----------------
clickOnSignIn(vibe);
// const signInButton = vibe.find('button', { text: 'Sign In' });
// clickElement(vibe, signInButton, 
//   { attempts: 5, 
//     delay: 2000, 
//     takeScreenshot: true, 
//     screenshotPath: 'SignInClickError.png',
//     assertVisible:true });

typeInEmail(vibe);
// const emailInput = vibe.find('#login-username');
// typeInElement(vibe, emailInput, email, {
//   attempts: 4,
//   delay: 800,
//   findOptions: undefined, // or { some: 'option' } if needed
//   clearFirst: true
// });

typeInPassword(vibe);
// const passwordInput = vibe.find('#login-password');
// typeInElement(vibe, passwordInput, password, {
//   attempts: 4,
//   delay: 800,
//   findOptions: undefined, // or { some: 'option' } if needed
//   clearFirst: true
// });

clickOnSubmit(vibe);
// const submitButton = vibe.find('button[type="submit"]');
// clickElement(vibe, submitButton, 
//   { attempts: 5, 
//     delay: 500, 
//     takeScreenshot: true, 
//     screenshotPath: 'SubmitClickError.png',
//     assertVisible:true });

sleep(1000); // wait for login
saveScreenshot(vibe, 'AfterLogin.png');
// fs.writeFileSync('SignedIn.png', vibe.screenshot());
// console.log('Saved SignedIn.png');

// ----------------- Navigate to Dashboard -----------------
const dashboardButton = vibe.find('button', { text: 'Dashboard' });
clickElement(vibe, dashboardButton, 
  { attempts: 5, 
    delay: 500, 
    takeScreenshot: true, 
    screenshotPath: 'DashboardClickError.png',
    assertVisible:true });

sleep(3000);
console.log('Navigated to Dashboard!');

// ----------------- Check Dashboard UI Elements -----------------
const elementsToCheck = [
  'Welcome to Your Medical',
  'Access and manage your',
  'Start New Assessment',
  'View Previous Assessments',
  'Usage Statistics',
  'Track your AI analysis usage',
  'Analysis Usage',
  'Free tier allows 20 analyses',
  'Upgrade Now',
  'Recent Assessments',
  'You have no recent',
  'Start your first assessment →',
  'Account Settings',
  'Manage your account settings',
  'Update settings →',
  'Subscription Plans',
  'Upgrade to Premium for',
  'Upgrade now',
  'Assessment History',
  'View your previous medical',
  'View history →'
];

elementsToCheck.forEach(text => {
  const ele = vibe.find('*', { text });
  assert.ok(ele, `Dashboard element must be visible: ${text}`);
  console.log(`Element visible: ${text}`);
});

// ----------------- Start New Assessment -----------------
const startNewSelector = "button.bg-purple-600.h-10.rounded-lg";
const startNew = vibe.find(startNewSelector);

if (startNew) {
  clickElement(vibe, startNew, 
    { attempts: 5, 
      delay: 500, 
      takeScreenshot: true, 
      screenshotPath: 'StartNewAssessmentClickError.png',
      assertVisible:true });
  console.log('Clicked Start New Assessment');

} else {
  console.warn('Start New Assessment button not found!');
}
sleep(2000);
fs.writeFileSync('StartNewAssessment.png', vibe.screenshot());
console.log('Saved StartNewAssessment.png');

// Go back to Dashboard
const dashboardButton2 = vibe.find('button', { text: 'Dashboard' });
clickElement(vibe, dashboardButton2, 
  { attempts: 5, 
    delay: 500, 
    takeScreenshot: true, 
    screenshotPath: 'DashboardClickError2.png',
    assertVisible:true });
dashboardButton2.click();

// ----------------- View Previous Assessments -----------------
const prevAssessSelector = "button.border.bg-background.text-purple-600.h-10";
const prevAssess = vibe.find(prevAssessSelector);

if (prevAssess) {
  clickElement(vibe, prevAssess, 
    { attempts: 5, 
      delay: 500, 
      takeScreenshot: true, 
      screenshotPath: 'ViewPreviousAssessmentsClickError.png',
      assertVisible:true });
  
} else {
  console.warn('View Previous Assessments button not found!');
}


//------------------ Back to Dashboard ----------------
const mananLogoSelector = "h1.text-2xl.font-bold.cursor-pointer";
const mananLogo = vibe.find(mananLogoSelector);

if (mananLogo) {
  clickElement(vibe, mananLogo, 
    { attempts: 5, 
      delay: 500, 
      takeScreenshot: true, 
      screenshotPath: 'MananLogoClickError.png',
     assertVisible:true });
  
} else {
  console.warn('Manan logo/title not found!');
}
const dashboardButton3 = vibe.find('button', { text: 'Dashboard' });
clickElement(vibe, dashboardButton3, 
  { attempts: 5, 
    delay: 500, 
    takeScreenshot: true, 
    screenshotPath: 'DashboardClickError3.png',
    assertVisible:true });

sleep(2000);


// ----------------- Profile Options -----------------
const profileLink = vibe.find('button', { text: 'Profile' });
clickElement(vibe, profileLink, 
  { attempts: 5, 
    delay: 500, 
    takeScreenshot: true, 
    screenshotPath: 'ProfileClickError.png',
    assertVisible:true });

const profileOptions = ['Settings', 'Previous Assessments', 'Subscription Plans', 'Log out'];
profileOptions.forEach(option => {
  const el = vibe.find('button', { text: option });
  assert.ok(el, `Profile option must be visible: ${option}`);
  console.log(`Profile option visible: ${option}`);
});

// ----------------- Logout -----------------

const logoutButton = vibe.find('div[role="menuitem"]', { containsText: 'Log out' });

if (logoutButton) {
  clickElement(vibe, logoutButton, 
    { attempts: 5, 
      delay: 500, 
      takeScreenshot: true, 
      screenshotPath: 'LogoutClickError.png',
      assertVisible:true });

  const signInAgain = vibe.find('button', { text: 'Sign In' });
  if (signInAgain) console.log('Logout confirmed');
  else console.warn('Logout failed');
} else {
  console.warn('Log out menu item not found! Make sure Profile dropdown is open.');
}

// ----------------- Final Screenshot -----------------
fs.writeFileSync('dashboard.png', vibe.screenshot());
console.log('Saved dashboard.png');
sleep(2000);
// ----------------- Close Browser -----------------
vibe.quit();
console.log('Done!');
