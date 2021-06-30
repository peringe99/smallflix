const db = require("../../models");

const User = db.user;

module.exports.allUserInRole = async (req, res) => {
  const users = await User.aggregate([
    {
      $lookup: {
        from: "roles",
        localField: "roles",
        foreignField: "_id",
        as: "roles",
      },
    },
    {
      $unwind: "$roles",
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        password: 1,
        "roles.name": 1,
      },
    },
  ]);

  res.json({ users });
};
module.exports.allUserInRole2 = async (req, res) => {
  const users = await User.find().populate("roles");

  res.json({ users });
};

module.exports.updateRole = async (req, res) => {
  const { userId, roleId } = req.body;
  console.log(userId, roleId);
  const user = await User.findByIdAndUpdate(
    userId,
    { roles: roleId },
    { new: true, useFindAndModify: false }
  );

  res.status(200).json({ user });
};
module.exports.updatePassword = async (req, res) => {
  const { userId, password } = req.body;
  console.log(userId, password);
  const query = { _id: userId };
  const user = await User.findById(userId, function (err, doc) {
    doc.password = password;
    doc.save();
  });

  res.status(200).json({ user });
};
