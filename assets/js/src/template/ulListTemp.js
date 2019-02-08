export function ulListTemp(data) {
  let item = `
      <li>
      <a href="#${data.id}" class=""navOpserver data-scroll>
      </a>
      <span class=" listSpan">${data.name}</span>
    </li>
      `;
  return item;
}
