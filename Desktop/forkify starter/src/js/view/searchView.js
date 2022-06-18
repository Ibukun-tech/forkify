class SearchView {
  #parentEl = document.querySelector('.search');
  // #value = document.querySelector('sear');
  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#parentEl.querySelector('.search__field').value = '';
    return query;
  }
  getSearchItem(controlSearchResults) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      controlSearchResults();
      // this.#parentEl.querySelector('.search__field').value = '';
    });
  }
}
export default new SearchView();
