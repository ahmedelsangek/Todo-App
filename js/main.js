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
        })
        btn.style.color = "#0a58f5";
    })
})

/*---------------------------Start To Do App--------------------------*/
let addList = document.querySelector(".todo-app .input .add");
let wordInput = document.querySelector(".todo-app .input .write-active");
let tasksArea = document.querySelector(".todo-app .info .list .tasks"); //-----------new
let countItems = document.querySelector(".todo-app .list .count-items span");
localStoragekeysArray = Array.from(Object.keys(localStorage));
window.onload = () => {
    wordInput.focus();
}

//Create 1 list to do when click on button add
addList.addEventListener("click", () => {
    if (wordInput.value != "") {
        // Craete list
        let listDiv = document.createElement("div");
        listDiv.className = "list-div";
        listDiv.classList.add("all");
        listDiv.setAttribute("draggable", "true");
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
        localStorage.setItem(wordInput.value, wordInput.value);

        // Delete List When I Click On X-Button
        xButton.addEventListener("click", function (e) {
            listDiv.remove();
            countItems.innerHTML = tasksArea.children.length;
            //Remove Item from Local storage
            localStorage.removeItem(`${e.target.parentElement.innerText}`);
        });

        //put line throught in list
        spanCheck.onclick = function () {
            this.classList.toggle("show");
            listDiv.classList.toggle("complete");
            if (listDiv.classList.contains("complete")) {
                listDiv.setAttribute("data-completed" , "completed");
                //Change Item Value in Local Storage To Change it style
                localStorage.setItem(listDiv.innerText, "decore");
            } else {
                localStorage.setItem(listDiv.innerText, listDiv.innerText);
                //Change Item Value in Local Storage To Change it style
                listDiv.setAttribute("data-completed" , "");
            }
        }

        let allButton = document.querySelector(".todo-app .control-button .all");
        allButton.addEventListener("click", () => {
            listDiv.style.display = "block";
        })

        //Show only actived list when user click on Active button
        let disCompletedButton = document.querySelector(".discompleted");
        disCompletedButton.addEventListener("click", () => {
            if (listDiv.dataset.completed == "completed") {
                listDiv.style.display = "none";
            } else {
                listDiv.style.display = "block";
            }
        })

        //Show only completed list when user click on completed button
        let completedButton = document.querySelector(".completed");
        completedButton.addEventListener("click", () => {
            if (listDiv.dataset.completed == "completed") {
                listDiv.style.display = "block";
            } else {
                listDiv.style.display = "none";
            }
        })

        // clear completed list when user click on clear complete button
        let clearButton = document.querySelector(".clear-completed");
        clearButton.addEventListener("click", () => {
            if (listDiv.classList.contains("complete")) {
                listDiv.remove();
                countItems.innerHTML = tasksArea.children.length;
                localStorage.removeItem(`${listDiv.innerText}`);
            }
        });

        wordInput.value = "";
        wordInput.focus();
    } else {
        console.log("input empty")
    }
});
/*--------------------------- End To Do App --------------------------*/

/*--------------------------- Start Local Storage --------------------*/
if (localStorage.length > 0) {
    for (let i = 0; i < localStoragekeysArray.length; i++) {
        // Craete list
        let listDiv = document.createElement("div");
        listDiv.className = "list-div";
        listDiv.classList.add("all");
        listDiv.innerHTML = localStoragekeysArray[i];

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
            localStorage.removeItem(`${e.target.parentElement.innerText}`);
        });

        //put line throught in list
        spanCheck.onclick = function () {
            this.classList.toggle("show");
            listDiv.classList.toggle("complete");
            if (listDiv.classList.contains("complete")) {
                listDiv.setAttribute("data-completed" , "completed");
                //Change Item Value in Local Storage To Change it style
                localStorage.setItem(listDiv.innerText, "decore");
            } else {
                listDiv.setAttribute("data-completed" , "");
                //Change Item Value in Local Storage To Change it style
                localStorage.setItem(listDiv.innerText, listDiv.innerText);
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
            if (listDiv.dataset.completed == "completed") {
                listDiv.style.display = "none";
            } else {
                listDiv.style.display = "block";
            };
        });

        //Show only completed list when user click on completed button
        let completedButton = document.querySelector(".completed");
        completedButton.addEventListener("click", () => {
            if (listDiv.dataset.completed == "completed") {
                listDiv.style.display = "block";
            } else {
                listDiv.style.display = "none";
            };
        })

        // clear completed list when user click on clear complete button
        let clearButton = document.querySelector(".clear-completed");
        clearButton.addEventListener("click", () => {
            if (listDiv.classList.contains("complete")) {
                listDiv.remove();
                localStorage.removeItem(`${listDiv.innerText}`);
                countItems.innerHTML = tasksArea.children.length;
            };
        });
    };
};
/*--------------------------- End Local Storage --------------------*/