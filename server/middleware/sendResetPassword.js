const nodemailer = require("nodemailer");
const {google} = require("googleapis")

const sendResetPassword = async (user, email, url) => {
  try {
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
    
    
    const accessToken = await oauth2Client.getAccessToken();
    

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

    await transporter.sendMail({
      from: `"Personal Debt Tracking" <softwarebkm@gmail.com>`,
      to: email,
      subject: "Reset Password",
      text: url,
      html: `<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Title</title>

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
            border:2px solid #f3f4f6;
            border-radius: 14px;
        }

        .navbar {
            padding: 10px;
            background: linear-gradient(to right, #10b981, #2563eb);
            opacity: 0.9;
            color: #f3f4f6;
            /*border-radius: 5px;*/
            /*box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);*/
            text-align: center;
        }

        .container {
            margin-top: 10px;
            padding: 25px;
            /*border-radius: 8px;*/
            background: linear-gradient(to right, #10b981, #2563eb);
            display: block;
            flex-direction: column;
            /*align-items: center;*/
            gap: 0.5rem;
        }

        .container h1 {
            color: white;
        }

        .information {
            font-weight: 500;
            letter-spacing: 0.02rem;
            color: #d4d4d8;
            /*text-align: center;*/
        }

        .text {
            font-weight: 550;
            color: #e2e8f0;
            font-size: 0.9rem;
            /*text-align: center;*/
        }

        .container .link {
            text-decoration: none;
            padding: 10px 20px;
            border: 1px solid #d4d4d8;
            text-align: center;
            max-width: 35%;
            width: fit-content;
            border-radius: 8px;
            box-shadow: 2px 2px 0 0 #059669;
            color: #e2e8f0;
            font-weight: bold;
        }

        .container .link:hover {
            color: #f3f4f6;
            border: 2px solid #f4f4f5;
        }

        footer {
            margin-top: 10px;
            padding: 10px 20px;
            background: linear-gradient(to right, #10b981, #2563eb);
            opacity: 1.4;
            color: #f3f4f6;
            /*border-radius: 5px;*/
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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

        @media only screen and (max-width: 600px) {
            .navbar h1 {
                font-size: 1.2rem;
            }
            .container h1 {
                font-size: 1rem;
            }
            .text {
                font-size: 0.6rem;
            }
            footer h4 {
                text-align: center;
            }
            .contact .email,
            .address {
                font-size: 0.7rem;
            }
            .copyright {
                font-size: 0.6rem;
            }
        }
            footer h4 {
                text-align: center;
            }
            .contact .email,
            .address {
                font-size: 0.7rem;
            }

            .copyright {
                font-size: 0.6rem;
            }
        
    </style>
</head>
<body>
<div class="navbar">
    <h1>Personal Debt Tracking</h1>
</div>

<div class="container">
    <h1>Welcome ${user.username}</h1>
    <p class="information">
        It looks like someone submitted a request to reset your Auth-OTP-JWT
        password. There's nothing to do or worry about if it wasn't you. Don't
        click button.
    </p>
    <p class="text">You've requested a password reset.!</p>
    <a href=${url} class="link">Password Reset</a>
</div>

<footer>
    <h4>Personal Debt Tracking</h4>
    <div class="contact">
        <p class="email">Email: softwarebkm@gmail.com</p>
        <p class="address">
            Contact: BKM Grup Consultancy Communication and Sales Trade Inc.
            BeyLikdüzü / İstanbul
        </p>
    </div>

    <p class="copyright">© 2024 SoftwareBKM</p>
</footer>
</body>
</html>`,
    });

    console.log("your reset password", url);
  } catch (error) {
    console.log("email no t sent error", error);
  }
};

module.exports = sendResetPassword;
