export function listItemTemp(data) {
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
