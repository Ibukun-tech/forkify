import { MainView } from './mainView.js';
import icons from '../../img/icons.svg';
class PaginationView extends MainView {
  _parentel = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentel.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goTo = Number(btn.dataset.goto);
      console.log(goTo);
      console.log(btn);
      handler(goTo);
    });
  }
  _generateMarkup() {
    console.log(this._data);

    // let { search, dataReslts, dataResultsPage, page } = this._data;
    // NO OF PAGES WE HAVEu
    const noOfPage = Math.ceil(
      this._data.dataResults.length / this._data.dataResultsPage
    );
    console.log(noOfPage);
    // console.log(page);
    if (this._data.page === 1 && noOfPage > 1) {
      console.log('first page');
      return `<button data-goto='${
        this._data.page + 1
      }' class="btn--inline pagination__btn--next">
      <span>Page ${this._data.page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}.svg#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    if (this._data.page === noOfPage && noOfPage > 1) {
      console.log('this is the lastpage');
      return `<button data-goto='${
        this._data.page - 1
      }' class="btn--inline pagination__btn--prev">
         <svg class="search__icon">
           <use href="${icons}.svg#icon-arrow-left"></use>
         </svg>
         <span>Page ${this._data.page - 1}</span>
        </button>`;
    }
    if (this._data.page < noOfPage) {
      console.log('middle page');
      return `
      <button data-goto='${
        this._data.page - 1
      }'class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
         <use href="${icons}.svg#icon-arrow-left"></use>
       </svg>
       <span>Page ${this._data.page - 1}</span>
   </button>
     <button data-goto='${
       this._data.page + 1
     }'class="btn--inline pagination__btn--next">
       <span>Page  ${this._data.page + 1}</span>
       <svg class="search__icon">
         <use href="${icons}.svg#icon-arrow-right"></use>
       </svg>
   </button>
      `;
    }
    return 'noyhing to offer here';
    //   return `<button class="btn--inline pagination__btn--prev">
    //   <svg class="search__icon">
    //     <use href="src/img/icons.svg#icon-arrow-left"></use>
    //   </svg>
    //   <span>Page 1</span>
    // </button>
    // <button class="btn--inline pagination__btn--next">
    //   <span>Page 3</span>
    //   <svg class="search__icon">
    //     <use href="src/img/icons.svg#icon-arrow-right"></use>
    //   </svg>
    // </button>`;
  }
}
export default new PaginationView();
