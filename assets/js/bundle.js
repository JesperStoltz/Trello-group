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
            itemDescription: "to-do 1 description",
            user: "user 1",
            date: "12-12-2019"
          },
          {
            id: "list0card1",
            text: "To-do 2",
            itemDescription: "to-do 2 description",
            user: "user2",
            date: "12-12-2019"
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
            itemDescription: "Doing 1 description",
            user: "user 1",
            date: "12-12-2019"
          },
          {
            id: "list1card1",
            text: "Doing 2",
            itemDescription: "Doing 2 description !!",
            user: "user 2",
            date: "12-12-2019"
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
            itemDescription: "Done 1 description",
            user: "user 1",
            date: "12-12-2019"
          },
          {
            id: "list2card1",
            text: "Done 2",
            itemDescription: "Done 2 description !!",
            user: "user 2",
            date: "12-12-2019"
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
      return this._lists.filter((list, index) => {
        if (list.id === id) {
          this._lists.splice(index, 1);
        }
      });
    },
    rename: function(id, newName) {
      return this._lists.filter(list => {
        if (list.id === id) {
          list.name = newName;
        }
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
      return this._lists.filter(list => {
        if (list.id === id) {
          list.listItemsId++;
          list.listItems.push({
            id: `${list.id}card${list.listItemsId}`,
            text: text,
            itemDescription: description,
            user: this.user,
            date: new Date().toGMTString()
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
      //EMIL
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
      //BASEL
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
    getListId: function (element) { //used from inside list-structure to see which list the element is a children of
      let regex = /list\d+/; //Sets a regex-definition to be used to the selected list.
      let parent = element; //(element.localName === "ul") ? element : element.parentNode;
      while(!regex.test(parent.className) || parent.localName !== "ul") { //if parent does not contain the id we're looking for, enter loop, also making sure regex matches the lists's id and nor card's id
        parent = parent.parentNode; //climb one "step" up the html structure, loop again
      }
      return parent.className.match(regex)[0];  //Uses the above regex to identify the selected lists id.
    }
  };

  function listItemTemp(data) {
    let item = `
  <li class="list-group-item mt-1 ${data.id}" draggable="true">
               ${data.text}
               <div class="d-block mt-2">
                 <span class="badge badge-pill badge-secondary">${
                   data.user
                 }</span>
                 
                 <span class="badge badge-pill badge-success">${
                   data.date
                 }</span>
               </div>
               <div class="dropdown leftDrop dropright ">
                 <span data-toggle="dropdown"
                   ><i class="fas fa-pen p-1"></i
                 ></span>
                 <div class="dropdown-menu todoDropdownHolder border-0">
                   <!--Dropdown List Start-->
                   <div class="w-100">
                     <span class="dropdown-item rounded" data-toggle="modal" href="#" data-target="#${
                       data.id
                     }">Edit Labels</span>
                     <span class="dropdown-item rounded removeCard" href="#" data-set="${
                       data.id
                     }">Remove Item</span>
                   </div>

                   <!--Dropdown List End-->
                 </div>
               </div>
             </li>
             <!-- The Modal -->
            <div class="modal fade" id="${data.id}">
                <div class="modal-dialog">
                   <div class="modal-content">
                   <!-- Modal Header -->
                      <div class="modal-header">
                        <h4 class="modal-title">${data.text}</h4>
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                      </div>
                      <!-- Modal body -->
                      <div class="modal-body">
                         ${data.itemDescription}
                      </div>
                      <!-- Modal footer -->
                      <div class="modal-footer">
                         <button type="button" class="btn btn-info" data-dismiss="modal">Close</button>
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
        miniControl.intersectionObserver($(`#TodoListHolder .box`));
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
      <a href="#${data.id}" data-scroll>
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
        li.addEventListener("dragstart", function (e) {
          selectedLi = e.target;
          listId = model.getListId(e.target);
          cardId = selectedLi.className.match(/list\d+card\d+/)[0];
        });
      });

      let listItemUls = Array.from(document.querySelectorAll(".tcards"));
      listItemUls.map(ul => {
        ul.addEventListener("dragover", function (e) {
          e.preventDefault();
          console.log("valid drop-area");
        });
        ul.addEventListener("drop", function (e) {
          model.moveExistingCard(model.getListId(e.target), model.getCardObj(cardId)); //passes in targeted list along with obj and add
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
              if (entry.isIntersecting) {
                if (document.querySelector(`a[href='#${entry.target.id}']`)) {
                  document
                    .querySelector(`a[href='#${entry.target.id}']`)
                    .classList.add("navOpserver");
                  document.querySelector(
                    `a[href='#${entry.target.id}']`
                  ).style.height = `${entry.target.clientHeight / 10}px`;
                }
              } else {
                if (document.querySelector(`a[href='#${entry.target.id}']`)) {
                  document
                    .querySelector(`a[href='#${entry.target.id}']`)
                    .classList.remove("navOpserver");
                  document.querySelector(
                    `a[href='#${entry.target.id}']`
                  ).style.height = `${entry.target.clientHeight / 10}px`;
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

  //test purpose
  document.querySelector(".navbar-brand").addEventListener("click", function () {
    console.log(controller.getAllData());
  });
  window.addEventListener("click", function (e) {
    console.log(e.target);
  });

}());
