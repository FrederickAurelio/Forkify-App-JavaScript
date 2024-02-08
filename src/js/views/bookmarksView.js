import icons from "../../img/icons.svg";
import View from "./View";
import previewView from "./previewView.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it ;))";
  _message = "";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data.map(bookmark => previewView._generateMarkup(bookmark)).join("")
  }
}

export default new BookmarksView();