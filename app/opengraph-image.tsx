import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = site.footerName;

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background: '#ffffff',
        color: '#18181b',
      }}
    >
      <div style={{ fontSize: 30, fontWeight: 600, color: '#1e4b4b' }}>
        {site.footerName}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 64, fontWeight: 600 }}>{site.name}</div>
        <div style={{ fontSize: 32, marginTop: 16, color: '#6b6b73' }}>
          {site.description}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
