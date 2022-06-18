import icons from '../../img/icons.svg';
export class MainView {
  /**
   */

  _data;
  _parentel = document.querySelector('.recipe');
  error = 'message Error';
  render(recipe, render = true) {
    console.log(recipe);
    if (!recipe || (Array.isArray(recipe) && recipe.length === 0) === 0)
      return this.renderError(`What you search for we do not have sir/ma`);
    this._data = recipe;
    // if (!render)
    // this.spinnerFunction();
    const markUp = this._generateMarkup();
    if (!render) markUp;
    this._parentel.innerHTML = '';
    this._parentel.insertAdjacentHTML('afterbegin', markUp);
  }
  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0) === 0)
      return this.renderError(`What you search for we do not have sir/ma`);
    this._data = data;
    const markUp = this._generateMarkup();
    console.log(markUp);
    const newDom = document.createRange().createContextualFragment(markUp);
    const newElements = Array.from(newDom.querySelectorAll(`*`));
    const currElements = Array.from(this._parentel.querySelectorAll(`*`));
    console.log(newElements);
    console.log(currElements);
    newElements.forEach((newEl, i) => {
      const curEle = currElements[i];
      // console.log(curEle);
      // console.log(newEl);
      // Update change Text
      if (
        !newEl.isEqualNode(curEle) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        console.log(newEl.firstChild.nodeValue);
        curEle.textContent = newEl.textContent;
      }
      // Update change attribute
      if (!newEl.isEqualNode(curEle)) {
        // console.log(curEle.attributes);
        Array.from(newEl.attributes).forEach(attr =>
          curEle.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  renderError(err = this.error) {
    const htmlMarkUp = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${err}</p>
      </div>`;
    this._parentel.innerHTML = '';
    this._parentel.insertAdjacentHTML('afterbegin', htmlMarkUp);
  }
  spinnerFunction() {
    console.log('spinner');
    const htmlMarkup = ` <div class="spinner">
    <svg>
      <use href="${icons}.svg#icon-loader"></use>
    </svg>
  </div>`;
    // console.log(htmlMarkup);
    this._parentel.innerHTML = '';
    this._parentel.insertAdjacentHTML('afterbegin', htmlMarkup);
    console.log(this._parentel);
  }
}
