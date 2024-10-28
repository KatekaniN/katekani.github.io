const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../smtp_secrets.sh"),
});

const crypto = require('crypto');

function generateResetToken() {
  return crypto.randomBytes(32).toString('hex'); // Generates a 64-character hex string
}

async function storeResetToken(userId, token) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // Expires in 1 hour
    await db.collection('users').updateOne(
      { _id: userId },
      { $set: { resetToken: token, resetTokenExpiresAt: expiresAt } }
    );
  }

const resetLink = `https://yourwebsite.com/reset-password/${token}`;

const mailOptions = {
  from: "knyamandi99@gmail..com",
  to: email,
  subject: "Password Reset Request",
  html: `<p>Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
};


async function sendResetPasswordEmail(email, token) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    try {
      await transporter.sendMail(mailOptions);
      console.log("Password reset email sent successfully");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error; // Re-throw the error to be handled by the calling function
    }
  }

  app.get('/reset-password/:token', async (req, res) => {
    const token = req.params.token;
  
    try {
      const user = await db.collection('users').findOne({ resetToken: token });
  
      if (!user || user.resetTokenExpiresAt < new Date()) {
        return res.status(400).send('Invalid or expired token');
      }
  
      // Render a form to allow the user to enter a new password
      // ... (or redirect to a front-end route that handles this) ...
  
    } catch (error) {
      console.error('Error handling password reset:', error);
      res.status(500).send('An error occurred');
    }
  });
  
  app.post('/reset-password/:token', async (req, res) => {
      const token = req.params.token;
      const newPassword = req.body.password; // Make sure you have proper validation and security measures for the new password
  
      try {
        const user = await db.collection('users').findOne({ resetToken: token });
  
        if (!user || user.resetTokenExpiresAt < new Date()) {
          return res.status(400).send('Invalid or expired token');
        }
  
        // Hash the new password (essential for security)
        const hashedPassword = await bcrypt.hash(newPassword, 10); // Use bcrypt or a similar library
  
        await db.collection('users').updateOne(
          { _id: user._id },
          {
            $set: { password: hashedPassword },
            $unset: { resetToken: 1, resetTokenExpiresAt: 1 }, // Remove the token after use
          }
        );
  
        res.send('Password reset successfully'); // Or redirect to a success page
  
      } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).send('An error occurred');
      }
    });
  