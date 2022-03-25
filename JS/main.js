window.onload = () => {
  new Promise((resolve) => {
    resolve(
      Swal.fire({
        title: "Enter your Name :",
        input: "text",
        inputLabel: "Your Name",
        showCancelButton: false,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        },
      })
    );
  }).then((v) => {
    document.querySelector(".container header h2 span").textContent = v.value;
    CreateCards(); // Call Create Cards After User Enter His Name
  });
};

let Tries = document.querySelector(".container header p span"); //Wrong Tries Count
let Holder = document.querySelector(".container .Holder"); // Holder For All Cards
let ArrOfShapes = [
  // All Class Names For Icons
  `Back fa-solid fa-circle-radiation`,
  `Back fa-solid fa-skull-crossbones`,
  `Back fa-solid fa-snowflake`,
  `Back fa-solid fa-hippo`,
  `Back fa-solid fa-chess-queen`,
  `Back fa-solid fa-dragon`,
  `Back fa-solid fa-spider`,
  `Back fa-solid fa-fire`,
];
let Cards = null; // Array Of Cards Element
let RightAnswer = 0;

// Timer
let BtnRestart = document.querySelector(".container .timer button");
let Timer = document.querySelector(".container .timer p span"),
  TimerInteval = 0;

BtnRestart.onclick = () => {
  reStartGame();
};

function SetTimer() {
  Timer.textContent = 0;
  clearInterval(TimerInteval);
  TimerInteval = setInterval(() => {
    Timer.textContent++;
  }, 1000);
}

function CreateCards() {
  // Function To Create Cards
  for (let i = 0; i < 8; i++) {
    let question = document.createElement("i"); // Create Question Icon Front
    question.classList = "Front fa-regular fa-question"; //

    question.setAttribute("data-unique", i); // Set Attribute On Element To Unique it

    let Shape = document.createElement("i"); // Create Shape
    Shape.classList = ArrOfShapes[i]; // Add Class Names /Font Awesome

    let Card = document.createElement("div"); // Create Card Element
    Card.classList.add("Card");

    let Box = document.createElement("div"); // Create Box Element
    Box.classList = "Check Box"; // Add Class Box To Style It
    // Add Class Check To opened The Shape On Start

    Box.appendChild(question); // Append Child Question Icon

    Box.appendChild(Shape); // Append Child Shape

    Card.appendChild(Box); // Append Box Element To Card Element

    Card.style.order = i % Math.floor(Math.random() * 15); // Order Cards Randomly

    Holder.appendChild(Card); // Append Card Element To Page
  }
  for (let i = 0; i < 8; i++) {
    let question = document.createElement("i"); // Create Question Icon Front
    question.classList = "Front fa-regular fa-question"; //

    question.setAttribute("data-unique", i); // Set Attribute On Element To Unique it

    let Shape = document.createElement("i"); // Create Shape
    Shape.classList = ArrOfShapes[i]; // Add Class Names /Font Awesome

    let Card = document.createElement("div"); // Create Card Element
    Card.classList.add("Card");

    let Box = document.createElement("div"); // Create Box Element
    Box.classList = "Check Box"; // Add Class Box To Style It
    // Add Class Check To Opened The Shape On Start

    Box.appendChild(question); // Append Child Question Icon

    Box.appendChild(Shape); // Append Child Shape

    Card.appendChild(Box); // Append Box Element To Card Element

    Card.style.order = i % Math.floor(Math.random() * 10); // Order Cards Randomly

    Holder.appendChild(Card); // Append Card Element To Page
  }

  Cards = Array.from(Holder.children); // Array Of Cards Element

  setTimeout(() => {
    // Close All Cards After 3s
    CloseAllCards();
    SetTimer(); //Start Timer
  }, 3000);
  AddEvent(); //Add Event On Cards Open And Close
}

function CloseAllCards() {
  Cards.forEach((el) => {
    // Loop Over All Cards
    el.firstElementChild.classList.remove("Check");
  });
}

function AddEvent() {
  Cards.forEach((element) => {
    // Loop Over Cards To Add Event
    element.onclick = () => {
      // Event OnClick
      element.firstElementChild.classList.add("Check"); // open Box First

      setTimeout(() => {
        // Set Time Out To See The Cards Before Close Them If They Doesn't Match

        if (Check.status_) {
          // Check If There Cards opened or not
          if (
            Check.unique ==
              element.firstElementChild.firstElementChild.getAttribute(
                "data-unique"
              ) &&
            element != Check.element
          ) {
            // If Two Cards Matches
            if (RightAnswer == 7) {
              (() => {
                new Promise((re) => {
                  clearInterval(TimerInteval);
                  re(
                    Swal.fire(
                      "Good job!",
                      `You Finish The Game! with ${Timer.textContent}s`,
                      `success`
                    )
                  );
                }).then(reStartGame);
              })();
            }

            RightAnswer++;

            element.firstElementChild.classList.add("Right"); // Add Class To Open Cards At All
            Check.element.firstElementChild.classList.add("Right"); // Add Class To Open Cards At All

            element.firstElementChild.lastElementChild.classList.add("Right"); // Change Color Of Shape
            Check.element.firstElementChild.lastElementChild.classList.add(
              "Right"
            ); // Change Color Of Shape
          } else {
            if (element != Check.element) {
              // Limit Tries
              Tries.textContent++; // Increment Wrong Tries
            }
            if (Tries.textContent > 8) {
              (() => {
                new Promise((resolve) => {
                  resolve(
                    Swal.fire({
                      icon: "error",
                      title: "Game Over",
                      text: "Wrong Tries exceed limit",
                      footer: "Try Again",
                    })
                  );
                }).then(reStartGame);
              })();
            }
            element.firstElementChild.classList.remove("Check"); //  Close Card
            Check.element.firstElementChild.classList.remove("Check"); //  Close Card
          }
          // Reset Last Opened Card
          Check.status_ = false;
          Check.element = null;
          Check.unique = -1;
        } else {
          // Put Details Of Cards On Last Opened Card
          Check.status_ = true;
          Check.element = element;
          Check.unique =
            element.firstElementChild.firstElementChild.getAttribute(
              "data-unique"
            );
        }
      }, 500);
    };
  });
}

function reStartGame() {
  Holder.innerHTML = "";
  CreateCards();
  Tries.textContent = 0;
  RightAnswer = 0;
}

let Check = {
  // Object To Catch Value Of Last Opened Card
  unique: "-1", // Data-unique attribute
  element: null, // Element It's Self
  status_: false, // Status Either There Card opened Or Not
};
