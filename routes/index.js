const express = require("express");
const router = express.Router();

const { getOauthUrl } = require("../utils/getOauthUrl");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Home Page",
    oauthUrl: getOauthUrl(),
  });
});

module.exports = router;
