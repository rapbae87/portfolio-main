# Rapbae Brand Builder — TODO

## 초기 구현 (완료)
- [x] IA, 사이트맵, UX 전략 설계
- [x] 프로젝트 초기화 (static)
- [x] 글로벌 디자인 시스템 (index.css)
- [x] Navigation 컴포넌트
- [x] Footer 컴포넌트
- [x] Home 페이지
- [x] Works 페이지 (케이스 스터디 목록)
- [x] CaseStudy 상세 페이지
- [x] Thinking 페이지 (브랜드 노트 목록)
- [x] Article 상세 페이지
- [x] About 페이지
- [x] Contact 페이지
- [x] data.ts (프로젝트 5개 + 아티클 5개)
- [x] useScrollReveal 훅

## Revision 2 — 한글화 및 콘텐츠 심화 (완료)
- [x] 전체 사이트 한글 중심 전환
- [x] Home 히어로 철학 문장 전면 배치
- [x] About 페이지 스토리 형식 재구성
- [x] Works / CaseStudy 한글 섹션 타이틀
- [x] Thinking / Article 한글 레이블
- [x] Contact 페이지 담백한 톤 재작성
- [x] data.ts 카테고리·역할·태그 한글화
- [x] Footer 저작권 한글화

## Revision 3 — 타이포그래피 정제 (완료)
- [x] 폰트 2종으로 정리 (Noto Serif KR + Noto Sans KR)
- [x] index.css 전면 개선 (디자인 토큰, 모션 절제)
- [x] 모든 페이지 타이포그래피·여백 정돈
- [x] 호버 효과 절제
- [x] CaseStudy InsightSection 다크 배경 절제

## 풀스택 전환 및 파일 저장 기능 (완료)
- [x] web-db-user 업그레이드 (tRPC + DB + Auth)
- [x] pnpm install 및 DB 스키마 초기화
- [x] media_assets 테이블 스키마 추가
- [x] DB 헬퍼 함수 (createMediaAsset, listMediaAssets, deleteMediaAsset, updateMediaAssetLabel)
- [x] mediaRouter (upload, list, delete, updateLabel)
- [x] AdminMedia 페이지 (/admin/media)
  - [x] 드래그앤드롭 파일 업로드
  - [x] 카테고리 필터 (케이스 스터디 / 브랜드 노트 / 프로필 / 기타)
  - [x] 에셋 라이브러리 그리드 뷰
  - [x] URL 복사 기능
  - [x] 파일 삭제 기능
  - [x] 관리자 권한 가드
- [x] vitest 테스트 (6개 통과)
- [x] App.tsx 라우트 등록 (/admin/media)

## PPT 기반 디자인 시스템 재해석 (완료)
- [x] 첨부된 PDF 5개 분석: 정보 구조, 여백, 타이포그래피, 계층, 이미지-텍스트 균형 정리
- [x] 분석 결과를 디자인 시스템 문서로 정리 (references/ppt-design-analysis.md)
- [x] index.css를 PPT 기반 정보 중심 디자인 토큰으로 재설계 (Pretendard + Noto Serif KR)
- [x] Navigation, Footer, Home를 제안서형 레이아웃으로 재구성
- [x] Works와 CaseStudy를 전략 문서형 구조로 재구성
- [x] Thinking과 Article을 브랜드 노트형 구조로 재구성
- [x] About과 Contact를 정보 중심 레이아웃으로 재구성
- [x] 전체 페이지 검토 및 최종 체크포인트 저장

# PDF 분석 메모
- [x] Feeju 제안서 초기 관찰 정리
- [x] 로보트태권브이 제안서 관찰 정리
- [x] 드림컴스 제안서 관찰 정리
- [x] Atlantis 제안서 관찰 정리
- [x] 엠플로컴퍼니 IR 관찰 정리

## Revision 4 — 전략 제안서형 전면 재설계 (완료)
- [x] data.ts — 실제 프로젝트 데이터로 교체 (Wiggle Wiggle, PETHROOM, Atlantis, Klosterfrau, 로보트태권V, FEEJU)
- [x] index.css — Pretendard 폰트, 흑백+포인트 색상 시스템
- [x] Home — Hero 2컴럼, Execution System 7단계 테이블, 프로젝트 테이블, Global Work, CTA
- [x] Works — 필터 탭 + 역할·실행범위·연도 테이블 + Capability Overview 테이블
- [x] CaseStudy — 제안서형 레이아웃 (스펙 표, 실행 표, 결과 표)
- [x] About — 프로필 사진 + 커리어 타임라인 테이블 + 역량 테이블 + 브랜드 철학
- [x] Contact — 프로젝트 유형 선택 그리드 + 연락처 정보
- [x] Navigation — Thinking 제거, 링크 정리
- [x] Footer — 브랜드 라인 업데이트
- [x] 프로필 사진 업로드 및 About 페이지 적용
- [x] Tailwind md: 클래스 → 인라인 스타일 전환 (레이아웃 렌더링 이슈 해결)

## Revision 5 — 이력서 기반 콘텐츠 정확도 보강 (완료)

- [x] About 페이지 — 커리어 타임라인을 이력서 기반으로 교체 (윤슨파킹 → 디맵 → 시큐아이파킹 → 베아트리스넷 → 효성에스피)
- [x] About 페이지 — EMFLOW를 사이드 프로젝트로 재배치
- [x] About 페이지 — 학력(경북대 식품영양학), 자격증(1종보통, 컴활2급, 정보처리기능사) 섹션 추가
- [x] About 페이지 — 자기소개 문구 이력서 기반으로 교체
- [x] Home 페이지 — Key Metrics 수치 이력서 기반으로 교체
- [x] Home 페이지 — Execution System 역량 항목 보강
- [x] data.ts — Wiggle Wiggle, PETHROOM 제거 / 드림컴스 케이스 스터디 추가
- [x] 확인되지 않은 수치 제거 (1,000+ SKU, 150+ OEM 벤더 등)
- [x] CaseStudy.tsx — 이미지 갤러리 섹션 추가
- [x] data.ts — 프로젝트별 images 배열 추가 (Klosterfrau, 로보트태권V, FEEJU, 드림컴스)
