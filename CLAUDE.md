# CLAUDE.md (Frontend)

이 문서는 **TSUZURU 프론트엔드 개발 시 Claude에게 제공하는 고정 컨텍스트**입니다.
Claude는 아래 규칙과 아키텍처를 반드시 따릅니다.

---

## 1. 프로젝트 개요

- 프로젝트명: **TSUZURU**
- 목적: 외국어 독해 학습 MVP
- 핵심 가치
  > 번역을 줄이는 서비스가 아니라, 질문을 줄이는 서비스

---

## 2. 기술 스택

### Core
- React + TypeScript
- Vite
- React Router DOM

### State / Data
- **TanStack Query**: 서버 상태 관리
- **Zustand**: 클라이언트(UI) 상태 관리

### Styling
- **Tailwind CSS**
- className 기반 스타일링
- 디자인 토큰은 Tailwind config로 관리

### Infra
- **Firebase Hosting**
- **Google Analytics (GA)**

### Dev
- MSW (Mock API)

---

## 3. 프론트엔드 아키텍처 개요

프론트엔드는 아래 레이어로 구성됩니다.

```txt
App / Product
├─ Router (라우팅 정의)
├─ Pages (화면 조합)
├─ Components (UI)
├─ Hooks (행동 규칙 / 화면 로직)
├─ Queries (서버 상태)
├─ Store (클라이언트 상태)
└─ Utils (공용 유틸)
```

---

## 4. 폴더 구조 규칙

Claude는 아래 구조를 기준으로 코드를 생성합니다.

```txt
src/
├─ app/          # 앱 진입점, 라우팅(React Router), 전역 Provider
├─ pages/        # 화면 단위 조합 (로직 ❌)
├─ components/   # UI 컴포넌트
│  └─ common/    # 공통 UI 컴포넌트
├─ hooks/        # ⭐ 행동 규칙 / 화면 로직
├─ queries/      # ⭐ TanStack Query (서버 상태)
├─ store/        # ⭐ Zustand (UI 상태)
├─ styles/       # Tailwind 설정 보조 (globals.css 등)
├─ utils/        # 공용 유틸
├─ types/        # 공용 타입
├─ assets/       # 이미지, 아이콘, 정적 리소스
└─ mocks/        # MSW Mock API
```

> 📌 `src/App.tsx`는 Application Shell 역할만 담당한다.
> - RouterProvider 연결
> - `app/` 레이어에 정의된 전역 Provider 조합
> - 비즈니스 로직 작성 ❌
> - 화면(UI) 구성 ❌

---

## 5. Router 사용 규칙 (React Router DOM)

- 라우팅 정의는 `app/router.tsx`에서만 수행한다.
- Page 내부에서 라우팅 정의 ❌
- Component / hooks에서 route 선언 ❌
- Router 파일은 Route 구조 정의만 담당한다.
- 레이아웃 UI / 비즈니스 판단 ❌

### 허용
- Page에서 `useParams`, `useSearchParams` 사용 ⭕
- Page에서 URL 파라미터를 hooks에 전달 ⭕

### 금지
- hooks에서 `useNavigate` 직접 사용 ❌
- store에서 라우팅 상태 관리 ❌

> 📌 라우팅은 **구조**,
> 행동 판단은 **hooks**,
> 화면 표현은 **components**의 책임이다.

---

## 6. 상태 관리 규칙 (중요)

### TanStack Query
- 서버에서 오는 데이터만 관리
- API 요청 / 캐싱 / refetch 담당
- `queries/` 폴더에서만 사용

### Zustand
- UI 상태만 관리
- 예: 현재 문장 index, 모달 열림 여부
- 서버 데이터 저장 ❌

### 금지
- TanStack Query로 UI 상태 관리 ❌
- Zustand로 서버 데이터 캐싱 ❌

---

## 7. Tailwind CSS 규칙 ⭐

### 금지
- styled-components ❌
- CSS Module ❌
- inline style ❌

### 허용
- className 기반 Tailwind 유틸리티 사용
- 조건부 클래스는 `clsx` / `classnames` 사용 가능
- 반복되는 패턴은 컴포넌트로 분리

### 추가 금지
- hooks / store / utils에서 className 조작 ❌
- 로직에서 스타일 판단 ❌

> 📌 스타일 판단은 **UI 컴포넌트에서만** 한다.

---

## 8. Page Layer 규칙

- Page는 화면 조합 역할만 담당
- API 호출 ❌
- 상태 계산 ❌
- hooks + query 결과를 조합만 한다
- Page 파일명은 `{Domain}Page.tsx` 형태를 권장한다.
  (예: HomePage.tsx, ReadingPage.tsx)

---

## 9. Component Layer 규칙

- UI 표현만 담당
- Tailwind className 사용 ⭕
- 비즈니스 판단 ❌
- 서버 데이터 직접 접근 ❌

### 공통 UI 규칙
- 여러 페이지에서 재사용되는 UI는
  반드시 `components/common/` 아래에 위치한다.

---

## 10. Hooks Layer 규칙 ⭐ (핵심)

- hooks는 행동 규칙 / 화면 로직을 담당
- Query + Store 결과를 조합 ⭕
- 계산 · 판단 · 흐름 제어만 포함
- 네이밍은 `useXXX`

### 금지
- JSX 반환 ❌
- styled-components ❌
- 직접 API 호출 ❌

---

## 11. Query Layer 규칙 (TanStack Query)

- 위치: `src/queries`
- 서버 요청은 Query hook으로만 처리
- Page / hooks에서 직접 API 호출 ❌

---

## 12. Store Layer 규칙 (Zustand)

- 위치: `src/store`
- UI 상태만 관리
- 서버 데이터 저장 ❌
- 스타일 판단 ❌

---

## 13. API / Mock 규칙

- 개발 단계에서는 MSW 기반 Mock API 사용
- 실제 API 스펙을 가정한 타입 기반 개발
- fetch / axios 직접 사용 ❌
- `apiClient` 유틸을 통해서만 API 호출

---

## 14. Analytics (GA) 규칙

- GA 이벤트는 `utils/ga.ts`에서만 정의
- Page 또는 hooks에서 직접 GA 호출 ❌
- 이벤트 목적은 가설 검증용

---

## 15. Claude 출력 규칙 (필수)

Claude는 코드를 생성할 때 반드시 아래를 지킨다.

- 파일 단위로 분리해서 출력
- 각 코드 블록 상단에 파일 경로 명시
- 불필요한 설명 최소화
- MVP 기준으로 과하지 않게 작성

---

## 16. 작업 단계별 요청 원칙

### 초기 단계
- 폴더 구조만 생성
- 파일 내용 생성 ❌

### 기능 구현
- Component → Query → Hooks → Page 순서

### 리팩터링
- 구조와 역할 유지 최우선

---

## 17. 최종 원칙 (가장 중요)

Claude는
**빠르게 동작하는 코드보다**
**구조와 역할이 명확한 코드를 우선한다.**