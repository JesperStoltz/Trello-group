import model from "./model";
import view from "./view";
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
  },
  getAllData: function() {
    return model.getAllData();
  },
  dragDropHandler: function() {
    let selectedLi;
    let listId;
    let cardId;

    let listGroupItem = Array.from(
      document.querySelectorAll(".list-group-item")
    );
    listGroupItem.map(li => {
      li.addEventListener("dragstart", function(e) {
        selectedLi = e.target;
        listId = model.getListId(e.target);
        cardId = selectedLi.className.match(/list\d+card\d+/)[0];
      });
    });

    let listItemUls = Array.from(document.querySelectorAll(".tcards"));
    listItemUls.map(ul => {
      ul.addEventListener("dragover", function(e) {
        e.preventDefault();
        console.log("valid drop-area");
      });
      ul.addEventListener("drop", function(e) {
        model.moveExistingCard(
          model.getListId(e.target),
          model.getCardObj(cardId)
        );
        model.removeCard(listId, cardId);
        controller.init();
      });
    });
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
        model.addCard(id, textInput.value, textDescription.value);
        textInput.value = "";
        textDescription.value = "";
        cardHolderDiv.classList.remove(`show`);
        controller.init();
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
      const observer = new IntersectionObserver(
        entires => {
          entires.forEach(entry => {
            document.querySelector(
              `a[href='#${entry.target.id}']`
            ).style.height = `${entry.target.clientHeight / 10}px`;
            if (entry.isIntersecting) {
              if (document.querySelector(`a[href='#${entry.target.id}']`)) {
                document
                  .querySelector(`a[href='#${entry.target.id}']`)
                  .classList.add("navOpserver");
              }
            } else {
              if (document.querySelector(`a[href='#${entry.target.id}']`)) {
                document
                  .querySelector(`a[href='#${entry.target.id}']`)
                  .classList.remove("navOpserver");
              }
            }
          });
        },
        {
          root: null
        }
      );
      $.map(t, function(a) {
        observer.observe(a);
      });
    }
  }
};
controller.init();
