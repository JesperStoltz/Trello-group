import { listItemTemp } from "./template/listItemTemp";
export default {
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
        //console.log(listItem.itemDescriptionHistory);
        miniControl.removeCard(element.id);
      });
    });
  }
};
