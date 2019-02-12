import { listItemTemp } from "./listItemTemp";
export function listTemp(mainData, target) {
  target.innerHTML = "";
  mainData.forEach(data => {
    target.innerHTML += `
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
        ${data.listItems.map(listItem => listItemTemp(listItem)).join("")}
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
  });
}
