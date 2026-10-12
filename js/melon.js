// ===== 설정값 =====
const PAGE_SIZE = 20;   // 더보기 한 번에 보여줄 곡 수

const chartEl = document.querySelector('#chart');
const countEl = document.querySelector('#count');
const emptyEl = document.querySelector('#empty');
const moreBtn = document.querySelector('#more');
const searchInput = document.querySelector('#search');

let songs = [];
let filtered = [];
let shown = PAGE_SIZE;

// 45094 → 45.1k
const formatLikes = (n) => n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n);

// 120px 썸네일을 카드 크기에 맞게 더 큰 이미지로 요청
const bigCover = (url) => url.replace('/resize/120/', '/resize/350/');

function render() {
    const list = filtered.slice(0, shown);
    chartEl.innerHTML = list.map((s) => `
        <li class="song">
            <a href="#" class="cover">
                <img src="${bigCover(s.albumCover)}" alt="${s.title} 앨범 커버" loading="lazy">
                <span class="rank">${s.rank}</span>
                ${s.rank <= 3 ? '<span class="top-badge">TOP<br>3</span>' : ''}
            </a>
            <div class="song-title">
                ${s.rank <= 10 ? '<span class="label">HOT</span>' : ''}
                <strong title="${s.title}">${s.title}</strong>
            </div>
            <p class="artist">${s.artist}</p>
            <div class="actions">
                <button type="button" class="like"><span class="heart">♥</span>${formatLikes(s.likes)}</button>
                <button type="button" class="play">듣기</button>
            </div>
        </li>`).join('');

    countEl.textContent = filtered.length;
    emptyEl.hidden = filtered.length > 0;
    moreBtn.hidden = shown >= filtered.length;
}

// 좋아요 토글
chartEl.addEventListener('click', (e) => {
    const like = e.target.closest('.like');
    if (like) like.classList.toggle('on');
});

// 더보기
moreBtn.addEventListener('click', () => {
    shown += PAGE_SIZE;
    render();
});

// 검색 (곡명 / 아티스트)
searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    filtered = songs.filter((s) => `${s.title} ${s.artist}`.toLowerCase().includes(q));
    shown = PAGE_SIZE;
    render();
});

// 데이터 불러오기
fetch('melon.json')
    .then((res) => res.json())
    .then((data) => {
        songs = data;
        filtered = data;
        render();
    })
    .catch(() => {
        chartEl.innerHTML = '<p class="empty">melon.json을 불러오지 못했습니다. Live Server 등 로컬 서버로 열어 주세요.</p>';
    });
