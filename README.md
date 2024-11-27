📁 Project Structure
src/
  ├── app/                    # Next.js App Router
  │   ├── layout.tsx
  │   ├── page.tsx
  │   └── (routes)/          
  │       ├── products/
  │       └── users/
  │
  ├── domain/                # 도메인 레이어
  │   ├── product/
  │   │   ├── entity/       
  │   │   │   ├── Product.ts
  │   │   │   └── Product.test.ts    # 도메인 테스트는 같은 위치에
  │   │   ├── repository/   
  │   │   │   └── ProductRepository.ts
  │   │   └── service/      
  │   │       ├── ProductService.ts
  │   │       └── ProductService.test.ts
  │   └── user/
  │       └── ...
  │
  ├── components/            
  │   ├── common/           
  │   │   ├── Button/
  │   │   │   ├── Button.tsx
  │   │   │   ├── Button.test.tsx    # 컴포넌트 테스트는 컴포넌트와 함께
  │   │   │   └── index.ts
  │   │   └── Input/
  │   └── domain/           
  │       ├── products/
  │       └── users/
  │
  ├── application/          
  │   ├── hooks/           
  │   │   ├── common/
  │   │   └── domain/      
  │   └── store/           
  │       ├── product/
  │       │   ├── productStore.ts
  │       │   └── productStore.test.ts  # 스토어 테스트 추가
  │       └── user/
  │
  ├── infrastructure/       
  │   ├── api/            
  │   │   ├── axios/
  │   │   │   ├── instance.ts        # axios 인스턴스 설정
  │   │   │   ├── interceptors.ts    # 인터셉터 설정
  │   │   │   └── error-handler.ts   # 에러 핸들링
  │   │   └── endpoints/
  │   │       ├── product.ts
  │   │       └── user.ts
  │   └── storage/                    # 브라우저 스토리지 추상화
  │       ├── localStorage.ts
  │       └── sessionStorage.ts
  │
  ├── shared/             
  │   ├── types/
  │   │   ├── api.ts          # API 관련 타입
  │   │   └── common.ts       # 공통 타입
  │   ├── constants/
  │   │   ├── api.ts          # API 관련 상수
  │   │   └── common.ts       # 공통 상수
  │   └── utils/
  │       ├── format/
  │       ├── validation/
  │       └── date/
  │
  └── __tests__/              
      └── integration/       # 통합 테스트만 별도 관리
          └── domain/        


🛠 Tech Stack
Next.js 15
TypeScript
Zustand