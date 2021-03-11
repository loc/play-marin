module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("CMS_ADMIN_JWT_SECRET", "8d42ed3610e207911474b4a3d2ba0b70"),
    },
  },
});
