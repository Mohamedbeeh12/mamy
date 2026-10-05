// تعيين السنة الحالية في الفوتر
document.getElementById('year').textContent = new Date().getFullYear();

// 1. نظام كلمة السر
const CORRECT_PASSWORDS = ['mom', 'أمي', 'امي', 'Mom'];

function checkPassword() {
    const input = document.getElementById('passwordInput').value.trim();
    const errorMsg = document.getElementById('errorMsg');
    const lockScreen = document.getElementById('lockScreen');

    if (CORRECT_PASSWORDS.includes(input)) {
        lockScreen.classList.add('unlocked');
        triggerConfetti();
    } else {
        errorMsg.style.display = 'block';
        const card = document.querySelector('.lock-card');
        card.style.transform = 'translateX(10px)';
        setTimeout(() => card.style.transform = 'translateX(-10px)', 100);
        setTimeout(() => card.style.transform = 'translateX(0)', 200);
    }
}

function handleKeyPress(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
}

// 2. خلفية الورد والقلوب المتساقطة
const heartsContainer = document.getElementById('hearts-container');
const symbols = ['❤️', '🌸', '💖', '🌹', '✨', '💕', '🌷'];

function createFloatingItem() {
    const item = document.createElement('div');
    item.classList.add('floating-item');
    item.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    
    item.style.left = Math.random() * 100 + 'vw';
    item.style.animationDuration = (Math.random() * 3 + 4) + 's';
    item.style.fontSize = (Math.random() * 15 + 15) + 'px';
    
    heartsContainer.appendChild(item);

    setTimeout(() => {
        item.remove();
    }, 7000);
}

setInterval(createFloatingItem, 400);


// 4. إضافة صور جديدة
function addNewMemory() {
    const title = document.getElementById('newTitle').value.trim();
    const text = document.getElementById('newText').value.trim();
    const fileInput = document.getElementById('newImageFile');

    if (!title || !text) {
        alert('الرجاء كتابة العنوان والرسالة أولاً ❤️');
        return;
    }

    let imgSrc = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600';

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            createMemoryCard(title, text, e.target.result);
        }
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        createMemoryCard(title, text, imgSrc);
    }

    document.getElementById('newTitle').value = '';
    document.getElementById('newText').value = '';
    fileInput.value = '';
}

function createMemoryCard(title, text, imgSrc) {
    const gallery = document.getElementById('galleryGrid');
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.innerHTML = `
        <div class="card-img-wrapper">
            <img src="${imgSrc}" alt="${title}">
        </div>
        <div class="card-content">
            <h3 class="card-title">${title}</h3>
            <p class="card-text">${text}</p>
            <div class="card-footer-info">
                <span>❤ أضيفت بحب</span>
                <span>ذكرى جديدة</span>
            </div>
        </div>
    `;
    gallery.prepend(card);
    triggerConfetti();
}

// 5. التأثيرات الاحتفالية والمفاجأة
function triggerSurprise() {
    triggerConfetti();
    alert('أحبكِ يا أمي من كل قلبي! أنتِ أجمل ما في حياتي ❤️✨');
}

function triggerConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#e63946', '#ff758f', '#ffb703', '#ffffff']
        });
    }
}