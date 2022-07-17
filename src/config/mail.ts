/** @format */

const mailConfig = () => ({
  key: process.env.MAIL_KEY,
  templateId: process.env.MAIL_TEMPLATEID,
  recoverUrl: (token: string) => process.env.MAIL_RECOVER_URL + token,
  sender: {
    name: process.env.MAIL_SENDER_NAME,
    email: process.env.MAIL_SENDER_EMAIL,
  },
  jwtRecover: {
    secret: process.env.MAIL_JWT_KEY,
    expiresIn: process.env.MAIL_JWT_EXP,
  },
});

export default mailConfig;
