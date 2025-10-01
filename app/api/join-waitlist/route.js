import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(req) {
  try {
    const { name, email } = await req.json();
    if (!name || !email) return NextResponse.json({ success: false, error: 'Missing' }, { status: 400 });

    // Save to Supabase (if configured)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const { error } = await supabase.from('waitinglist').insert([{ name, email, consent: true }]);
        if (error) console.error('Supabase insert error', error);
      } catch (e) { console.error('Supabase error', e); }
    } else {
      console.warn('Supabase not configured — skipping DB insert.');
    }

    // Send email via Resend (if configured)
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Snatcho <hello@snatchoindia.com>',
          to: email,
          subject: `Welcome to Snatcho, ${name}! 🎉`,
          html: `
            <div style="font-family: Inter, Arial, sans-serif; padding:20px; background:#0b0b0b; color:#fff; border-radius:8px;">
              <h2 style="color:#22c55e; margin-bottom:8px;">Welcome to the Snatch Force 🎉</h2>
              <p>Hey ${name},</p>
              <p>We’re thrilled to have you — you’re now part of a small, noisy squad that hunts the best deals before everyone else.</p>
              <p style="margin-top:10px;">Your launch coupon: <strong style="color:#22c55e;">SNATCHFORCE</strong></p>
              <p style="color:#aaa; margin-top:6px;">Valid 45 days after launch — keep it safe 🔒</p>
              <hr style="border:none; border-top:1px solid #222; margin:14px 0;" />
              <p>👉 Join the crew on <a href='https://www.instagram.com/snatchoindia/?hl=en' style="color:#22c55e;">Instagram</a> for behind-the-scenes chaos, early drops & community power.</p>
              <p style="margin-top:10px;">Mad love,<br/>— Team Snatcho 💚</p>
            </div>
          `,
          text: `Hey ${name},\n\nWelcome to Snatch Force! Your coupon: SNATCHFORCE (valid 45 days post-launch). Join us on Instagram: https://www.instagram.com/snatchoindia/?hl=en \n\n— Team Snatcho`
        });
      } catch (e) {
        console.error('Resend error', e);
      }
    } else {
      console.warn('Resend not configured — skipping email send.');
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Join API error', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
