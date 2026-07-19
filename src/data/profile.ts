export const profile = {
  name: '최석윤',
  title: 'Frontend Developer',
  experience: '3년 차',
  summary:
    '서비스마다 같은 기능을 반복하기보다, 여러 제품이 같이 쓸 수 있는 구조로 정리하는 쪽에 강점이 있습니다. 유저·어드민 웹과 채팅 SDK를 구축하며 결제·웹뷰·SEO 등 공통 모듈을 표준화해 왔습니다.',
  email: 'tjrdbs5912@gmail.com',
  phone: '010-7469-6008',
  github: '', 
  careers: [
    {
      company: '라임프렌즈',
      role: 'Frontend Developer',
      period: '2025.02 – 진행중',
      points: [
        'Next.js/React 기반 유저웹·어드민 프론트엔드 다수 구축·운영',
        '동적 sitemap·메타데이터·구조화 데이터 및 GTM/GA로 SEO 트래킹 인프라 구축',
        '웹뷰 브릿지·포트원 결제 모듈 설계·공통화',
        '도메인별 prefetch + HydrationBoundary로 SSR→클라이언트 캐시 연동 패턴 표준화',
        'TalkPlus 기반 채팅 UI SDK 설계 및 GitHub Packages 배포',
      ],
    },
    {
      company: '텔레트론',
      role: 'Frontend Developer',
      period: '2023.02 – 2024.02',
      points: [
        '트래픽 모니터링·라우팅 설정 등 장비 제어 UI 전반 구현',
        'TanStack Query Query Key Factory로 도메인별 캐시 키 모듈화',
        'Shell 스크립트 기반 사내 서버 빌드·배포로 개발/납품 흐름 개선'
      ],
    },
  ],
} as const

export const skills = {
  frontend: ['Next.js', 'React', 'TypeScript', 'TanStack Query', 'Tailwind CSS', 'React-hook-form', 'Zod', 'MUI', 'Shadcn/UI'],
  tools: ['Storybook', 'GitHub Actions'],
} as const

export type Troubleshooting = {
  problem: string
  cause: string
  solution: string
}

export type ProjectSite = {
  label: string
  url: string
  image?: string
}

export type Project = {
  id: string
  title: string
  company: string
  stack: string[]
  summary: string
  highlights: string[]
  url?: string
  image?: string
  sites?: ProjectSite[]
  troubleshooting?: Troubleshooting[]
}

export const projects: Project[] = [
  {
    id: 'doda-chat-sdk',
    title: 'doda Chat SDK',
    company: '라임프렌즈',
    stack: [
      'React',
      'TypeScript',
      'TalkPlus',
      'Rollup',
      'Storybook',
      'Changesets',
    ],
    summary:
      'TalkPlus 기반 React 채팅 UI SDK. B2B/B2C/C2C·권한별 시나리오를 Container로 제공해 서비스별 채팅 UI 중복을 제거',
    highlights: [
      'B2B/B2C/C2C Manager·Client를 Container·config로 추상화해 서비스는 연동만으로 채팅 UI 도입',
      'Storybook 문서화와 Changesets 기반 GitHub Packages 배포로 SDK 버전 관리',
      '로그인·읽음 레이스 등 실시간 타이밍 이슈를 SDK 내부에서 막아 연동 서비스마다 같은 버그를 반복하지 않게 함',
    ],
    troubleshooting: [
      {
        problem:
          'B2C에서 로그인 완료 전 채널 목록·읽음이 호출되며 상태 불일치가 발생',
        cause: '로그인 비동기 완료와 채널/읽음 API 호출 순서 레이스',
        solution:
          '로그인 Promise가 resolve된 뒤에만 채널 조회·읽음 API가 돌도록 순서를 맞추고, 미완료 상태에서는 호출을 막는 가드를 넣음',
      },
      {
        problem: 'C2C 비로그인(익명) 첫 채팅방 생성이 실패',
        cause: '익명 userId/clientId·serviceName 규약과 생성 API 호출 순서 이슈',
        solution:
          '익명 세션의 userId·clientId·serviceName 규약을 생성 API 스펙에 맞게 맞추고, 식별자 준비 완료 후에만 방 생성이 호출되도록 순서를 수정',
      },
    ],
  },
  {
    id: 'doda-works',
    title: 'Doda Works',
    company: '라임프렌즈',
    stack: ['React', 'TypeScript', 'MUI', 'TanStack Query'],
    summary:
      '사내·고객사용 구독형 B2B SaaS 어드민. 프로젝트·티켓·결제·메시징을 서비스 운영',
    highlights: [
      '외부 견적·청구에 PortOne 결제 연동 — confirm/webhook URL 분리, 무통장·모바일 리다이렉트까지 포함',
      '공통 칸반 컨테이너로 티켓 상태/프로젝트 뷰를 구성하고, 드래그 직후 보드를 낙관적으로 갱신한 뒤 position API로 동기화',
      'SheetJS 기반 페이징 Excel export(진행률·취소)와 import 일괄등록을 공통 컴포넌트로 재사용',
      '견적서 html2canvas·jsPDF 내보내기와 세금계산서 @react-pdf/renderer 문서를 구축해 운영 문서를 웹에서 발급',
    ],
    troubleshooting: [
      {
        problem:
          'PC에서 결제는 완료됐는데 콜백이 실패로 떨어져, 실패 토스트가 뜨거나 주문 화면이 갱신되지 않는 경우가 생김',
        cause:
          'PortOne 콜백의 response.success만으로 성공을 판정하면, 실제로는 결제된 건도 실패로 오판할 수 있음',
        solution:
          'error_code 없음 + imp_uid 존재로 성공을 판정하고, 주문 쿼리 invalidate 후 동일 페이지로 복귀해 결제 결과와 UI를 맞춤',
      },
      {
        problem: '칸반 드래그 후 서버 응답을 기다리면 카드 이동 체감이 끊김',
        cause: '보드 UI가 position/update API 완료에 묶여 있으면 드래그 결과가 늦게 반영됨',
        solution:
          '드래그 즉시 로컬 board를 갱신(낙관적 UI)하고 mutation + invalidate로 서버 상태와 재동기화',
      },
    ],
  },
  {
    id: 'internup',
    title: 'InternUp',
    company: '라임프렌즈',
    image: '/projects/internup_main.png',
    url: 'https://inturnup.co.kr',
    stack: ['Next.js', 'React', 'TypeScript', 'TanStack Query', 'SSE', 'MUI' ,'Shadcn/UI'],
    summary:
      '인턴십·채용 플랫폼 User Web·운영 Admin 프론트엔드 단독 구축. 알림·문서·역할 분기 등 도메인 핵심 플로우를 설계',
    highlights: [
      '인증이 필요한 SSE를 EventSourcePolyfill로 구성해 사용자·인턴 알림을 폴링 없이 실시간 갱신',
      '회원·인턴·기업관리자 역할별 진입 조건(이력서·성향진단·인턴 상태)을 게이트해 온보딩·활동 플로우를 일관되게 분기',
      '탭 종료·새로고침 시 fetch가 취소돼 강의 진도가 유실되는 문제를, sendBeacon으로 시청 기록을 남기도록 처리',
    ],
    troubleshooting: [
      {
        problem:
          '실시간 알림 스트림 구축 시, 인증이 필요한 API 구조에서 브라우저 네이티브 EventSource 연결이 실패하는 현상 발생',
        cause:
          '알림 API는 Bearer 토큰 인증이 필수적이었으나, 브라우저 표준 EventSource API는 HTTP Authorization 헤더를 직접 설정할 수 없는 제약이 있었음',
        solution:
          'EventSourcePolyfill로 토큰을 헤더에 실어 SSE를 연결하고, 사용자·인턴 알림 채널을 분리한 뒤 목록·읽음·페이지 변경(재연결)을 Notification Context에서 일괄 관리',
      },
    ],
  },
  {
    id: 'kwanjeong',
    title: 'Kwanjeong Community',
    company: '라임프렌즈',
    image: '/projects/kwanjeong_main.png',
    url: 'https://community.ikef.or.kr',
    stack: ['Next.js', 'TypeScript', 'TanStack Query', 'Tailwind CSS', 'Shadcn/UI'],
    summary:
      '관정 장학생 커뮤니티 유저웹 단독 구축. 모임·권한 중심 도메인 UX에 초점',
    highlights: [
      '모임 가입·대기·승인/거절·내보내기를 멤버 상태와 그룹장 권한으로 분기해 운영 플로우를 UI에서 일관 처리',
      '그룹장·회장단·학교대표 등 역할에 따라 생성·관리 진입을 게이트하고, 변경 후 목록을 Query invalidate로 즉시 동기화',
    ],
  },
  {
    id: 'haid',
    title: 'Haid',
    company: '라임프렌즈',
    image: '/projects/haid_main.png',
    url: 'https://haid.kr',
    stack: ['Next.js', 'TypeScript', 'TanStack Query', 'Tailwind CSS', 'Shadcn/UI'],
    summary:
      '모빌리티 브랜드 웹. 앱 WebView 연동과 설문·상담 등 전환 플로우를 담당',
    highlights: [
      'limeWebApp 브릿지에 callbackId·타임아웃 Promise를 적용해 로그인·유저정보·공유·외부 브라우저를 요청-응답으로 맞춤',
      '서버 스키마 기반 동적 설문(다문항·페이지네이션·파일 포함)을 로그인/게스트 API로 분기해 Web·앱에서 동일 제출',
      '상담 신청 플로우를 구현해 브랜드 문의·콜백 접점을 웹에서 처리',
    ],
    troubleshooting: [
      {
        problem:
          '앱 WebView에서 유저정보 등 비동기 브릿지 호출이 무응답으로 남거나, 화면 이탈 후에도 Promise가 정리되지 않음',
        cause:
          '네이티브 응답 지연·누락과 함께, callbackId 없이 postMessage만 쓰면 요청-응답 매칭이 안 되고 unmount 시 pending이 남음',
        solution:
          'callbackId로 pending Map을 관리하고 타임아웃·전송 실패 시 reject하며, 응답은 해당 콜백만 resolve한 뒤 unmount에서 pending을 일괄 정리',
      },
    ],
  },
  {
    id: 'edupeace',
    title: 'EduPeace',
    company: '라임프렌즈',
    stack: ['Next.js', 'React', 'TypeScript', 'TanStack Query', 'Tailwind CSS', 'MUI', 'Shadcn/UI'],
    summary:
      '학급 설문·진단과 회복적 상담 서비스의 User Web·Admin 프론트엔드 단독 구축',
    sites: [
      {
        label: '설문·진단',
        url: 'https://test.edupeace.co.kr',
        image: '/projects/edupeace_main.png',
      },
      {
        label: '상담',
        url: 'https://consulting.edupeace.co.kr',
        image: '/projects/consulting_main.png',
      },
    ],
    highlights: [
      '학생별 UUID 링크로 Likert 설문 응시를 열고, 완료·권한 검증으로 중복 참여를 차단',
      '휴대폰 OTP로 설문 담당자·상담 접점을 게이트하고, Admin 운영(설문권·초대·상담 배정)으로 연결',
      '상담 진행 중 재접수 차단·제출 후 수정 불가 정책과 이력 스레드로 케이스 운영을 구성',
    ],
  },
  {
    id: 'k-character',
    title: 'KCharacter',
    company: '라임프렌즈',
    image: '/projects/k-character_main.png',
    url: 'https://k-character.co.kr',
    stack: ['Next.js', 'TypeScript', 'TanStack Query', 'Tailwind CSS', 'Shadcn/UI'],
    summary:
      '지자체 공공 캐릭터 페스티벌 공식 웹. 소개·행사·참가 신청·수상·뉴스까지 대외용 사이트를 구축',
    highlights: [
      '페스티벌 소개·연도별 행사·수상내역·뉴스/갤러리 등 기관 사이트의 정보 구조를 페이지로 구성',
      '공모전 참가신청 플로우 구축',
    ],
  },
]
