export default {
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
  editCard: function(name, description, cardId) {
    this._lists.map(list => {
      list.listItems.map(item => {
        if(item.id === cardId) {
          item.text = name;
          item.itemDescription = description;
        }
      })
    })
  },
  getCardObj: function(cardId) {
    let obj;
    this._lists.map(list => {
      list.listItems.map(item => {
        if (item.id === cardId) {
          obj = item;
        }
      })
    })
    return obj;
  },
  addCard: function(id, text, description) {
    let options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    return this._lists.filter(list => {
      if (list.id === id) {
        list.listItemsId++;
        list.listItems.push({
          id: `${list.id}card${list.listItemsId}`,
          text: text,
          itemDescription: description,
          user: this.user,
          date: new Date().toLocaleString('sv-SE', options),
        });
      }
    });
  },
  moveExistingCard: function(id, obj) {
    this._lists.map(list => {
      if (list.id === id) {
        list.listItems.push(obj);
      }
    })
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
  getListId: function (element) { //used from inside list-structure to see which list the element is a children of
    let regex = /list\d+/ //Sets a regex-definition to be used to the selected list.
    let parent = element; //(element.localName === "ul") ? element : element.parentNode;
    while(!regex.test(parent.className) || parent.localName !== "ul") { //if parent does not contain the id we're looking for, enter loop, also making sure regex matches the lists's id and nor card's id
      parent = parent.parentNode; //climb one "step" up the html structure, loop again
    }
    return parent.className.match(regex)[0];  //Uses the above regex to identify the selected lists id.
  },
  getCardId: function(element) {
    let regex = /list\d+card\d+/;
    let parent = element;
    while(!regex.test(parent.id)) {
      parent = parent.parentNode;
    }
    return parent.id.match(regex)[0];
  }
};