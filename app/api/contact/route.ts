// app/api/contact/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;

// --- utils ---
const escapeHtml = (str?: string) =>
    (str || "").replace(/[&<>"']/g, (m) =>
    ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    }[m]!)
    );

const clean = (s?: string) => (s || "").trim();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- handler ---
export async function POST(req: Request) {
    try {
        if (!process.env.RESEND_API_KEY) {
            throw new Error("RESEND_API_KEY not configured");
        }

        if (!EMAIL_ADDRESS) {
            throw new Error("EMAIL_ADDRESS not configured");
        }

        const body = await req.json();
        const { name, email, company, service, budget, message, website } = body;

        // --- honeypot（防 bot）
        if (website) {
            return NextResponse.json({ ok: true });
        }

        // --- normalize
        const cleanName = clean(name);
        const cleanEmail = clean(email);
        const cleanMessage = clean(message);

        // --- validation
        if (!cleanName || !cleanEmail || !cleanMessage) {
            return NextResponse.json(
                { ok: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (!emailRegex.test(cleanEmail)) {
            return NextResponse.json(
                { ok: false, error: "Invalid email" },
                { status: 400 }
            );
        }

        if (cleanMessage.length < 10 || cleanMessage.length > 2000) {
            return NextResponse.json(
                { ok: false, error: "Invalid message length" },
                { status: 400 }
            );
        }

        // --- anti-spam（簡單版）
        if (/(https?:\/\/)/i.test(cleanMessage)) {
            return NextResponse.json(
                { ok: false, error: "Links are not allowed" },
                { status: 400 }
            );
        }

        // --- send email
        const result = await resend.emails.send({
            from: "Devince Studio <onboarding@resend.dev>", // ⚠️ production 要換 domain
            to: [EMAIL_ADDRESS],
            subject: `New Contact: ${escapeHtml(cleanName)}`,
            replyTo: cleanEmail,
            html: `
        <h2>New Contact</h2>
        <p><b>Name:</b> ${escapeHtml(cleanName)}</p>
        <p><b>Email:</b> ${escapeHtml(cleanEmail)}</p>
        <p><b>Company:</b> ${escapeHtml(company)}</p>
        <p><b>Service:</b> ${escapeHtml(service)}</p>
        <p><b>Budget:</b> ${escapeHtml(budget)}</p>
        <p><b>Message:</b></p>
        <p>${escapeHtml(cleanMessage)}</p>
      `,
        });

        if (result.error) {
            console.error("RESEND ERROR:", result.error);
            return NextResponse.json(
                { ok: false, error: "Email failed" },
                { status: 500 }
            );
        }

        return NextResponse.json({ ok: true });

    } catch (err) {
        console.error("CONTACT ERROR:", err);
        return NextResponse.json(
            { ok: false, error: "Internal error" },
            { status: 500 }
        );
    }
}