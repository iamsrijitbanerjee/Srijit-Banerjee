document.addEventListener("DOMContentLoaded", () => {

  // --- 1. Dynamic SVG Fallback for Broken Movie / Series Posters ---
  function createSvgPoster(title, accentColor = "#d97706") {
    const safeTitle = (title || "Cinema")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const words = safeTitle.split(" ");
    let line1 = "";
    let line2 = "";
    let line3 = "";

    words.forEach((w) => {
      if ((line1 + " " + w).trim().length <= 13) line1 = (line1 + " " + w).trim();
      else if ((line2 + " " + w).trim().length <= 13) line2 = (line2 + " " + w).trim();
      else line3 = (line3 + " " + w).trim();
    });

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
      </defs>
      <rect width="300" height="450" fill="url(#g)"/>
      <rect x="14" y="14" width="272" height="422" rx="12" fill="none" stroke="${accentColor}" stroke-width="2" stroke-opacity="0.6"/>
      <circle cx="150" cy="145" r="42" fill="${accentColor}" fill-opacity="0.15" stroke="${accentColor}" stroke-width="2"/>
      <polygon points="140,125 140,165 172,145" fill="${accentColor}"/>
      <text x="150" y="255" text-anchor="middle" fill="#f8fafc" font-family="Cinzel, Georgia, serif" font-weight="bold" font-size="22">${line1}</text>
      <text x="150" y="285" text-anchor="middle" fill="#f8fafc" font-family="Cinzel, Georgia, serif" font-weight="bold" font-size="20">${line2}</text>
      <text x="150" y="315" text-anchor="middle" fill="#cbd5e1" font-family="Plus Jakarta Sans, sans-serif" font-weight="bold" font-size="16">${line3}</text>
    </svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  document.querySelectorAll(".media-cover img").forEach((img) => {
    img.addEventListener("error", function () {
      if (!this.dataset.fallbackApplied) {
        this.dataset.fallbackApplied = "true";
        this.src = createSvgPoster(this.dataset.title || this.alt);
      }
    });
  });

  // --- 2. Interactive Web-Series Tier List Generator ---
  const tierData = [
    {
      tier: "S",
      range: "9.0 – 10",
      cssClass: "tier-s",
      color: "#ef4444",
      shows: [
        { title: "Game of Thrones", rating: "10", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4NC6L_6s-2gwwhIMoIFDVQ-3zFkG3-xRot4RhwCVr3Q&s=10" },
        { title: "True Detective S1", rating: "9.8", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8QTkugoMk4fYb4Tr_MzeRhREGOWMQmXFBiedPzVRB1Q&s=10" },
        { title: "Chernobyl", rating: "9.7", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMArk7TvDFoGe-W0idxFKtbGV2SqhW3jbI4NSKUbcH_Q&s=10" },
        { title: "Better Call Saul", rating: "9.6", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrVdfHgmG_boeiGhIQEAzhsHVDHt_PUjk2sxrPepXkoA&s=10" },
        { title: "Breaking Bad", rating: "9.5", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ib7u8qZ6oAxKlARL3iHs52llTDxANpBj66racEGsIQ&s=10" },
        { title: "A Knight of the Seven Kingdoms", rating: "9.2", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO0nscXcRIT3NxEqkn4XNufp2mto7VFthNRQPN3FA6yw&s=10" },
        { title: "House of the Dragon", rating: "9.0", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7zTviCIqAggrFqcCawQN25NBdU20bWhjgGjt30WKnw&s=10" },
        { title: "Normal People", rating: "9.1", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd-FUeEzO0KC6TlkpHFslK2jAfJA-mt65czQbGQmbrSg&s=10" },
        { title: "Peaky Blinders", rating: "9.0", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl6iplyJ1uqsrP5CbsP_WC9CDBJlzYldQ1v09Whx4gsg&s=10" }
      ]
    },
    {
      tier: "A",
      range: "8.0 – 8.9",
      cssClass: "tier-a",
      color: "#f97316",
      shows: [
        { title: "The Mentalist", rating: "8.8", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrgUrEfKCktZmw6RHKVPBWoXGbuiElBRM_DztxKzOJIA&s=10" },
        { title: "Dexter", rating: "8.8", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAY3wXrZFwKCkndwmnlNZvLrkeSBdojOQ9uzp6W28bOQ&s" },
        { title: "Suits", rating: "8.5", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy8mvzO-V8spG95VJMxWevzCD30poo2W34gKWjdRiEUg&s=10" },
        { title: "Death Note", rating: "8.6", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTu0RcaydnlB8YXQ0OTvuxe3iAvlkWVtFho3bHEy0fpA&s=10" },
        { title: "The Queen's Gambit", rating: "8.0", img: "https://upload.wikimedia.org/wikipedia/en/1/12/The_Queen%27s_Gambit_%28miniseries%29.png" }
      ]
    },
    {
      tier: "B",
      range: "7.0 – 7.9",
      cssClass: "tier-b",
      color: "#eab308",
      shows: [
        { title: "Love Story: JFK Jr. & Carolyn Bessette", rating: "7.4", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD8BmziNEKbR_d2Rmx6RFxg4UQhyR1c50HJudINlvGmg&s=10" },
        { title: "Something Very Bad Is Going to Happen", rating: "7.2", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8EK2Mv2pSagv-R28P_n7eailKfWnsFESDgS0-tB6FfQ&s=10" },
        { title: "Hilda Hurricane", rating: "7.0", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlIE88k_SUARlehvn8yyGmqlqnlSoVjXFH7x_dYKuzBg&s=10" }
      ]
    },
    {
      tier: "C",
      range: "6.0 – 6.9",
      cssClass: "tier-c",
      color: "#16a34a",
      shows: [
        { title: "Hostel Daze", rating: "6.6", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ592cCyKhpRXdctey7Wnh_en-W1A69ItpKZfrPccGaIA&s=10" },
        { title: "The Night Manager", rating: "6.0", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkOLmXiTz1vysCoOGNpqytYU39Qm3v91W8qS2CM8z3A&s=10" },
        { title: "Overflow", rating: "6.0", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAEJ7FvWYsFkEEjWcd3usHUEJbBv_1Bc6zoiuY3HodRA&s=10" },
        { title: "Dark Desire", rating: "6.0", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe1KDsmdInhVFkb6NCj5vtvalvlmYHas0-1r3MXM4plQ&s" },
        { title: "Pretty Little Liars", rating: "6.0", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_A2pfyI3Tonr7mg0tAzyAfajAtuie6YeGQgI6-UjRuQ&s=10" }
      ]
    },
    {
      tier: "D",
      range: "5.0 – 5.9",
      cssClass: "tier-d",
      color: "#0284c7",
      shows: [
        { title: "Unspeakable Sins", rating: "5.0", img: "https://images.martincid.com/2025/07/Unspeakable-Sins-Netflix.jpg" },
        { title: "Obsession", rating: "5.0", img: "https://cdn.mos.cms.futurecdn.net/y3qbnsJoSXouCyFAetrvF8-1280-80.jpg.webp" }
      ]
    },
    {
      tier: "F",
      range: "0 – 4.9",
      cssClass: "tier-f",
      color: "#9333ea",
      shows: [
        { title: "Between Father and Son", rating: "2.5", img: "https://www.highonfilms.com/wp-content/uploads/2026/05/Between-Father-and-Son-2026.webp" }
      ]
    }
  ];

  const tierBoard = document.getElementById("tierBoard");
  const toggleAllRatingsBtn = document.getElementById("toggleAllRatingsBtn");
  let allRevealed = false;

  if (tierBoard) {
    tierData.forEach((group) => {
      const row = document.createElement("div");
      row.className = "tier-row";

      const label = document.createElement("div");
      label.className = `tier-label ${group.cssClass}`;
      label.innerHTML = `
        <span class="tier-letter">${group.tier}</span>
        <span class="tier-range">${group.range}</span>
      `;

      const itemsWrap = document.createElement("div");
      itemsWrap.className = "tier-items";

      group.shows.forEach((show) => {
        const card = document.createElement("div");
        card.className = "tier-poster-card";
        card.title = `Click to reveal rating for ${show.title}`;

        const initialSrc = show.img || createSvgPoster(show.title, group.color);

        card.innerHTML = `
          <div class="tier-poster-img-wrap">
            <img src="${initialSrc}" alt="${show.title} Poster" />
            <span class="tier-click-hint">★ Tap</span>
            <div class="tier-rating-overlay">
              <span class="tier-rating-score">★ ${show.rating}</span>
              <span class="tier-rating-sub">${group.tier} TIER</span>
            </div>
          </div>
          <div class="tier-poster-title">${show.title}</div>
          <span class="tier-inline-score">★ ${show.rating}/10</span>
        `;

        const imgEl = card.querySelector("img");
        imgEl.addEventListener("error", function () {
          if (!this.dataset.fallbackApplied) {
            this.dataset.fallbackApplied = "true";
            this.src = createSvgPoster(show.title, group.color);
          }
        });

        card.addEventListener("click", () => {
          card.classList.toggle("revealed");
        });

        itemsWrap.appendChild(card);
      });

      row.appendChild(label);
      row.appendChild(itemsWrap);
      tierBoard.appendChild(row);
    });

    if (toggleAllRatingsBtn) {
      toggleAllRatingsBtn.addEventListener("click", () => {
        allRevealed = !allRevealed;
        document.querySelectorAll(".tier-poster-card").forEach((card) => {
          card.classList.toggle("revealed", allRevealed);
        });
        toggleAllRatingsBtn.innerHTML = allRevealed
          ? '<i class="fa-solid fa-eye-slash"></i> Hide All Ratings'
          : '<i class="fa-solid fa-star"></i> Reveal All Ratings';
      });
    }
  }

  // --- 3. Dynamic Typing Effect in Hero ---
  const typingElement = document.getElementById("typing-text");
  const phrases = [
    "Computer Science Engineer 💻",
    "STEM Olympiad Winner 🏆",
    "Football & Badminton Tactics Buff ⚽",
    "The Mentalist & Logic Enthusiast ☕",
    "Polyglot-Language Learner 🌐"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingElement) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 70;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // --- 4. FUT Manager Card Modal ---
  const futModal = document.getElementById("futModal");
  const openFutBtn = document.getElementById("openFutBtn");
  const closeFutBtn = document.getElementById("closeFutBtn");

  if (openFutBtn && futModal) {
    openFutBtn.addEventListener("click", () => futModal.classList.add("active"));
  }
  if (closeFutBtn && futModal) {
    closeFutBtn.addEventListener("click", () => futModal.classList.remove("active"));
  }
  if (futModal) {
    futModal.addEventListener("click", (e) => {
      if (e.target === futModal) futModal.classList.remove("active");
    });
  }

  // --- 5. Football Goal Kick Animation into Net ---
  const kickBall = document.getElementById("kickBall");
  const goalsCount = document.getElementById("goalsCount");
  const kickCommentary = document.getElementById("kickCommentary");
  let score = 0;
  let isKicking = false;

  const commentaryList = [
    "🚀 GOLAZO! Hits the top corner net!",
    "⚽ Beautiful curler past the keeper!",
    "🔥 Screamer into the top bin!",
    "🎩 Terrific half volley! Perfect strike!",
    "🎯 Side netting penalty goal!",
    "⚡ Unstoppable volley into the goal!"
  ];

  function triggerGoalAnimation() {
    if (isKicking || !kickBall) return;
    isKicking = true;

    score++;
    if (goalsCount) goalsCount.textContent = score;

    kickBall.classList.add("kicked-to-goal");

    if (kickCommentary) {
      const randomCommentary = commentaryList[Math.floor(Math.random() * commentaryList.length)];
      kickCommentary.textContent = randomCommentary;
    }

    setTimeout(() => {
      kickBall.classList.remove("kicked-to-goal");
      isKicking = false;
    }, 600);
  }

  if (kickBall) {
    kickBall.addEventListener("click", triggerGoalAnimation);
  }

  const floatingFootball = document.getElementById("floatingFootball");
  if (floatingFootball) {
    floatingFootball.addEventListener("click", () => {
      triggerGoalAnimation();
      const vibeEl = document.getElementById("vibe");
      if (vibeEl) vibeEl.scrollIntoView({ behavior: "smooth" });
    });
  }

  // --- 6. Mentalist & Patrick Jane Observation Generator ---
  const mentalistQuotes = [
    '"A cup of tea solves everything." — Patrick Jane',
    '"There’s no such thing as magic. Just attention to detail."',
    '"If you stop and look around, life is pretty amazing."',
    '"Control your emotions, or they will control you."',
    '"Truth is in the eye of the observer."',
    '"Tea is the key to clear thinking when solving a tough dilemma."',
    '"The secret to a good trick is keeping it simple."',
    '"A calm mind sees moves three steps ahead."',
    '"Nostalgia is the denial of a painful present."',
    '"People like to talk about themselves. You just have to listen."'
  ];

  const quoteDisplay = document.getElementById("mentalistQuote");
  const brewQuoteBtn = document.getElementById("brewQuoteBtn");

  function getNewQuote() {
    if (!quoteDisplay) return;
    const randomIndex = Math.floor(Math.random() * mentalistQuotes.length);
    quoteDisplay.style.opacity = "0";

    setTimeout(() => {
      quoteDisplay.textContent = mentalistQuotes[randomIndex];
      quoteDisplay.style.opacity = "1";
    }, 200);
  }

  if (brewQuoteBtn) {
    brewQuoteBtn.addEventListener("click", getNewQuote);
  }

  const floatingTea = document.getElementById("floatingTea");
  const teaToast = document.getElementById("teaToast");

  if (floatingTea) {
    floatingTea.addEventListener("click", () => {
      getNewQuote();
      if (teaToast) {
        teaToast.textContent = "Tea Brewed! ☕";
        teaToast.style.background = "#d97706";

        setTimeout(() => {
          teaToast.textContent = "Sip Tea ☕";
          teaToast.style.background = "#0f172a";
        }, 2000);
      }
      const vibeEl = document.getElementById("vibe");
      if (vibeEl) vibeEl.scrollIntoView({ behavior: "smooth" });
    });
  }

  // --- 7. Complete 10 Tactical Chess Puzzles ---
  const puzzles = [
    {
      title: "Puzzle 1 / 10: Smothered Mate",
      prompt: "Mate in 2!",
      board: [
        ['♖', '.', '.', '♔'],
        ['.', '♟', '♟', '♟'],
        ['.', '♕', '.', '.'],
        ['.', '.', '.', '♚']
      ],
      solution: "💥 1. Qf7+ Kh8  2. Qg7# (Smothered Checkmate!)"
    },
    {
      title: "Puzzle 2 / 10: Queen Sacrifice",
      prompt: "Mate in 2!",
      board: [
        ['.', '.', '♖', '♔'],
        ['♟', '♟', '.', '♟'],
        ['.', '.', '♕', '.'],
        ['.', '.', '♗', '♚']
      ],
      solution: "💥 1. Qh7+!! Kxh7  2. Rh3# (Rook & Bishop Mate!)"
    },
    {
      title: "Puzzle 3 / 10: Back-Rank Mate",
      prompt: "Mate in 1!",
      board: [
        ['.', '.', '.', '♔'],
        ['♟', '♟', '♟', '.'],
        ['.', '.', '.', '.'],
        ['♖', '.', '.', '♚']
      ],
      solution: "💥 1. Ra8# (Classic Back-Rank Checkmate!)"
    },
    {
      title: "Puzzle 4 / 10: Anastasia's Mate",
      prompt: "Mate in 2!",
      board: [
        ['.', '.', '♘', '♔'],
        ['♟', '♟', '.', '♟'],
        ['.', '.', '.', '♕'],
        ['.', '.', '♖', '♚']
      ],
      solution: "💥 1. Ne7+ Kh8  2. Qxh7+! Kxh7  3. Rh3#!"
    },
    {
      title: "Puzzle 5 / 10: Arabian Mate",
      prompt: "Mate in 1!",
      board: [
        ['.', '.', '♘', '♔'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '♖', '♚']
      ],
      solution: "💥 1. Rh7# (Knight & Rook Coordination Mate!)"
    },
    {
      title: "Puzzle 6 / 10: Boden's Mate",
      prompt: "Mate in 2!",
      board: [
        ['♗', '.', '.', '♔'],
        ['.', '♟', '♟', '.'],
        ['.', '.', '♗', '.'],
        ['.', '.', '♕', '♚']
      ],
      solution: "💥 1. Qxc6+!! bxc6  2. Ba6# (Criss-Cross Bishop Mate!)"
    },
    {
      title: "Puzzle 7 / 10: Blackburne's Mate",
      prompt: "Mate in 2!",
      board: [
        ['♗', '♘', '.', '♔'],
        ['.', '.', '♟', '.'],
        ['.', '♗', '.', '.'],
        ['.', '.', '.', '♚']
      ],
      solution: "💥 1. Bxh7+ Kh8  2. Ng5# (Double Bishop & Knight Mate!)"
    },
    {
      title: "Puzzle 8 / 10: Hook Mate",
      prompt: "Mate in 1!",
      board: [
        ['.', '♘', '♖', '♔'],
        ['.', '♟', '.', '♟'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '♚']
      ],
      solution: "💥 1. Re8# (Hooked Rook protected by Knight & Pawn!)"
    },
    {
      title: "Puzzle 9 / 10: Opera House Mate",
      prompt: "Mate in 1!",
      board: [
        ['.', '.', '♗', '♔'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '♖', '♚']
      ],
      solution: "💥 1. Rd8# (Morphy's Famous Opera Checkmate!)"
    },
    {
      title: "Puzzle 10 / 10: Damiano's Battery",
      prompt: "Mate in 2!",
      board: [
        ['.', '.', '.', '♔'],
        ['.', '♟', '♟', '♟'],
        ['.', '.', '♕', '.'],
        ['.', '.', '.', '♚']
      ],
      solution: "💥 1. Qh7+ Kf8  2. Qh8# (Queen & Pawn Battery Mate!)"
    }
  ];

  let currentPuzzleIndex = 0;
  const puzzleTitle = document.getElementById("puzzleTitle");
  const chessPrompt = document.getElementById("chessPrompt");
  const chessBoardContainer = document.getElementById("chessBoardContainer");
  const chessSolution = document.getElementById("chessSolution");
  const solveChessBtn = document.getElementById("solveChessBtn");
  const prevPuzzleBtn = document.getElementById("prevPuzzleBtn");
  const nextPuzzleBtn = document.getElementById("nextPuzzleBtn");

  function renderPuzzle(index) {
    if (!puzzleTitle || !chessPrompt || !chessBoardContainer || !chessSolution || !solveChessBtn) return;
    const p = puzzles[index];
    puzzleTitle.textContent = p.title;
    chessPrompt.innerHTML = `<strong>White to Move:</strong> ${p.prompt}`;
    chessSolution.innerHTML = p.solution;
    chessSolution.classList.add("hidden");
    solveChessBtn.textContent = "Show Solution";

    chessBoardContainer.innerHTML = "";
    p.board.forEach((row, rIdx) => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "chess-row";
      row.forEach((cell, cIdx) => {
        const sq = document.createElement("div");
        const isWhiteSq = (rIdx + cIdx) % 2 === 0;
        sq.className = `sq ${isWhiteSq ? "white" : "black"}`;
        sq.textContent = cell;
        rowDiv.appendChild(sq);
      });
      chessBoardContainer.appendChild(rowDiv);
    });
  }

  renderPuzzle(currentPuzzleIndex);

  if (prevPuzzleBtn) {
    prevPuzzleBtn.addEventListener("click", () => {
      currentPuzzleIndex = (currentPuzzleIndex - 1 + puzzles.length) % puzzles.length;
      renderPuzzle(currentPuzzleIndex);
    });
  }

  if (nextPuzzleBtn) {
    nextPuzzleBtn.addEventListener("click", () => {
      currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length;
      renderPuzzle(currentPuzzleIndex);
    });
  }

  if (solveChessBtn && chessSolution) {
    solveChessBtn.addEventListener("click", () => {
      chessSolution.classList.toggle("hidden");
      solveChessBtn.textContent = chessSolution.classList.contains("hidden")
        ? "Show Solution"
        : "Hide Solution";
    });
  }

});
