// Rapbae — Brand Builder
// 실제 자료에서 확인된 프로젝트만 포함합니다.
// 확인되지 않은 수치·경력·프로젝트는 포함하지 않습니다.

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  role: string;
  scope: string[];          // execution scope tags
  year: string;
  client: string;
  description: string;
  tagline: string;
  coverImage: string;
  // Proposal-style sections
  context: string;          // market context / why this project
  challenge: string;
  approach: string;         // strategic approach
  execution: ExecutionItem[];
  results: ResultItem[];
  reflection: string;
  tags: string[];
  images?: string[];      // gallery images for case study
  featured: boolean;
}

export interface ExecutionItem {
  phase: string;
  action: string;
  detail: string;
}

export interface ResultItem {
  metric: string;
  value: string;
  note?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
}

export const projects: Project[] = [
  // ─────────────────────────────────────────────
  // 1. Atlantis Strength Apparel
  // 출처: 04.AtlantisStrengthApparelLicensing_Proposal.pdf (직접 작성)
  // ─────────────────────────────────────────────
  {
    id: "1",
    slug: "atlantis-apparel",
    title: "Atlantis Strength Apparel",
    category: "글로벌 라이선싱 · B2B 제안",
    client: "Atlantis Strength × EMFLOW COMPANY",
    role: "라이선싱 전략 · 한국 시장 진입 제안 · B2B 파트너십 기획",
    scope: [
      "브랜드 전략",
      "B2B 제안서",
      "글로벌 전략",
    ],
    year: "2025",
    description: "캐나다 피트니스 브랜드의 한국 어패럴 시장 진입을 위한 IP 라이선싱 파트너십 제안.",
    tagline: "글로벌 브랜드를 한국 어패럴 시장에 연결하다",
    coverImage: "/images/Atlantis_01.jpg",
    context: "Atlantis Strength는 피트니스 기구 기반의 브랜드입니다. 한국 시장에서 프리미엄 스포츠웨어와 기능성 어패럴 수요가 커지는 흐름을 기회로 보고, 단순 수입이 아닌 라이선싱 기반의 시장 진입 구조를 설계했습니다.",
    challenge: "해외 브랜드가 한국에 진입할 때 가장 큰 문제는 인지도 부족과 로컬 커뮤니티 접점 부재입니다. 브랜드의 정체성을 유지하면서 한국 소비자가 이해할 수 있는 포지셔닝과 판매 구조를 만들어야 했습니다.",
    approach: "피트니스 커뮤니티를 초기 진입 채널로 설정하고, B2B 파트너십과 D2C 판매를 결합하는 구조로 접근했습니다. 제안서는 시장 기회, 라이선싱 조건, 운영 구조, 실행 로드맵을 중심으로 설계했습니다.",
    execution: [
      { phase: "시장 분석", action: "한국 피트니스·스포츠웨어 시장 분석", detail: "경쟁 브랜드, 소비자 수요, 커뮤니티 기반 구매 흐름 검토" },
      { phase: "라이선싱 설계", action: "한국 시장 독점 제안 구조 수립", detail: "계약 범위, 운영 권한, 수익 구조, 파트너 역할 정리" },
      { phase: "B2B 제안", action: "영문 파트너십 제안서 작성", detail: "해외 브랜드가 이해할 수 있는 시장 논리와 실행 계획 구성" },
    ],
    results: [
      { metric: "제안서", value: "영문 파트너십 제안서 작성" },
      { metric: "전략 범위", value: "시장 분석부터 라이선싱 구조까지 설계" },
      { metric: "역할", value: "기획·전략·제안 문서 작성 주도" },
    ],
    reflection: "글로벌 브랜드의 한국 진입은 번역이 아니라 재해석입니다. 브랜드의 본질을 유지하면서 한국 시장에서 작동하는 구조로 바꾸는 것이 핵심입니다.",
    tags: ["글로벌 라이선싱", "B2B 제안", "피트니스", "파트너십"],
    images: ["/images/PPT/atlantis/page_01.png",
      "/images/PPT/atlantis/page_02.png",
      "/images/PPT/atlantis/page_03.png",
      "/images/PPT/atlantis/page_04.png",
      "/images/PPT/atlantis/page_05.png",
      "/images/PPT/atlantis/page_06.png",
      "/images/PPT/atlantis/page_07.png",
      "/images/PPT/atlantis/page_08.png",
      "/images/PPT/atlantis/page_09.png",
      "/images/PPT/atlantis/page_10.png",
      "/images/PPT/atlantis/page_11.png",
      "/images/PPT/atlantis/page_12.png",
      "/images/PPT/atlantis/page_13.png",
      "/images/PPT/atlantis/page_14.png",
      "/images/PPT/atlantis/page_15.png",
      "/images/PPT/atlantis/page_16.png",
      "/images/PPT/atlantis/page_17.png",
      "/images/PPT/atlantis/page_18.png",
      "/images/PPT/atlantis/page_19.png",
      "/images/PPT/atlantis/page_20.png",
      "/images/PPT/atlantis/page_21.png",
      "/images/PPT/atlantis/page_22.png",
      "/images/PPT/atlantis/page_23.png",
      "/images/PPT/atlantis/page_24.png",
      "/images/PPT/atlantis/page_25.png",
      "/images/PPT/atlantis/page_26.png",
      "/images/PPT/atlantis/page_27.png",
    ],
    featured: true,
  },

  // ─────────────────────────────────────────────
  // 2. Klosterfrau
  // 출처: 05.KlosterfrauPartnershipproposal.pdf (직접 작성)
  // ─────────────────────────────────────────────
  {
    id: "2",
    slug: "klosterfrau",
    title: "Klosterfrau",
    category: "글로벌 파트너십 · B2B 제안",
    client: "Klosterfrau Healthcare Group × 효성에스피",
    role: "한국 시장 진입 전략 · 파트너십 제안 · 브랜드 로컬라이제이션",
    scope: [
      "브랜드 전략",
      "B2B 제안서",
      "글로벌 전략",
    ],
    year: "2026",
    description: "독일 헬스케어 브랜드의 한국 시장 진입을 위한 파트너십 전략 및 제안.",
    tagline: "유럽 헬스케어의 신뢰를 한국 시장으로",
    coverImage: "/images/Klosterfrau_01.jpg",
    context: "Klosterfrau는 오랜 히스토리를 가진 독일 헬스케어 브랜드입니다. 한국 건강기능식품·헬스케어 시장의 성장 속에서 유럽 브랜드의 신뢰 자산을 한국 소비자에게 어떻게 전달할지가 핵심이었습니다.",
    challenge: "해외에서 강한 브랜드라도 한국에서는 인지도가 없을 수 있습니다. 브랜드의 역사와 신뢰를 한국 소비자가 이해할 수 있는 언어로 바꾸고, 유통 파트너가 납득할 수 있는 사업 구조를 제안해야 했습니다.",
    approach: "브랜드 히스토리, 유럽 헬스케어 신뢰도, 한국 시장 성장성을 연결했습니다. 온라인 D2C와 전문 유통 채널을 병행하는 방식으로 초기 진입 전략을 구성했습니다.",
    execution: [
      { phase: "시장 분석", action: "한국 헬스케어 시장과 경쟁 구조 검토", detail: "건강기능식품, 약국, 온라인 채널 중심으로 진입 가능성 분석" },
      { phase: "로컬라이제이션", action: "브랜드 신뢰 자산을 한국식 메시지로 변환", detail: "역사, 인증, 원산지, 전문성을 소비자 언어로 재구성" },
      { phase: "파트너십 제안", action: "한국 시장 진입 제안서 작성", detail: "유통 구조, 마케팅 방향, 파트너 역할을 문서화" },
    ],
    results: [
      { metric: "제안서", value: "한국 시장 진입 파트너십 문서 작성" },
      { metric: "전략 범위", value: "브랜드 로컬라이제이션 및 유통 전략 설계" },
      { metric: "핵심 가치", value: "유럽 헬스케어 신뢰를 한국 시장 언어로 재정의" },
    ],
    reflection: "오래된 브랜드의 힘은 역사에 있지만, 시장 진입의 성패는 현재 소비자의 언어로 말할 수 있는가에 달려 있습니다.",
    tags: ["글로벌 파트너십", "헬스케어", "B2B 제안", "로컬라이제이션"],
    images: ["/images/PPT/klosterfrau/page_01.png",
"/images/PPT/klosterfrau/page_02.png",
"/images/PPT/klosterfrau/page_03.png",
"/images/PPT/klosterfrau/page_04.png",
"/images/PPT/klosterfrau/page_05.png",
"/images/PPT/klosterfrau/page_06.png",
"/images/PPT/klosterfrau/page_07.png",
"/images/PPT/klosterfrau/page_08.png",
"/images/PPT/klosterfrau/page_09.png",
"/images/PPT/klosterfrau/page_10.png",
"/images/PPT/klosterfrau/page_11.png",
"/images/PPT/klosterfrau/page_12.png",
"/images/PPT/klosterfrau/page_13.png",
"/images/PPT/klosterfrau/page_14.png",
"/images/PPT/klosterfrau/page_15.png",
"/images/PPT/klosterfrau/page_16.png",
"/images/PPT/klosterfrau/page_17.png",
"/images/PPT/klosterfrau/page_18.png",
"/images/PPT/klosterfrau/page_19.png",
"/images/PPT/klosterfrau/page_20.png",
"/images/PPT/klosterfrau/page_21.png",
"/images/PPT/klosterfrau/page_22.png",],
    featured: true,
  },

  // ─────────────────────────────────────────────
  // 3. 로보트 태권V IP 사업화
  // 출처: 08.로보트태권브이IP사업화제안서_효성에스피.pdf (직접 작성)
  // ─────────────────────────────────────────────
  {
    id: "3",
    slug: "robot-taekwon-v",
    title: "로보트 태권V IP 사업화",
    category: "IP 사업화 · B2B 제안",
    client: "더백커스 × 효성에스피",
    role: "IP 사업화 전략 · 라이선싱 구조 설계 · B2B 제안",
    scope: [
      "브랜드 전략",
      "상품기획",
      "B2B 제안서",
    ],
    year: "2026",
    description: "한국 대표 애니메이션 IP 로보트 태권V의 현대적 사업화 전략 제안.",
    tagline: "레거시 IP를 현대 브랜드 자산으로",
    coverImage: "/images/TaekwonV_01.jpg",
    context: "로보트 태권V는 한국 대중문화의 상징적 IP입니다. 하지만 레거시 IP는 추억에만 머물면 사업화가 어렵습니다. 현재 소비자가 구매할 이유를 만들고, 파트너가 사업으로 이해할 수 있는 구조가 필요했습니다.",
    challenge: "향수는 강력하지만 그것만으로는 지속 가능한 매출을 만들기 어렵습니다. IP의 감정 자산을 상품, 채널, 라이선싱 구조로 전환해야 했습니다.",
    approach: "IP의 가치를 원작 팬덤, 레트로 감성, K-culture 자산으로 나누어 분석했습니다. 이후 상품 카테고리, 라이선싱 구조, 협업 가능성을 중심으로 사업화 제안서를 구성했습니다.",
    execution: [
      { phase: "IP 분석", action: "태권V의 브랜드 자산과 타깃 분석", detail: "4050 향수층과 MZ 레트로 소비층을 분리해 접근" },
      { phase: "상품기획", action: "사업화 가능한 카테고리 구성", detail: "굿즈, 패션, 생활용품, 콜라보 제품 가능성 정리" },
      { phase: "라이선싱 제안", action: "파트너십 구조와 수익 모델 제안", detail: "IP 활용 범위, 카테고리 확장, 제안 문서화" },
    ],
    results: [
      { metric: "제안서", value: "IP 사업화 전략 제안서 작성" },
      { metric: "기획 범위", value: "상품 카테고리와 라이선싱 구조 설계" },
      { metric: "핵심 방향", value: "추억 중심 IP를 현재 소비 가능한 브랜드로 재정의" },
    ],
    reflection: "레거시 IP는 과거의 기억에서 출발하지만, 사업화는 현재의 구매 이유를 만드는 일입니다.",
    tags: ["IP 사업화", "라이선싱", "레거시 IP", "B2B 제안"],
    images: ["/images/PPT/taekwon/page_01.png",
      "/images/PPT/taekwon/page_02.png",
      "/images/PPT/taekwon/page_03.png",
      "/images/PPT/taekwon/page_04.png",
      "/images/PPT/taekwon/page_05.png",
      "/images/PPT/taekwon/page_06.png",
      "/images/PPT/taekwon/page_07.png",
      "/images/PPT/taekwon/page_08.png",
      "/images/PPT/taekwon/page_09.png",
      "/images/PPT/taekwon/page_10.png",
      "/images/PPT/taekwon/page_11.png",
      "/images/PPT/taekwon/page_12.png",
      "/images/PPT/taekwon/page_13.png",
      "/images/PPT/taekwon/page_14.png",
      "/images/PPT/taekwon/page_15.png",
      "/images/PPT/taekwon/page_16.png",
      "/images/PPT/taekwon/page_17.png",
      "/images/PPT/taekwon/page_18.png",
      "/images/PPT/taekwon/page_19.png",
      "/images/PPT/taekwon/page_20.png",
      "/images/PPT/taekwon/page_21.png",
      "/images/PPT/taekwon/page_22.png",
      "/images/PPT/taekwon/page_23.png",
      "/images/PPT/taekwon/page_24.png",
      "/images/PPT/taekwon/page_25.png",
      "/images/PPT/taekwon/page_26.png",
      "/images/PPT/taekwon/page_27.png",
      "/images/PPT/taekwon/page_28.png",
    ],
    featured: true,
  },

  // ─────────────────────────────────────────────
  // 4. FEEJU
  // 출처: 07.드림컴스_컨탠츠_극초반.pdf 및 관련 자료 (직접 작성)
  // ─────────────────────────────────────────────
  {
    id: "4",
    slug: "feeju",
    title: "FEEJU",
    category: "브랜드 마케팅 기획",
    client: "FEEJU",
    role: "브랜드 전략 · 상품기획 · 자사몰 구축 · 콘텐츠 · 퍼포먼스 마케팅",
    scope: [
      "브랜드 전략",
      "글로벌 전략",
      "상품기획",
      "D2C 구축",
      "콘텐츠 기획",
      "퍼포먼스 마케팅",
      ],
    year: "2025–2026",
    description: "그리스 프리미엄 진저샷 브랜드의 한국 시장 런칭 준비 및 브랜드 마케팅 실행.",
    tagline: "지중해 에너지를 한국 시장으로",
    coverImage: "/images/FEEJU_01.jpg",
    context: "FEEJU는 그리스 기반의 프리미엄 진저샷 브랜드입니다. 한국 시장에 처음 소개되는 브랜드인 만큼 제품 설명, 브랜드 세계관, 패키지, 자사몰, 콘텐츠, 광고 구조를 하나의 흐름으로 정리해야 했습니다.",
    challenge: "국내 소비자에게 생소한 진저샷 카테고리를 이해시키고, 수입 브랜드로서의 신뢰와 구매 이유를 만들어야 했습니다.",
    approach: "제품을 단순 건강음료가 아니라 일상 에너지 루틴으로 포지셔닝했습니다. 브랜드 스토리, 패키지 문안, 자사몰 구조, 콘텐츠 방향, 퍼포먼스 마케팅을 통합적으로 설계했습니다.",
    execution: [
      { phase: "브랜드 전략", action: "브랜드 세계관과 메시지 정리", detail: "지중해, 에너지, 루틴, 프리미엄 이미지를 중심으로 서사 구성" },
      { phase: "상품기획", action: "제품 라인업과 패키지 구조 기획", detail: "60ml 샷, 250ml 병, 8개입 패키지 등 판매 단위 검토" },
      { phase: "D2C 구축", action: "자사몰 구조와 콘텐츠 설계", detail: "카페24 기반 브랜드몰 구성, About/Invite/FAQ/상품 구조 정리" },
      { phase: "마케팅", action: "콘텐츠와 광고 실행 방향 설계", detail: "상세페이지, SNS, 퍼포먼스 광고, 리뷰 구조 기획" },
    ],
    results: [
      { metric: "브랜드몰", value: "FEEJU Korea 자사몰 구축 진행" },
      { metric: "콘텐츠", value: "브랜드 스토리·패키지 문안·FAQ 기획" },
      { metric: "실행 범위", value: "브랜드 전략부터 커머스 실행까지 통합 수행" },
    ],
    reflection: "새로운 카테고리의 런칭은 제품을 파는 일이 아니라 소비자가 이해할 수 있는 사용 이유를 만드는 일입니다.",
    tags: ["브랜드 런칭", "D2C", "콘텐츠", "퍼포먼스 마케팅"],
    images: ["/images/PPT/feeju/page_01.png",
"/images/PPT/feeju/page_02.png",
"/images/PPT/feeju/page_03.png",
"/images/PPT/feeju/page_04.png",
"/images/PPT/feeju/page_05.png",
"/images/PPT/feeju/page_06.png",
"/images/PPT/feeju/page_07.png",
"/images/PPT/feeju/page_08.png",
"/images/PPT/feeju/page_09.png",
"/images/PPT/feeju/page_10.png",
"/images/PPT/feeju/page_11.png",
"/images/PPT/feeju/page_12.png",
"/images/PPT/feeju/page_13.png",
"/images/PPT/feeju/page_14.png",
"/images/PPT/feeju/page_15.png",
"/images/PPT/feeju/page_16.png",
"/images/PPT/feeju/page_17.png",
"/images/PPT/feeju/page_18.png",
"/images/PPT/feeju/page_19.png",
"/images/PPT/feeju/page_20.png",
"/images/PPT/feeju/page_21.png",
"/images/PPT/feeju/page_22.png",
"/images/PPT/feeju/page_23.png",
"/images/PPT/feeju/page_24.png",
"/images/PPT/feeju/page_25.png",
"/images/PPT/feeju/page_26.png",
"/images/PPT/feeju/page_27.png",
"/images/PPT/feeju/page_28.png",
"/images/PPT/feeju/page_29.png",
"/images/PPT/feeju/page_30.png",
"/images/PPT/feeju/page_31.png",
"/images/PPT/feeju/page_32.png",
"/images/PPT/feeju/page_33.png",
"/images/PPT/feeju/page_34.png",
"/images/PPT/feeju/page_35.png",
"/images/PPT/feeju/page_36.png",
"/images/PPT/feeju/page_37.png",
"/images/PPT/feeju/page_38.png",
"/images/PPT/feeju/page_39.png",
"/images/PPT/feeju/page_40.png",],
    featured: false,
  },

  // ─────────────────────────────────────────────
  // 5. 드림컴스 (Dreamcoms)
  // 출처: 06.드림컴스브랜드디자인기획_리뉴얼.pdf (직접 작성)
  // ─────────────────────────────────────────────
  {
    id: "5",
    slug: "dreamcoms",
    title: "드림컴스",
    category: "브랜드 런칭 · 사업 기획",
    client: "드림컴스",
    role: "브랜드 전략 · 상품기획 · IR 자료 제작 · D2C 구축 · 사업 기획",
    scope: [
      "브랜드 전략",
      "상품기획",
      "D2C 구축",
      "콘텐츠 기획",
      "퍼포먼스 마케팅",
    ],
    year: "2025",
    description:  "브랜드 전략 수립부터 상품 기획, 투자 유치 IR 자료 제작, D2C 구축까지 브랜드와 사업 전반을 기획한 프로젝트.",
    tagline: "브랜드를 사업으로 완성하다",
    coverImage: "/images/dreamcomes_01.jpg",
    context:  "수면 건강기능식품 브랜드와 스포츠 IP 사업을 중심으로 새로운 브랜드와 비즈니스 모델을 기획한 프로젝트입니다.",
    challenge:  "브랜드를 만드는 것을 넘어 상품, 사업 모델, 투자 유치, D2C 운영까지 하나의 비즈니스로 연결할 수 있는 전략을 구축하는 것이 목표였습니다.",
    approach: "시장 조사와 경쟁사 분석을 기반으로 브랜드 전략을 수립하고, 상품 기획, 사업 모델 설계, 투자 유치 IR 자료 제작, D2C 운영 전략까지 전 과정을 직접 기획했습니다.",
    execution: [
      { phase: "Brand Strategy", action: "브랜드 전략 및 포지셔닝 수립", detail: "브랜드 아이덴티티와 핵심 가치 정의" },
      { phase: "Product Planning", action: "수면 건강기능식품 상품 기획", detail: "제품 컨셉, 패키지, 시장 진입 전략 기획" },
      { phase: "Business Planning", action: "스포츠 IP 사업 기획", detail: "IP 기반 신규 사업 모델 및 라이선스 전략 설계" },
      { phase: "IR Deck", action: "투자 유치 IR 자료 제작", detail: "사업 계획 및 투자 제안 자료 기획·작성" },
      { phase: "D2C", action: "브랜드 운영 전략 수립", detail: "자사몰 구축 및 디지털 마케팅 방향 설계" },
    ],
    results: [
      { metric: "Brand", value: "브랜드 전략 및 아이덴티티 구축" },
      { metric: "Product", value: "수면 건강기능식품 상품 기획" },
      { metric: "Business", value: "스포츠 IP 사업 모델 기획" },
      { metric: "IR", value: "투자 유치 IR Deck 제작" },
      { metric: "D2C", value: "온라인 운영 및 마케팅 전략 수립" },
    ],
    reflection: "브랜드는 제품만으로 완성되지 않습니다. 전략, 상품, 사업 모델, 투자, 운영이 하나로 연결될 때 비로소 지속 가능한 브랜드가 만들어진다는 것을 경험한 프로젝트였습니다.",
    tags: ["브랜드 전략","상품기획","IR Deck","D2C","스포츠 IP","사업기획"],
    images: ["/images/PPT/dreamcomes/page_01.png",
"/images/PPT/dreamcomes/page_02.png",
"/images/PPT/dreamcomes/page_03.png",
"/images/PPT/dreamcomes/page_04.png",
"/images/PPT/dreamcomes/page_05.png",
"/images/PPT/dreamcomes/page_06.png",
"/images/PPT/dreamcomes/page_07.png",
"/images/PPT/dreamcomes/page_08.png",
"/images/PPT/dreamcomes/page_09.png",
"/images/PPT/dreamcomes/page_10.png",
"/images/PPT/dreamcomes/page_11.png",
"/images/PPT/dreamcomes/page_12.png",
"/images/PPT/dreamcomes/page_13.png",
"/images/PPT/dreamcomes/page_14.png",
"/images/PPT/dreamcomes/page_15.png",
"/images/PPT/dreamcomes/page_16.png",
"/images/PPT/dreamcomes/page_17.png",
"/images/PPT/dreamcomes/page_18.png",
"/images/PPT/dreamcomes/page_19.png",
"/images/PPT/dreamcomes/page_20.png",
"/images/PPT/dreamcomes/page_21.png",
"/images/PPT/dreamcomes/page_22.png",
"/images/PPT/dreamcomes/page_23.png",],
    featured: false,
  },

  // ─────────────────────────────────────────────
  // 6. EMFLOW IR
  // 출처: 09.(주)엠플로컴퍼니IR_20251220.pdf (Executive Advisor로 참여)
  // ─────────────────────────────────────────────
  {
    id: "6",
    slug: "emflow-ir",
    title: "EMFLOW COMPANY IR",
    category: "투자 유치 · IR 전략",
    client: "EMFLOW COMPANY",
    role: "Executive Advisor · IR 전략 자문 · 브랜드 포트폴리오 기획",
    scope: [
      "브랜드 전략",
      "B2B 제안서",
    ],
    year: "2025",
    description: "브랜드 컴퍼니의 투자 유치를 위한 IR 전략 및 브랜드 포트폴리오 설계.",
    tagline: "브랜드 컴퍼니의 투자 스토리를 설계하다",
    coverImage: "/images/emflow_01.jpg",
    context: "EMFLOW COMPANY는 여러 브랜드와 라이선싱 프로젝트를 포트폴리오로 운영하는 구조를 지향했습니다. 투자자에게 이 구조의 성장 가능성과 수익 논리를 설득해야 했습니다.",
    challenge: "투자자는 개별 브랜드의 감도보다 사업 구조와 확장 가능성을 봅니다. 브랜드 포트폴리오가 왜 성장할 수 있는지 논리적으로 제시해야 했습니다.",
    approach: "브랜드 포트폴리오를 카테고리, 시장, 파트너십 기준으로 재정리하고, 글로벌 라이선싱 파이프라인과 투자 스토리를 연결했습니다.",
    execution: [
      { phase: "IR 전략", action: "투자 스토리 구조 설계", detail: "브랜드 컴퍼니의 가치와 성장 논리 정리" },
      { phase: "포트폴리오 기획", action: "브랜드별 역할과 시너지 구조화", detail: "Atlantis, Klosterfrau 등 글로벌 파트너십 포함" },
      { phase: "자료 작성", action: "IR 문서 구성 자문", detail: "시장, 브랜드, 수익 모델, 확장 전략 중심 구성" },
    ],
    results: [
      { metric: "IR 자료", value: "투자자 대상 IR 덱 작성 자문" },
      { metric: "역할", value: "Executive Advisor 참여" },
      { metric: "전략 범위", value: "브랜드 포트폴리오와 라이선싱 파이프라인 설계" },
    ],
    reflection: "IR은 숫자를 보여주는 문서이기 전에, 이 사업이 왜 커질 수밖에 없는지 납득시키는 이야기입니다.",
    tags: ["IR", "투자 유치", "브랜드 포트폴리오", "라이선싱"],
    images: ["/images/PPT/emflow/page_01.png",
"/images/PPT/emflow/page_02.png",
"/images/PPT/emflow/page_03.png",
"/images/PPT/emflow/page_04.png",
"/images/PPT/emflow/page_05.png",
"/images/PPT/emflow/page_06.png",
"/images/PPT/emflow/page_07.png",
"/images/PPT/emflow/page_08.png",
"/images/PPT/emflow/page_09.png",
"/images/PPT/emflow/page_10.png",
"/images/PPT/emflow/page_11.png",
"/images/PPT/emflow/page_12.png",
"/images/PPT/emflow/page_13.png",
"/images/PPT/emflow/page_14.png",
"/images/PPT/emflow/page_15.png",
"/images/PPT/emflow/page_16.png",
"/images/PPT/emflow/page_17.png",
"/images/PPT/emflow/page_18.png",
"/images/PPT/emflow/page_19.png",
"/images/PPT/emflow/page_20.png",
"/images/PPT/emflow/page_21.png",
"/images/PPT/emflow/page_22.png",
"/images/PPT/emflow/page_23.png",
"/images/PPT/emflow/page_24.png",
"/images/PPT/emflow/page_25.png",
"/images/PPT/emflow/page_26.png",
"/images/PPT/emflow/page_27.png",
"/images/PPT/emflow/page_28.png",
"/images/PPT/emflow/page_29.png",
"/images/PPT/emflow/page_30.png",
"/images/PPT/emflow/page_31.png",
"/images/PPT/emflow/page_32.png",
"/images/PPT/emflow/page_33.png",
"/images/PPT/emflow/page_34.png",
"/images/PPT/emflow/page_35.png",
"/images/PPT/emflow/page_36.png",
"/images/PPT/emflow/page_37.png",
"/images/PPT/emflow/page_38.png",
"/images/PPT/emflow/page_39.png",
"/images/PPT/emflow/page_40.png",
"/images/PPT/emflow/page_41.png",
"/images/PPT/emflow/page_42.png",
"/images/PPT/emflow/page_43.png",
"/images/PPT/emflow/page_44.png",
"/images/PPT/emflow/page_45.png",
"/images/PPT/emflow/page_46.png",
"/images/PPT/emflow/page_47.png",
"/images/PPT/emflow/page_48.png",
"/images/PPT/emflow/page_49.png",
"/images/PPT/emflow/page_50.png",],
    featured: false,
  },
];

export const articles: Article[] = [
  {
    id: "1",
    slug: "brand-is-not-a-logo",
    title: "브랜드는 로고가 아니다",
    category: "브랜드 전략",
    date: "2024.03",
    readTime: "5분",
    excerpt:
      "브랜드를 만든다고 하면 많은 사람들이 로고 디자인을 떠올립니다. 하지만 브랜드는 로고가 아닙니다. 브랜드는 소비자의 머릿속에 존재하는 인식의 총합입니다.",
    content: `브랜드를 만든다고 하면 많은 사람들이 로고 디자인을 떠올립니다. 하지만 브랜드는 로고가 아닙니다.

브랜드는 소비자의 머릿속에 존재하는 인식의 총합입니다. 로고는 그 인식을 촉발하는 트리거일 뿐입니다.

나이키의 스우시를 보면 '그냥 해'가 떠오르는 것은 로고 때문이 아닙니다. 수십 년간 쌓아온 브랜드 경험과 메시지 때문입니다.

브랜드를 만드는 것은 로고를 디자인하는 것이 아니라, 소비자의 머릿속에 특정한 인식을 심는 것입니다. 그 인식이 일관되게 유지될 때 브랜드가 됩니다.`,
  },
  {
    id: "2",
    slug: "strategy-before-design",
    title: "전략이 디자인보다 먼저다",
    category: "브랜드 전략",
    date: "2024.02",
    readTime: "6분",
    excerpt:
      "아름다운 디자인은 좋은 전략 위에서만 의미를 가집니다. 전략 없는 디자인은 장식이고, 디자인 없는 전략은 설계도입니다.",
    content: `아름다운 디자인은 좋은 전략 위에서만 의미를 가집니다.

전략 없는 디자인은 장식이고, 디자인 없는 전략은 설계도입니다. 브랜드는 이 둘이 하나가 될 때 완성됩니다.

전략이 먼저여야 하는 이유는 간단합니다. 디자인은 전략을 시각화하는 것이기 때문입니다. 전략이 없으면 무엇을 시각화해야 하는지 알 수 없습니다.

브랜드 전략을 수립할 때 가장 먼저 물어야 할 질문은 '어떻게 보여야 하는가'가 아니라 '왜 존재해야 하는가'입니다.`,
  },
];
