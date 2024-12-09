import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: '이미지 파일이 필요합니다.' },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();

    // 파일명 인코딩 처리
    const fileName = encodeURIComponent(file.name.split('.')[0]);

    return new Response(webpBuffer, {
      headers: {
        'Content-Type': 'image/webp',
        'Content-Disposition': `attachment; filename="${fileName}.webp"`,
      },
    });
  } catch (error) {
    console.error('Sharp error:', error);
    return NextResponse.json({ error: '이미지 변환 실패' }, { status: 500 });
  }
}