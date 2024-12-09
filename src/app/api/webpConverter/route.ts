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

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // sharp 옵션 추가
    const webpBuffer = await sharp(buffer, { 
      failOnError: false,
      limitInputPixels: false 
    })
    .webp({ quality: 80 })
    .toBuffer();

    return new NextResponse(webpBuffer, {
      headers: {
        'Content-Type': 'image/webp',
        'Content-Disposition': `attachment; filename="${file.name.split('.')[0]}.webp"`,
      },
    });
  } catch (error) {
    console.error('Sharp error:', error);
    return NextResponse.json({ error: '이미지 변환 실패' }, { status: 500 });
  }
}