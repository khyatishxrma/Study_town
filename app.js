/* -------------------------------------------------------------------
 * 0. SHARED PIXEL-ART ANIMAL RENDERER (USED IN AVATAR STUDIO & ROOM)
 * ------------------------------------------------------------------- */
function drawPixelAnimal(ctx, x, y, scale, options) {
    const { species = 'shiba', accessory = 'none', scarf = '#52795d', bob = 0 } = options;
    ctx.save();
    ctx.translate(x, y + bob);
    ctx.scale(scale, scale);

    const palettes = {
        shiba:     { body: '#e5a358', belly: '#fff6e5', ear: '#b87432', muzzle: '#fff6e5' },
        cat:       { body: '#f7f3eb', belly: '#ffffff', ear: '#d98a5f', muzzle: '#ffffff', spot: '#4a3b32' },
        bunny:     { body: '#ffffff', belly: '#fff5f7', ear: '#f4acb7', muzzle: '#ffffff', bow: '#f472b6' },
        panda:     { body: '#d96b38', belly: '#3d2c2e', ear: '#fff6e5', muzzle: '#fff6e5', mask: '#7c2d12' },
        retriever: { body: '#eab676', belly: '#faedcd', ear: '#c68b45', muzzle: '#faedcd' }
    };
    const pal = palettes[species] || palettes.shiba;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.beginPath();
    ctx.ellipse(0, 14, 13, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ears
    ctx.fillStyle = pal.ear;
    ctx.strokeStyle = '#3d2e22';
    ctx.lineWidth = 1.6;
    if (species === 'bunny') {
        ctx.beginPath();
        ctx.roundRect(-8, -28, 5, 15, 2.5);
        ctx.roundRect(3, -28, 5, 15, 2.5);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = pal.bow;
        ctx.fillRect(-9, -18, 4, 3);
        ctx.fillRect(5, -18, 4, 3);
    } else if (species === 'retriever') {
        ctx.beginPath();
        ctx.roundRect(-14, -12, 5, 13, 2.5);
        ctx.roundRect(9, -12, 5, 13, 2.5);
        ctx.fill();
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(-10, -11); ctx.lineTo(-7, -20); ctx.lineTo(-2, -12);
        ctx.moveTo(10, -11);  ctx.lineTo(7, -20);  ctx.lineTo(2, -12);
        ctx.fill();
        ctx.stroke();
    }

    // Main Body & Head
    ctx.fillStyle = pal.body;
    ctx.beginPath();
    ctx.roundRect(-11, -13, 22, 25, 8);
    ctx.fill();
    ctx.stroke();

    if (species === 'cat') {
        ctx.fillStyle = pal.spot;
        ctx.beginPath();
        ctx.arc(6, -8, 4.5, 0, Math.PI * 2);
        ctx.fill();
    }

    // Muzzle
    ctx.fillStyle = pal.muzzle;
    ctx.beginPath();
    ctx.ellipse(0, -2, 7.5, 5.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cozy Scarf
    ctx.fillStyle = scarf;
    ctx.beginPath();
    ctx.roundRect(-11, 2, 22, 4.5, 2);
    ctx.fill();
    ctx.fillRect(3, 5, 4, 6);

    // Eyes & Nose
    ctx.fillStyle = '#2d241e';
    ctx.beginPath();
    ctx.arc(-4.2, -5, 1.6, 0, Math.PI * 2);
    ctx.arc(4.2, -5, 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-1.5, -2.5, 3, 2);

    // Rosy Cheeks
    ctx.fillStyle = '#f4978e';
    ctx.beginPath();
    ctx.arc(-7, -2.2, 2, 0, Math.PI * 2);
    ctx.arc(7, -2.2, 2, 0, Math.PI * 2);
    ctx.fill();

    // Accessories
    if (accessory === 'headphones') {
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, -8, 12.5, Math.PI, 0);
        ctx.stroke();
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(-14, -9, 3.5, 7);
        ctx.fillRect(10.5, -9, 3.5, 7);
    } else if (accessory === 'sprout') {
        ctx.strokeStyle = '#3d6b47';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(0, -13); ctx.lineTo(0, -20);
        ctx.stroke();
        ctx.fillStyle = '#52b788';
        ctx.beginPath();
        ctx.ellipse(-4, -20, 4, 2.2, -0.3, 0, Math.PI * 2);
        ctx.ellipse(4, -20, 4, 2.2, 0.3, 0, Math.PI * 2);
        ctx.fill();
    } else if (accessory === 'glasses') {
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1.4;
        ctx.strokeRect(-7.5, -7.5, 6, 4.5);
        ctx.strokeRect(1.5, -7.5, 6, 4.5);
        ctx.beginPath();
        ctx.moveTo(-1.5, -5.5); ctx.lineTo(1.5, -5.5);
        ctx.stroke();
    } else if (accessory === 'wizard') {
        ctx.fillStyle = '#4c1d95';
        ctx.beginPath();
        ctx.moveTo(-13, -12);
        ctx.lineTo(13, -12);
        ctx.lineTo(0, -28);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(-9, -14, 18, 2.5);
    }

    ctx.restore();
}

/* -------------------------------------------------------------------
 * 1. ONBOARDING, ACCOUNT CREATION & AVATAR STUDIO MANAGER
 * ------------------------------------------------------------------- */
const onboardingApp = {
    profile: JSON.parse(localStorage.getItem('st_user_profile') || 'null') || {
        name: 'Khyati',
        username: 'khyati_os',
        major: 'Operating Systems & Kernel Dev',
        species: 'shiba',
        accessory: 'headphones',
        scarf: '#52795d',
        initialized: false
    },
    previewFrame: 0,
    previewAnimId: null,

    init() {
        document.getElementById('obDisplayName').value = this.profile.name;
        document.getElementById('obUsername').value = this.profile.username;
        document.getElementById('obMajor').value = this.profile.major;

        this.updateSelectionButtons();
        this.updatePreviewTag();
        this.applyProfileToWorld();

        if (this.profile.initialized) {
            document.getElementById('onboardingOverlay').classList.add('hidden');
        } else {
            this.startPreviewLoop();
        }
    },
    openEditor() {
        document.getElementById('onboardingFormStep').classList.remove('hidden');
        document.getElementById('onboardingBootStep').classList.add('hidden');
        const overlay = document.getElementById('onboardingOverlay');
        overlay.classList.remove('hidden', 'opacity-0');
        this.startPreviewLoop();
    },
    setSpecies(sp) {
        this.profile.species = sp;
        this.updateSelectionButtons();
    },
    setAccessory(acc) {
        this.profile.accessory = acc;
        this.updateSelectionButtons();
    },
    setScarf(color) {
        this.profile.scarf = color;
        this.updateSelectionButtons();
    },
    updatePreviewTag() {
        const nameVal = document.getElementById('obDisplayName').value.trim() || 'Student';
        document.getElementById('previewNameTag').textContent = `${nameVal} • NEW`;
    },
    updateSelectionButtons() {
        document.querySelectorAll('.species-btn').forEach(btn => {
            const active = btn.dataset.species === this.profile.species;
            btn.className = `species-btn px-2 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${active ? 'bg-sage-600 text-white border-sage-700 shadow-xs' : 'bg-white text-[#4a4338] border-cream-300 hover:bg-cream-200/60'}`;
        });
        document.querySelectorAll('.acc-btn').forEach(btn => {
            const active = btn.dataset.acc === this.profile.accessory;
            btn.className = `acc-btn px-3 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${active ? 'bg-sage-600 text-white border-sage-700' : 'bg-white text-[#4a4338] border-cream-300 hover:bg-cream-200/60'}`;
        });
        document.querySelectorAll('.scarf-btn').forEach(btn => {
            const active = btn.dataset.color === this.profile.scarf;
            btn.classList.toggle('ring-2', active);
            btn.classList.toggle('ring-offset-2', active);
            btn.classList.toggle('ring-sage-600', active);
        });
    },
    startPreviewLoop() {
        cancelAnimationFrame(this.previewAnimId);
        const canvas = document.getElementById('avatarPreviewCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const render = () => {
            this.previewFrame++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#b8cbb4';
            ctx.beginPath();
            ctx.ellipse(88, 134, 48, 14, 0, 0, Math.PI * 2);
            ctx.fill();

            const bob = Math.sin(this.previewFrame * 0.08) * 3.5;
            drawPixelAnimal(ctx, 88, 96, 2.7, {
                species: this.profile.species,
                accessory: this.profile.accessory,
                scarf: this.profile.scarf,
                bob
            });
            this.previewAnimId = requestAnimationFrame(render);
        };
        render();
    },
    submitProfile(e) {
        e.preventDefault();
        this.profile.name = document.getElementById('obDisplayName').value.trim() || 'Student';
        this.profile.username = document.getElementById('obUsername').value.trim() || 'student_os';
        this.profile.major = document.getElementById('obMajor').value;
        this.profile.initialized = true;
        localStorage.setItem('st_user_profile', JSON.stringify(this.profile));

        this.applyProfileToWorld();
        this.runKernelBootAnimation();
    },
    applyProfileToWorld() {
        document.getElementById('hudUserBadge').textContent = `PID 101 • ${this.profile.name}`;
        document.getElementById('hudProfileBtnName').textContent = this.profile.name;

        if (typeof greenhouse !== 'undefined') {
            const userAvatar = greenhouse.avatars.find(a => a.isUser);
            if (userAvatar) {
                userAvatar.name = this.profile.name;
                userAvatar.species = this.profile.species;
                userAvatar.accessory = this.profile.accessory;
                userAvatar.scarf = this.profile.scarf;
            }
            const frame = greenhouse.frames.find(f => f.pid === 101);
            if (frame) {
                frame.occupant = `${this.profile.name} (${this.profile.species})`;
            }
        }
    },
    runKernelBootAnimation() {
        document.getElementById('onboardingFormStep').classList.add('hidden');
        document.getElementById('onboardingBootStep').classList.remove('hidden');

        const consoleEl = document.getElementById('bootConsoleLines');
        const barEl = document.getElementById('bootProgressBar');
        consoleEl.innerHTML = '';

        const steps = [
            { pct: '28%', text: `[0.041] fork() -> Spawned child process PID #101 (@${this.profile.username})` },
            { pct: '56%', text: `[0.118] mmu_alloc() -> Mapped Frame #3 in Greenhouse RAM` },
            { pct: '84%', text: `[0.205] load_sprite() -> Loaded ${this.profile.species} + ${this.profile.accessory}` },
            { pct: '100%', text: `[0.312] exec("/bin/studytown") -> Ready to study!` }
        ];

        steps.forEach((step, idx) => {
            setTimeout(() => {
                consoleEl.innerHTML += `<div class="text-emerald-300">${step.text}</div>`;
                barEl.style.width = step.pct;
            }, idx * 340);
        });

        setTimeout(() => {
            cancelAnimationFrame(this.previewAnimId);
            const overlay = document.getElementById('onboardingOverlay');
            overlay.classList.add('opacity-0');
            setTimeout(() => {
                overlay.classList.add('hidden');
                logKernel('EXEC_USER', `PID 101 (${this.profile.name}) entered Study Town [${this.profile.major}]`);
                greenhouse.triggerUserEmote('👋');
            }, 450);
        }, 1550);
    }
};

/* -------------------------------------------------------------------
 * A. DMESG KERNEL LOGGER
 * ------------------------------------------------------------------- */
const kernelLogs = [
    '[00:00:01] INIT: Study Town Kernel v2.4 booted successfully',
    '[00:00:02] MMU: Initialized 12 Desk Memory Frames (F#0 - F#11)',
    '[00:00:03] SEM: Espresso_Mutex initialized (val=1)',
    '[00:00:04] SEM: Window_Sofa_Sem initialized (val=3)'
];

function logKernel(tag, msg) {
    const now = new Date().toTimeString().split(' ')[0];
    const entry = `[${now}] ${tag}: ${msg}`;
    kernelLogs.unshift(entry);
    if (kernelLogs.length > 40) kernelLogs.pop();

    const ticker = document.getElementById('dmesgTickerText');
    if (ticker) ticker.textContent = entry;

    const logBox = document.getElementById('kernelLogBox');
    if (logBox) {
        logBox.innerHTML = kernelLogs.map(l => `<div class="border-b border-white/5 pb-1">${l}</div>`).join('');
    }
}

function showToast(message) {
    const toast = document.getElementById('toastBox');
    const toastText = document.getElementById('toastText');
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
        toast.classList.add('hidden');
    }, 3400);
}

/* -------------------------------------------------------------------
 * B. MODAL MANAGER
 * ------------------------------------------------------------------- */
const modalManager = {
    open(id) {
        this.closeAll();
        const el = document.getElementById(id);
        if (el) {
            el.classList.remove('hidden');
            if (id === 'osMonitorModal') osMonitor.render();
            if (id === 'schedulerModal') osScheduler.render();
            if (id === 'flashcardsModal') flashcardsApp.render();
            if (id === 'notesModal') notesApp.render();
        }
    },
    close(id) {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    },
    closeAll() {
        ['statsModal', 'flashcardsModal', 'notesModal', 'schedulerModal', 'osMonitorModal'].forEach(id => {
            this.close(id);
        });
    }
};

/* -------------------------------------------------------------------
 * C. POMODORO / CPU BURST TIMER
 * ------------------------------------------------------------------- */
const studyTimer = {
    totalSeconds: 25 * 60,
    remaining: 25 * 60,
    running: false,
    interval: null,
    activeTaskName: 'OS Kernel Study',

    init() {
        this.updateDisplay();
    },
    toggle() {
        if (this.running) {
            this.pause();
        } else {
            this.start();
        }
    },
    start() {
        if (this.running) return;
        this.running = true;
        document.getElementById('timerToggleBtn').textContent = 'Pause';
        greenhouse.setUserState('RUNNING');
        logKernel('IRQ_START', `CPU Burst started (${Math.ceil(this.remaining / 60)}m) on "${this.activeTaskName}"`);

        this.interval = setInterval(() => {
            if (this.remaining > 0) {
                this.remaining--;
                this.updateDisplay();
            } else {
                this.complete();
            }
        }, 1000);
    },
    pause() {
        this.running = false;
        clearInterval(this.interval);
        document.getElementById('timerToggleBtn').textContent = 'Start';
        greenhouse.setUserState('READY');
        logKernel('IRQ_PAUSE', 'CPU Burst paused; process moved to READY queue');
    },
    reset(mins = 25, taskName = null) {
        this.pause();
        this.totalSeconds = mins * 60;
        this.remaining = mins * 60;
        if (taskName) this.activeTaskName = taskName;
        this.updateDisplay();
    },
    complete() {
        this.pause();
        greenhouse.setUserState('WAITING');
        greenhouse.triggerUserEmote('🎉');
        const coinsEl = document.getElementById('hudCoins');
        if (coinsEl) {
            const current = parseInt(coinsEl.textContent.replace(/,/g, ''), 10) || 1250;
            coinsEl.textContent = (current + 50).toLocaleString();
        }
        showToast('CPU Burst Complete! +50 Focus Coins earned. Time for a Context Switch break.');
        logKernel('CTX_SWITCH', 'Time quantum expired! Context switch -> Break (WAITING)');
        this.remaining = this.totalSeconds;
        this.updateDisplay();
    },
    updateDisplay() {
        const m = String(Math.floor(this.remaining / 60)).padStart(2, '0');
        const s = String(this.remaining % 60).padStart(2, '0');
        const display = document.getElementById('timerDisplay');
        if (display) display.textContent = `${m}:${s}`;
    }
};

/* -------------------------------------------------------------------
 * D. LO-FI AMBIENT AUDIO SYNTHESIZER (WEB AUDIO API)
 * ------------------------------------------------------------------- */
const lofiPlayer = {
    ctx: null,
    playing: false,
    chordTimer: null,
    rainNode: null,
    rainActive: false,
    trackIdx: 0,
    tracks: [
        { title: 'rain on mars - Kummel', chords: [[261.63, 329.63, 392.00, 493.88], [220.00, 261.63, 329.63, 392.00], [174.61, 220.00, 261.63, 329.63], [196.00, 246.94, 293.66, 349.23]] },
        { title: 'kernel lullaby - PageFault', chords: [[293.66, 349.23, 440.00, 523.25], [196.00, 246.94, 293.66, 349.23], [261.63, 329.63, 392.00, 493.88], [220.00, 261.63, 329.63, 392.00]] },
        { title: 'greenhouse tea - Mutex', chords: [[174.61, 220.00, 261.63, 329.63], [164.81, 196.00, 246.94, 293.66], [146.83, 174.61, 220.00, 261.63], [196.00, 246.94, 293.66, 349.23]] }
    ],
    ensureCtx() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') this.ctx.resume();
    },
    togglePlay() {
        this.ensureCtx();
        if (this.playing) {
            this.playing = false;
            clearInterval(this.chordTimer);
            document.getElementById('playPauseIcon').className = 'fa-solid fa-play ml-0.5';
        } else {
            this.playing = true;
            document.getElementById('playPauseIcon').className = 'fa-solid fa-pause';
            let step = 0;
            const playStep = () => {
                if (!this.playing) return;
                const track = this.tracks[this.trackIdx];
                const notes = track.chords[step % track.chords.length];
                this.playWarmChord(notes);
                step++;
            };
            playStep();
            this.chordTimer = setInterval(playStep, 2600);
        }
    },
    playWarmChord(freqs) {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        freqs.forEach(f => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, now);
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(680, now);

            gain.gain.setValueAtTime(0.001, now);
            gain.gain.exponentialRampToValueAtTime(0.035, now + 0.35);
            gain.gain.exponentialRampToValueAtTime(0.0008, now + 2.4);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 2.5);
        });
    },
    nextTrack() {
        this.trackIdx = (this.trackIdx + 1) % this.tracks.length;
        document.getElementById('trackTitle').textContent = this.tracks[this.trackIdx].title;
    },
    prevTrack() {
        this.trackIdx = (this.trackIdx - 1 + this.tracks.length) % this.tracks.length;
        document.getElementById('trackTitle').textContent = this.tracks[this.trackIdx].title;
    },
    toggleRain() {
        this.ensureCtx();
        const btn = document.getElementById('rainToggleBtn');
        if (this.rainActive) {
            this.rainActive = false;
            if (this.rainNode) {
                try { this.rainNode.stop(); } catch (e) {}
                this.rainNode = null;
            }
            btn.classList.remove('text-sky-300');
            btn.classList.add('text-cream-300');
        } else {
            this.rainActive = true;
            const bufferSize = this.ctx.sampleRate * 2;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;
            noise.loop = true;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 420;

            const gain = this.ctx.createGain();
            gain.gain.value = 0.03;

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);
            noise.start();
            this.rainNode = noise;
            btn.classList.remove('text-cream-300');
            btn.classList.add('text-sky-300');
        }
    }
};

/* -------------------------------------------------------------------
 * E. FLASHCARDS DECK STUDIO
 * ------------------------------------------------------------------- */
const flashcardsApp = {
    decks: JSON.parse(localStorage.getItem('st_flashcards') || 'null') || [
        {
            id: 'os-core',
            name: 'Operating Systems Core',
            cards: [
                { q: 'What is a Process Control Block (PCB)?', a: 'A kernel data structure storing process state, PID, program counter, CPU registers, and memory limits.', mastered: false },
                { q: 'Difference between Mutex and Counting Semaphore?', a: 'A Mutex is a binary lock (0 or 1) owned by one thread; a Counting Semaphore tracks N identical resources.', mastered: false },
                { q: 'What causes Thrashing in Virtual Memory?', a: 'Excessive paging where the OS spends more time swapping pages between RAM and disk than executing instructions.', mastered: false }
            ]
        }
    ],
    activeDeckIdx: 0,
    cardIdx: 0,
    flipped: false,

    save() {
        localStorage.setItem('st_flashcards', JSON.stringify(this.decks));
    },
    render() {
        const deck = this.decks[this.activeDeckIdx] || this.decks[0];
        const deckListEl = document.getElementById('deckListContainer');
        if (deckListEl) {
            deckListEl.innerHTML = this.decks.map((d, i) => `
                <button onclick="flashcardsApp.selectDeck(${i})" class="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${i === this.activeDeckIdx ? 'bg-sage-600 text-white' : 'bg-white/80 text-[#4a4338] hover:bg-cream-200'}">
                    <span class="truncate">${d.name}</span>
                    <span class="text-[10px] opacity-80">${d.cards.length}</span>
                </button>
            `).join('');
        }

        const titleEl = document.getElementById('activeDeckTitle');
        const counterEl = document.getElementById('cardCounter');
        const frontEl = document.getElementById('cardFrontText');
        const backEl = document.getElementById('cardBackText');
        const cardInner = document.getElementById('flashcardInner');

        if (titleEl) titleEl.textContent = deck.name;
        if (cardInner) cardInner.classList.toggle('flipped', this.flipped);

        if (deck.cards.length === 0) {
            if (counterEl) counterEl.textContent = '0 / 0 Cards';
            if (frontEl) frontEl.textContent = 'No cards in this deck yet. Add one below!';
            if (backEl) backEl.textContent = 'Add cards using the form below.';
            return;
        }

        if (this.cardIdx >= deck.cards.length) this.cardIdx = 0;
        const card = deck.cards[this.cardIdx];
        if (counterEl) counterEl.textContent = `Card ${this.cardIdx + 1} of ${deck.cards.length} ${card.mastered ? '• ★ Mastered' : ''}`;
        if (frontEl) frontEl.textContent = card.q;
        if (backEl) backEl.textContent = card.a;
    },
    selectDeck(idx) {
        this.activeDeckIdx = idx;
        this.cardIdx = 0;
        this.flipped = false;
        this.render();
    },
    createDeck() {
        const input = document.getElementById('newDeckNameInput');
        const name = input.value.trim();
        if (!name) return;
        this.decks.push({ id: 'deck-' + Date.now(), name, cards: [] });
        input.value = '';
        this.activeDeckIdx = this.decks.length - 1;
        this.cardIdx = 0;
        this.flipped = false;
        this.save();
        this.render();
    },
    addCard(e) {
        e.preventDefault();
        const qInput = document.getElementById('newCardFront');
        const aInput = document.getElementById('newCardBack');
        const q = qInput.value.trim();
        const a = aInput.value.trim();
        if (!q || !a) return;
        this.decks[this.activeDeckIdx].cards.push({ q, a, mastered: false });
        qInput.value = '';
        aInput.value = '';
        this.cardIdx = this.decks[this.activeDeckIdx].cards.length - 1;
        this.flipped = false;
        this.save();
        this.render();
        showToast('Flashcard added to deck!');
    },
    flipCard() {
        this.flipped = !this.flipped;
        const cardInner = document.getElementById('flashcardInner');
        if (cardInner) cardInner.classList.toggle('flipped', this.flipped);
    },
    nextCard() {
        const deck = this.decks[this.activeDeckIdx];
        if (!deck || deck.cards.length === 0) return;
        this.cardIdx = (this.cardIdx + 1) % deck.cards.length;
        this.flipped = false;
        this.render();
    },
    prevCard() {
        const deck = this.decks[this.activeDeckIdx];
        if (!deck || deck.cards.length === 0) return;
        this.cardIdx = (this.cardIdx - 1 + deck.cards.length) % deck.cards.length;
        this.flipped = false;
        this.render();
    },
    markMastered() {
        const deck = this.decks[this.activeDeckIdx];
        if (!deck || deck.cards.length === 0) return;
        deck.cards[this.cardIdx].mastered = true;
        this.save();
        const coinsEl = document.getElementById('hudCoins');
        if (coinsEl) {
            const current = parseInt(coinsEl.textContent.replace(/,/g, ''), 10) || 1250;
            coinsEl.textContent = (current + 10).toLocaleString();
        }
        showToast('Card Mastered! +10 Focus Coins');
        this.nextCard();
    }
};

/* -------------------------------------------------------------------
 * F. SMART NOTES KEEPING SPACE
 * ------------------------------------------------------------------- */
const notesApp = {
    notes: JSON.parse(localStorage.getItem('st_notes') || 'null') || [
        {
            id: 'note-1',
            title: 'CPU Scheduling Formulas',
            tag: 'OS Kernel',
            body: '• Turnaround Time (TAT) = Completion Time - Arrival Time\n• Waiting Time (WT) = Turnaround Time - Burst Time\n• SJF minimizes average waiting time for a given set of processes.\n• Round Robin uses Time Quantum (q) to prevent starvation.'
        },
        {
            id: 'note-2',
            title: 'Deadlock 4 Necessary Conditions',
            tag: 'Synchronization',
            body: '1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait\n(Coffman Conditions)'
        }
    ],
    activeIdx: 0,

    save() {
        localStorage.setItem('st_notes', JSON.stringify(this.notes));
    },
    render() {
        const listEl = document.getElementById('notesListContainer');
        if (listEl) {
            listEl.innerHTML = this.notes.map((n, i) => `
                <button onclick="notesApp.selectNote(${i})" class="w-full text-left p-2.5 rounded-xl transition cursor-pointer ${i === this.activeIdx ? 'bg-sage-600 text-white' : 'bg-white/80 text-[#2d2a26] hover:bg-cream-200'}">
                    <div class="text-xs font-bold truncate">${n.title || 'Untitled Note'}</div>
                    <div class="text-[10px] opacity-75 truncate mt-0.5">${n.tag}</div>
                </button>
            `).join('');
        }
        const note = this.notes[this.activeIdx];
        if (note) {
            document.getElementById('noteTitleInput').value = note.title;
            document.getElementById('noteTagInput').value = note.tag;
            document.getElementById('noteBodyInput').value = note.body;
        }
    },
    selectNote(idx) {
        this.activeIdx = idx;
        this.render();
    },
    createNote() {
        this.notes.unshift({
            id: 'note-' + Date.now(),
            title: 'New Study Note',
            tag: 'General',
            body: ''
        });
        this.activeIdx = 0;
        this.save();
        this.render();
    },
    saveCurrent() {
        const note = this.notes[this.activeIdx];
        if (!note) return;
        note.title = document.getElementById('noteTitleInput').value;
        note.tag = document.getElementById('noteTagInput').value;
        note.body = document.getElementById('noteBodyInput').value;
        this.save();
        this.render();
    },
    pinToHud() {
        const note = this.notes[this.activeIdx];
        if (!note) return;
        document.getElementById('pinnedNoteTitle').textContent = note.title || 'Study Note';
        document.getElementById('pinnedNoteBody').textContent = note.body || '(Empty note)';
        document.getElementById('pinnedNoteWidget').classList.remove('hidden');
        modalManager.close('notesModal');
        showToast('Note pinned to your greenhouse desk HUD!');
    },
    unpinFromHud() {
        document.getElementById('pinnedNoteWidget').classList.add('hidden');
    }
};

/* -------------------------------------------------------------------
 * G. OS CPU PROCESS SCHEDULER & GANTT CHART
 * ------------------------------------------------------------------- */
const osScheduler = {
    algorithm: 'FCFS',
    processes: [
        { pid: 201, name: 'Read Paging Chapter', burst: 20, priority: 2 },
        { pid: 202, name: 'Flashcard Drill: Mutex', burst: 10, priority: 1 },
        { pid: 203, name: 'Solve Banker Algo Lab', burst: 25, priority: 3 }
    ],
    nextPid: 204,

    setAlgorithm(alg) {
        this.algorithm = alg;
        document.querySelectorAll('.sched-alg-btn').forEach(btn => {
            const active = btn.dataset.alg === alg;
            btn.className = `sched-alg-btn px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${active ? 'bg-sage-600 text-white' : 'text-[#5c5346] hover:bg-cream-200'}`;
        });
        logKernel('SCHED_ALG', `CPU Scheduler policy switched to ${alg}`);
        this.render();
    },
    addProcess(e) {
        e.preventDefault();
        const name = document.getElementById('procNameInput').value.trim();
        const burst = parseInt(document.getElementById('procBurstInput').value, 10) || 15;
        const priority = parseInt(document.getElementById('procPriorityInput').value, 10) || 2;
        if (!name) return;

        this.processes.push({ pid: this.nextPid++, name, burst, priority });
        document.getElementById('procNameInput').value = '';
        logKernel('FORK_TASK', `Added PID ${this.nextPid - 1} "${name}" (Burst=${burst}m, P=${priority})`);
        this.render();
    },
    removeProcess(pid) {
        this.processes = this.processes.filter(p => p.pid !== pid);
        this.render();
    },
    dispatchProcess(pid) {
        const proc = this.processes.find(p => p.pid === pid);
        if (!proc) return;
        studyTimer.reset(proc.burst, proc.name);
        studyTimer.start();
        modalManager.close('schedulerModal');
        showToast(`Dispatched PID ${proc.pid} (${proc.name}) to CPU Timer!`);
    },
    computeSchedule() {
        const list = this.processes.map(p => ({ ...p }));
        if (list.length === 0) return { gantt: [], avgWait: 0, ordered: [] };

        if (this.algorithm === 'SJF') {
            list.sort((a, b) => a.burst - b.burst);
        } else if (this.algorithm === 'PRIORITY') {
            list.sort((a, b) => a.priority - b.priority);
        }

        const gantt = [];
        let currentTime = 0;
        let totalWait = 0;

        if (this.algorithm === 'RR') {
            const quantum = 25;
            const queue = list.map(p => ({ ...p, rem: p.burst, lastEnd: 0, wait: 0 }));
            while (queue.length > 0) {
                const curr = queue.shift();
                curr.wait += currentTime - curr.lastEnd;
                const exec = Math.min(quantum, curr.rem);
                gantt.push({ pid: curr.pid, name: curr.name, start: currentTime, end: currentTime + exec, dur: exec });
                currentTime += exec;
                curr.rem -= exec;
                curr.lastEnd = currentTime;
                if (curr.rem > 0) {
                    queue.push(curr);
                } else {
                    totalWait += curr.wait;
                }
            }
        } else {
            for (const proc of list) {
                totalWait += currentTime;
                gantt.push({ pid: proc.pid, name: proc.name, start: currentTime, end: currentTime + proc.burst, dur: proc.burst });
                currentTime += proc.burst;
            }
        }

        return {
            gantt,
            avgWait: +(totalWait / list.length).toFixed(1),
            ordered: list
        };
    },
    render() {
        const { gantt, avgWait, ordered } = this.computeSchedule();
        const avgEl = document.getElementById('avgWaitMetric');
        if (avgEl) avgEl.textContent = `${avgWait}m`;

        const queueEl = document.getElementById('readyQueueList');
        if (queueEl) {
            queueEl.innerHTML = ordered.map(p => `
                <div class="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-cream-300 text-xs">
                    <div class="flex items-center gap-2 min-w-0">
                        <span class="font-mono font-bold px-2 py-0.5 rounded bg-[#eef3ee] text-sage-700">PID ${p.pid}</span>
                        <span class="font-semibold truncate">${p.name}</span>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                        <span class="font-mono text-[11px] text-[#6e6456]">${p.burst}m • P${p.priority}</span>
                        <button onclick="osScheduler.dispatchProcess(${p.pid})" class="px-2.5 py-1 rounded-full bg-sage-600 hover:bg-sage-700 text-white text-[11px] font-bold cursor-pointer">Run</button>
                        <button onclick="osScheduler.removeProcess(${p.pid})" class="text-rose-500 hover:text-rose-700 px-1 cursor-pointer"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `).join('');
        }

        const ganttEl = document.getElementById('ganttChartContainer');
        const colors = ['bg-sage-600', 'bg-amber-600', 'bg-sky-600', 'bg-purple-600', 'bg-rose-600'];
        if (ganttEl) {
            if (gantt.length === 0) {
                ganttEl.innerHTML = '<div class="text-xs text-[#7a7060] p-2">Ready queue is empty.</div>';
                return;
            }
            ganttEl.innerHTML = gantt.map(block => `
                <div style="flex-grow: ${block.dur}; min-width: 72px;" class="${colors[block.pid % colors.length]} text-white rounded-xl p-2 flex flex-col justify-between shadow-xs">
                    <div class="font-mono text-[10px] font-bold">PID ${block.pid}</div>
                    <div class="text-[11px] font-semibold truncate">${block.name}</div>
                    <div class="font-mono text-[9px] opacity-85 mt-1">${block.start}m → ${block.end}m</div>
                </div>
            `).join('');
        }
    }
};

/* -------------------------------------------------------------------
 * H. OS KERNEL MONITOR (SEMAPHORES & PAGE TABLE)
 * ------------------------------------------------------------------- */
const osMonitor = {
    render() {
        const esp = greenhouse.semaphores.espresso;
        const sofa = greenhouse.semaphores.sofa;
        const semEl = document.getElementById('semaphoreStatusList');
        if (semEl) {
            semEl.innerHTML = `
                <div class="p-3 rounded-xl bg-white border border-cream-300 text-xs space-y-1">
                    <div class="flex items-center justify-between font-bold">
                        <span>☕ ${esp.name}</span>
                        <span class="font-mono px-2 py-0.5 rounded ${esp.count > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">val = ${esp.count}</span>
                    </div>
                    <div class="text-[11px] text-[#6e6456]">Holder: ${esp.holder || 'None (Unlocked)'}</div>
                </div>
                <div class="p-3 rounded-xl bg-white border border-cream-300 text-xs space-y-1">
                    <div class="flex items-center justify-between font-bold">
                        <span>🌿 ${sofa.name}</span>
                        <span class="font-mono px-2 py-0.5 rounded bg-sky-100 text-sky-800">val = ${sofa.count}/${sofa.max}</span>
                    </div>
                    <div class="text-[11px] text-[#6e6456]">Holders: ${sofa.holders.join(', ') || 'Empty'}</div>
                </div>
            `;
        }

        const ptEl = document.getElementById('pageTableGrid');
        if (ptEl) {
            ptEl.innerHTML = greenhouse.frames.map(f => `
                <div onclick="greenhouse.assignFrameToUser(${f.id})" class="p-2 rounded-xl border text-[11px] font-mono cursor-pointer transition ${f.pid === 101 ? 'bg-sage-600 text-white border-sage-700' : f.pid ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-white border-cream-300 text-[#5c5346] hover:bg-cream-200'}">
                    <div class="font-bold">Frame #${f.id}</div>
                    <div class="text-[10px] opacity-80 truncate">${f.zone}</div>
                    <div class="mt-1 font-semibold truncate">${f.pid ? `PID ${f.pid}` : 'FREE'}</div>
                </div>
            `).join('');
        }
    }
};

/* -------------------------------------------------------------------
 * I. COZY GREENHOUSE CANVAS WORLD & AVATARS
 * ------------------------------------------------------------------- */
const greenhouse = {
    canvas: null,
    ctx: null,
    frame: 0,
    zoom: 1,
    frames: [
        { id: 0,  zone: 'Fern Table A',  x: 0.20, y: 0.44, pid: 102, occupant: 'Luna (cat)' },
        { id: 1,  zone: 'Fern Table B',  x: 0.27, y: 0.44, pid: null, occupant: null },
        { id: 2,  zone: 'Reading Nook A',x: 0.20, y: 0.68, pid: 103, occupant: 'Biscuit (bunny)' },
        { id: 3,  zone: 'Reading Nook B',x: 0.36, y: 0.48, pid: 101, occupant: 'Khyati (shiba)' },
        { id: 4,  zone: 'Pond Bench W',  x: 0.46, y: 0.62, pid: null, occupant: null },
        { id: 5,  zone: 'Bar Counter',   x: 0.50, y: 0.46, pid: 104, occupant: 'Mochi (panda)' },
        { id: 6,  zone: 'Pond Bench E',  x: 0.68, y: 0.62, pid: null, occupant: null },
        { id: 7,  zone: 'Oak Desk A',    x: 0.69, y: 0.48, pid: 105, occupant: 'Coco (retriever)' },
        { id: 8,  zone: 'Oak Desk B',    x: 0.77, y: 0.48, pid: null, occupant: null },
        { id: 9,  zone: 'Library Booth A',x: 0.85, y: 0.44, pid: 106, occupant: 'Pip (shiba)' },
        { id: 10, zone: 'Library Booth B',x: 0.85, y: 0.64, pid: null, occupant: null },
        { id: 11, zone: 'Garden Corner', x: 0.32, y: 0.72, pid: null, occupant: null }
    ],
    avatars: [
        { pid: 101, name: 'Khyati', species: 'shiba', accessory: 'headphones', scarf: '#52795d', frameId: 3, x: 0.36, y: 0.48, targetX: 0.36, targetY: 0.48, state: 'READY', task: 'OS Kernel Study', isUser: true },
        { pid: 102, name: 'Luna', species: 'cat', accessory: 'glasses', scarf: '#e07a5f', frameId: 0, x: 0.20, y: 0.44, targetX: 0.20, targetY: 0.44, state: 'RUNNING', task: 'Paging Notes', isUser: false },
        { pid: 103, name: 'Biscuit', species: 'bunny', accessory: 'sprout', scarf: '#6d92b0', frameId: 2, x: 0.20, y: 0.68, targetX: 0.20, targetY: 0.68, state: 'RUNNING', task: 'Flashcards', isUser: false },
        { pid: 104, name: 'Mochi', species: 'panda', accessory: 'none', scarf: '#c9934b', frameId: 5, x: 0.50, y: 0.46, targetX: 0.50, targetY: 0.46, state: 'WAITING', task: 'Coffee Break', isUser: false },
        { pid: 105, name: 'Coco', species: 'retriever', accessory: 'wizard', scarf: '#9b7ede', frameId: 7, x: 0.69, y: 0.48, targetX: 0.69, targetY: 0.48, state: 'RUNNING', task: 'Deadlock Lab', isUser: false },
        { pid: 106, name: 'Pip', species: 'shiba', accessory: 'sprout', scarf: '#d96b38', frameId: 9, x: 0.85, y: 0.44, targetX: 0.85, targetY: 0.44, state: 'NEW', task: 'Joining Room', isUser: false }
    ],
    semaphores: {
        espresso: { name: 'Espresso_Mutex (Binary)', count: 1, max: 1, holder: null, queue: [] },
        sofa:     { name: 'Window_Sofa_Sem (Counting)', count: 2, max: 3, holders: ['Luna', 'Pip'], queue: [] }
    },
    interactables: [
        { id: 'espresso', label: 'Espresso Machine [Mutex]', x: 0.41, y: 0.30, w: 46, h: 36 },
        { id: 'sofa',     label: 'Window Sofa [Sem=3]',      x: 0.08, y: 0.42, w: 54, h: 40 },
        { id: 'server',   label: 'Kernel Server Rack [OS]',  x: 0.90, y: 0.28, w: 42, h: 52 }
    ],
    userEmote: null,
    userEmoteTimer: 0,
    emotes: ['☕', '📚', '✨', '💡', '🐾', '🎧'],
    emoteIdx: 0,
    koiList: [
        { angle: 0.4, speed: 0.012, radius: 22, color: '#ff6b35' },
        { angle: 2.3, speed: 0.015, radius: 19, color: '#fbbf24' },
        { angle: 4.4, speed: 0.009, radius: 15, color: '#f472b6' }
    ],
    fireflies: Array.from({ length: 26 }, (_, i) => ({
        x: (i * 0.173) % 1,
        y: 0.18 + ((i * 0.291) % 0.72),
        r: 1.8 + (i % 3) * 0.8,
        phase: i * 0.9,
        speedX: (i % 2 === 0 ? 1 : -1) * 0.00025,
        color: i % 3 === 0 ? '#fde047' : i % 3 === 1 ? '#fda4af' : '#a7f3d0'
    })),
    deskProps: [
        { book: '#f472b6', mug: '#38bdf8', lamp: '#fde047' },
        { book: '#a78bfa', mug: '#fb923c', lamp: '#bef264' },
        { book: '#34d399', mug: '#f43f5e', lamp: '#fcd34d' },
        { book: '#fbbf24', mug: '#818cf8', lamp: '#f9a8d4' },
        { book: '#60a5fa', mug: '#fbbf24', lamp: '#6ee7b7' },
        { book: '#fb7185', mug: '#2dd4bf', lamp: '#fde68a' }
    ],

    init() {
        this.canvas = document.getElementById('greenhouseCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.canvas.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) {
                this.handleClick(e.touches[0]);
            }
        }, { passive: true });

        this.loop();
    },
    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },
    changeZoom(delta) {
        this.zoom = Math.min(1.45, Math.max(0.75, +(this.zoom + delta).toFixed(2)));
    },
    resetCamera() {
        this.zoom = 1;
    },
    setUserState(newState) {
        const user = this.avatars.find(a => a.isUser);
        if (user) user.state = newState;
    },
    triggerUserEmote(emoji) {
        this.userEmote = emoji;
        this.userEmoteTimer = 140;
    },
    cycleEmote() {
        const em = this.emotes[this.emoteIdx % this.emotes.length];
        this.emoteIdx++;
        this.triggerUserEmote(em);
    },
    findFreeSeat() {
        const free = this.frames.find(f => f.pid === null);
        if (free) {
            this.assignFrameToUser(free.id);
        } else {
            showToast('All 12 Memory Frames are occupied!');
        }
    },
    assignFrameToUser(frameId) {
        const targetFrame = this.frames.find(f => f.id === frameId);
        if (!targetFrame) return;
        if (targetFrame.pid !== null && targetFrame.pid !== 101) {
            showToast(`Frame #${frameId} (${targetFrame.zone}) is locked by PID ${targetFrame.pid}!`);
            return;
        }
        const oldFrame = this.frames.find(f => f.pid === 101);
        if (oldFrame) {
            oldFrame.pid = null;
            oldFrame.occupant = null;
        }
        const user = this.avatars.find(a => a.isUser);
        targetFrame.pid = 101;
        targetFrame.occupant = `${user.name} (${user.species})`;
        user.frameId = frameId;
        user.targetX = targetFrame.x;
        user.targetY = targetFrame.y;
        logKernel('MMU_MAP', `PID 101 (${user.name}) allocated Frame #${frameId} (${targetFrame.zone})`);
        showToast(`Moved to ${targetFrame.zone} (Memory Frame #${frameId})`);
        osMonitor.render();
    },
    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const W = this.canvas.width;
        const H = this.canvas.height;
        const rawX = e.clientX - rect.left;
        const rawY = e.clientY - rect.top;

        // Convert screen click into zoomed world coordinates
        const worldX = (rawX - W / 2) / this.zoom + W / 2;
        const worldY = (rawY - H / 2) / this.zoom + H / 2;

        // 1. Check OS Interactive Objects
        for (const obj of this.interactables) {
            const ox = obj.x * W;
            const oy = obj.y * H;
            if (Math.abs(worldX - ox) < obj.w && Math.abs(worldY - oy) < obj.h) {
                this.interactWithObject(obj.id, ox / W, oy / H);
                return;
            }
        }

        // 2. Check Study Desks (Frames #0 - #11)
        for (const frame of this.frames) {
            const fx = frame.x * W;
            const fy = frame.y * H;
            if (Math.abs(worldX - fx) < 38 && Math.abs(worldY - fy) < 38) {
                this.assignFrameToUser(frame.id);
                return;
            }
        }
    },
    interactWithObject(id, nx, ny) {
        const user = this.avatars.find(a => a.isUser);
        if (id === 'server') {
            logKernel('SYS_INSPECT', 'Opened Kernel Monitor via Wall Server Rack');
            modalManager.open('osMonitorModal');
            return;
        }
        if (id === 'espresso') {
            const esp = this.semaphores.espresso;
            if (esp.count > 0) {
                esp.count = 0;
                esp.holder = `${user.name} (PID 101)`;
                user.targetX = nx;
                user.targetY = ny + 0.08;
                this.triggerUserEmote('☕');
                logKernel('SEM_WAIT', `PID 101 acquired Espresso_Mutex (val=0)`);
                showToast('Acquired Espresso_Mutex! Brewing coffee for 4s...');
                setTimeout(() => {
                    esp.count = 1;
                    esp.holder = null;
                    const homeFrame = this.frames.find(f => f.id === user.frameId);
                    if (homeFrame) {
                        user.targetX = homeFrame.x;
                        user.targetY = homeFrame.y;
                    }
                    logKernel('SEM_SIGNAL', 'PID 101 released Espresso_Mutex (val=1)');
                }, 4000);
            } else {
                showToast(`Mutex Locked! Held by ${esp.holder}`);
            }
            return;
        }
        if (id === 'sofa') {
            const sofa = this.semaphores.sofa;
            if (!sofa.holders.includes(user.name) && sofa.count > 0) {
                sofa.count--;
                sofa.holders.push(user.name);
                user.targetX = nx + 0.04;
                user.targetY = ny + 0.05;
                this.triggerUserEmote('🌿');
                logKernel('SEM_WAIT', `PID 101 joined Window_Sofa_Sem (remaining=${sofa.count}/3)`);
                showToast(`Resting on Window Sofa (Semaphore count: ${sofa.count}/3)`);
            } else if (sofa.holders.includes(user.name)) {
                sofa.count++;
                sofa.holders = sofa.holders.filter(h => h !== user.name);
                const homeFrame = this.frames.find(f => f.id === user.frameId);
                if (homeFrame) {
                    user.targetX = homeFrame.x;
                    user.targetY = homeFrame.y;
                }
                logKernel('SEM_SIGNAL', `PID 101 left Window_Sofa_Sem (remaining=${sofa.count}/3)`);
                showToast('Returned to desk! Released Window Sofa slot.');
            }
        }
    },
    loop() {
        this.frame++;
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    },
    update() {
        for (const av of this.avatars) {
            av.x += (av.targetX - av.x) * 0.08;
            av.y += (av.targetY - av.y) * 0.08;
        }
        for (const k of this.koiList) {
            k.angle += k.speed;
        }
        for (const f of this.fireflies) {
            f.x = (f.x + f.speedX + 1) % 1;
            f.y += Math.sin(this.frame * 0.025 + f.phase) * 0.00035;
        }
        if (this.userEmoteTimer > 0) {
            this.userEmoteTimer--;
            if (this.userEmoteTimer <= 0) this.userEmote = null;
        }
    },
    draw() {
        const ctx = this.ctx;
        const W = this.canvas.width;
        const H = this.canvas.height;
        ctx.clearRect(0, 0, W, H);

        ctx.save();
        ctx.translate(W / 2, H / 2);
        ctx.scale(this.zoom, this.zoom);
        ctx.translate(-W / 2, -H / 2);

        this.drawEnvironment(ctx, W, H);
        this.drawOSObjects(ctx, W, H);
        this.drawDeskFrames(ctx, W, H);

        const sortedAvatars = [...this.avatars].sort((a, b) => a.y - b.y);
        for (const av of sortedAvatars) {
            this.drawAnimalAvatar(ctx, av.x * W, av.y * H, av);
        }

        this.drawFireflies(ctx, W, H);

        if (this.userEmote) {
            const user = this.avatars.find(a => a.isUser);
            if (user) {
                const ux = user.x * W;
                const uy = user.y * H - 56;
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.roundRect(ux - 16, uy - 16, 32, 26, 10);
                ctx.fill();
                ctx.font = '15px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(this.userEmote, ux, uy + 2);
            }
        }

        ctx.restore();
    },
    drawEnvironment(ctx, W, H) {
        const floorGrad = ctx.createLinearGradient(0, H * 0.22, 0, H);
        floorGrad.addColorStop(0, '#629460');
        floorGrad.addColorStop(0.5, '#4b7a4c');
        floorGrad.addColorStop(1, '#365c39');
        ctx.fillStyle = floorGrad;
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = 'rgba(167, 243, 208, 0.14)';
        for (let g = 0; g < 36; g++) {
            const gx = ((g * 137) % 96 + 2) * 0.01 * W;
            const gy = (0.28 + ((g * 89) % 68) * 0.01) * H;
            ctx.fillRect(gx, gy, 4, 2);
            ctx.fillRect(gx + 3, gy - 2, 2, 4);
        }

        const rugs = [
            { x: 0.235, y: 0.46, w: 155, h: 78, fill: '#f3d5b5', border: '#e07a5f' },
            { x: 0.73,  y: 0.50, w: 165, h: 82, fill: '#e9d8fd', border: '#9f7aea' },
            { x: 0.25,  y: 0.70, w: 170, h: 76, fill: '#fde68a', border: '#d97706' }
        ];
        rugs.forEach(r => {
            const rx = r.x * W - r.w / 2;
            const ry = r.y * H - r.h / 2;
            ctx.fillStyle = r.fill;
            ctx.beginPath();
            ctx.roundRect(rx, ry, r.w, r.h, 16);
            ctx.fill();
            ctx.strokeStyle = r.border;
            ctx.lineWidth = 3;
            ctx.stroke();
        });

        const wallH = H * 0.26;
        const skyGrad = ctx.createLinearGradient(0, 0, W, wallH);
        skyGrad.addColorStop(0, '#bae6fd');
        skyGrad.addColorStop(0.5, '#d9f99d');
        skyGrad.addColorStop(1, '#fed7aa');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, wallH);

        ctx.fillStyle = 'rgba(110, 178, 126, 0.35)';
        ctx.beginPath();
        ctx.moveTo(0, wallH);
        ctx.quadraticCurveTo(W * 0.25, wallH * 0.45, W * 0.52, wallH * 0.85);
        ctx.quadraticCurveTo(W * 0.78, wallH * 0.40, W, wallH * 0.78);
        ctx.lineTo(W, wallH);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#7c4d2b';
        ctx.lineWidth = 5;
        const archCount = 6;
        const archW = W / archCount;
        for (let i = 0; i <= archCount; i++) {
            const ax = i * archW;
            ctx.beginPath();
            ctx.moveTo(ax, 0);
            ctx.lineTo(ax, wallH);
            ctx.stroke();

            if (i < archCount) {
                ctx.beginPath();
                ctx.arc(ax + archW / 2, wallH * 0.62, archW * 0.46, Math.PI, 0);
                ctx.stroke();

                const fx = ax + archW / 2;
                const fy = wallH * 0.34;
                ctx.strokeStyle = '#5c3a21';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(fx, 0);
                ctx.lineTo(fx, fy);
                ctx.stroke();

                ctx.fillStyle = i % 2 === 0 ? '#2f855a' : '#38a169';
                for (let leaf = -3; leaf <= 3; leaf++) {
                    ctx.beginPath();
                    ctx.ellipse(fx + leaf * 5, fy + Math.abs(leaf) * 2, 7, 3.5, leaf * 0.28, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.fillStyle = i % 2 === 0 ? '#f472b6' : '#facc15';
                ctx.beginPath();
                ctx.arc(fx - 7, fy + 3, 2.5, 0, Math.PI * 2);
                ctx.arc(fx + 8, fy + 2, 2.5, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#d96b38';
                ctx.beginPath();
                ctx.roundRect(fx - 8, fy - 2, 16, 10, 3);
                ctx.fill();

                ctx.strokeStyle = '#7c4d2b';
                ctx.lineWidth = 5;
            }
        }
        ctx.fillStyle = '#6b4226';
        ctx.fillRect(0, wallH - 8, W, 12);

        ctx.strokeStyle = '#3e2c1e';
        ctx.lineWidth = 1.5;
        const bulbColors = ['#fef08a', '#fda4af', '#bae6fd', '#fde047'];
        for (let i = 0; i < archCount; i++) {
            const x1 = i * archW;
            const x2 = (i + 1) * archW;
            ctx.beginPath();
            ctx.moveTo(x1, wallH * 0.35);
            ctx.quadraticCurveTo((x1 + x2) / 2, wallH * 0.58, x2, wallH * 0.35);
            ctx.stroke();

            for (let b = 1; b <= 4; b++) {
                const t = b / 5;
                const bx = x1 + (x2 - x1) * t;
                const by = wallH * 0.35 + Math.sin(t * Math.PI) * (wallH * 0.12);
                const glow = 0.75 + Math.sin(this.frame * 0.06 + b + i) * 0.25;
                ctx.fillStyle = bulbColors[(b + i) % bulbColors.length];
                ctx.globalAlpha = glow;
                ctx.beginPath();
                ctx.arc(bx, by, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        const stones = [
            [0.44, 0.36, '#e7d8c9'], [0.49, 0.39, '#dfd0c0'], [0.45, 0.44, '#ebd9c8'], [0.51, 0.48, '#d8c7b6'],
            [0.57, 0.62, '#e7d8c9'], [0.57, 0.69, '#dfd0c0'], [0.57, 0.76, '#ebd9c8'], [0.57, 0.83, '#d8c7b6']
        ];
        stones.forEach(([sx, sy, col]) => {
            ctx.fillStyle = col;
            ctx.beginPath();
            ctx.roundRect(sx * W - 22, sy * H - 12, 44, 24, 9);
            ctx.fill();
        });

        const flowerBeds = [
            { x: 0.12, y: 0.78, flowers: ['#f472b6', '#facc15', '#fb7185', '#c084fc'] },
            { x: 0.86, y: 0.78, flowers: ['#38bdf8', '#fb923c', '#f472b6', '#fde047'] },
            { x: 0.66, y: 0.32, flowers: ['#fb7185', '#fde047', '#a78bfa', '#34d399'] }
        ];
        flowerBeds.forEach(bed => {
            const bx = bed.x * W;
            const by = bed.y * H;
            ctx.fillStyle = '#9c5a34';
            ctx.beginPath();
            ctx.roundRect(bx - 38, by - 10, 76, 22, 6);
            ctx.fill();
            ctx.fillStyle = '#2f855a';
            ctx.beginPath();
            ctx.roundRect(bx - 34, by - 15, 68, 12, 6);
            ctx.fill();
            bed.flowers.forEach((fc, idx) => {
                ctx.fillStyle = fc;
                ctx.beginPath();
                ctx.arc(bx - 24 + idx * 16, by - 13, 4.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#fef08a';
                ctx.beginPath();
                ctx.arc(bx - 24 + idx * 16, by - 13, 1.8, 0, Math.PI * 2);
                ctx.fill();
            });
        });

        const px = 0.57 * W;
        const py = 0.50 * H;
        ctx.fillStyle = '#a8a29e';
        ctx.beginPath();
        ctx.ellipse(px, py, 56, 38, 0, 0, Math.PI * 2);
        ctx.fill();

        const waterGrad = ctx.createRadialGradient(px - 10, py - 8, 5, px, py, 48);
        waterGrad.addColorStop(0, '#5eead4');
        waterGrad.addColorStop(0.6, '#2dd4bf');
        waterGrad.addColorStop(1, '#0f766e');
        ctx.fillStyle = waterGrad;
        ctx.beginPath();
        ctx.ellipse(px, py, 48, 30, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#4ade80';
        ctx.beginPath();
        ctx.arc(px - 22, py - 8, 8, 0.2, Math.PI * 1.8);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px + 20, py + 9, 7, 0.5, Math.PI * 1.9);
        ctx.fill();
        ctx.fillStyle = '#f472b6';
        ctx.beginPath();
        ctx.arc(px - 22, py - 8, 3.5, 0, Math.PI * 2);
        ctx.fill();

        for (const k of this.koiList) {
            const kx = px + Math.cos(k.angle) * k.radius;
            const ky = py + Math.sin(k.angle) * (k.radius * 0.58);
            ctx.fillStyle = k.color;
            ctx.beginPath();
            ctx.ellipse(kx, ky, 5.5, 2.8, k.angle + Math.PI / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        const beamGrad = ctx.createLinearGradient(W * 0.2, 0, W * 0.65, H * 0.75);
        beamGrad.addColorStop(0, 'rgba(254, 249, 195, 0.22)');
        beamGrad.addColorStop(1, 'rgba(254, 249, 195, 0.0)');
        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(W * 0.15, 0);
        ctx.lineTo(W * 0.45, 0);
        ctx.lineTo(W * 0.78, H * 0.85);
        ctx.lineTo(W * 0.35, H * 0.85);
        ctx.closePath();
        ctx.fill();
    },
    drawFireflies(ctx, W, H) {
        for (const f of this.fireflies) {
            const fx = f.x * W;
            const fy = f.y * H;
            const alpha = 0.35 + Math.sin(this.frame * 0.06 + f.phase) * 0.35;
            ctx.save();
            ctx.globalAlpha = Math.max(0.1, alpha);
            ctx.fillStyle = f.color;
            ctx.beginPath();
            ctx.arc(fx, fy, f.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    },
    drawOSObjects(ctx, W, H) {
        // 1. Espresso Machine (Binary Mutex)
        const ex = 0.41 * W;
        const ey = 0.30 * H;
        ctx.fillStyle = '#78350f';
        ctx.beginPath();
        ctx.roundRect(ex - 28, ey - 10, 56, 30, 8);
        ctx.fill();
        ctx.fillStyle = '#e11d48';
        ctx.beginPath();
        ctx.roundRect(ex - 16, ey - 24, 32, 22, 6);
        ctx.fill();
        ctx.fillStyle = this.semaphores.espresso.count > 0 ? '#34d399' : '#fbbf24';
        ctx.beginPath();
        ctx.arc(ex + 9, ey - 17, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = 'bold 9px "JetBrains Mono"';
        ctx.fillStyle = '#fef3c7';
        ctx.textAlign = 'center';
        ctx.fillText(`☕ Mutex=${this.semaphores.espresso.count}`, ex, ey + 30);

        // 2. Window Sofa (Counting Semaphore = 3)
        const sx = 0.08 * W;
        const sy = 0.42 * H;
        ctx.fillStyle = '#e07a5f';
        ctx.beginPath();
        ctx.roundRect(sx - 30, sy - 16, 60, 34, 10);
        ctx.fill();
        ctx.fillStyle = '#f4a261';
        ctx.beginPath();
        ctx.roundRect(sx - 24, sy - 6, 48, 18, 7);
        ctx.fill();
        ctx.fillStyle = '#fef3c7';
        ctx.fillText(`🌿 Sem=${this.semaphores.sofa.count}/3`, sx, sy + 28);

        // 3. Kernel Server Rack
        const rx = 0.90 * W;
        const ry = 0.28 * H;
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.roundRect(rx - 20, ry - 26, 40, 52, 7);
        ctx.fill();
        for (let b = 0; b < 3; b++) {
            ctx.fillStyle = '#334155';
            ctx.fillRect(rx - 14, ry - 18 + b * 14, 28, 9);
            ctx.fillStyle = (this.frame + b * 15) % 40 < 20 ? '#34d399' : '#38bdf8';
            ctx.fillRect(rx + 8, ry - 15 + b * 14, 3, 3);
        }
        ctx.fillStyle = '#a7f3d0';
        ctx.fillText('🖥 OS Kernel', rx, ry + 36);
    },
    drawDeskFrames(ctx, W, H) {
        for (const frame of this.frames) {
            const fx = frame.x * W;
            const fy = frame.y * H;
            const isUserDesk = frame.pid === 101;
            const prop = this.deskProps[frame.id % this.deskProps.length];

            ctx.fillStyle = isUserDesk ? '#b47442' : '#965c32';
            ctx.beginPath();
            ctx.roundRect(fx - 28, fy + 6, 56, 23, 7);
            ctx.fill();

            ctx.fillStyle = isUserDesk ? '#d4925c' : '#b87948';
            ctx.beginPath();
            ctx.roundRect(fx - 26, fy + 6, 52, 14, 5);
            ctx.fill();

            ctx.fillStyle = prop.book;
            ctx.beginPath();
            ctx.roundRect(fx - 12, fy + 8, 14, 9, 2);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(fx - 10, fy + 10, 10, 2);

            ctx.fillStyle = prop.mug;
            ctx.beginPath();
            ctx.arc(fx + 9, fy + 12, 3.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = prop.lamp;
            ctx.beginPath();
            ctx.arc(fx - 19, fy + 10, 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.font = 'bold 9px "JetBrains Mono"';
            ctx.fillStyle = isUserDesk ? 'rgba(217, 119, 54, 0.95)' : 'rgba(28, 25, 23, 0.75)';
            ctx.beginPath();
            ctx.roundRect(fx - 17, fy + 31, 34, 14, 6);
            ctx.fill();
            ctx.fillStyle = isUserDesk ? '#ffffff' : '#fde68a';
            ctx.textAlign = 'center';
            ctx.fillText(`F#${frame.id}`, fx, fy + 41);
        }
    },
    drawAnimalAvatar(ctx, x, y, avatar) {
        const bob = Math.sin(this.frame * 0.08 + avatar.pid) * 2.2;
        drawPixelAnimal(ctx, x, y - 4, 1.15, {
            species: avatar.species,
            accessory: avatar.accessory,
            scarf: avatar.scarf,
            bob
        });

        // Floating Name & OS Process State Tag
        const tagText = `${avatar.name} • ${avatar.state}`;
        ctx.font = 'bold 9px "JetBrains Mono"';
        const textW = ctx.measureText(tagText).width + 14;
        ctx.fillStyle = avatar.isUser ? 'rgba(34, 30, 27, 0.92)' : 'rgba(34, 30, 27, 0.76)';
        ctx.beginPath();
        ctx.roundRect(x - textW / 2, y - 40 + bob, textW, 16, 8);
        ctx.fill();

        ctx.fillStyle = avatar.state === 'RUNNING' ? '#6ee7b7' : avatar.state === 'WAITING' ? '#fde047' : '#f8fafc';
        ctx.textAlign = 'center';
        ctx.fillText(tagText, x, y - 29 + bob);
    }
};

/* -------------------------------------------------------------------
 * J. WINDOW INITIALIZATION
 * ------------------------------------------------------------------- */
window.onload = function () {
    studyTimer.init();
    greenhouse.init();
    onboardingApp.init();
    osScheduler.render();
    osMonitor.render();
    flashcardsApp.render();
    notesApp.render();
    logKernel('READY', 'All Study Town subsystems initialized');
};