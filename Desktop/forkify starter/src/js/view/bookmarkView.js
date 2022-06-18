import { MainView } from './mainView.js';
import previewView from './previewView.js';
import icons from '../../img/icons.svg';
class BookMarkView extends MainView {
  _parentel = document.querySelector('.bookmarks__list');
  // _errorM
  bookMarkView(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(bookMark => previewView._render(bookMark)).join('');
  }
}
export default new BookMarkView();
