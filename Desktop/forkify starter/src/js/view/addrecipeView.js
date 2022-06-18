import { MainView } from './mainView.js';
console.log(MainView);
class AddrecipeView extends MainView {
  _parentel = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _openRecipeWindow = document.querySelector('.add-recipe-window');
  _openFormButton = document.querySelector('.nav__btn--add-recipe');
  _closeFormButton = document.querySelector('.btn--close-modal');
  constructor() {
    super();
    this._openForm();
    this._closeForm();
  }

  generateForm() {
    this._overlay.classList.toggle('hidden');
    this._openRecipeWindow.classList.toggle('hidden');
  }
  _openForm() {
    this._openFormButton.addEventListener(
      'click',
      this.generateForm.bind(this)
    );
  }
  _closeForm() {
    this._closeFormButton.addEventListener(
      'click',
      this.generateForm.bind(this)
    );
    this._overlay.addEventListener('click', this.generateForm.bind(this));
  }
  formSubmission(handler) {
    this._parentel.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      // console.log(typeof new FormData(this));
      const data = Object.fromEntries(dataArray);
      console.log(data);
      handler(data);
      // this._generateForm.bind();
    });
    // this._parentel.addEventListener('click', this._generateForm.bind(this));
  }
}
export default new AddrecipeView();
