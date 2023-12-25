const answerFormLeft = document.getElementById("answer-form-left");
const leftAnswer = document.getElementById("content_1");
const leftNickname = document.getElementById("nickname_1");
let logging = [];

function submitFormToNotion_left(newAnsobj) {
//   console.log("i will make", newAnsobj);
  fetch(`http://${HOST}:${PORT}/submitFormToNotion_left`, {
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

// function makeContainer_left(newAns) {
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
//     answerbox_left.appendChild(section);
// }

function handleTodoSubmit_left(e) {
    e.preventDefault();
    // console.log("click!");
    // console.log(`leftAnswer: ${leftAnswer.value}, leftnickname: ${leftNickname.value}`);
    const answer_1 = leftAnswer.value;
    const nickname_1 = leftNickname.value;
    leftAnswer.value = "";
    leftNickname.value = "";
    const newAnsobj = {
        answer: answer_1,
        nickname: nickname_1,
        time: Date.now(),
    };
  logging.push(newAnsobj);
  socket.emit("leftmessage", newAnsobj);//socket.io
//   console.log(logging);
    // makeContainer_left(newAnsobj);
    submitFormToNotion_left(newAnsobj);
}

socket.on('leftmessage', function (newAns) {
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
  answerbox_left.appendChild(section);
});

answerFormLeft.addEventListener("submit", handleTodoSubmit_left);
