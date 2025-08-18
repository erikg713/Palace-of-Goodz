import { verifyPiAuth } from "../utils/piAuth.js";
import User from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { pi_signed_message } = req.body;
    const authData = await verifyPiAuth(pi_signed_message);

    let user = await User.findOne({ username: authData.username });
    if (!user) {
      user = await User.create({
        username: authData.username,
        uid: authData.uid,
        roles: authData.roles
      });
    }

    return res.json({ success: true, user });
  } catch (err) {
    return res.status(401).json({ success: false, error: err.message });
  }
};
