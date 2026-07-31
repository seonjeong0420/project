## 메뉴 구조

회원
├── 로그인
├── 회원가입

내역관리 (Transaction)
├── 목록 조회
├── 추가
├── 수정
├── 삭제
├── 검색
├── 필터

카테고리 (Category)
├── 목록
├── 추가
├── 수정
├── 삭제

대시보드 (Dashboard)
├── 월별 요약
├── 차트
├── 소비 분석

### 기능

Auth
├ 회원가입
├ 로그인
└ JWT

Category
└ CRUD

Transaction
├ CRUD
├ 검색
├ 필터
└ 기간조회

Dashboard
└ 총 수입/지출/잔액

Chart
├ 월별 소비
├ 카테고리 소비
└ 일별 소비

Analysis
└ 소비 패턴 분석

### 폴더구조

backend
│
├── prisma
│ ├── migrations
│ └── schema.prisma
│
├── src
│
│ ├── config
│ │ └── env.ts
│ │
│ ├── controllers
│ │ ├── auth.controller.ts
│ │ ├── category.controller.ts
│ │ └── transaction.controller.ts
│ │
│ ├── middleware
│ │ ├── auth.middleware.ts
│ │ └── error.middleware.ts
│ │
│ ├── prisma
│ │ └── client.ts
│ │
│ ├── routes
│ │ ├── auth.route.ts
│ │ ├── category.route.ts
│ │ ├── transaction.route.ts
│ │ └── dashboard.route.ts
│ │
│ ├── services
│ │ ├── auth.service.ts
│ │ ├── category.service.ts
│ │ ├── transaction.service.ts
│ │ └── dashboard.service.ts
│ │
│ ├── types
│ │ ├── auth.ts
│ │ ├── category.ts
│ │ └── transaction.ts
│ │
│ ├── utils
│ │ ├── jwt.ts
│ │ └── response.ts
│ │
│ ├── app.ts
│ └── server.ts

#### API

/auth/login
{
"email" : "test@test.com",
"password" : "123456"
}

/categories -> POST. GET. PATCH. DELETE (CRUD)

- {
  "name":"식비",
  "type":"EXPENSE",
  "icon":"🍚",
  "color":"#ff0000"
  }

  /transactions

- {
  "title":"점심 식사",
  "amount":12000,
  "memo":"회사 근처 식당",
  "type":"EXPENSE",
  "date":"2026-07-31",
  "categoryId":"카테고리UUID"
  }

##### 수입만

GET /transactions?type=INCOME

##### 지출만

GET /transactions?type=EXPENSE

##### 2026년 7월 조회

GET /transactions?year=2026&month=7
월별 조회 /transactions?year=2026&month=7
기간 조회 /transactions?startDate=2026-07-01&endDate=2026-07-31

##### 검색

GET /transactions?keyword=스타벅스

GET /dashboard
특정월조회 GET /dashboard?year=2026&month=7

### CHART : 백엔드는 차트에 바로 넣을 수 있는 형태로 반환합니다.

월별 소비 GET /charts/monthly

- /charts/monthly?year=2026

카테고리별 소비 GET /charts/category

- GET /charts/category?year=2026&month=7

일별 소비 GET /charts/daily

- GET /charts/daily?year=2026&month=7
