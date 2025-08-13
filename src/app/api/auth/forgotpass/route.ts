import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const users = [
  { email: "john.doe@example.com", name: "John Doe" },
];

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const user = users.find(u => u.email === email);
    if (user) {
      const resetToken = Math.random().toString(36).substr(2, 8);
      const transporter = nodemailer.createTransport({
        host: "smtp.example.com",
        port: 587,
        auth: {
          user: "your-email@example.com",
          pass: "your-email-password",
        },
      });

      const resetLink = `https://localhost:3000//reset-password?token=${resetToken}&email=${email}`;
      await transporter.sendMail({
        from: '"Simple CRM" <no-reply@yourdomain.com>',
        to: email,
        subject: "Password Reset Request",
        html: `<p>Hi ${user.name},</p>
               <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
               <p>If you didn't request this, ignore this email.</p>`,
      });
    }
    return NextResponse.json({
      message: "If an account with this email exists, a password reset link has been sent.",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
