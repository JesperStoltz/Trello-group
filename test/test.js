import assert from "assert";
import model from "../assets/js/src/model";

describe("model list's", function() {
  beforeEach(function() {
    model._lists = [];
    model.id = 0;
  });

  it("Can add create & add another list's", function() {
    assert.equal(model._lists.length, 0);
    model.addNewList();
    assert.equal(model._lists.length, 1);
    assert.deepEqual(model._lists[0], {
      name: "list 0",
      id: "list0",
      listItemsId: 0,
      listItems: []
    });
  });

  it("Can add remove list", function() {
    assert.equal(model._lists.length, 0);
    model.addNewList();
    model.addNewList();
    model.addNewList();
    assert.equal(model._lists.length, 3);
    model.removeList("list2");
    assert.equal(model._lists.length, 2);
  });

  it("Can add rename list", function() {
    assert.equal(model._lists.length, 0);
    model.addNewList();
    model.addNewList();
    model.addNewList();
    model.rename("list2", "new name");
    assert.deepEqual(model._lists[2].name, "new name");
  });

  it("Can  add card", function() {
    assert.equal(model._lists.length, 0);
    model.addNewList();
    model.addNewList();
    model.addNewList();
    model.addCard("list2", "text", "description");
    model.addCard("list2", "text", "description");
    model.addCard("list2", "text", "description");
    model.removeCard("list3", "card2");
  });
  it("Can  remove card", function() {
    assert.equal(model._lists.length, 0);
    model.addNewList();
    model.addNewList();
    model.addCard("list1", "text", "description");
    model.addCard("list1", "text", "description");
    model.addCard("list1", "text", "description");
    assert.equal(model._lists[1].listItems.length, 3);
    model.removeCard("list1", "list1card2");
    console.log(model._lists[1]);
    assert.equal(model._lists[1].listItems.length, 2);
  });
});
