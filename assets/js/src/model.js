export default {
  user: "userName",
  id: 2,
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
          itemDescription: "to-do 2 description !!",
          user: "user2",
          date: "12-12-2019"
        }
      ]
    },
    {
      id: "list1",
      name: "Doing",
      listItemsId: 0,
      listItems: []
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
  removeCard: function(listId, cardId) {
    return this._lists.filter(list => {
      if (list.id === listId) {
        list.listItems.filter((item, index) => {
          if (item.id === cardId) {
            list.listItems.splice(index, 1);
          }
        });
      }
    });
  }
};
