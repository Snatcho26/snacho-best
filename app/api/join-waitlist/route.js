import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.formData();
    const name = body.get('name');
    const email = body.get('email');

    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    // Insert into Supabase
    const { error: dbError } = await supabase.from('waitinglist').insert([{ name, email, consent: true }]);
    if (dbError) throw dbError;

    // Send welcome email
    await resend.emails.send({
      from: 'Snatcho <hello@snatchoindia.com>',
      to: email,
      subject: 'Welcome to Snatcho 🚀',
      html: `<p>Hey ${name},</p><p>Thanks for joining Snatcho waitlist! 🎉</p><p>Your exclusive coupon will be shared soon.</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}