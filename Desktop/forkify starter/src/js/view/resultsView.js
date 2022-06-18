import { MainView } from './mainView.js';
import icons from '../../img/icons.svg';
class ResultsViews extends MainView {
  _parentel = document.querySelector('.results');

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(this._renderMarkup).join('');
  }
  _renderMarkup(result) {
    const id = window.location.hash.slice(1);
    console.log(id);
    return `<li class="preview">
    <a class="preview__link ${
      result.id === id ? 'preview__link--active' : ''
    }" href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.img}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
        <div class="preview__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`;
  }
}
export default new ResultsViews();
console.log(ResultsViews.prototype);
