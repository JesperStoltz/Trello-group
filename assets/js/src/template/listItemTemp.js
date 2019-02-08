export function listItemTemp(data) {
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
