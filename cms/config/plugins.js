module.exports = ({ env }) => ({
  upload: {
    provider: "sftp-v2",
    providerOptions: {
      host: env("SFTP_IMAGE_UPLOAD_HOST", process.env.SFTP_IMAGE_UPLOAD_HOST),
      port: env("SFTP_IMAGE_UPLOAD_PORT", process.env.SFTP_IMAGE_UPLOAD_PORT),
      user: env("SFTP_IMAGE_UPLOAD_USER", process.env.SFTP_IMAGE_UPLOAD_USER),
      password: env(
        "SFTP_IMAGE_UPLOAD_PASSWORD",
        process.env.SFTP_IMAGE_UPLOAD_PASSWORD
      ),
      basePath: env(
        "SFTP_IMAGE_UPLOAD_PATH",
        process.env.SFTP_IMAGE_UPLOAD_PATH
      ),
      baseUrl: env("SFTP_IMAGE_UPLOAD_URL", process.env.SFTP_IMAGE_UPLOAD_URL),
    },
  },
});
