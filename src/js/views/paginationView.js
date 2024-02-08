import icons from "../../img/icons.svg";
import View from "./View";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination")

  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    // Page 1 and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return this._generateNextButton();
    }
    // Page 1, and there are NO other pages

    // Last Page
    if (this._data.page === numPages && numPages > 1) {
      return this._generatePrevButton();
    }
    // Other Page
    return this._generatePrevButton() + this._generateNextButton();
  }
  _generateNextButton(){
    return`
    <button class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    `
  }
  _generatePrevButton(){
    return `
    <button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.page - 1}</span>
    </button>
    `
  }
  addHandlerPage(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline")
      if (!btn) return;
      if (btn.classList.contains("pagination__btn--next"))
        this._data.page += 1
      else this._data.page -= 1;
      handler()
    }.bind(this))
  }
}
export default new PaginationView();