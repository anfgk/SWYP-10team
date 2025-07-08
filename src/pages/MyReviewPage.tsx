import React, { useState } from 'react';
import Sidebar from '../components/ui/Sidebar';
import MainContent from '../components/review/MainContent';

// 예시 데이터 타입
export type Review = { id: string; content: string; createdAt: string; };
export type Place = { id: string; name: string; imageUrl: string; review?: Review };

const initialPlaces: Place[] = [
  { id: '1', name: '장소명1', imageUrl: '', review: { id: 'r1', content: '좋았어요!', createdAt: '2024-06-01' } },
  { id: '2', name: '장소명2', imageUrl: '', review: undefined },
];

export default function MyReviewPage() {
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [selectedTab, setSelectedTab] = useState('방문한 장소 및 리뷰');
  const [editingReviewPlaceId, setEditingReviewPlaceId] = useState<string | undefined>(undefined);

  return (
    <div className="flex min-h-screen">
      <Sidebar menus={[ '내 정보', '찜한 장소', '방문한 장소 및 리뷰', '문의내역' ]} onMenuClick={setSelectedTab} />
      <MainContent
        places={places}
        selectedTab={selectedTab}
        editingReviewPlaceId={editingReviewPlaceId}
        setEditingReviewPlaceId={setEditingReviewPlaceId}
        setPlaces={setPlaces}
      />
    </div>
  );
} 