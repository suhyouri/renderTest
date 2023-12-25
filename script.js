const PORT = 8000;
const HOST = "localhost";

//---> left page
const getDataFromBackend_1 = async () => {
  const rest = await fetch(`http://${HOST}:${PORT}/leftpage`);
  const data = await rest.json();
  console.log(data);
  return data;
};

const addDataLeft = async () => {
  const data = await getDataFromBackend_1();
  data.forEach((value) => {
    const section = document.createElement("section");
    section.classList.add("post");
    console.log(value);
    section.innerHTML = `
          <div class="answer">
            <li>${value.answer}</li>
          </div>
          <footer class="footer">
            <span class="post__author">${value.nickname}</span>
          </footer>
    `;
    answerbox_left.append(section);
  });
};

addDataLeft();

//---right page
const getDataFromBackend_2 = async () => {
  const rest = await fetch(`http://${HOST}:${PORT}/rightpage`);
  const data = await rest.json();
  console.log(data);
  return data;
};

const addDataRight = async () => {
  const data = await getDataFromBackend_2();
  data.forEach((value) => {
    const section = document.createElement("section");
    section.classList.add("post");
    console.log(value);
    section.innerHTML = `
          <div class="answer">
            <li>${value.answer}</li>
          </div>
          <footer class="footer">
            <span class="post__author">${value.nickname}</span>
          </footer>
    `;
    answerbox_right.append(section);
  });
};

addDataRight();
