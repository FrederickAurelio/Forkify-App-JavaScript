import icons from "../../img/icons.svg";
export default class View {
  _data;

  /** 
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @paramm {boolean} [render = true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render = false
   * @this {Object} View instance
   * @author Frederick Aurelio Halim
   * @todo finish implementation
   * 
  */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError()
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup)
  }

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();
    // basically a DOM living in virtual not real
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curELements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curELements[i];
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== "")
        curEl.textContent = newEl.textContent;

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        })
      }
    });
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerRender(handler) {
    const eventArray = ["hashchange", "load"];
    eventArray.forEach(ev => window.addEventListener(ev, handler));
  }
}