import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.post("/feature-request", async (req, res) => {
  const { name, email, description } = req.body as {
    name?: string;
    email?: string;
    description?: string;
  };

  if (!name || !email || !description) {
    res.status(400).json({ error: "name, email, and description are required" });
    return;
  }

  const smtpUser = process.env["SMTP_USER"];
  const smtpPass = process.env["SMTP_PASS"];

  if (!smtpUser || !smtpPass) {
    console.error("SMTP_USER or SMTP_PASS environment variables are not set");
    res.status(500).json({ error: "Email service not configured" });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"زيادة - طلب ميزة" <${smtpUser}>`,
      to: smtpUser,
      replyTo: email,
      subject: `طلب ميزة جديد من ${name}`,
      text: `الاسم: ${name}\nالبريد الإلكتروني: ${email}\n\nالوصف:\n${description}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">طلب ميزة جديد</h2>
          <p><strong>الاسم:</strong> ${name}</p>
          <p><strong>البريد الإلكتروني:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border-color: #e5e7eb;" />
          <h3 style="color: #374151;">الوصف:</h3>
          <p style="background: #f9fafb; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${description}</p>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Failed to send feature request email:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
