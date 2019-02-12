export default function descriptionHistory(data, dataIndex, cardId) {
  return `
   <div class="card">
     <div class="card-header" id="heading${dataIndex}-${cardId}">
       <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${dataIndex}-${cardId}" aria-expanded="true" aria-controls="collapseOne">
        Edited By :${data.by} <span>${data.date}</span>
        </button>
      </h2>
    </div>
    <div id="collapse${dataIndex}-${cardId}" class="collapse " aria-labelledby="heading${dataIndex}-${cardId}" data-parent="#accordionExample">
      <div class="card-body">
      ${data.old}
      </div>
    </div>
   </div> 
   `;
}

/*by: "userName"
date: "2019-02-09 12:59"
old: "" */
