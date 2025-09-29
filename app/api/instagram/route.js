import { NextResponse } from 'next/server';

export async function GET() {
  const IG_USER_ID = process.env.IG_USER_ID;
  const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;

  if (IG_USER_ID && IG_ACCESS_TOKEN) {
    try {
      const url = `https://graph.facebook.com/${IG_USER_ID}?fields=username,profile_picture_url,followers_count&access_token=${IG_ACCESS_TOKEN}`;
      const r = await fetch(url);
      const json = await r.json();
      return NextResponse.json({ success: true, data: json });
    } catch (err) {
      return NextResponse.json({ success: false, error: err.message });
    }
  }

  return NextResponse.json({
    success: true,
    data: {
      username: 'snatchoindia',
      followers_count: null,
      profile_picture_url: '/logo2.png'
    }
  });
}
