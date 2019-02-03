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
  },
  getAllData: function() {
    return model.getAllData();
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
    addCard: function(id, cb, cardId) {
      let cardHolderDiv = document.getElementById(`addCardBtn${id}`);
      let cardHolderUlList = document
        .getElementById(id)
        .querySelector(`.list-group.tcards`);
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
    intersectionObserver: function(t) {
      const observer = new IntersectionObserver(
        entires => {
          entires.forEach(entry => {
            if (entry.isIntersecting) {
              document
                .querySelector(`a[href='#${entry.target.id}']`)
                .classList.add("navOpserver");
              document.querySelector(
                `a[href='#${entry.target.id}']`
              ).style.height = `${entry.target.clientHeight / 10}px`;
            } else {
              document
                .querySelector(`a[href='#${entry.target.id}']`)
                .classList.remove("navOpserver");
              document.querySelector(
                `a[href='#${entry.target.id}']`
              ).style.height = `${entry.target.clientHeight / 10}px`;
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
