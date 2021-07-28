const express = require("express");
const stripe = require("stripe");
const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const stripeInstance = stripe(process.env.API_KEY);
    const { code } = req.query;
    const responseFromStripe = await stripeInstance.oauth.token({
      grant_type: "authorization_code",
      code,
    });
    const connectedAccountId = responseFromStripe.stripe_user_id;
    const products = await stripeInstance.products.list(
      {
        limit: 3,
      },
      {
        stripeAccount: connectedAccountId,
      }
    );

    const productsData = products?.data.map((product) => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        imagesSrc: product.images,
      };
    });
    res.render("redirected", {
      title: "Redirected Page",
      connectedAccountId,
      productsData,
    });
    return;
  } catch (err) {
    console.log("error is: ", err);
    // res.redirect("/");
  }
  res.render("redirected", {
    title: "Redirected Page",
    connectedAccountId: "Connected account id unavailable",
  });
});

module.exports = router;
