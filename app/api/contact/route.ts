// app/api/contact/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, company, service, budget, message } = body;

        // ✅ 基本 validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (!email.includes("@")) {
            return NextResponse.json(
                { error: "Invalid email" },
                { status: 400 }
            );
        }

        // ✅ 防空字串垃圾
        if (message.length < 10) {
            return NextResponse.json(
                { error: "Message too short" },
                { status: 400 }
            );
        }

        await resend.emails.send({
            from: "Devince Studio <onboarding@resend.dev>",
            to: ["devince1105@gmail.com"],
            subject: `New Contact: ${name}`,
            replyTo: email,
            html: `
                <h2>New Contact</h2>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Company:</b> ${company || "-"}</p>
                <p><b>Service:</b> ${service || "-"}</p>
                <p><b>Budget:</b> ${budget || "-"}</p>
                <p><b>Message:</b></p>
                <p>${message}</p>
            `,
        });

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error("CONTACT ERROR:", err);
        return NextResponse.json(
            { error: "Internal error" },
            { status: 500 }
        );
    }
}