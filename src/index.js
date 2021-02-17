import './sass/styles.scss';
import refs from './js/refs';
import apiService from './js/apiService';
import './js/fetch-pictures';
import updatePicturesMarkup from './js/update-pictures-markup';


refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  apiService.query = form.elements.query.value;

  clearPicturesContainer();
  apiService.resetPage();
  fetchPictures();
  form.reset();
});

refs.loadMoreBtn.addEventListener('click', fetchPictures);

function fetchPictures() {
  refs.loadMoreBtn.disabled = true;
  refs.loadMoreBtnLabel.textContent = 'Loading...';
  refs.loadMoreBtnSpinner.classList.remove('is-hidden');

  apiService.fetchPictures().then(pictures => {
    updatePicturesMarkup(pictures);
    refs.loadMoreBtn.classList.remove('is-hidden');
    refs.loadMoreBtn.disabled = false;
    refs.loadMoreBtnLabel.textContent = 'Load more';
    refs.loadMoreBtnSpinner.classList.add('is-hidden');
    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
  });
}

function clearPicturesContainer() {
  refs.picturesContainer.innerHTML = '';
}