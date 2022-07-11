/** @format */

const mailConfig = () => ({
	key: process.env.MAIL_KEY,
	sender: {
		name: process.env.MAIL_SENDER_NAME,
		email: process.env.MAIL_SENDER_EMAIL,
	},
});

export default mailConfig;
