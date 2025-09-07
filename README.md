# 마이페이지 - 어디가냥?같이가개!

## 프로젝트 소개

반려동물과 함께하는 장소 추천 플랫폼의 마이페이지입니다. 사용자의 프로필 정보, 반려동물 등록, 작성한 리뷰, 위시리스트 등을 통합적으로 관리할 수 있는 React + TypeScript 기반의 웹 페이지입니다. 개인화된 사용자 경험을 제공하며, 사용자의 활동 내역을 체계적으로 정리하여 보여줍니다.

## 실행 방법

```bash
npm install
npm run dev
```

## 기술 스택

`Vite` `TypeScript` `React19` `TailwindCSS` `Zustand` `React Router` `Radix UI`

## 기능

- **프로필 관리**: 닉네임, 프로필 이미지 수정 및 크롭 기능
- **반려동물 등록**: 반려동물 정보 등록, 수정, 삭제 관리
- **내 리뷰 관리**: 작성한 리뷰 목록 조회, 수정, 삭제
- **위시리스트**: 저장한 장소 목록 및 관리
- **최근 방문 장소**: 최근 조회한 장소 히스토리

## 페이지 구조

- **MyInfoPageFixed** (`src/pages/MyInfoPageFixed.tsx`): 마이페이지 메인 컨테이너 및 레이아웃
- **MyProfileSection** (`src/components/realMypage/myInfo/MyProfileSection.tsx`): 프로필 정보 표시 및 수정
- **MyPetSection** (`src/components/realMypage/myInfo/MyPetSection.tsx`): 반려동물 정보 관리
- **MyReviewPageFixed** (`src/pages/MyReviewPageFixed.tsx`): 내 리뷰 목록 및 관리
- **MyWishPageFixed** (`src/pages/MyWishPageFixed.tsx`): 위시리스트 관리
- **RecentPlaces** (`src/components/mypage/RecentPlaces.tsx`): 최근 방문 장소 히스토리

## 데이터/로직 개요

- **사용자 프로필 API**: `lib/apiUtils.ts`에서 프로필 정보 조회/수정 처리
- **반려동물 관리**: `hooks/useMyPetSection.tsx`에서 반려동물 CRUD 로직 관리
- **리뷰 데이터**: `hooks/useMyReviewSection.ts`에서 사용자 리뷰 목록 및 관리
- **위시리스트**: `hooks/useMyWishSection.ts`에서 저장된 장소 목록 관리
- **이미지 처리**: `hooks/useProfileImageCropModal.tsx`에서 프로필 이미지 크롭 기능

## 주요 구현 사항

### 1. 프로필 이미지 크롭 기능

```typescript
// 프로필 이미지 크롭 모달
const useProfileImageCropModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleCrop = (croppedImage: string) => {
    // 크롭된 이미지를 서버에 업로드
    updateUserProfile(accessToken, displayName, croppedImage);
  };
};
```

### 2. 반려동물 정보 관리

```typescript
// 반려동물 CRUD 로직
const useMyPetSection = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  const addPet = async (petData: PetFormData) => {
    const newPet = await createPetProfile(accessToken, petData);
    setPets((prev) => [...prev, newPet]);
  };

  const deletePet = async (petId: string) => {
    await deletePetProfile(accessToken, petId);
    setPets((prev) => prev.filter((pet) => pet.id !== petId));
  };
};
```

### 3. 사용자 리뷰 관리

```typescript
// 내 리뷰 목록 및 관리
const useMyReviewSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMyReviews = async () => {
    setLoading(true);
    const userReviews = await fetchUserReviews(accessToken);
    setReviews(userReviews);
    setLoading(false);
  };
};
```

### 4. 상태 관리 (Zustand)

```typescript
interface AuthState {
  accessToken: string | null;
  user: { name: string; email: string } | null;
  profileImg: string | null;
  isLoggedIn: boolean;
  setAuth: (token: string, user: AuthState["user"]) => void;
  setProfileImg: (img: string) => void;
  logout: () => void;
}
```

## 접근성/UX 고려

- **반응형 디자인**: 모바일 퍼스트 레이아웃으로 다양한 디바이스 대응
- **직관적인 UI**: 카드 기반 정보 구조로 가독성 강화
- **이미지 크롭**: CropperJS를 활용한 프로필 이미지 편집 기능
- **일관된 디자인**: Tailwind CSS 프리셋으로 통일된 여백/타이포/컬러 시스템
- **접근성**: Radix UI 컴포넌트를 활용한 키보드 네비게이션 지원
- **로딩/에러 처리**: API 상태에 따른 적절한 피드백 제공

## 환경 변수

VITE_API_BASE_URL=your_api_base_url
VITE_KAKAO_MAP_KEY=your_kakao_map_key

## 성능 최적화

- **코드 스플리팅**: 페이지별 지연 로딩
- **이미지 최적화**: WebP 포맷 및 지연 로딩
- **번들 최적화**: Vite를 활용한 빠른 빌드
- **메모이제이션**: React.memo, useMemo 활용

## 테스트

- **ESLint**: 코드 품질 검사
- **TypeScript**: 컴파일 타임 타입 체크
- **Prettier**: 일관된 코드 스타일

## 학습 포인트

1. **React 19 최신 기능** 활용
2. **TypeScript**를 통한 타입 안전성 확보
3. **Zustand**를 활용한 효율적인 상태 관리
4. **커스텀 훅**을 통한 로직 재사용성 향상
5. **RESTful API** 통신 및 에러 처리
6. **JWT 토큰** 기반 인증 시스템 구현
7. **반응형 웹 디자인** 및 접근성 고려
8. **성능 최적화** 기법 적용

## 향후 개선 계획

- PWA(Progressive Web App) 지원
- 실시간 알림 시스템
- 채팅 기능 추가
- 다국어 지원
- 단위 테스트 및 E2E 테스트 추가
