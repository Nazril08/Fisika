const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");

const progress = (value) => {
  const percentage = (value / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

const startBtn = document.querySelector(".start"),
  numQuestions = document.querySelector("#num-questions"),
  category = document.querySelector("#category"),
  difficulty = document.querySelector("#difficulty"),
  timePerQuestion = document.querySelector("#time"),
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
}

const manualQuestions = [
  {
    question: "Apa yang dimaksud dengan potensial listrik?",
    correct_answer: "Energi potensial per satuan muatan",
    incorrect_answers: ["Daya per satuan waktu", "Arus listrik per satuan waktu", "Muatan listrik per satuan waktu"]
  },
  {
    question: "Satuan dari potensial listrik adalah...",
    correct_answer: "Volt",
    incorrect_answers: ["Ampere", "Ohm", "Watt"]
  },
  {
    question: "Potensial listrik pada suatu titik dihasilkan oleh...",
    correct_answer: "Muatan listrik",
    incorrect_answers: ["Medan magnet", "Induksi elektromagnetik", "Resistansi"]
  },
  {
    question: "Rumus potensial listrik yang dihasilkan oleh muatan titik adalah...",
    correct_answer: "V = k * Q / r",
    incorrect_answers: ["V = I * R", "V = P / I", "V = W / Q"]
  },
  {
    question: "Apa yang terjadi pada potensial listrik jika jarak antara titik pengamatan dan muatan sumber digandakan?",
    correct_answer: "Potensial listrik menjadi setengah",
    incorrect_answers: ["Potensial listrik menjadi dua kali lipat", "Potensial listrik tidak berubah", "Potensial listrik menjadi empat kali lipat"]
  },
  {
    question: "Bagaimana hubungan antara potensial listrik dan medan listrik?",
    correct_answer: "Potensial listrik adalah integral dari medan listrik",
    incorrect_answers: ["Potensial listrik adalah turunan dari medan listrik", "Potensial listrik adalah hasil kali medan listrik", "Tidak ada hubungan antara potensial listrik dan medan listrik"]
  },
  {
    question: "Apa yang dimaksud dengan permukaan ekuipotensial?",
    correct_answer: "Permukaan di mana semua titik memiliki potensial listrik yang sama",
    incorrect_answers: ["Permukaan di mana potensial listrik nol", "Permukaan yang memotong garis-garis medan listrik", "Permukaan yang sejajar dengan garis-garis medan listrik"]
  },
  {
    question: "Bagaimana potensial listrik berubah dengan perubahan jarak dari sumber muatan?",
    correct_answer: "Potensial listrik berbanding terbalik dengan jarak dari sumber muatan",
    incorrect_answers: [
      "Potensial listrik berbanding lurus dengan jarak dari sumber muatan",
      "Potensial listrik tidak dipengaruhi oleh jarak dari sumber muatan",
      "Potensial listrik berbanding terbalik dengan kuadrat jarak dari sumber muatan"
    ]
  },
  {
    question: "Apa yang dimaksud dengan garis-garis ekuipotensial?",
    correct_answer: "Garis yang menghubungkan titik-titik dengan potensial listrik yang sama",
    incorrect_answers: [
      "Garis yang menghubungkan titik-titik dengan potensial listrik yang berbeda",
      "Garis yang tegak lurus terhadap arah medan listrik",
      "Garis yang sejajar dengan arah medan listrik"
    ]
  },
  {
    question: "Bagaimana medan listrik berhubungan dengan gradien potensial listrik?",
    correct_answer: "Medan listrik adalah negatif dari gradien potensial listrik",
    incorrect_answers: [
      "Medan listrik adalah positif dari gradien potensial listrik",
      "Medan listrik tidak berhubungan dengan gradien potensial listrik",
      "Medan listrik adalah hasil bagi dari gradien potensial listrik"
    ]
  },
  {
    question: "Apa yang terjadi pada potensial listrik ketika jarak dari sumber muatan didekati?",
    correct_answer: "Potensial listrik meningkat",
    incorrect_answers: [
      "Potensial listrik menurun",
      "Potensial listrik tetap sama",
      "Potensial listrik berubah secara acak"
    ]
  },
  {
    question: "Apa satuan dari potensial listrik dalam sistem internasional?",
    correct_answer: "Volt",
    incorrect_answers: [
      "Joule",
      "Coulomb",
      "Newton"
    ]
  },
  {
    question: "Apa yang terjadi pada potensial listrik jika muatan sumber digandakan?",
    correct_answer: "Potensial listrik juga digandakan",
    incorrect_answers: [
      "Potensial listrik menjadi setengah",
      "Potensial listrik tidak berubah",
      "Potensial listrik menjadi empat kali lipat"
    ]
  },
  {
    question: "Apa yang dimaksud dengan medan listrik?",
    correct_answer: "Ruang di sekitar muatan listrik di mana gaya listrik dapat dirasakan",
    incorrect_answers: ["Ruang di sekitar magnet", "Ruang di sekitar arus listrik", "Ruang di sekitar medan magnet"]
  },
  {
    question: "Satuan dari medan listrik adalah...",
    correct_answer: "Newton per Coulomb (N/C)",
    incorrect_answers: ["Volt per meter (V/m)", "Joule per Coulomb (J/C)", "Watt per meter (W/m)"]
  },
  {
    question: "Apa yang terjadi pada medan listrik jika muatan sumber digandakan?",
    correct_answer: "Medan listrik juga digandakan",
    incorrect_answers: ["Medan listrik menjadi setengah", "Medan listrik tidak berubah", "Medan listrik menjadi empat kali lipat"]
  },
  {
    question: "Bagaimana arah medan listrik di sekitar muatan positif?",
    correct_answer: "Keluar dari muatan",
    incorrect_answers: ["Masuk ke muatan", "Sejajar dengan muatan", "Tegak lurus terhadap muatan"]
  },
  {
    question: "Bagaimana arah medan listrik di sekitar muatan negatif?",
    correct_answer: "Masuk ke muatan",
    incorrect_answers: ["Keluar dari muatan", "Sejajar dengan muatan", "Tegak lurus terhadap muatan"]
  },
  {
    question: "Apa yang dimaksud dengan hukum Coulomb?",
    correct_answer: "Gaya antara dua muatan berbanding lurus dengan hasil kali muatan dan berbanding terbalik dengan kuadrat jarak antara mereka",
    incorrect_answers: ["Gaya antara dua muatan berbanding lurus dengan jarak antara mereka", "Gaya antara dua muatan berbanding terbalik dengan hasil kali muatan", "Gaya antara dua muatan berbanding lurus dengan kuadrat jarak antara mereka"]
  },
  {
    question: "Apa yang dimaksud dengan kapasitansi?",
    correct_answer: "Kemampuan suatu benda untuk menyimpan muatan listrik",
    incorrect_answers: ["Kemampuan suatu benda untuk menghantarkan listrik", "Kemampuan suatu benda untuk menahan arus listrik", "Kemampuan suatu benda untuk menghasilkan medan listrik"]
  },
  {
    question: "Satuan dari kapasitansi adalah...",
    correct_answer: "Farad",
    incorrect_answers: ["Henry", "Ohm", "Watt"]
  },
  {
    question: "Apa yang terjadi pada kapasitansi jika luas pelat kapasitor digandakan?",
    correct_answer: "Kapasitansi juga digandakan",
    incorrect_answers: ["Kapasitansi menjadi setengah", "Kapasitansi tidak berubah", "Kapasitansi menjadi empat kali lipat"]
  },
  {
    question: "Apa yang dimaksud dengan arus listrik?",
    correct_answer: "Aliran muatan listrik",
    incorrect_answers: ["Aliran energi listrik", "Aliran medan listrik", "Aliran potensial listrik"]
  },
  {
    question: "Satuan dari arus listrik adalah...",
    correct_answer: "Ampere",
    incorrect_answers: ["Volt", "Ohm", "Watt"]
  },
  {
    question: "Apa yang terjadi pada arus listrik jika tegangan digandakan?",
    correct_answer: "Arus listrik juga digandakan",
    incorrect_answers: ["Arus listrik menjadi setengah", "Arus listrik tidak berubah", "Arus listrik menjadi empat kali lipat"]
  },
  {
    question: "Bagaimana hubungan antara arus listrik dan resistansi?",
    correct_answer: "Arus listrik berbanding terbalik dengan resistansi",
    incorrect_answers: ["Arus listrik berbanding lurus dengan resistansi", "Arus listrik tidak dipengaruhi oleh resistansi", "Arus listrik berbanding terbalik dengan kuadrat resistansi"]
  },
  {
    question: "Apa yang dimaksud dengan hukum Ohm?",
    correct_answer: "Tegangan berbanding lurus dengan arus dan resistansi",
    incorrect_answers: ["Tegangan berbanding terbalik dengan arus dan resistansi", "Tegangan berbanding lurus dengan arus dan berbanding terbalik dengan resistansi", "Tegangan berbanding terbalik dengan arus dan berbanding lurus dengan resistansi"]
  },
  {
    question: "Apa yang terjadi pada tegangan jika arus listrik digandakan?",
    correct_answer: "Tegangan juga digandakan",
    incorrect_answers: ["Tegangan menjadi setengah", "Tegangan tidak berubah", "Tegangan menjadi empat kali lipat"]
  },
  {
    question: "Apa yang dimaksud dengan daya listrik?",
    correct_answer: "Laju aliran energi listrik",
    incorrect_answers: ["Laju aliran muatan listrik", "Laju aliran medan listrik", "Laju aliran potensial listrik"]
  },
  {
    question: "Satuan dari daya listrik adalah...",
    correct_answer: "Watt",
    incorrect_answers: ["Volt", "Ampere", "Ohm"]
  }
];

let time = 30,
  score = 0,
  currentQuestion,
  timer;

const startQuiz = () => {
  loadingAnimation();
  const num = parseInt(numQuestions.value, 10); // Get the number of questions as an integer
  const cat = category.value;
  const diff = difficulty.value;

  if (cat === "9") { // Assuming "9" is the category ID for "Potensial Listrik"
    shuffleArray(manualQuestions); // Shuffle the manual questions
    questions = manualQuestions.slice(0, num); // Select only the number of questions specified
    setTimeout(() => {
      startScreen.classList.add("hide");
      quiz.classList.remove("hide");
      currentQuestion = 1;
      showQuestion(questions[0]);
    }, 1000);
  } else {
    const url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        questions = data.results.map((q) => ({
          question: q.question,
          correct_answer: q.correct_answer,
          incorrect_answers: q.incorrect_answers
        }));
        shuffleArray(questions); // Shuffle the fetched questions
        questions = questions.slice(0, num); // Ensure only the specified number of questions are used
        setTimeout(() => {
          startScreen.classList.add("hide");
          quiz.classList.remove("hide");
          currentQuestion = 1;
          showQuestion(questions[0]);
        }, 1000);
      });
  }
};

startBtn.addEventListener("click", startQuiz);

const showQuestion = (question) => {
  const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper");
  questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question;
  questionText.setAttribute("translate", "no");

  const answers = [
    ...question.incorrect_answers,
    question.correct_answer.toString(),
  ];
  answersWrapper.innerHTML = "";
  answers.sort(() => Math.random() - 0.5);
  answers.forEach((answer) => {
    answersWrapper.innerHTML += `
      <div class="answer" translate="no">
        <span class="text">${answer}</span>
        <span class="checkbox">
          <i class="fas fa-check"></i>
        </span>
      </div>
    `;
  });

  questionNumber.innerHTML = ` Question <span class="current">${
    questions.indexOf(question) + 1
  }</span>
    <span class="total">/${questions.length}</span>`;
  questionNumber.setAttribute("translate", "no");

  //add event listener to each answer
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answersDiv.forEach((answer) => {
          answer.classList.remove("selected");
        });
        answer.classList.add("selected");
        submitBtn.disabled = false;
      }
    });
  });

  time = timePerQuestion.value;
  startTimer(time);
};

const startTimer = (time) => {
  timer = setInterval(() => {
    if (time === 3) {
      playAdudio("countdown.mp3");
    }
    if (time >= 0) {
      progress(time);
      time--;
    } else {
      checkAnswer();
    }
  }, 1000);
};

const loadingAnimation = () => {
  startBtn.innerHTML = "Loading";
  const loadingInterval = setInterval(() => {
    if (startBtn.innerHTML.length === 10) {
      startBtn.innerHTML = "Loading";
    } else {
      startBtn.innerHTML += ".";
    }
  }, 500);
};

const submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next");
submitBtn.addEventListener("click", () => {
  checkAnswer();
});

nextBtn.addEventListener("click", () => {
  nextQuestion();
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
});

const checkAnswer = () => {
  clearInterval(timer);
  const selectedAnswer = document.querySelector(".answer.selected");
  if (selectedAnswer) {
    const answer = selectedAnswer.querySelector(".text").innerHTML;
    if (answer === questions[currentQuestion - 1].correct_answer) {
      score++;
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("wrong");
      document.querySelectorAll(".answer").forEach((answer) => {
        if (answer.querySelector(".text").innerHTML === questions[currentQuestion - 1].correct_answer) {
          answer.classList.add("correct");
        }
      });
    }
  } else {
    // If no answer is selected, mark the correct answer
    document.querySelectorAll(".answer").forEach((answer) => {
      if (answer.querySelector(".text").innerHTML === questions[currentQuestion - 1].correct_answer) {
        answer.classList.add("correct");
      }
    });
  }
  document.querySelectorAll(".answer").forEach((answer) => {
    answer.classList.add("checked");
  });

  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};

const nextQuestion = () => {
  if (currentQuestion < questions.length) {
    currentQuestion++;
    showQuestion(questions[currentQuestion - 1]);
  } else {
    showScore();
  }
};

const endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final-score"),
  totalScore = document.querySelector(".total-score");
const showScore = () => {
  endScreen.classList.remove("hide");
  quiz.classList.add("hide");
  finalScore.innerHTML = score;
  finalScore.setAttribute("translate", "no");
  totalScore.innerHTML = `/ ${questions.length}`;
  totalScore.setAttribute("translate", "no");
};

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  window.location.reload();
});

const playAdudio = (src) => {
  const audio = new Audio(src);
  audio.play();
};