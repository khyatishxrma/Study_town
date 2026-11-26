# 🌱 Study Town • Cozy OS Study Space

**Study Town** is an interactive, cozy pixel-art virtual co-working space built around core **Operating Systems** concepts. Users spawn into a botanical greenhouse as a student Process Control Block (`PID 101`), customize a pixel-art animal avatar, manage study tasks using real CPU scheduling algorithms, and interact with shared room resources governed by semaphores and memory page tables.

---

## ✨ Features

### 🖥️ Operating Systems Simulations
* **Process Lifecycle & Onboarding (`init / PID 1`):** Customize a pixel-art animal avatar (Shiba, Calico Cat, Bunny, Red Panda, or Golden Retriever) with accessories and scarf colors, triggering a simulated `fork()`, `mmu_alloc()`, and `exec()` boot sequence.
* **CPU Study Task Scheduler & Gantt Chart:** Add study tasks to a live Ready Queue and schedule them using **FCFS**, **SJF (Shortest Job First)**, **Priority**, or **Round Robin (`Q = 25m`)**. Automatically calculates Average Waiting Time, renders a color-coded Gantt execution timeline, and dispatches tasks directly to the Pomodoro CPU Burst timer.
* **Memory Management Unit (MMU) Page Table:** The greenhouse features 12 physical study desks (`Frame #0` – `Frame #11`). Clicking any unoccupied desk dynamically allocates that memory frame to `PID 101` and moves your avatar across the canvas.
* **Synchronization & Semaphores:**
  * **Espresso Machine (`Espresso_Mutex`):** A binary mutex (`val = 1`) that locks for 4 seconds while brewing coffee, blocking concurrent access.
  * **Window Sofa (`Window_Sofa_Sem`):** A counting semaphore (`val = 3`) tracking shared seating capacity in real time.
* **Live `dmesg` Kernel Ring Buffer:** A persistent bottom-left ticker and full Kernel Monitor modal logging system events (`IRQ_START`, `CTX_SWITCH`, `MMU_MAP`, `SEM_WAIT`, `SEM_SIGNAL`).

### 📚 Cozy Productivity & Study Suite
* **CPU Burst Pomodoro Timer:** 25-minute focus sessions that transition your avatar's process state between `READY`, `RUNNING`, and `WAITING` while awarding Focus Coins (`+50` per completed burst).
* **Flashcard Deck Studio:** Create custom study decks, practice with 3D CSS flip animations, and mark cards as mastered (`+10` Focus Coins), persisted via `localStorage`.
* **Greenhouse Study Notebook:** Write and categorize lecture notes or formulas with `localStorage` persistence, and pin active notes as a floating sticky widget directly onto the main HUD.
* **Procedural Web Audio Lo-Fi Synthesizer:** Built-in ambient synth engine generating warm chord progressions and toggleable low-pass filtered rain noise using the browser's native Web Audio API (no external MP3 files required).
* **Focus Insights Dashboard:** Visualizes lifetime focus hours, completed CPU bursts, subject tag breakdowns, and weekly study momentum.

---

## 🛠️ Tech Stack

* **Structure:** Semantic HTML5 (`index.html`)
* **Styling:** Tailwind CSS (CDN), custom glassmorphism & 3D perspective CSS (`styles.css` / `style.css`), Font Awesome 6, Google Fonts (`Inter` & `JetBrains Mono`)
* **Logic & Graphics:** Vanilla JavaScript (`app.js`), HTML5 2D Canvas API (procedural pixel-art rendering, animations, camera zoom), Web Audio API, and `localStorage`

---

## 📂 Project Structure

```text
study-town/
├── index.html      # Main viewport, HUD overlays, onboarding studio, and productivity modals
├── app.js          # Canvas world engine, pixel-art renderer, OS scheduler, MMU, audio synth & storage
├── styles.css      # Frosted-cream glassmorphism, HUD pills, and 3D flashcard flip animations
└── README.md       # Project documentation
