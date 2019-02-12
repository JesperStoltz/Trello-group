import assert from "assert";
import model from "../assets/js/src/model";

describe("model list's", function() {
  beforeEach(function() {
    model._lists = [];
    model.id = 0;
  });

  it("Can create list", function() {
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

  it("Can rename list", function() {
    assert.equal(model._lists.length, 0);
    model.addNewList();
    model.addNewList();
    model.addNewList();
    model.rename("list2", "new name");
    assert.deepEqual(model._lists[2].name, "new name");
  });

  it("Can add card", function() {
    assert.equal(model._lists.length, 0);
    model.addNewList();
    model.addNewList();
    model.addNewList();
    model.addCard("list2", "text", "description");
    model.addCard("list2", "text", "description");
    model.addCard("list2", "text", "description");
    model.removeCard("list3", "card2");
  });
  it("Can remove card", function() {
    assert.equal(model._lists.length, 0);
    model.addNewList();
    model.addNewList();
    model.addCard("list1", "text", "description");
    model.addCard("list1", "text", "description");
    model.addCard("list1", "text", "description");
    assert.equal(model._lists[1].listItems.length, 3);
    model.removeCard("list1", "list1card2");
    assert.equal(model._lists[1].listItems.length, 2);
  });

  it("can add new card", function() { //jesper & emil-edition
    let options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" };
    assert.equal(model._lists.length, 0);
    model.addNewList();
    model.addCard("list0", "title", "description");
    assert.deepStrictEqual(model._lists[0].listItems[0],{
      id: 'list0card1',
      text: 'title', 
      itemDescription: 'description',
      user: 'userName',
      date: new Date().toLocaleString("sv-SE", options),
      itemDescriptionHistory: []
    });
  });
  
  it("can edit card data", function() {
    let options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" };
    assert.equal(model._lists.length, 0);
    model.addNewList();
    model.addCard("list0", "title", "description");
    model.editCard("new title", "new description", "list0card1", "description");
    assert.deepStrictEqual(model._lists[0].listItems[0],{
      id: 'list0card1',
      text: 'new title', 
      itemDescription: 'new description',
      user: 'userName',
      date: new Date().toLocaleString("sv-SE", options),
      itemDescriptionHistory: [{ old: 'description', date: new Date().toLocaleString("sv-SE", options), 
      by: 'userName' }]
    });
  });

  it('getCardObj returns a card as an object', function () {
    model.addNewList();
    model.addCard("list0", "title", "description");
    assert.ok(typeof model.getCardObj("list0card0"), "object");
  })

  it('can move an existing card', function () {
    model.addNewList();
    model.addNewList();
    model.addCard("list0", "title", "description");
    assert.ok(model._lists[0].listItems.length === 1 && model._lists[1].listItems.length === 0);
    model.moveExistingCard("list1", model.getCardObj("list0card1"));
    model.removeCard("list0", "list0card1");
    assert.ok(model._lists[0].listItems.length === 0 && model._lists[1].listItems.length === 1);
  })
});
