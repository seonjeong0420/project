# 개인 자산 관리 서비스

## Features

개인 자산 관리 서비스

├── 인증
│ ├── 회원가입
│ ├── 로그인
│ └── 인증/인가
│
├── 카테고리 관리
│ ├── 조회
│ ├── 추가
│ ├── 수정
│ └── 삭제
│
├── 내역 관리
│ ├── 조회 (GET /transactions?page=1&limit=20)
│ ├── 추가
│ ├── 수정
│ └── 삭제
│
├── 월별 조회 : GET /transactions?year=2026&month=8
│
├── 검색 : GET /transactions?keyword=
│
├── 필터링 GET transactions?type=''
│ ├── 전체
│ ├── 수입
│ └── 지출
│
├── 대시보드 ; GET /dashboard/summary
│ ├── 이번 달 수입
│ ├── 이번 달 지출
│ ├── 잔액
│ └── 최근 내역
│
├── 차트
│ ├── 월별 소비 : GET /charts/monthly
│ ├── 카테고리별 소비 : GET /charts/categories?year=2026&month=8
│ └── 일별 소비 : GET /charts/daily?year=2026&month=8
│
└── 소비 분석 : GET /analysis/monthly?year=2026&month=8
├── 지난달 대비 증감
├── 카테고리별 증감
└── 소비 패턴 분석
