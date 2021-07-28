getOauthUrl = () =>
  `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=read_write`;

module.exports = {
  getOauthUrl,
};
