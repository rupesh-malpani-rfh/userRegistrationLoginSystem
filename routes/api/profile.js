const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const Profile = require("../../Model/Profile");
const User = require("../../Model/User");

// @route    GET api/profile/me
// @desc     Get current user profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const userProfile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", [
      "userName",
      "email",
      "firstName",
      "lastName",
      "gender",
      "country",
    ]);

    if (!userProfile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(userProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
  // res.send("Profile Page");
});

module.exports = router;
