import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email } = await req.json();
    if (!email || !name) {
      return NextResponse.json(
        { success: false, error: 'Missing name or email' },
        { status: 400 }
      );
    }

    // Save user into Supabase
    const { error } = await supabase
      .from('waitinglist')
      .insert([{ name, email, consent: true }]);
    if (error) {
      console.error('Supabase insert error:', error);
    }

    // Send welcome email via Resend
    try {
      await resend.emails.send({
        from: 'Snatcho <hello@snatchoindia.com>',
        to: email,
        subject: `Welcome to Snatcho, ${name}! 🚀`,
        html: `
          <div style="font-family: Helvetica, Arial, sans-serif; padding:20px; background:#0d0d0d; color:#ffffff; border-radius:10px;">
            <h1 style="color:#22c55e; margin-bottom:10px;">Welcome to the Snatch Force 🎉</h1>
            <p style="font-size:16px; line-height:1.5;">Hey ${name},</p>
            <p style="font-size:16px; line-height:1.5;">
              You’ve just joined an <strong>exclusive squad</strong> of first-movers who will always 
              <em>snatch the best deals</em> before anyone else ⚡.
            </p>
            <p style="font-size:16px; line-height:1.5;">Your launch coupon is:</p>
            <p style="font-size:22px; font-weight:bold; color:#22c55e; margin:10px 0;">SNATCHFORCE</p>
            <p style="font-size:14px; color:#aaa;">(Valid for 45 days after launch — keep it safe 🔒)</p>

            <hr style="border:none; border-top:1px solid #333; margin:20px 0;" />

            <p style="font-size:16px; line-height:1.5;">
              👉 Join your fellow rebels on 
              <a href="https://instagram.com/snatchoindia" style="color:#22c55e; font-weight:bold; text-decoration:none;">Instagram</a> 
              for behind-the-scenes chaos, first drops & community power.
            </p>

            <p style="margin-top:20px; font-size:16px; line-height:1.5;">
              Mad love,<br/>
              — The Snatcho Team 💚
            </p>
          </div>
        `,
        text: `
Hey ${name},

Welcome to the Snatch Force 🎉  
You’ve joined an exclusive squad of first-movers who will snatch the best deals before anyone else ⚡.

Your launch coupon: SNATCHFORCE  
(Valid 45 days after launch — keep it safe 🔒)

👉 Join the community on Instagram: https://instagram.com/snatchoindia  

Mad love,  
— The Snatcho Team 💚
        `,
      });
    } catch (sendErr) {
      console.error('Resend send error:', sendErr);
      return NextResponse.json({
        success: true,
        warning: 'Email failed to send',
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Join API error:', err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
