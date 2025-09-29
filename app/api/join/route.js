import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email } = await req.json();
    if (!email || !name) {
      return NextResponse.json({ success: false, error: 'Missing name or email' }, { status: 400 });
    }

    // Insert into Supabase waitinglist
    const { error } = await supabase.from('waitinglist').insert([{ name, email, consent: true }]);
    if (error) {
      console.error('Supabase insert error:', error);
    }

    // Send welcome email via Resend
    try {
      await resend.emails.send({
        from: 'Snatcho <hello@snatchoindia.com>',
        to: email,
        subject: 'Welcome to Snatcho 🚀',
        html: `<div style="font-family: Inter, Arial, sans-serif; padding:20px;">
                 <h2>Hey ${name},</h2>
                 <p>Thanks for joining the Snatcho waitlist — you're officially in.</p>
                 <p>Your welcome coupon: <strong>SNATCHFORCE</strong></p>
                 <p>Valid for 45 days after launch.</p>
                 <br/><p>— Team Snatcho</p>
               </div>`,
      });
    } catch (sendErr) {
      console.error('Resend send error:', sendErr);
      return NextResponse.json({ success: true, warning: 'Email failed to send' });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Join API error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
