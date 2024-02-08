import View from "./View";
import previewView from "./previewView.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found for your query! Please try again ;)";
  _message = "";

  _generateMarkup() {
    return this._data.map(d => previewView._generateMarkup(d)).join("")
  }
}

export default new ResultsView();