// Change Body Theme
let monandsunButton = document.querySelector(".todo-app .theme");
monandsunButton.addEventListener("click", () => {
    document.body.classList.toggle("sun");
});

//Change Control Button's Color When Clicked On it
let AllControlButtons = document.querySelectorAll(".todo-app .control-button span");
AllControlButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        AllControlButtons.forEach(btn => {
            btn.style.color = "#777a92";
        });
        btn.style.color = "#0a58f5";
    });
});

/*---------------------------Start To Do App--------------------------*/
let wordInput = document.querySelector(".todo-app .input .write-active");
let tasksArea = document.querySelector(".todo-app .info .list .tasks");
let countItems = document.querySelector(".todo-app .list .count-items span");
let items = [];
if (JSON.parse(localStorage.getItem("task"))) {
    items = JSON.parse(localStorage.getItem("task"));
};
window.onload = () => {
    wordInput.focus();
};
//Create Task when click on Enter Key
wordInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        if (wordInput.value != "") {
        // Craete list
        let listDiv = document.createElement("div");
        listDiv.className = "list-div";
        listDiv.classList.add("all");
        listDiv.innerHTML = wordInput.value;

        //Create Span Check List
        let spanCheck = document.createElement("span");
        spanCheck.className = "span-check";
        listDiv.appendChild(spanCheck);

        //Create Button his job is Delete List When I Click On It
        let xButton = document.createElement("img");
        xButton.src = "./imgs/icon-cross.svg";
        xButton.className = "x-button";
        listDiv.appendChild(xButton);

        tasksArea.appendChild(listDiv);

        //Increase Items Left When Todo List Increasing
        countItems.innerHTML = tasksArea.children.length;

        //Set Item To Local Storage include aboute Input Value
        items.push(wordInput.value);
        localStorage.setItem("task", JSON.stringify(items));

        // Delete List When I Click On X-Button
        xButton.addEventListener("click", function (e) {
            listDiv.remove();
            countItems.innerHTML = tasksArea.children.length;
            items.splice(items.indexOf(listDiv.innerText),1);
            localStorage.setItem("task", JSON.stringify(items));
            localStorage.removeItem(listDiv.innerText);
        });

        //put line throught in list
        spanCheck.addEventListener("click", () => {
            spanCheck.classList.toggle("show");
            listDiv.classList.toggle("complete");
            if (listDiv.classList.contains("complete")) {
                //Change Item Value in Local Storage To Change it style
                localStorage.setItem(`${listDiv.innerText}`, "decore");
            } else {
                //Change Item Value in Local Storage To Change it style
                localStorage.setItem(`${listDiv.innerText}`, "");
            }
        })

        let allButton = document.querySelector(".todo-app .control-button .all");
        allButton.addEventListener("click", () => {
            listDiv.style.display = "block";
        })

        //Show only actived list when user click on Active button
        let disCompletedButton = document.querySelector(".discompleted");
        disCompletedButton.addEventListener("click", () => {
            if (listDiv.classList.contains("complete")) {
                listDiv.style.display = "none";
            } else {
                listDiv.style.display = "block";
            }
        })

        //Show only completed list when user click on completed button
        let completedButton = document.querySelector(".completed");
        completedButton.addEventListener("click", () => {
            if (listDiv.classList.contains("complete")) {
                listDiv.style.display = "block";
            } else {
                listDiv.style.display = "none";
            }
        })

        wordInput.value = "";
        wordInput.focus();
        } else {
            console.log()
        }
        clearCompleted();
    };
});
/*--------------------------- End To Do App --------------------------*/

/*--------------------------- Start Local Storage --------------------*/
if (localStorage.length > 0) {
    for (let i = 0; i < JSON.parse(localStorage.getItem("task")).length; i++) {
        // Craete list
        let listDiv = document.createElement("div");
        listDiv.className = "list-div";
        listDiv.classList.add("all");
        listDiv.innerHTML = JSON.parse(localStorage.getItem("task"))[i];

        //Create Span Check List
        let spanCheck = document.createElement("span");
        spanCheck.className = "span-check";
        listDiv.appendChild(spanCheck);

        //Create Button his job is Delete List When I Click On It
        let xButton = document.createElement("img");
        xButton.src = "./imgs/icon-cross.svg";
        xButton.className = "x-button";
        listDiv.appendChild(xButton);

        tasksArea.appendChild(listDiv);

        //Increase Items Left When Todo List Increasing
        countItems.innerHTML = tasksArea.children.length;

        // Delete List When I Click On X-Button
        xButton.addEventListener("click", function (e) {
            listDiv.remove();
            countItems.innerHTML = tasksArea.children.length;
            //Remove Item From Local Storage
            items.splice(items.indexOf(listDiv.innerText),1);
            localStorage.setItem("task", JSON.stringify(items));
            localStorage.removeItem(listDiv.innerText);
        });

        //put line throught in list
        spanCheck.onclick = function (e) {
            this.classList.toggle("show");
            listDiv.classList.toggle("complete");
            if (listDiv.classList.contains("complete")) {
                //Change Item Value in Local Storage To Change it style
                localStorage.setItem(listDiv.innerText, "decore");
            } else {
                //Change Item Value in Local Storage To Change it style
                localStorage.setItem(listDiv.innerText, "");
            };
        };

        //Change Task Style To Complete Style
        if (localStorage.getItem(listDiv.innerText) == "decore") {
            listDiv.classList.add("complete");
            spanCheck.classList.toggle("show");
        };

        let allButton = document.querySelector(".todo-app .control-button .all");
        allButton.addEventListener("click", () => {
            listDiv.style.display = "block";
        });

        //Show only actived list when user click on Active button
        let disCompletedButton = document.querySelector(".discompleted");
        disCompletedButton.addEventListener("click", () => {
            if (listDiv.classList.contains("complete")) {
                listDiv.style.display = "none";
            } else {
                listDiv.style.display = "block";
            };
        });

        //Show only completed list when user click on completed button
        let completedButton = document.querySelector(".completed");
        completedButton.addEventListener("click", () => {
            if (listDiv.classList.contains("complete")) {
                listDiv.style.display = "block";
            } else {
                listDiv.style.display = "none";
            };
        })

        clearCompleted();
    };
};
/*--------------------------- End Local Storage --------------------*/

//Clear all tasks completed Function
function clearCompleted() {
let clearButton = document.querySelector(".clear-completed");
clearButton.addEventListener("click", (e) => {
    tasksArea.childNodes.forEach(child => {
        if (child.classList.contains("complete")) {
            child.remove();
            countItems.innerHTML = tasksArea.children.length;
            items.splice(items.indexOf(`${child.textContent}`),1);
            localStorage.setItem("task", JSON.stringify(items));
            localStorage.removeItem(`${child.textContent}`);
        };
    });
});
};