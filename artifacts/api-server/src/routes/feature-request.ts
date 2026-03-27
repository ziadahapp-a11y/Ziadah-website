import { Router, type Request, type Response } from "express";
import nodemailer from "nodemailer";
import { body, validationResult } from "express-validator";

const router = Router();

router.post(
  "/feature-request",
  [
    body("name").isString().trim().isLength({ min: 1, max: 120 }),
    body("email").isEmail().normalizeEmail(),
    body("description").isString().trim().isLength({ min: 1, max: 5000 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }
    const { name, email, description } = req.body as {
      name: string;
      email: string;
      description: string;
    };

    const smtpUser = process.env["SMTP_USER"];
    const smtpPass = process.env["SMTP_PASS"];

    if (!smtpUser || !smtpPass) {
      console.error("SMTP credentials are not configured");
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
    } catch {
      console.error("Failed to send feature request email");
      res.status(500).json({ error: "Failed to send email" });
    }
  },
);

export default router;
