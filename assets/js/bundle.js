(function () {
  'use strict';

  var model = {
    user: "userName",
    id: 3,
    _lists: [
      {
        id: "list0",
        name: "To-do",
        listItemsId: 2,
        listItems: [
          {
            id: "list0card0",
            text: "To-do 1",
            itemDescription: "Description",
            user: "userName",
            date: "2019-01-01 00:00"
          },
          {
            id: "list0card1",
            text: "To-do 2",
            itemDescription: "Description",
            user: "userName",
            date: "2019-01-01 00:00"
          }
        ]
      },
      {
        id: "list1",
        name: "Doing",
        listItemsId: 2,
        listItems: [
          {
            id: "list1card0",
            text: "Doing 1",
            itemDescription: "Description",
            user: "userNames",
            date: "2019-01-01 00:00"
          },
          {
            id: "list1card1",
            text: "Doing 2",
            itemDescription: "Description",
            user: "userName",
            date: "2019-01-01 00:00"
          }
        ]
      },
      {
        id: "list2",
        name: "Done",
        listItemsId: 2,
        listItems: [
          {
            id: "list2card0",
            text: "Done 1",
            itemDescription: "Description",
            user: "userName",
            date: "2019-01-01 00:00"
          },
          {
            id: "list2card1",
            text: "Done 2",
            itemDescription: "Description",
            user: "userName",
            date: "2019-01-01 00:00"
          }
        ]
      }
    ],
    getAllData: function() {
      return this._lists;
    },
    addNewList: function() {
      let id = this.id++;
      this._lists.push({
        id: `list${id}`,
        name: `list ${id}`,
        listItemsId: 0,
        listItems: []
      });
    },
    getLastChild: function() {
      return this._lists[this._lists.length - 1];
    },
    removeList: function(id) {
      return this._lists.map((list, index) => {
        if (list.id === id) {
          this._lists.splice(index, 1);
        }
      });
    },
    rename: function(id, newName) {
      return this._lists.map(list => {
        if (list.id === id) {
          list.name = newName;
        }
      });
    },
    editCard: function(name, description, cardId) {
      this._lists.map(list => {
        list.listItems.map(item => {
          if (item.id === cardId) {
            item.text = name;
            item.itemDescription = description;
          }
        });
      });
    },
    getCardObj: function(cardId) {
      let obj;
      this._lists.map(list => {
        list.listItems.map(item => {
          if (item.id === cardId) {
            obj = item;
          }
        });
      });
      return obj;
    },
    addCard: function(id, text, description) {
      let options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      };
      return this._lists.map(list => {
        if (list.id === id) {
          list.listItemsId++;
          list.listItems.push({
            id: `${list.id}card${list.listItemsId}`,
            text: text,
            itemDescription: description,
            user: this.user,
            date: new Date().toLocaleString("sv-SE", options)
          });
        }
      });
    },
    moveExistingCard: function(id, obj) {
      this._lists.map(list => {
        if (list.id === id) {
          list.listItems.push(obj);
        }
      });
    },
    removeCard: function(listId, cardId) {
      for (let list of this._lists) {
        if (listId === list.id) {
          for (let listItem of list.listItems) {
            if (listItem.id === cardId) {
              list.listItems.splice(list.listItems.indexOf(listItem), 1);
              return;
            }
          }
        }
      }
      //filter function collides with drag n drop somehow
      // return this._lists.map(list => {
      //   if (list.id === listId) {
      //     list.listItems.map((item, index) => {
      //       if (item.id === cardId) {
      //         list.listItems.splice(index, 1);
      //       }
      //     });
      //   }
      // });
    },
    getListId: function(element) {
      //used from inside list-structure to see which list the element is a children of
      let regex = /list\d+/; //Sets a regex-definition to be used to the selected list.
      let parent = element; //(element.localName === "ul") ? element : element.parentNode;
      while (!regex.test(parent.className) || parent.localName !== "ul") {
        //if parent does not contain the id we're looking for, enter loop, also making sure regex matches the lists's id and nor card's id
        parent = parent.parentNode; //climb one "step" up the html structure, loop again
      }
      return parent.className.match(regex)[0]; //Uses the above regex to identify the selected lists id.
    },
    getCardId: function(element) {
      let regex = /list\d+card\d+/;
      let parent = element;
      while (!regex.test(parent.id)) {
        parent = parent.parentNode;
      }
      return parent.id.match(regex)[0];
    }
  };

  function listItemTemp(data) {
    let item = `<li class="list-group-item mt-1 ${data.id}" draggable="true">
               <span class="list-item-name">${data.text}</span>
               <div class="d-block mt-2">
                 <span class="badge badge-pill badge-secondary">${
                   data.user
                 }</span>
                 <span class="badge badge-pill badge-success">${
                   data.date
                 }</span>
               </div>
               <div class="dropdown leftDrop dropright">
                 <span data-toggle="dropdown"><i class="fas fa-pen p-1"></i></span>
                 <div class="dropdown-menu todoDropdownHolder border-0">
                   <div class="w-100">
                     <span class="dropdown-item rounded" data-toggle="modal" href="#" data-target="#${
                       data.id
                     }">Edit Labels</span>
                     <span class="dropdown-item rounded removeCard" href="#" data-set="${
                       data.id
                     }">Remove Item</span>
                   </div>
                 </div>
               </div>
             </li>
            <div class="modal fade" id="${data.id}" draggable="false">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">${data.text}</h4>
                    <input type="text" value="${
                      data.text
                    }" class="modal-header-input">
                    <div class="modal-header-tooltip">Click to edit</div>
                  </div>
                  <div class="modal-body">
                    <textarea class="form-control modal-body-input" id="exampleFormControlTextarea1" rows="3">${
                      data.itemDescription
                    }</textarea>
                    <div class="modal-header-tooltip">Click to edit</div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-info editCardDone" data-dismiss="modal">Change</button>
                  </div>
                </div>
              </div>
            </div>
  `;

    return item;
  }

  var itemListView = {
    init: function(data, target, miniControl) {
      this.render(data, target, miniControl);
    },
    render: function(data, target, miniControl) {
      data.forEach(element => {
        miniControl.removeList(element.id);
        miniControl.renameList(element.id, element.name);
        miniControl.addCard(element.id, listItemTemp, element.listItemsId);
        element.listItems.forEach(listItem => {
          target
            .querySelector(`#${element.id}`)
            .querySelector(`.tcards`).innerHTML += listItemTemp(listItem);
          miniControl.removeCard(element.id);
        });
      });
    }
  };

  function listTemp(data) {
    let item = `
  <!--the id of the list-->
  <div class="box col-md-3 border mb-3 p-3 bg-info rounded flex-column d-flex justify-content-between" id="${
    data.id
  }">
      <div class="w-100 m-0">
        <!--Todo List Header + Dropdown Start-->
        <div class="dropdown dropright w-100 p-1">
          <button
            type="button"
            class="btn dropdown-toggle w-100 text-white"
            data-toggle="dropdown"
          >
          <!--the name of the list-->
            ${data.name}
            </button>
            <div class="d-none" style="position:relative;top: -33px;left: 12px;">
            <!--the name of the input element-->
            <input id="nameInput${
              data.id
            }" class="bg-info" style="border:none;color:white;">
            <button class="renameBtn bg-info">Change</button>
            </div>
        
          <div class="dropdown-menu">
            <!--Dropdown List Start-->
            <span class="dropdown-item renameList" href="#">Rename List</span>
            <hr />
            <span class="dropdown-item removeList" href="#">Remove List</span>
            <!--Dropdown List Start-->
          </div>
        </div>
        <!--Todo List Header + Dropdown Start-->
        <ul class="list-group tcards ${data.id}">
        </ul>
      </div>
      <!--add card button start -->
      <!--the name of the accordion div-->
      <div class="accordion" id="accordion${data.id}">
        <div class="card mt-4 border-0 bg-info">
          <div
            id="addCardBtn${data.id}"
            class="collapse"
            aria-labelledby="addCardBtnHeading${data.id}"
            data-parent="#accordion${data.id}"
          >
            <div class="card-body p-1">
              <div>
                <ul class="list-group">
                  <li class="list-group-item border-0 p-0 bg-info">
                    <form>
                      <div class="form-group">
                        <label for="textInput${
                          data.id
                        }" class="text-light">Text</label>
                        <input type="text" class="form-control" id="textInput${
                          data.id
                        }" >
                          <div class="invalid-feedback">
                              Can't Add Empty Card.
                          </div>
                      </div>
                      <div class="form-group">
                        <label for="textAreaInput${
                          data.id
                        }" class="text-light">Description</label>
                        <textarea class="form-control" id="textAreaInput${
                          data.id
                        }" rows="3"></textarea>
                      </div>
                      <button type="submit" class="btn btn-link bg-white">
                        Add Card
                      </button>
                    </form>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            class="card-header border-0 p-0 bg-info"
            id="addCardBtnHeading${data.id}"
          >
            <h5 class="mb-0 mt-3 w-100 ">
              <button
                class="btn btn-link collapsed text-white"
                data-toggle="collapse"
                data-target="#addCardBtn${data.id}"
                aria-expanded="false"
                aria-controls="addCardBtn${data.id}"
              >
                add card +
              </button>
            </h5>
          </div>
        </div>
      </div>
      <!-- add card button end-->
    </div>
  
  `;

    return item;
  }

  function ulListTemp(data) {
    let item = `
      <li>
      <a href="#${data.id}" class=""data-scroll>
      </a>
      <span class=" listSpan">${data.name}</span>
    </li>
      `;
    return item;
  }

  var view = {
    init: function(data, target, miniControl) {
      document.getElementById("listNav").innerHTML = this.renderList(data);
      target.innerHTML = this.render(data);
      itemListView.init(data, target, miniControl);
      miniControl.intersectionObserver(
        document.querySelectorAll("#TodoListHolder .box")
      );
    },
    render: function(data) {
      let htmlElement = "";
      data.forEach(element => {
        htmlElement += listTemp(element);
      });
      return htmlElement;
    },
    renderList: function(data) {
      let ul = "";
      data.forEach(element => {
        ul += ulListTemp(element);
      });
      return ul;
    }
  };

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

      let listGroupItem = Array.from(
        document.querySelectorAll(".list-group-item")
      );
      listGroupItem.map(li => {
        li.addEventListener("dragstart", function() {
          selectedLi = this;
          listId = model.getListId(this);
          cardId = selectedLi.className.match(/list\d+card\d+/)[0];
          setTimeout(function() {
            //must be in a timeout or else item hides before it's picked up
            selectedLi.classList.add("d-none");
          }, 1);
        });
      });

      let listItemUls = Array.from(document.querySelectorAll(".tcards"));
      listItemUls.map(ul => {
        ul.addEventListener("dragover", function(e) {
          e.preventDefault();
        });

        ul.addEventListener("dragend", function() {
          selectedLi.classList.remove("d-none");
        });

        ul.addEventListener("drop", function() {
          if (model.getListId(this) !== listId) {
            //to not drop in the same list
            model.moveExistingCard(
              model.getListId(this),
              model.getCardObj(cardId)
            );
            model.removeCard(listId, cardId);
            controller.init();
          }
        });
      });
    },
    editCardEvent: function() {
      let editCardDoneBtns = Array.from(
        document.querySelectorAll(".editCardDone")
      );
      editCardDoneBtns.map(btn => {
        btn.addEventListener("click", function(e) {
          let cardId = model.getCardId(btn);
          let cardEditUI = document.querySelector(`#${cardId}`);
          let inputName = cardEditUI.querySelector("input");
          let inputDescription = cardEditUI.querySelector("textarea");
          model.editCard(inputName.value, inputDescription.value, cardId);

          // move this to view?
          let listItemName = document.querySelector(`.${cardId} > span`);
          listItemName.textContent = inputName.value;
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

  //test purpose
  document.querySelector(".navbar-brand").addEventListener("click", function() {
    console.log(controller.getAllData());
  });

}());
