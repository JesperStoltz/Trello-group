import itemListView from "./itemListView";
import { listTemp } from "./template/listTemp";
import { ulListTemp } from "./template/ulListTemp";
export default {
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
