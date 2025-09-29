'use client';
import { useEffect, useState } from 'react';

export default function InstagramCard({ handle }) {
  const [info, setInfo] = useState({ username: handle, followers_count: null, profile_picture_url: '/logo2.png' });
  useEffect(() => {
    let mounted = true;
    fetch('/api/instagram')
      .then(r => r.json())
      .then(j => {
        if (!mounted) return;
        if (j.success && j.data) setInfo(j.data);
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, [handle]);

  return (
    <a href={`https://instagram.com/${info.username}`} target="_blank" rel="noreferrer" className="block card flex items-center gap-4">
      <img src={info.profile_picture_url || '/logo2.png'} alt="@snatchoindia" className="w-16 h-16 rounded-full object-cover" />
      <div>
        <div className="font-semibold">@{info.username}</div>
        <div className="text-sm text-gray-500">{info.followers_count ? `${info.followers_count.toLocaleString()} followers` : 'Follow us for updates'}</div>
      </div>
    </a>
  );
}
