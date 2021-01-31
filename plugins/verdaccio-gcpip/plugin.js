/**
 * Custom Verdaccio Authenticate Plugin.
 */


class AuthCustomPlugin {
  constructor(config, options) {
    return this;
  }
  /**
   * Authenticate an user.
   * @param user user to log
   * @param password provided password
   * @param callback callback function
   */

  authenticate(user, password, callback) {
    // here your code
    const fetch = require('node-fetch');
    const body = {
      "email": `${user}@nodeaccio.okonetwork.org.uk`,
      "password": password,
      "returnSecureToken":true,
      // @todo use an environment variable for the tenant id
      tenantId: "nodeaccio-2a0dl"
    }
    // @todo use an environment variable for the api key
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDg0w7HfNdFbjeO9FoSrtIVTNigyD2wir8', {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json())
    .then(function(json) {
      console.log(json);
      if (json.idToken) {
        console.log("Successfully authenticated");
        const groups = ["tenantAuthenticated"];
        callback(null, groups);
      } else {
        console.log("Failed authenticating");
        callback(null, false);
      }
    });
  }

  /**
   * check grants for such user.
   */
  allow_access(user,pkg,callback) {
    console.log(`Verifying user: ${JSON.stringify(user)} for package access`);
    const isAllowed = true;
    callback(null, isAllowed);
  }

  /**
   * check grants to publish
   */
  allow_publish(user,pkg,callback) {
    console.log(`Verifying user: ${JSON.stringify(user)} for package publish`);
    const isAllowed = true;
    callback(null, isAllowed);
  }
}

module.exports = (config, options) => {
  return new AuthCustomPlugin(config, options);
};
