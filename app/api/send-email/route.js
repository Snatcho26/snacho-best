import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { email, name } = await req.json();

    // Insert into Supabase
    await supabase.from("waitinglist").insert([{ email, name }]);

    // Send email via Resend
    await resend.emails.send({
      from: "hello@snatchoindia.com",
      to: email,
      subject: "Welcome to Snatcho 🚀",
      html: `<h1>Welcome, ${name}!</h1><p>Your waitlist spot is confirmed.</p><p>Coupon code: <b>SNATCHFORCE</b> (valid 45 days post launch).</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
