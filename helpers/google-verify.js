const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

async function googleVerify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();

  return payload;
}

module.exports = {
  googleVerify,
};
