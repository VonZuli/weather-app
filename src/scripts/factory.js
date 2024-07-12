export const createElem = (tag, attr, listeners, ...children) => {
  const el = document.createElement(tag);
  for (const key in attr) {
    el.setAttribute(key, attr[key]);
  }
  for (const event in listeners) {
    el.addEventListener(event, listeners[event]);
  }
  children.forEach((child) => {
    typeof child === "string" || typeof child === "number"
      ? el.appendChild(document.createTextNode(child))
      : el.appendChild(child);
  });
  return el;
};
