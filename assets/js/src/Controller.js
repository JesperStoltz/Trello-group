import model from "./model";
import view from "./view";
import descriptionHistory from "./template/descriptionHistoryTemp";
let target = document.getElementById("TodoListHolder");
let addListBtn = document.getElementById("addList");
addListBtn.addEventListener("click", function() {
  model.addNewList();
  controller.init();
});
let controller = {
  init: function() {
    view.init(this.getAllData(), target, this.miniControl);
    this.dragDropHandler();
    this.editCardEvent();
  },
  getAllData: function() {
    return model.getAllData();
  },
  dragDropHandler: function() {
    let selectedLi;
    let listId;
    let cardId;

    let listGroupItem = Array.from(document.querySelectorAll(".list-group-item"));
    listGroupItem.map(li => {
      li.addEventListener("dragstart", function() {
        selectedLi = this;
        listId = controller.getListIdFromClass(this);
        cardId = selectedLi.className.match(/list\d+card\d+/)[0];
        setTimeout(function() {
          selectedLi.classList.add("d-none");
        }, 1);
      });
    });

    let lists = Array.from(document.querySelectorAll(".box"));
    lists.map(list => {
      list.addEventListener("dragover", function(e) {
        e.preventDefault();
      });

      list.addEventListener("dragend", function () {
        selectedLi.classList.remove("d-none");
      });

      list.addEventListener("drop", function(e) {
        if (controller.getListIdFromId(this) !== listId) {
          model.moveExistingCard(controller.getListIdFromId(this), model.getCardObj(cardId));
          model.removeCard(listId, cardId);
          controller.init();
        }
      });
    })
  },
  editCardEvent: function() {
    let editCardDoneBtns = Array.from(document.querySelectorAll(".editCardDone"));
    editCardDoneBtns.map(btn => {
      let cardId = controller.getCardId(btn);
      let cardEditUI = document.querySelector(`#${cardId}`);
      let oldValue = "";
      cardEditUI.querySelector("textarea").addEventListener("focus", function() {
          oldValue = this.value;
        });
      btn.addEventListener("click", function(e) {
        let inputName = cardEditUI.querySelector("input");
        let inputDescription = cardEditUI.querySelector("textarea");
        model.editCard(inputName.value, inputDescription.value, cardId, oldValue);
        let listItemName = document.querySelector(`.${cardId} > span`);
        listItemName.textContent = inputName.value;
        cardEditUI.querySelector("#accordion" + cardId).innerHTML = "";
        model.getCardObj(cardId).itemDescriptionHistory.map((data, index) => {
          cardEditUI.querySelector(
            "#accordion" + cardId
          ).innerHTML += descriptionHistory(data, index, cardId);
        });
        oldValue = "";
      });
    });
  },
  getListIdFromClass: function(element) { //used from inside list-structure to see which list the element is a children of
    let regex = /list\d+/; //Sets a regex-definition to be used to the selected list.
    let parent = element; //(element.localName === "ul") ? element : element.parentNode;
    while (!regex.test(parent.className) || parent.localName !== "ul") {
      //if parent does not contain the id we're looking for, enter loop, also making sure regex matches the lists's id and nor card's id
      parent = parent.parentNode; //climb one "step" up the html structure, loop again
    }
    return parent.className.match(regex)[0]; //Uses the above regex to identify the selected lists id.
  },
  getListIdFromId(element) {
    let regex = /list\d+/
    let parent = element;
    while(!regex.test(parent.id)) {
      parent = parent.parentNode;
    }
    return parent.id.match(regex)[0];
  },
  getCardId: function(element) {
    let regex = /list\d+card\d+/;
    let parent = element;
    while (!regex.test(parent.id)) {
      parent = parent.parentNode;
    }
    return parent.id.match(regex)[0];
  },
  miniControl: {
    removeList: function(id) {
      document
        .getElementById(id)
        .querySelector(".removeList")
        .addEventListener("click", function() {
          model.removeList(this.closest("div[id*='list']").id);
          controller.init();
        });
    },
    renameList: function(id, name) {
      let parent = document.getElementById(id);
      let renameBtn = parent.querySelector(".dropdown .renameList");
      let dropdownBtn = document
        .getElementById(id)
        .querySelector(".btn.dropdown-toggle");
      let input = document.getElementById("nameInput" + id);
      let inputHolderDiv = input.parentElement;
      renameBtn.addEventListener("click", function() {
        input.value = name;
        inputHolderDiv.classList.remove("d-none");
        let changeBtn = parent.querySelector(".renameBtn");
        changeBtn.addEventListener("click", function() {
          model.rename(id, input.value);
          controller.init();
        });
      });
    },
    addCard: function(id) {
      let cardHolderDiv = document.getElementById(`addCardBtn${id}`);
      let textInput = document.getElementById(`textInput${id}`);
      let textDescription = document.getElementById(`textAreaInput${id}`);
      let addCardBtn = document
        .getElementById(id)
        .querySelector(`button[type="submit"]`);
      addCardBtn.addEventListener("click", function(e) {
        e.preventDefault();
        if (textInput.value.length !== 0) {
          model.addCard(id, textInput.value, textDescription.value);
          textInput.value = "";
          textDescription.value = "";
          cardHolderDiv.classList.remove(`show`);
          controller.init();
        }
      });
    },
    removeCard: function(listId) {
      [...document.querySelectorAll(".removeCard")].map(removeBtn => {
        removeBtn.addEventListener("click", function() {
          model.removeCard(listId, this.getAttribute("data-set"));
          controller.init();
        });
      });
    },
    intersectionObserver: function(t) {
      [...t].map(li => {
        $(`li a[href="#${li.id}"]`).height($(li).height() / 15);
      });
    }
  }
};
controller.init();
