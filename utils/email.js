const nodemailer = require("nodemailer");
const { MailtrapClient } = require("mailtrap");

const TOKEN = "fc87f831cd462e7fbce061cb75532dab";
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({
  endpoint: process.env.MAIL_SERVICE_ENDPOINT,
  token: process.env.MAIL_SERVICE_TOKEN,
});

exports.sendActivationEmail = async (to, url) => {
  try {
    // console.log("===============================================");
    const sender = {
      email: "mailtrap@doodlers.art",
      name: "Email Activation",
    };

    client
      .send({
        from: sender,
        to: [
          {
            email: to,
          },
        ],
        subject: "Email Activation",
        text: "Please activate your email",
        category: "Email Activation",
        html: `
              <div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; font-family: Arial, Helvetica, sans-serif;">
                <h2 style="text-align: center; text-transform: uppercase; color: teal;">Account Activation</h2>
                <p>You're almost set to start using our service. Just click the button below to validate your email address.</p>
                <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Verify your Email Address</a>
                <p>If the button doesn't work for any reason, you can also click on the link below:</p>
                <div>${url}</div>
              </div>
            `,
      })
      .then(console.log, console.error);
    // var transport = nodemailer.createTransport({
    //   host: process.env.MAIL_SERVICE_HOST,
    //   port: process.env.MAIL_SERVICE_PORT,
    //   auth: {
    //     user: process.env.MAIL_SERVICE_ID,
    //     pass: process.env.MAIL_SERVICE_PASSWORD,
    //   },
    // });

    // transport.verify(function (error, success) {
    //   if (error) {
    //     console.log("+++++++++++++++++++++++error", error);
    //   } else {
    //     console.log("Server is ready to take our messages");

    //     const mailOptions = {
    //       from: process.env.MAIL_SERVICE_EMAIL,
    //       to,
    //       subject: "Email Activation",
    //       text: "Please activate your email",
    //       html: `
    //         <div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; font-family: Arial, Helvetica, sans-serif;">
    //           <h2 style="text-align: center; text-transform: uppercase; color: teal;">Account Activation</h2>
    //           <p>You're almost set to start using our service. Just click the button below to validate your email address.</p>
    //           <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Verify your Email Address</a>
    //           <p>If the button doesn't work for any reason, you can also click on the link below:</p>
    //           <div>${url}</div>
    //         </div>
    //       `,
    //     };

    //     transport.sendMail(mailOptions).then((resp) => {
    //       return Promise.resolve(resp);
    //     });
    //   }
    // });
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.sendResetPasswordEmail = async (to, url) => {
  try {
    const sender = {
      email: "mailtrap@doodlers.art",
      name: "Reset Password",
    };

    client
      .send({
        from: sender,
        to: [
          {
            email: to,
          },
        ],
        subject: "Reset Password",
        text: "Please reset your password",
        html: `
        <div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; font-family: Arial, Helvetica, sans-serif;">
          <h2 style="text-align: center; text-transform: uppercase; color: teal;">Password reset</h2>
          <p>Forgotten your password? Don't worry!! Just click the button below to reset your password.</p>
          <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Reset password</a>
          <p>If the button doesn't work for any reason, you can also click on the link below:</p>
          <div>${url}</div>
        </div>
      `,
      })
      .then(console.log, console.error);
    // const transport = nodemailer.createTransport({
    //   host: process.env.MAIL_SERVICE_HOST,
    //   port: process.env.MAIL_SERVICE_PORT,
    //   auth: {
    //     user: process.env.MAIL_SERVICE_ID,
    //     pass: process.env.MAIL_SERVICE_PASSWORD,
    //   },
    // });

    // const mailOptions = {
    //   from: process.env.MAIL_SERVICE_EMAIL,
    //   to,
    //   subject: "Reset Password",
    //   text: "Please reset your password",
    //   html: `
    //     <div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; font-family: Arial, Helvetica, sans-serif;">
    //       <h2 style="text-align: center; text-transform: uppercase; color: teal;">Password reset</h2>
    //       <p>Forgotten your password? Don't worry!! Just click the button below to reset your password.</p>
    //       <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Reset password</a>
    //       <p>If the button doesn't work for any reason, you can also click on the link below:</p>
    //       <div>${url}</div>
    //     </div>
    //   `,
    // };

    // const resp = await transport.sendMail(mailOptions);
    // return Promise.resolve(resp);
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.sendGenImgEmail = async (to, url) => {
  try {
    const sender = {
      email: "mailtrap@doodlers.art",
      name: "Image Generation",
    };

    client
      .send({
        from: sender,
        to: [
          {
            email: to,
          },
        ],
        subject: "Image Generation",
        text: "Please send request to generate your image.",
        html: `
            <div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; font-family: Arial, Helvetica, sans-serif;">
              <h2 style="text-align: center; text-transform: uppercase; color: teal;">Image Generation</h2>
              <p>You're ready to start generating image. Just click the button below to send request image-generation.</p>
              <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Generate Image</a>
              <p>If the button doesn't work for any reason, you can also click on the link below:</p>
              <div>${url}</div>
            </div>
          `,
      })
      .then(console.log, console.error);
    // var transport = nodemailer.createTransport({
    //   host: process.env.MAIL_SERVICE_HOST,
    //   port: process.env.MAIL_SERVICE_PORT,
    //   auth: {
    //     user: process.env.MAIL_SERVICE_ID,
    //     pass: process.env.MAIL_SERVICE_PASSWORD,
    //   },
    // });

    // transport.verify(function (error, success) {
    //   if (error) {
    //     console.log("error", error);
    //   } else {
    //     console.log("Server is ready to take our messages");
    //   }
    // });

    // const mailOptions = {
    //   from: process.env.MAIL_SERVICE_EMAIL,
    //   to,
    //   subject: "Image Generation",
    //   text: "Please send request to generate your image.",
    //   html: `
    //     <div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; font-family: Arial, Helvetica, sans-serif;">
    //       <h2 style="text-align: center; text-transform: uppercase; color: teal;">Image Generation</h2>
    //       <p>You're ready to start generating image. Just click the button below to send request image-generation.</p>
    //       <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Generate Image</a>
    //       <p>If the button doesn't work for any reason, you can also click on the link below:</p>
    //       <div>${url}</div>
    //     </div>
    //   `,
    // };

    // const resp = await transport.sendMail(mailOptions);
    // return Promise.resolve(resp);
  } catch (err) {
    return Promise.reject(err);
  }
};
