pl.v.authenticateUser = {
  setupUiByUserStatus: function() {
    const page = window.location.pathname,
      allowedPages = [
        "/authenticateUser.html", "/signout.html", "/verifyEmail.html"
      ],
      loginMngEls = document.querySelectorAll("div#login-management > small");
    // reset (hide) all login management elements: [0]sign in/up , [1]sign out
    if (page !== "/authenticateUser.html") {
      loginMngEls[0].hidden = loginMngEls[1].hidden = true;
    }
    //evaluate user authentication status
    auth.onAuthStateChanged(async function(user) {
      // if status is 'anonymous' or 'registered'
      if (user) {
        if (user.isAnonymous) { // if user is 'anonymous'
          if (!allowedPages.includes(page)) {
            // redirect to authentication page
            window.location.pathname = "/authenticateUser.html";
          }
          loginMngEls[0].hidden = false; // show 'sign in/up'
          console.log("Authenticated as 'anonymous'");
        } else { // if status is 'registered'
          const spanEl = document.createElement("span");
          if (!user.emailVerified) {
            spanEl.textContent = `Check your email '${user.email}' for instructions to verify your account before using any operation `;
          } else {
            spanEl.textContent = `${user.email} `;
          }
          loginMngEls[1].prepend(spanEl);
          loginMngEls[1].hidden = false; // show 'sign out'
          // check this:
          // if current page is not allowed & email is verified
          if (!allowedPages.includes(page) && !user.emailVerified) { // if current page is not allowed
            alert(`Check your email ${user.email} for instructions.`);
            window.location.pathname = "/index.html";
          } else if (page === "/" || page === "/index.html") {
            // enable UI elements on home page
            const linkEls = document.querySelectorAll(".disabled");
            for (const el of linkEls) {
              el.classList.remove("disabled");
            }
            /*             document.getElementById("clearData").disabled = false;
                        const generateDataButtons =
                          document.querySelectorAll(".generateTestData");
                        for (const btn of generateDataButtons) {
                          btn.disabled = false;
                        } */
          }
          // set and event handler for 'sign out' button
          const signOutButton = loginMngEls[1].querySelector("button");
          signOutButton.addEventListener("click", pl.v.authenticateUser.handleSignOut);
          console.log(`Authenticated as 'registered with ${user.emailVerified ? '' : 'NO '}verified account' (${user.email})`);
        } // end if status is 'registered'
      } else { // if user is not 'registered' nor 'anonymous' (null)
        // sign in user as 'anonymous'
        auth.signInAnonymously();
      }
    });
  },

  setupSignInAndSignUp: function() {
    const formEl = document.forms["User"],
      btnSignIn = formEl.signin,
      btnSignUp = formEl.signup;
    // manage sign up event
    btnSignUp.addEventListener("click", pl.v.authenticateUser.handleSignUpButton);
    // manage sign in event
    btnSignIn.addEventListener("click", pl.v.authenticateUser.handleSignInButton);
    // neutralize the submit event
    formEl.addEventListener("submit", function(e) {
      e.preventDefault();
    });
  },

  handleSignUpButton: async function() {
    console.log("sign up button clicked");
    const formEl = document.forms["User"],
      email = formEl.email.value,
      password = formEl.password.value;
    if (email && password) {
      try {
        // get 'anonymous user' user data from IndexedDB
        const userRef = await auth.currentUser;
        // create credential with email and password
        const credential = firebase.auth.EmailAuthProvider.credential(email, password);
        // create a 'registered' user merging credential with 'anonymous' user data
        await userRef.linkWithCredential(credential);
        // send verification email
        await userRef.sendEmailVerification();
        console.log(`User ${email} became 'Registered'`);
        alert(`Account created ${email}.\n\nCheck your email for instructions to verify this account.`);
        window.location.pathname = "/index.html";
      } catch (e) {
        const divEl = document.getElementById("error"),
          smallEl = divEl.querySelector("small");
        smallEl.textContent = e.message;
        divEl.hidden = false;
      }
    }
  },

  handleSignInButton: async function() {
    console.log("sign in button clicked");
    const formEl = document.forms["User"],
      email = formEl.email.value,
      password = formEl.password.value;
    console.log(email, password);
    if (email && password) {
      try {
        const signIn = await auth.signInWithEmailAndPassword(email, password);
        if (signIn.user.emailVerified) {
          console.log(`Granted access to user ${email}`);
        }
        window.location.pathname = "/index.html";
      } catch (e) {
        const divEl = document.getElementById("error"),
          smallEl = divEl.querySelector("small");
        smallEl.textContent = e.message;
        divEl.hidden = false;
      }
    } else {
      console.log("no credentials were provided");
    }
  },

  handleVerifyEmail: async function() {
    const urlParams = new URLSearchParams(location.search);
    verificationCode = urlParams.get("oobCode"), // get verification code from URL
      h1El = document.querySelector("#message-title"),
      pEl = document.querySelector("#message-body"),
      linkEl = document.querySelector("#message-link");
    try { // if email can be verified
      // apply the email verification code
      await auth.applyActionCode(verificationCode);
      // if success, manipulate HTML elements: message, instructions and link
      h1El.textContent = "Your email has been verified.";
      pEl.textContent = "You can use now any operation on the DIVIMA APP.";
      let textNodeEl = document.createTextNode("« Go to DIVIMA App");
      linkEl.appendChild(textNodeEl);
      linkEl.href = "index.html";
    } catch (e) { // if email has been already verified
      // if error, manipulate HTML elements: message, instructions and link
      h1El.textContent = "Your validation link has been already used.";
      pEl.textContent = "You can now Sign In the DIVIMA App with Auth.";
      let textNodeEl = document.createTextNode("« Go to the Sign in page");
      linkEl.appendChild(textNodeEl);
      linkEl.href = "authenticateUser.html";
      console.error(e.message);
    }
  },

  handleSignOut: function() {
    try {
      auth.signOut();
      window.location.pathname = "/signout.html";
    } catch (e) {
      console.error(e.message);
    }
  },
}
