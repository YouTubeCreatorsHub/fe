📁 Project Structure
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 인증 관련 라우트 그룹
│   ├── (main)/            # 메인 라우트 그룹
│   └── layout.tsx         # 루트 레이아웃
├── components/            # UI 컴포넌트
│   ├── common/           # 공통 컴포넌트
│   │   └── __tests__/   # 공통 컴포넌트 테스트
│   └── domain/          # 도메인별 컴포넌트
│       └── __tests__/   # 도메인 컴포넌트 테스트
├── hooks/                # 커스텀 훅
│   ├── common/          # 공통 훅
│   │   └── __tests__/   # 공통 훅 테스트
│   └── domain/         # 도메인별 훅
│       └── __tests__/  # 도메인 훅 테스트
├── services/            # API 통신 및 비즈니스 로직
│   ├── api/            # API 클라이언트
│   │   └── __tests__/ # API 테스트
│   └── domain/        # 도메인별 서비스
│       ├── auth/      # 인증 도메인
│       │   ├── entities/     # 도메인 엔티티
│       │   ├── repositories/ # 리포지토리
│       │   ├── useCases/     # 유스케이스
│       │   └── __tests__/    # 도메인 테스트
│       └── user/      # 사용자 도메인
├── stores/             # 상태 관리
│   └── __tests__/     # 상태 관리 테스트
├── styles/             # 스타일 관련
└── utils/              # 유틸리티 함수
    └── __tests__/     # 유틸리티 테스트

🛠 Tech Stack
Next.js 15
TypeScript
TailwindCSS
Zustand