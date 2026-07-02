import 'dotenv/config';
import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Check if projects already exist
const [existing] = await conn.query('SELECT COUNT(*) as count FROM projects');
if (existing[0].count > 0) {
  console.log(`Projects already seeded (${existing[0].count} rows). Skipping projects.`);
} else {
  const projects = [
    {
      slug: 'atlantis-apparel',
      title: 'Atlantis Strength Apparel',
      category: '글로벌 라이선싱 · B2B 제안',
      year: '2024',
      role: '라이선싱 전략 · 한국 시장 진입 제안 · B2B 파트너십 기획',
      description: '호주 프리미엄 피트니스 어패럴 브랜드의 한국 시장 진입을 위한 라이선싱 파트너십 제안',
      client: 'Atlantis Strength (Australia) × EMFLOW COMPANY',
      status: 'published',
      featured: 1,
      sortOrder: 1,
      coverImage: '/manus-storage/atlantis-01_41189d5c.png',
      scope: JSON.stringify(['브랜드 전략', '라이선싱', 'GTM 설계', '파트너십 협상', '시장 분석']),
      execution: JSON.stringify([
        { phase: '리서치', action: '한국 피트니스 시장 분석', detail: '시장 규모, 경쟁사, 소비자 트렌드 조사' },
        { phase: '전략', action: '라이선싱 구조 설계', detail: '로열티 구조, 독점권 범위, 계약 조건 협상' },
        { phase: 'GTM', action: '한국 시장 진입 로드맵', detail: '유통 채널 선정, 런칭 타임라인, 마케팅 계획' },
      ]),
      results: JSON.stringify([
        { metric: '파트너십 계약', value: '체결 완료', note: '독점 라이선싱' },
        { metric: '시장 진입', value: '2024 Q4', note: '한국 공식 런칭' },
      ]),
    },
    {
      slug: 'klosterfrau',
      title: 'Klosterfrau',
      category: '글로벌 파트너십 · B2B 제안',
      year: '2024',
      role: '한국 시장 진입 전략 · 파트너십 제안 · 브랜드 로컬라이제이션',
      description: '독일 150년 헬스케어 브랜드의 한국 시장 진입을 위한 파트너십 전략 수립 및 제안',
      client: 'Klosterfrau Healthcare Group (Germany) × EMFLOW COMPANY',
      status: 'published',
      featured: 1,
      sortOrder: 2,
      coverImage: '/manus-storage/klosterfrau-01_618a01bd.png',
      scope: JSON.stringify(['글로벌 전략', '유통 파트너십', '시장 분석', '협상', '헬스케어']),
      execution: JSON.stringify([
        { phase: '리서치', action: '한국 헬스케어 시장 분석', detail: '규제 환경, 유통 구조, 경쟁 분석' },
        { phase: '전략', action: '유통 파트너십 구조 설계', detail: '파트너 선정 기준, 계약 구조, 마진 정책' },
        { phase: '협상', action: '파트너십 협상 및 계약', detail: '조건 협상, 계약서 검토, 최종 체결' },
      ]),
      results: JSON.stringify([
        { metric: '파트너십', value: '협상 완료', note: '한국 독점 유통' },
        { metric: '시장 진입', value: '전략 수립', note: '단계별 로드맵' },
      ]),
    },
    {
      slug: 'robot-taekwon-v',
      title: '로보트 태권V IP 사업화',
      category: 'IP 사업화 · B2B 제안',
      year: '2024',
      role: 'IP 사업화 전략 · 라이선싱 구조 설계 · B2B 제안',
      description: '한국 대표 애니메이션 IP 로보트 태권V의 현대적 사업화 전략 및 라이선싱 파트너십 제안',
      client: '효성 S&P × EMFLOW COMPANY',
      status: 'published',
      featured: 1,
      sortOrder: 3,
      coverImage: '/manus-storage/robot-01_e8e40993.png',
      scope: JSON.stringify(['IP 사업화', '라이선싱', 'B2B 제안', '브랜드 전략', '파트너십']),
      execution: JSON.stringify([
        { phase: '분석', action: 'IP 가치 평가', detail: '브랜드 자산, 시장 잠재력, 활용 가능 영역 분석' },
        { phase: '전략', action: '사업화 모델 설계', detail: '라이선싱 구조, 수익 모델, 파트너십 조건' },
        { phase: '제안', action: 'B2B 제안서 작성', detail: '잠재 파트너 대상 맞춤형 제안' },
      ]),
      results: JSON.stringify([
        { metric: '제안서', value: '완성', note: 'B2B 파트너 대상' },
        { metric: '사업화 모델', value: '설계 완료', note: '라이선싱 구조' },
      ]),
    },
    {
      slug: 'feeju',
      title: 'FEEJU',
      category: '브랜드 마케팅 기획',
      year: '2025–2026',
      role: '마케팅 전략 · 콘텐츠 기획 · 채널 전략',
      description: '라이프스타일 브랜드의 마케팅 전략 수립 및 채널별 실행 계획',
      client: 'FEEJU',
      status: 'published',
      featured: 0,
      sortOrder: 4,
      coverImage: '/manus-storage/feeju-01_e7d24f6f.png',
      scope: JSON.stringify(['브랜드 전략', '커머스 운영', 'SNS 마케팅', '콘텐츠 제작', '인플루언서']),
      execution: JSON.stringify([
        { phase: '전략', action: '브랜드 아이덴티티 수립', detail: '포지셔닝, 타겟, 브랜드 보이스 정의' },
        { phase: '구축', action: '커머스 채널 셋업', detail: '스마트스토어, 쿠팡, 자사몰 운영' },
        { phase: '마케팅', action: 'SNS 및 인플루언서 마케팅', detail: '인스타그램, 틱톡 콘텐츠 전략' },
      ]),
      results: JSON.stringify([
        { metric: '브랜드 런칭', value: '완료', note: '온라인 커머스' },
        { metric: 'SNS 팔로워', value: '성장', note: '런칭 3개월' },
      ]),
    },
    {
      slug: 'dreamcoms',
      title: '드림컴스 브랜드 리뉴얼',
      category: '브랜드 디자인 기획',
      year: '2024–2025',
      role: '브랜드 리뉴얼 기획 · 디자인 방향 수립 · 아이덴티티 재설계',
      description: '기존 브랜드의 리뉴얼을 위한 아이덴티티 재설계 및 디자인 방향 기획',
      client: '드림컴스 (Dreamcoms)',
      status: 'published',
      featured: 0,
      sortOrder: 5,
      coverImage: '/manus-storage/dreamcoms-01_0274a473.png',
      scope: JSON.stringify(['브랜드 리뉴얼', '아이덴티티 디자인', '전략 기획', '디자인 방향']),
      execution: JSON.stringify([
        { phase: '진단', action: '브랜드 현황 분석', detail: '기존 아이덴티티, 시장 포지셔닝, 소비자 인식' },
        { phase: '전략', action: '리뉴얼 방향 수립', detail: '새로운 포지셔닝, 타겟 재정의, 브랜드 보이스' },
        { phase: '설계', action: '아이덴티티 재설계', detail: '로고, 컬러, 타이포그래피, 비주얼 가이드' },
      ]),
      results: JSON.stringify([
        { metric: '브랜드 리뉴얼', value: '완료', note: '아이덴티티 재설계' },
        { metric: '가이드라인', value: '완성', note: '브랜드 매뉴얼' },
      ]),
    },
    {
      slug: 'emflow-ir',
      title: 'EMFLOW COMPANY IR',
      category: '투자 유치 · IR 전략',
      year: '2025',
      role: 'Executive Advisor (Licensing & Investment) · IR 전략 자문',
      description: 'D2C 브랜드 컴퍼니 EMFLOW의 투자 유치를 위한 IR 전략 및 브랜드 포트폴리오 기획',
      client: 'EMFLOW COMPANY',
      status: 'published',
      featured: 0,
      sortOrder: 6,
      coverImage: '/manus-storage/emflow-03_3b9b8d2c.png',
      scope: JSON.stringify(['IR 전략', '사업계획서', '브랜드 포지셔닝', '투자 유치', '자문']),
      execution: JSON.stringify([
        { phase: '진단', action: '현황 분석 및 포지셔닝', detail: '사업 모델, 경쟁 우위, 투자 포인트 정리' },
        { phase: '전략', action: 'IR 스토리라인 구성', detail: '투자자 관점의 내러티브, 재무 모델 검토' },
        { phase: '실행', action: 'IR 덱 및 사업계획서 작성', detail: '투자자 미팅 자료, 실사 대응 문서' },
      ]),
      results: JSON.stringify([
        { metric: 'IR 문서', value: '완성', note: '투자자 미팅용' },
        { metric: '자문 기간', value: '6개월+', note: '지속 협업' },
      ]),
    },
  ];

  for (const p of projects) {
    await conn.query(
      `INSERT INTO projects (slug, title, category, year, role, description, client, status, featured, sortOrder, coverImage, scope, execution, results, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [p.slug, p.title, p.category, p.year, p.role, p.description, p.client, p.status, p.featured, p.sortOrder, p.coverImage, p.scope, p.execution, p.results]
    );
    console.log(`Inserted project: ${p.title}`);
  }
}

// Seed articles
const [artExisting] = await conn.query('SELECT COUNT(*) as count FROM articles');
if (artExisting[0].count > 0) {
  console.log(`Articles already seeded (${artExisting[0].count} rows). Skipping articles.`);
} else {
  // Check articles columns first
  const [artCols] = await conn.query('DESCRIBE articles');
  console.log('Articles columns:', artCols.map(c => c.Field).join(', '));

  const articles = [
    {
      slug: 'brand-is-not-a-logo',
      title: '브랜드는 로고가 아니다',
      category: '브랜드 전략',
      excerpt: '많은 사람들이 브랜드를 로고나 색상으로 생각합니다. 하지만 브랜드는 그보다 훨씬 깊은 곳에 있습니다.',
      content: '브랜드는 로고가 아니다\n\n많은 사람들이 브랜드를 로고나 색상으로 생각합니다. 하지만 브랜드는 그보다 훨씬 깊은 곳에 있습니다.\n\n브랜드란 무엇인가\n\n브랜드는 당신이 없을 때 사람들이 당신에 대해 하는 말입니다. 아마존의 제프 베조스가 한 말입니다. 이 정의가 중요한 이유는 브랜드가 외부에서 만들어지는 것이 아니라, 내부에서 시작해 외부로 전달되는 것임을 보여주기 때문입니다.\n\n전략이 먼저다\n\n브랜드를 만들기 전에 먼저 물어야 할 질문이 있습니다. 우리는 왜 존재하는가? 누구를 위해 존재하는가? 우리가 없다면 세상이 어떻게 달라지는가?',
      status: 'published',
      sortOrder: 1,
    },
    {
      slug: 'strategy-before-design',
      title: '전략이 디자인보다 먼저다',
      category: '브랜드 전략',
      excerpt: '아름다운 디자인은 강력한 전략 없이는 그저 장식에 불과합니다. 전략이 디자인을 이끌어야 합니다.',
      content: '전략이 디자인보다 먼저다\n\n아름다운 디자인은 강력한 전략 없이는 그저 장식에 불과합니다. 전략이 디자인을 이끌어야 합니다.\n\n디자인의 역할\n\n디자인은 전략을 시각화하는 도구입니다. 전략이 없는 디자인은 방향 없이 달리는 것과 같습니다. 아무리 빠르게 달려도 목적지에 도달할 수 없습니다.\n\n전략을 먼저 세우는 이유\n\n전략은 모든 결정의 기준이 됩니다. 어떤 색을 쓸지, 어떤 폰트를 선택할지, 어떤 이미지를 사용할지. 이 모든 결정이 전략에서 나와야 합니다.',
      status: 'published',
      sortOrder: 2,
    },
  ];

  for (const a of articles) {
    try {
      await conn.query(
        `INSERT INTO articles (slug, title, category, excerpt, content, status, sortOrder, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [a.slug, a.title, a.category, a.excerpt, a.content, a.status, a.sortOrder]
      );
      console.log(`Inserted article: ${a.title}`);
    } catch (e) {
      console.error(`Failed to insert article ${a.title}:`, e.message);
    }
  }
}

await conn.end();
console.log('Seed complete!');
