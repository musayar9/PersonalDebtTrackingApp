const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const verifyAccountMail = async (user, email, code) => {
  try {
    // OAuth2 istemcisi oluştur
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID, // Google Client ID
      process.env.CLIENT_SECRET, // Google Client Secret
      "https://developers.google.com/oauthplayground" // Geri dönüş URL'si
    );

    // OAuth2 Refresh Token'ı ayarlama
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    // Access Token oluşturma
    const accessToken = await oauth2Client.getAccessToken();

    // Nodemailer transporter'ı oluştur
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.NODE_EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refresh_token: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token, // Access Token'ı al
      },
    });

    // E-posta gönderme
    await transporter.sendMail({
      from: `"Personal Debt Tracking" <softwarebkm@gmail.com>`, // Doğru e-posta adresini kullan
      to: email,
      subject: "Verify Account",
      text: `Your account verification code is: ${code}`,
      html: `<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Account Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #d4d4d4;
            height: 100vh;
            margin: auto;
            max-width: 64rem;
            padding: 20px;
            font-size: 16px;
        }
        .navbar, .container, footer {
            width: 100%;
            max-width: 64rem;
            box-sizing: border-box;
            border: 2px solid #f3f4f6;
            border-radius: 14px;
        }
        .navbar {
            padding: 10px;
            background: linear-gradient(to right, #10b981, #2563eb);
            opacity: 0.9;
            color: #f3f4f6;
            text-align: center;
        }
        .container {
            margin-top: 10px;
            padding: 25px;
            background: linear-gradient(to right, #10b981, #2563eb);
            display: block;
            flex-direction: column;
            gap: 0.5rem;
        }
        .container h1 {
            color: white;
        }
        .text {
            font-weight: 550;
            color: #e2e8f0;
            font-size: 0.9rem;
        }
        .code {
            padding: 10px 20px;
            border: 2px solid #f3f4f6;
            letter-spacing: 0.5em;
            text-align: center;
            max-width: 35%;
            width: fit-content;
            border-radius: 8px;
            box-shadow: 2px 2px 0 0 #059669;
            color: #fff;
            font-weight: bold;
        }
        footer {
            margin-top: 10px;
            padding: 10px 20px;
            background: linear-gradient(to right, #10b981, #2563eb);
            opacity: 1.4;
            color: #f3f4f6;
            text-align: center;
        }
        .contact .email,
        .address {
            font-size: 12px;
            color: #f3f4f6;
        }
        .copyright {
            text-align: center;
            font-size: 10px;
        }
    </style>
</head>
<body>
<div class="navbar">
    <h1>Personal Debt Tracking</h1>
</div>
<div class="container">
    <h1>Welcome ${user.username}</h1>
    <p class="text">You can verify your account using the code below!</p>
    <p class="code">${code}</p>
</div>
<footer>
    <h4>Personal Debt Tracking</h4>
    <div class="contact">
        <p class="email">Email: softwarebkm@outlook.com</p>
        <p class="address">Contact: BKM Grup Consultancy Communication and Sales Trade Inc. Beylikdüzü / İstanbul</p>
    </div>
    <p class="copyright">© 2024 SoftwareBKM</p>
</footer>
</body>
</html>`,
    });

    console.log("Your account verification code has been sent to the email.");
  } catch (error) {
    console.log("Email not sent. Error:", error);
  }
};

module.exports = verifyAccountMail;
