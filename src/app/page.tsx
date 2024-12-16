import CommunityTrendingList from '@/components/domain/main/CommunityTrendingList';
import SearchSection from '@/components/domain/main/SearchSection';
import YoutubeTrendingList from '@/components/domain/main/YoutubeTrendingList';

export default function MainPage() {
  return (
    <>
      <SearchSection />
      <YoutubeTrendingList />
      <CommunityTrendingList />
    </>
  );
}
