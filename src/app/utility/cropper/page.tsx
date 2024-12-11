import dynamic from 'next/dynamic';

const Cropper = dynamic(() => import('@/components/domain/utility/Cropper'), {
  ssr: false,
});

export default function UtilityCropperPage() {
  return (
    <>
      <h1>Cropper 페이지입니다</h1>
      <Cropper />
    </>
  );
}
