import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text, name) => {
  try {
    const htmlContent = `
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: white;
        padding: 20px;
        margin: 0;
        font-family: "Poppins";
      }
      .header {
        margin-bottom: 30px;
        background-color: #3b4144;
        padding: 10px;
      }
      .title {
        color: white;
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 5;
        font-family: High Tower Text;
      }
      .subtitle {
        display: none;
        font-weight: 600;
      }
      .container {
        padding-left: 10px;
      }
      .name {
        font-size: 16px;
        margin-bottom: 10px;
        font-weight: 600;
      }
      .forgot {
        font-size: 14px;
      }
      .recieved {
        font-size: 14px;
        margin-bottom: 30px;
      }
      .reset {
        font-size: 14px;
      }
      .text {
        font-size: 14px;
        color: #0781f5;
         margin-bottom: 20px;
      }
      .textTwo {
        font-size: 14px;
      }
    </style>
  </head>

  <body>
    <div class="header">
      <h1 class="title">Kwita</h1>
    </div>

    <p class="name">Hi ${name}</p>
    <p class="forgot">Forgot your password?</p>
    <p class="recieved">
      We recieved a request to reset the password for your account.
    </p>
    <p class="reset">To reset your password, click below link.</p>
    <p class="text">${text}</p>
    <p class="textTwo">If you did not forget your password, please disregard this email.</p>
  </body>
</html>
`;

    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: htmlContent,
      // text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};
