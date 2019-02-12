import { listTemp } from "./template/listTemp";
import { ulListTemp } from "./template/ulListTemp";
export default {
  init: function(data, target, miniControl) {
    document.getElementById("listNav").innerHTML = this.renderNavList(data);
    listTemp(data, target);
    data.map(element => {
      miniControl.removeList(element.id);
      miniControl.renameList(element.id, element.name);
      miniControl.addCard(element.id, element.listItemsId);
      miniControl.removeCard(element.id);
    });
    miniControl.intersectionObserver(
      document.querySelectorAll("#TodoListHolder .box")
    );
  },
  renderNavList: function(data) {
    let ul = "";
    data.forEach(element => {
      ul += ulListTemp(element);
    });
    return ul;
  }
};
