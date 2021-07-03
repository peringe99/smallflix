const fs = require("fs");
const path = require("path");
const db = require("../models");

const Role = db.role;
const User = db.user;
const CategoryModel = db.categoryModel;
const Movies = db.Movies;

async function initial() {
  await Role.estimatedDocumentCount(async (err, count) => {
    if (!err && count === 0) {
      await Role.create({
        name: "user",
      })
        .then((role) => {
          console.log(`added ${role} to roles collection`);
        })
        .catch((err) => {
          console.log(err);
        });
      await Role.create({
        name: "admin",
      })
        .then((role) => {
          console.log(`added ${role} to roles collection`);
        })
        .catch((err) => {
          console.log(err);
        });
      await Role.create({
        name: "superadmin",
      })
        .then((role) => {
          console.log(`added ${role} to roles collection`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  await User.estimatedDocumentCount(async (err, count) => {
    if (!err && count === 0) {
      const roleName = await Role.findOne({ name: "user" });
      await User.create({
        name: "user",
        email: "user@gmail.com",
        password: 123456,
      })
        .then((user) => {
          Role.findOne({ name: "user" }, (err, role) => {
            if (err) {
              console.log(err);
              return;
            }
            user.roles = [role._id];
            user.save((err) => {
              if (err) {
                console.log(err);
                return;
              }
            });
          });
          console.log(`added ${user.name} to Users collection`);
        })
        .catch((err) => console.log(err));

      const roleAdmin = await Role.findOne({ name: "admin" });
      await User.create({
        name: "admin",
        email: "admin@gmail.com",
        password: 123456,
      })
        .then((user) => {
          Role.findOne({ name: "admin" }, (err, role) => {
            if (err) {
              console.log(err);
              return;
            }
            user.roles = [role._id];
            user.save((err) => {
              if (err) {
                console.log(err);
                return;
              }
            });
          });
          console.log(`added ${user.name} to Users collection`);
        })
        .catch((err) => console.log(err));
      const roleSuperadmin = await Role.findOne({ name: "superadmin" });
      await User.create({
        name: "superadmin",
        email: "superadmin@gmail.com",
        password: 123456,
      })
        .then((user) => {
          Role.findOne({ name: "superadmin" }, (err, role) => {
            if (err) {
              console.log(err);
              return;
            }
            user.roles = [role._id];
            user.save((err) => {
              if (err) {
                console.log(err);
                return;
              }
            });
          });
          console.log(`added ${user.name} to Users collection`);
        })
        .catch((err) => console.log(err));
    }
  });

  const dirPath = path.resolve(__dirname, "../data/");
  const files = fs.readdirSync(dirPath);
  // Seed Category data first then send Resolve Promise to seed Movies data
  const promise = new Promise(async (resolve, reject) => {
    await CategoryModel.estimatedDocumentCount(async (err, count) => {
      for (const df of files) {
        const keyName = df.split(".").slice(0, -1).toString();
        if (!err && count === 0) {
          await CategoryModel.create({
            cat_type: keyName,
          })
            .then((keyName) => {
              console.log(`added ${keyName.cat_type} to Category collection`);
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        }
      }
    });
    setTimeout(() => {
      resolve();
    }, 2000);
  });

  promise
    .then(async (err) => {
      await Movies.estimatedDocumentCount((err, count) => {
        for (const df of files) {
          const keyName = df.split(".").slice(0, -1).toString();

          if (!err && count === 0) {
            fs.readFile(`./data/${df}`, "utf8", function (err, data) {
              if (err) {
                console.log(err);
              }
              const result = JSON.parse(data);

              for (const items of result) {
                const newMovies = new Movies();

                for (const [key, value] of Object.entries(items)) {
                  // console.log(`${key} => : ${value}`);
                  newMovies[key] = value;
                }

                newMovies.save(async (err, cat) => {
                  if (err) {
                    console.log(err);
                  }

                  await CategoryModel.findOne(
                    { cat_type: keyName },
                    (err, cat_result) => {
                      if (err) {
                        console.log(err);
                        return;
                      }
                      cat.category = cat_result._id;
                      cat.save((err) => {
                        if (err) {
                          console.log(err);
                          return;
                        }
                      });
                    }
                  );
                });
              }
              console.log(`Added successfully ${keyName}`);
            });
          }
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = initial;
