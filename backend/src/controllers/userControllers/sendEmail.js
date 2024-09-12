import nodemailer from 'nodemailer';

const sendMailController = async (req, res) => {
    try {
        const senderDetails = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.PASSWORD
            }
        });

        const { fullName, to, subject, message } = req.body;

        const styledHtml = `
            <html>
            <head>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f0f0f0;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }
                    .header {
                        background-color: #333333;
                        color: #ffffff;
                        text-align: center;
                        padding: 10px;
                        border-radius: 8px 8px 0 0;
                    }
                    .content {
                        padding: 20px;
                        color: #333333;
                    }
                    h1 {
                        margin: 0;
                        padding: 10px 0;
                        font-size: 24px;
                    }
                    p {
                        margin: 0;
                        line-height: 1.6;
                    }
                    .footer {
                        background-color: #333333;
                        color: #ffffff;
                        text-align: center;
                        padding: 10px;
                        border-radius: 0 0 8px 8px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Men's Fashion Store</h1>
                    </div>
                    <div class="content">
                        <p>Thank you for your valuable message dear ${fullName},</p>
                        <p>${message}</p>
                    </div>
                    <div class="footer">
                        <p>&copy; ${new Date().getFullYear()} Men's Fashion Store. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const mailOptions = {
            from: process.env.EMAIL,
            to,
            subject,
            html: styledHtml,
        };

        senderDetails.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: error.toString() });
            }
            res.status(200).json({ message: "Email sent successfully",success:true,error:false, info: info.response });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.toString() });
    }
};

export default sendMailController;
