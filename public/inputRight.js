const answerFormRight = document.getElementById("answer-form-right");
const rightAnswer = document.getElementById("content_2");
const rightNickname = document.getElementById("nickname_2");
let logging_2 = [];

function submitFormToNotion_right(newAnsobj) {
//   console.log("i will make", newAnsobj);
  fetch(`https://${HOST}:${PORT}/submitFormToNotion_right`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      Nickname: newAnsobj.nickname,
      Content: newAnsobj.answer,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("success!", data);
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
}

// function makeContainer_right(newAns) {
//     // console.log("i will make", newAns);
//     const section = document.createElement("section");
//     section.classList.add("post");
//     section.innerHTML = `
//           <div class="answer">
//             <li>${newAns.answer}</li>
//           </div>
//           <footer class="footer">
//             <span class="post__author">${newAns.nickname}</span>
//           </footer>
//     `;
//     answerbox_right.appendChild(section);
// }

function handleTodoSubmit_right(e) {
  e.preventDefault();
  // console.log("click!");
  // console.log(`rightAnswer: ${rightAnswer.value}, leftnickname: ${rightNickname.value}`);
  const answer_1 = rightAnswer.value;
  const nickname_1 = rightNickname.value;
  rightAnswer.value = "";
  rightNickname.value = "";
  const newAnsobj = {
    answer: answer_1,
    nickname: nickname_1,
    time: Date.now(),
  };
  logging_2.push(newAnsobj);
  socket.emit("rightmessage", newAnsobj); //socket.io
  //   console.log(logging_2);
  // makeContainer_right(newAnsobj);
  submitFormToNotion_right(newAnsobj);
}

socket.on('rightmessage', function (newAns) {
  // console.log("i will make", newAns);
  const section = document.createElement("section");
  section.classList.add("post");
  section.innerHTML = `
          <div class="answer">
            <li>${newAns.answer}</li>
          </div>
          <footer class="footer">
            <span class="post__author">${newAns.nickname}</span>
          </footer>
    `;
  answerbox_right.appendChild(section);
});

answerFormRight.addEventListener("submit", handleTodoSubmit_right);
