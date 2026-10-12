// ===== 설정값 =====
const demoScore = 876;   // 신용점수 (0 ~ 1000)
const showAds = true;    // 광고 영역 표시 여부

// 색상 만들기: 색상각(h)만 바꿔서 비슷한 톤의 색을 만든다
const tint = (h) => `oklch(0.62 0.14 ${h})`;

// ===== 데이터 =====
const careBanners = [
    { label: 'NEW', tag: '크레딧온케어', title: '피싱·해킹\n보상 혜택 강화', img: 'brand mark', bg: '#f5f6f7' },
    { label: 'EVENT', tag: '신용관리 챌린지', title: '30일 출석하고\n포인트 받기', img: 'calendar', bg: 'oklch(0.96 0.03 240)' },
    { label: 'TIP', tag: '신용점수 올리기', title: '통신비 납부내역\n제출하면 UP', img: 'phone', bg: 'oklch(0.97 0.03 85)' },
    { label: 'HOT', tag: '대출 비교', title: '금리 낮은 대출\n한 번에 비교', img: 'percent', bg: 'oklch(0.96 0.03 290)' },
];

const services = [
    { name: '점수 올리기', tint: '#066bfd' },
    { name: '연체방지', tint: tint(230) },
    { name: '신용조회차단', tint: tint(200) },
    { name: '명의도용차단', tint: tint(260) },
    { name: '대출가능진단', tint: tint(290), badge: 'N' },
    { name: '카드발급진단', tint: tint(245) },
    { name: '보험혜택진단', tint: tint(20) },
    { name: '이름어때', tint: tint(180), badge: 'HOT' },
];

const benefits = [
    { tag: '개인/커플/사업자/집주인', title: '내 신용을 제출할때\n신용보고서', img: 'report', bg: '#f1f3f6', fg: '#1d2126' },
    { tag: '#이름분석 #이름랭킹 #이름추천', title: '나와 똑같은 이름\n전국에 몇명?', img: 'emoji', bg: '#f1f3f6', fg: '#1d2126' },
    { tag: '신용점수 예측하기', title: '대출 신규로 받으면\n내 신용점수는?', img: 'chart', bg: 'oklch(0.5 0.16 290)', fg: '#fff' },
    { tag: '무료신용조회', title: '나의 신용점수\n무료로 조회해보세요', img: 'gauge', bg: '#f1f3f6', fg: '#1d2126' },
    { tag: '한빛저축은행 신용대출', title: '내 대출한도가\n도착했습니다!', img: 'bell', bg: 'oklch(0.97 0.02 40)', fg: '#1d2126' },
    { tag: '맞춤채무 조정', title: '해결되지 않는 연체\n회생파산 무료 진단', img: 'bank', bg: 'oklch(0.97 0.03 85)', fg: '#1d2126' },
];

const perks = [
    { tag: '맞춤형 카드상품', title: '내 신용에 맞는\n퍼스널카드 찾기!', img: 'mail', bg: 'oklch(0.96 0.03 350)', fg: '#1d2126' },
    { tag: '맞춤 채무조정 솔루션', title: '채무나 연체\n있으신가요?', img: 'mail', bg: 'oklch(0.96 0.03 240)', fg: '#1d2126' },
    { tag: '', title: '담보계산기로\n예측하기', img: '', bg: '#066bfd', fg: '#fff' },
    { tag: '맞춤형 대출상품', title: '내 신용점수로\n대출진단 받기', img: 'money bag', bg: 'oklch(0.96 0.03 290)', fg: '#1d2126' },
    { tag: '보험혜택진단', title: '나에게 맞는\n혜택 받기', img: 'coin', bg: 'oklch(0.97 0.03 85)', fg: '#1d2126' },
];

// ===== 크레딧온케어 배너 (Swiper 무한 루프) =====
const careBannersEl = document.querySelector('#care-banners');
for (const c of careBanners) {
    careBannersEl.innerHTML += `
        <a href="#" class="swiper-slide" style="background:${c.bg}">
            <span class="care-tag"><b>${c.label}</b> ${c.tag}</span>
            <span class="care-title">${c.title}</span>
            <span class="ph">${c.img}</span>
        </a>`;
}

new Swiper('.care-swiper', {
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { el: '.care-swiper .swiper-pagination', clickable: true },
});

// ===== 탭 메뉴 기능 =====
const scoreTabs = document.querySelectorAll('.score-tab');
const tabPanes = document.querySelectorAll('.tab-pane');
const scoreScores = {
    loan: 850,
    card: 720,
    overdue: 950
};

scoreTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');

        // 모든 탭의 active 클래스 제거
        scoreTabs.forEach(t => t.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // 클릭한 탭에 active 클래스 추가
        tab.classList.add('active');
        document.getElementById(`tab-${tabName}`).classList.add('active');
    });
});

// ===== 신용점수 보기/숨기기 =====
const scoreBtns = document.querySelectorAll('.score-btn');
let showScore = false;

scoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        showScore = !showScore;
        const scoreText = btn.querySelector('.slide-big');
        if (scoreText) {
            const scoreType = scoreText.getAttribute('data-score-type');
            scoreText.textContent = showScore ? String(scoreScores[scoreType]) : '?';
        }
    });
});

// ===== 서비스 아이콘 목록 =====
const servicesEl = document.querySelector('#services');
for (const s of services) {
    const badge = s.badge ? `<span class="badge">${s.badge}</span>` : '';
    servicesEl.innerHTML += `
        <a href="#" class="service">
            <span class="service-icon">
                <i style="background:${s.tint}"></i>
                ${badge}
            </span>
            ${s.name}
        </a>`;
}

// ===== 광고 표시 여부 =====
if (!showAds) {
    document.querySelector('#ads').style.display = 'none';
}

// ===== 혜택 정보 카드 =====
const benefitsEl = document.querySelector('#benefits');
for (const b of benefits) {
    benefitsEl.innerHTML += `
        <a href="#" class="benefit" style="background:${b.bg};color:${b.fg}">
            <span class="tag">${b.tag}</span>
            <span class="card-title">${b.title}</span>
            <span class="ph">${b.img}</span>
        </a>`;
}

// ===== 세상에 이런 혜택이 =====
const perksEl = document.querySelector('#perks');
for (const p of perks) {
    const img = p.img ? `<span class="ph">${p.img}</span>` : '';
    perksEl.innerHTML += `
        <a href="#" class="perk" style="background:${p.bg};color:${p.fg}">
            ${img}
            <span class="tag">${p.tag}</span>
            <span class="card-title">${p.title}</span>
        </a>`;
}

// ===== 검색 기능 =====
const searchInput = document.querySelector('.search-input');
const keywordTags = document.querySelectorAll('.keyword-tag');

keywordTags.forEach(tag => {
    tag.addEventListener('click', (e) => {
        e.preventDefault();
        searchInput.value = tag.textContent;
        searchInput.focus();
    });
});

// 검색 입력 이벤트
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        console.log('검색:', searchInput.value);
        // 검색 로직 추가 가능
    }
});
