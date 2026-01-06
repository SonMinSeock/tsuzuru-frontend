# TSUZURU Frontend

외국어 학습자를 위한 **독해 중심 학습 서비스 TSUZURU**의 프론트엔드 레포지토리입니다.

> 번역을 줄이는 서비스가 아니라,  
> **독해 중 질문해야 하는 횟수를 줄이는 서비스**를 목표로 합니다.

---

## ✨ 프로젝트 개요

TSUZURU는 일본어를 포함한 외국어 학습자가  
뉴스·글·문장 같은 **실제 지문을 끊기지 않고 읽을 수 있도록 돕는**  
독해 중심 학습 MVP입니다.

기존의 학습 흐름:

- 단어 → 번역기 이동
- 문장 → GPT 이동
- 복사 / 붙여넣기 반복

TSUZURU는 이 과정을  
👉 **하나의 화면, 하나의 독해 흐름**으로 통합합니다.

---

## 🧩 핵심 컨셉

- 문장 중심 독해 UX
- 단어 → 문장 → 의미 확인의 자연스러운 흐름
- 버튼 기반 질문 UI로 반복 질의 비용 최소화
- “이해 완료 → 다음 문장”으로 이어지는 독해 경험

---

## 🛠 기술 스택

### Frontend

- React + TypeScript
- Vite
- React Router DOM

### State / Data

- TanStack Query (서버 상태)
- Zustand (UI 상태)

### Styling

- Tailwind CSS

### Infra

- Firebase Hosting
- Google Analytics

### Dev

- MSW (Mock API)

---

## 📁 프로젝트 구조

본 프로젝트는 **역할 중심 아키텍처**를 따릅니다.

```txt
src/
├─ app/          # 앱 진입점, 라우팅, 전역 Provider
├─ pages/        # 화면 단위 조합
├─ components/   # UI 컴포넌트
├─ hooks/        # 행동 규칙 / 화면 로직
├─ queries/      # 서버 상태 (TanStack Query)
├─ store/        # UI 상태 (Zustand)
├─ utils/        # 공용 유틸
├─ types/        # 공용 타입
└─ mocks/        # MSW Mock API
```
