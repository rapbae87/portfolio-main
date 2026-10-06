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
    date: "2026.04",
    readTime: "5분",
    excerpt:
      "브랜드를 만든다고 하면 많은 사람들이 로고 디자인을 떠올립니다. 하지만 브랜드는 로고가 아닙니다. 브랜드는 소비자의 머릿속에 존재하는 인식의 총합입니다.",
    content: `브랜드를 만든다고 하면 많은 사람들이 로고 디자인을 떠올립니다. 하지만 브랜드는 로고가 아닙니다.

브랜드는 소비자의 머릿속에 존재하는 인식의 총합입니다. 로고는 그 인식을 촉발하는 트리거일 뿐입니다.

나이키의 스우시를 보면 'Just Do It'이 떠오르는 것은 로고 때문이 아닙니다. 

수십 년간 쌓아온 브랜드 경험과 메시지 때문입니다.

브랜드를 만드는 것은 로고를 디자인하는 것이 아니라, 소비자의 머릿속에 특정한 인식을 심는 것입니다. 그 인식이 일관되게 유지될 때 브랜드가 됩니다.`,
  },


  {
    id: "2",
    slug: "strategy-before-design",
    title: "전략이 디자인보다 먼저다",
    category: "브랜드 전략",
    date: "2026.04",
    readTime: "6분",
    excerpt:
      "아름다운 디자인은 좋은 전략 위에서만 의미를 가집니다. 전략 없는 디자인은 장식이고, 디자인 없는 전략은 설계도입니다.",
    content: `아름다운 디자인은 좋은 전략 위에서만 의미를 가집니다.

전략 없는 디자인은 장식이고, 디자인 없는 전략은 설계도입니다. 브랜드는 이 둘이 하나가 될 때 완성됩니다.

전략이 먼저여야 하는 이유는 간단합니다. 디자인은 전략을 시각화하는 것이기 때문입니다. 전략이 없으면 무엇을 시각화해야 하는지 알 수 없습니다.

브랜드 전략을 수립할 때 가장 먼저 물어야 할 질문은 '어떻게 보여야 하는가'가 아니라 '왜 존재해야 하는가'입니다.`,
  },



  {
    id: "3",
    slug: "every-marketer-has-a-formula",
    title: "모든 마케터에게는 자신만의 공식이 있다",
    category: "마케팅",
    date: "2026.07",
    readTime: "4분",
    excerpt:
      "좋은 마케터는 경험을 통해 자신만의 공식을 만든다. 정답을 찾는 것이 아니라, 반복 가능한 사고방식을 만드는 과정에 대한 이야기.",
    content: `마케팅에는 정답이 없다고들 말합니다.
  
  '브랜딩이 중요하다.'
  
  '콘텐츠가 중요하다.'
  
  '고객을 이해해야 한다.'
  
  모두 틀린 말은 아닙니다.
  
  하지만 저는 늘 이런 말들이 조금 아쉽다고 생각했습니다.
  
  너무 맞는 말이라서, 오히려 아무것도 설명하지 못하는 경우가 많았기 때문입니다.
  
  시간이 지나면서 한 가지를 깨달았습니다.
  
  경험 많은 마케터는 누구나 자신만의 공식을 가지고 있다는 것입니다.
  
  교과서에서 배운 공식이 아닙니다.
  
  성공한 캠페인.
  
  실패한 캠페인.
  
  어려운 의사결정.
  
  끊임없는 테스트.
  
  이런 경험들이 쌓여 자신만의 사고방식이 만들어집니다.
  
  저는 마케팅 문제를 마주하면 직감에만 의존하지 않습니다.
  
  먼저 문제를 변수로 나눕니다.
  
  복잡한 문제를 단순하게 만듭니다.
  
  그리고 하나의 공식으로 정리합니다.
  
  마케팅이 수학이기 때문이 아닙니다.
  
  공식은 복잡한 문제를 더 명확하게 바라보게 만들고, 반복해서 검증할 수 있게 해주기 때문입니다.
  
  앞으로 이 공간에서는 제가 실제 프로젝트를 수행하며 만들었던 다양한 마케팅 공식을 하나씩 기록해보려고 합니다.
  
  정답을 이야기하려는 것은 아닙니다.
  
  다만 제가 더 나은 의사결정을 하기 위해 만들어왔던 사고의 과정들을 남겨두려고 합니다.`
  }, 



  {
    id: "4",
    slug: "high-roas-does-not-mean-success",
    title: "ROAS가 높다고 성공한 마케팅은 아니다",
    category: "마케팅",
    date: "2026.07",
    readTime: "5분",
    excerpt:
      "ROAS는 광고의 효율을 보여주는 지표일 뿐이다. 사업의 성공을 판단하기 위해서는 그 이상의 숫자를 봐야 한다.",
    content: `광고를 시작하면 가장 먼저 보게 되는 숫자가 있습니다.
  
  바로 ROAS입니다.
  
  많은 기업이 ROAS를 가장 중요한 성과 지표로 사용합니다.
  
  물론 틀린 것은 아닙니다.
  
  광고가 얼마나 효율적으로 매출을 만들었는지 보여주는 가장 직관적인 숫자이기 때문입니다.
  
  하지만 저는 ROAS만으로 마케팅의 성공을 판단하지 않습니다.
  
  오히려 ROAS가 높을수록 더 조심해서 봅니다.
  
  ROAS가 높다는 것은 광고 효율이 좋다는 의미일 뿐입니다.
  
  사업이 성공하고 있다는 의미는 아닙니다.
  
  100만 원을 광고해서 500만 원을 팔았다고 해서 반드시 좋은 마케팅은 아닙니다.
  
  남은 이익은 얼마인지.
  
  반품은 얼마나 발생했는지.
  
  재구매는 이어지고 있는지.
  
  객단가는 유지되고 있는지.
  
  브랜드 검색량은 늘어나고 있는지.
  
  이 숫자들을 함께 봐야 비로소 사업의 성과를 이야기할 수 있습니다.
  
  실무에서는 ROAS보다 중요한 순간이 생각보다 많습니다.
  
  브랜드를 처음 런칭할 때는 인지도를 만드는 것이 더 중요할 수도 있습니다.
  
  신제품을 검증할 때는 구매 데이터보다 고객 반응이 더 중요한 경우도 있습니다.
  
  충성 고객을 늘리는 과정에서는 단기 ROAS가 오히려 떨어질 수도 있습니다.
  
  그래서 저는 항상 하나의 질문을 합니다.
  
  '이 숫자가 정말 우리가 해결해야 하는 문제를 설명하고 있는가?'
  
  좋은 마케터는 숫자를 많이 보는 사람이 아닙니다.
  
  어떤 숫자를 봐야 하는지 아는 사람입니다.
  
  ROAS는 중요한 지표입니다.
  
  하지만 그것이 마케팅의 목적이 되어서는 안 됩니다.
  
  좋은 마케팅은 광고 효율을 높이는 것이 아니라, 사업을 성장시키는 것입니다.`
  },



  {
    id: "5",
    slug: "market-before-product",
    title: "제품보다 시장을 먼저 검증해야 한다",
    category: "마케팅",
    date: "2026.07",
    readTime: "5분",
    excerpt:
      "좋은 제품이라고 반드시 성공하는 것은 아니다. 성공하는 브랜드는 제품보다 먼저 시장을 이해한다.",
    content: `좋은 제품은 많습니다.
  
  하지만 성공하는 제품은 생각보다 많지 않습니다.
  
  그 차이는 제품이 아니라 시장에서 시작됩니다.
  
  브랜드를 준비하는 많은 사람들이 제품 개발에 가장 많은 시간을 씁니다.
  
  기능을 추가하고.
  
  패키지를 바꾸고.
  
  원재료를 개선합니다.
  
  물론 모두 중요한 일입니다.
  
  하지만 저는 제품보다 먼저 확인해야 하는 것이 있다고 생각합니다.
  
  바로 시장입니다.
  
  이 시장에 정말 고객이 있는가.
  
  고객은 이미 어떤 방식으로 문제를 해결하고 있는가.
  
  왜 지금까지 아무도 이 시장을 제대로 공략하지 못했는가.
  
  이 질문에 답하지 못하면 좋은 제품도 실패할 가능성이 높습니다.
  
  실무에서는 종종 이런 이야기를 듣습니다.
  
  '제품은 정말 자신 있습니다.'
  
  그럴 때마다 저는 제품보다 시장을 먼저 살펴봅니다.
  
  시장 규모는 충분한지.
  
  검색량은 증가하고 있는지.
  
  경쟁 브랜드는 어떤 포지션을 가지고 있는지.
  
  가격에 대한 저항은 어느 정도인지.
  
  유통 구조는 어떻게 형성되어 있는지.
  
  이런 정보들이 제품의 성공 가능성을 훨씬 더 많이 설명해 줍니다.
  
  좋은 제품은 시장을 바꾸기도 합니다.
  
  하지만 대부분의 브랜드는 시장을 바꾸기 전에 시장을 이해해야 합니다.
  
  그래서 저는 브랜드를 시작할 때 항상 제품보다 시장을 먼저 분석합니다.
  
  제품은 시장을 위한 답입니다.
  
  시장에 대한 질문이 없다면, 좋은 답도 존재할 수 없습니다.`
  },

  {
    id: "6",
    slug: "great-brands-do-not-persuade",
    title: "좋은 브랜드는 고객을 설득하지 않는다",
    category: "마케팅",
    date: "2026.07",
    readTime: "5분",
    excerpt:
      "브랜드의 역할은 고객을 억지로 설득하는 것이 아니다. 선택할 이유를 명확하게 만드는 것이다.",
    content: `마케팅을 하면 종종 이런 말을 듣습니다.
  
  '고객을 설득해야 합니다.'
  
  저는 이 말에 조금 다른 생각을 가지고 있습니다.
  
  좋은 브랜드는 고객을 설득하지 않습니다.
  
  설득은 이미 관심이 없는 사람의 생각을 바꾸려는 행동입니다.
  
  하지만 대부분의 구매는 그렇게 이루어지지 않습니다.
  
  사람들은 필요한 것을 찾고,
  
  비교하고,
  
  자신에게 가장 적합한 선택을 합니다.
  
  브랜드의 역할은 그 과정에서 선택받을 이유를 만드는 것입니다.
  
  왜 이 브랜드여야 하는지.
  
  왜 지금 구매해야 하는지.
  
  왜 경쟁사가 아닌 우리를 선택해야 하는지.
  
  이 질문에 명확하게 답할 수 있다면 고객은 스스로 선택합니다.
  
  좋은 브랜딩은 화려한 광고가 아닙니다.
  
  고객의 머릿속에 하나의 이유를 남기는 일입니다.
  
  그래서 저는 브랜드를 만들 때 가장 먼저 하나를 정합니다.
  
  '이 브랜드를 한 문장으로 설명할 수 있는가.'
  
  그 한 문장이 명확할수록 브랜드는 강해집니다.
  
  브랜드는 고객을 설득하는 기술이 아니라,
  
  고객이 쉽게 선택할 수 있도록 만드는 과정입니다.`
  },

  {
    id: "7",
    slug: "launch-is-a-process",
    title: "런칭은 이벤트가 아니라 과정이다",
    category: "마케팅",
    date: "2026.07",
    readTime: "5분",
    excerpt:
      "브랜드는 런칭하는 순간 시작된다. 런칭은 끝이 아니라 운영의 출발점이다.",
    content: `많은 사람들이 런칭을 하나의 이벤트처럼 생각합니다.
  
  오픈 날짜를 정하고.
  
  광고를 집행하고.
  
  보도자료를 배포하고.
  
  판매를 시작하면 런칭이 끝났다고 생각합니다.
  
  하지만 저는 그때부터가 진짜 시작이라고 생각합니다.
  
  런칭은 브랜드를 세상에 소개하는 과정일 뿐입니다.
  
  그 이후부터 고객은 브랜드를 평가하기 시작합니다.
  
  광고보다 중요한 것은 후기입니다.
  
  디자인보다 중요한 것은 재구매입니다.
  
  첫 달 매출보다 중요한 것은 세 달 뒤에도 고객이 다시 찾아오는가입니다.
  
  브랜드는 런칭으로 성장하지 않습니다.
  
  운영으로 성장합니다.
  
  그래서 런칭 이후에는 더 많은 질문이 필요합니다.
  
  고객은 어떤 이유로 구매했는가.
  
  왜 장바구니에서 이탈했는가.
  
  어떤 콘텐츠가 반응을 만들었는가.
  
  어떤 광고가 아니라 어떤 메시지가 통했는가.
  
  이 질문에 계속 답을 찾는 과정이 브랜드를 성장시킵니다.
  
  좋은 런칭은 화려한 시작이 아닙니다.
  
  더 나은 운영을 시작할 수 있는 출발점입니다.`
  },

  {
    id: "8",
    slug: "data-does-not-give-answers",
    title: "데이터는 답을 주지 않는다",
    category: "마케팅",
    date: "2026.07",
    readTime: "5분",
    excerpt:
      "데이터는 의사결정을 대신하지 않는다. 데이터를 어떻게 해석하느냐가 결국 성과를 만든다.",
    content: `데이터 기반 의사결정.
  
  이제는 너무 익숙한 표현입니다.
  
  많은 기업이 데이터를 중요하게 이야기합니다.
  
  저 역시 데이터를 자주 봅니다.
  
  하지만 데이터를 많이 본다고 좋은 의사결정을 하는 것은 아닙니다.
  
  데이터는 사실을 보여줄 뿐입니다.
  
  왜 그런 결과가 나왔는지는 설명하지 않습니다.
  
  예를 들어 광고 클릭률이 떨어졌다고 해보겠습니다.
  
  광고 소재의 문제일 수도 있습니다.
  
  타겟이 달라졌을 수도 있습니다.
  
  계절적인 영향일 수도 있습니다.
  
  경쟁사의 프로모션 때문일 수도 있습니다.
  
  데이터는 현상을 보여줍니다.
  
  원인은 사람이 찾아야 합니다.
  
  그래서 같은 데이터를 보고도 서로 다른 결정을 내리는 경우가 많습니다.
  
  누군가는 광고비를 늘리고,
  
  누군가는 광고를 중단하며,
  
  누군가는 상품을 바꾸고,
  
  누군가는 가격을 조정합니다.
  
  같은 숫자를 보고도 결과가 달라지는 이유입니다.
  
  좋은 마케터는 숫자를 외우는 사람이 아닙니다.
  
  숫자의 의미를 해석하는 사람입니다.
  
  데이터는 나침반과 비슷합니다.
  
  방향은 알려주지만 목적지를 대신 정해주지는 않습니다.
  
  결국 중요한 것은 데이터를 얼마나 많이 모았는지가 아니라,
  
  그 데이터를 통해 어떤 질문을 던졌는가입니다.
  
  좋은 의사결정은 데이터에서 시작하지만,
  
  답은 언제나 사람에게서 나옵니다.`
  },


  {
    id: "9",
    slug: "market-before-product",
    title: "제품보다 시장이 먼저다",
    category: "마케팅",
    date: "2026.07",
    readTime: "4분",
    excerpt:
      "좋은 제품이 성공하는 것이 아니라, 시장이 원하는 제품이 성공한다.",
    content: `좋은 제품을 만들면 팔릴 것이라고 믿는 사람들이 많습니다.
  
  하지만 시장은 제품의 완성도보다 필요성을 먼저 평가합니다.
  
  아무리 뛰어난 제품이라도 원하는 사람이 없다면 팔리지 않습니다.
  
  반대로 완벽하지 않은 제품이라도 시장의 문제를 정확하게 해결하면 빠르게 성장합니다.
  
  많은 브랜드가 제품을 먼저 만들고 고객을 찾습니다.
  
  하지만 성공한 브랜드는 고객을 먼저 이해하고 제품을 만듭니다.
  
  무엇을 만들 것인가보다,
  
  누구를 위해 만들 것인가를 먼저 고민합니다.
  
  시장조사는 보고서를 만드는 일이 아닙니다.
  
  사람들이 어떤 문제를 가지고 있는지,
  
  왜 기존 제품으로는 만족하지 못하는지를 이해하는 과정입니다.
  
  제품은 그 이후에 만들어져도 늦지 않습니다.
  
  브랜드를 만든다는 것은 제품을 만드는 일이 아닙니다.
  
  사람들이 이미 가지고 있는 문제를 발견하고,
  
  그 문제를 가장 자연스럽게 해결하는 방법을 만드는 일입니다.
  
  좋은 제품이 시장을 만드는 경우는 드뭅니다.
  
  대부분은 시장이 좋은 제품을 선택합니다.`
  },


  {
    id: "10",
    slug: "marketing-cannot-save-a-bad-product",
    title: "마케팅은 브랜드를 대신할 수 없다",
    category: "브랜드",
    date: "2026.07",
    readTime: "4분",
    excerpt:
      "좋은 마케팅은 브랜드를 빠르게 알릴 수는 있지만, 나쁜 브랜드를 좋은 브랜드로 만들지는 못한다.",
    content: `마케팅을 잘하면 무엇이든 팔 수 있다고 생각하는 사람들이 있습니다.
  
  하지만 마케팅은 관심을 만드는 일이지,
  
  신뢰를 만드는 일은 아닙니다.
  
  광고는 사람을 데려올 수 있습니다.
  
  하지만 다시 찾아오게 만드는 것은 제품과 브랜드입니다.
  
  광고를 많이 하면 첫 구매는 늘어날 수 있습니다.
  
  하지만 두 번째 구매는 광고가 아니라 경험이 결정합니다.
  
  그래서 브랜드가 약한 상태에서 마케팅만 강화하면,
  
  광고비는 계속 늘어나는데 성장은 오래가지 않습니다.
  
  반대로 브랜드가 강하면 마케팅은 훨씬 효율적으로 작동합니다.
  
  같은 예산으로 더 많은 고객을 만들고,
  
  더 높은 전환율과 더 높은 재구매를 만들어 냅니다.
  
  브랜드와 마케팅은 경쟁하는 관계가 아닙니다.
  
  브랜드는 왜 선택받는지를 만들고,
  
  마케팅은 그 이유를 더 많은 사람에게 전달합니다.
  
  좋은 마케팅은 브랜드를 대신하지 않습니다.
  
  좋은 브랜드를 더 빠르게 성장시킬 뿐입니다.`
  },

  {
    id: "11",
    slug: "strategy-is-about-choice",
    title: "전략은 무엇을 하지 않을지 정하는 일이다",
    category: "전략",
    date: "2026.07",
    readTime: "4분",
    excerpt:
      "좋은 전략은 더 많은 일을 하는 것이 아니라, 하지 않을 일을 명확하게 정하는 것에서 시작된다.",
    content: `많은 사람들이 전략을 계획이라고 생각합니다.
  
  하지만 전략은 선택에 더 가깝습니다.
  
  무엇을 할지보다,
  
  무엇을 하지 않을지를 정하는 일입니다.
  
  모든 고객을 잡을 수는 없습니다.
  
  모든 채널에서 성공할 수도 없습니다.
  
  모든 시장에 동시에 진출할 수도 없습니다.
  
  그래서 전략에는 언제나 포기가 포함됩니다.
  
  우선순위를 정하고,
  
  집중할 영역을 선택하고,
  
  나머지를 내려놓는 과정입니다.
  
  브랜드도 마찬가지입니다.
  
  누구에게 사랑받을 것인지 정하는 순간,
  
  누군가에게는 선택받지 못할 수도 있다는 것을 받아들여야 합니다.
  
  애매한 브랜드는 더 많은 사람을 얻지 못합니다.
  
  오히려 누구의 선택도 받지 못하는 경우가 많습니다.
  
  좋은 전략은 더 많은 가능성을 만드는 일이 아닙니다.
  
  더 적은 선택지에 집중하는 일입니다.
  
  무엇을 하지 않을지가 명확할수록,
  
  무엇을 해야 하는지도 분명해집니다.`
  },

  {
    id: "12",
    slug: "5-common-traits-of-successful-brands",
    title: "마케팅으로 성공하는 브랜드들의 공통점 5가지",
    category: "마케팅",
    date: "2026.07",
    readTime: "6분",
    excerpt:
      "성공하는 브랜드는 광고보다 고객을 먼저 이해한다. 시장에서 오래 살아남는 브랜드들이 공통적으로 가지고 있는 다섯 가지 특징을 정리했다.",
    content: `좋은 제품을 만들면 자연스럽게 팔릴까요?
  
  많은 브랜드는 제품 개발에 많은 시간을 투자하지만, 시장에서는 기대만큼의 성과를 얻지 못하는 경우가 많습니다.
  
  반대로 특별한 광고를 하지 않아도 오랫동안 꾸준히 성장하는 브랜드도 있습니다.
  
  그 차이는 제품 자체보다 고객을 바라보는 방식에 있습니다.
  
  ## 1. 고객의 문제를 먼저 찾는다.
  
  가장 흔한 실수는 만들고 싶은 제품부터 만드는 것입니다.
  
  성공하는 브랜드는 반대로 고객을 먼저 관찰합니다.
  
  무엇이 불편한지,
  
  어떤 부분이 부족한지,
  
  기존 제품에서 아쉬운 점은 무엇인지부터 고민합니다.
  
  제품은 목적이 아니라 문제를 해결하는 수단입니다.
  
  그래서 출시 전에도 실제 고객의 반응을 확인하며 계속 수정하고 개선합니다.
  
  ## 2. 대표가 마케팅을 이해한다.
  
  성공하는 브랜드의 대표는 마케팅을 모두 다른 사람에게 맡기지 않습니다.
  
  광고를 직접 운영하지 않더라도,
  
  어떤 전략으로 운영되는지,
  
  무엇을 확인해야 하는지,
  
  왜 이런 결과가 나왔는지는 이해하고 있습니다.
  
  브랜드의 방향은 대표가 결정해야 합니다.
  
  대행사는 실행을 도와줄 수는 있지만 브랜드를 대신 운영해 줄 수는 없습니다.
  
  ## 3. 고객의 리뷰에서 답을 찾는다.
  
  제품을 출시한 이후 가장 중요한 데이터는 광고가 아니라 고객의 목소리입니다.
  
  특히 반복해서 등장하는 리뷰와 CS는 제품을 개선할 수 있는 가장 좋은 자료입니다.
  
  좋은 브랜드는 부정적인 리뷰를 무시하지 않습니다.
  
  왜 그런 의견이 나왔는지,
  
  어떤 부분을 개선해야 하는지를 먼저 고민합니다.
  
  같은 의견이 계속 나온다면 반드시 살펴볼 필요가 있습니다.
  
  ## 4. 광고는 브랜드를 키우는 도구일 뿐이다.
  
  광고만 잘하면 브랜드가 성장한다고 생각하기 쉽습니다.
  
  하지만 광고는 이미 갖춰진 경쟁력을 더 많은 사람에게 보여주는 역할을 합니다.
  
  제품,
  
  콘텐츠,
  
  브랜드에 대한 신뢰가 준비되어 있어야 광고도 오래 효과를 냅니다.
  
  지속적으로 성장하는 브랜드는 광고뿐 아니라 콘텐츠, 브랜딩, CRM, 기존 고객 관리까지 함께 운영합니다.
  
  ## 5. 좋은 제품보다 이해하기 쉬운 제품이 된다.
  
  좋은 제품이라고 해서 고객이 스스로 알아봐 주는 시대는 지났습니다.
  
  고객은 제품을 공부하지 않습니다.
  
  그래서 중요한 것은 좋은 제품을 얼마나 쉽게 이해시킬 수 있는가입니다.
  
  상세페이지도 제품 설명부터 시작하기보다,
  
  고객이 공감할 수 있는 문제를 먼저 보여주고,
  
  그 해결책으로 제품을 소개하는 방식이 훨씬 효과적입니다.
  
  결국 경쟁하는 것은 제품만이 아니라 전달하는 방식입니다.
  
  브랜드를 만드는 것은 광고가 아닙니다.
  
  광고는 고객에게 브랜드를 알리는 도구일 뿐입니다.
  
  브랜드를 오래 성장시키는 힘은 고객을 이해하고,
  
  고객의 목소리를 듣고,
  
  제품을 꾸준히 개선하며,
  
  고객이 이해하기 쉬운 방식으로 전달하는 과정에서 만들어집니다.
  
  결국 좋은 브랜드는 제품을 파는 회사가 아니라,
  
  고객의 문제를 해결하는 회사입니다.`
  },
  
];
