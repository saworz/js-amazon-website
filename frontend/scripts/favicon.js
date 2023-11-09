export const setFavicon = () => {
  let headTitle = document.querySelector('head');
  let setFavicon = document.createElement('link');
  setFavicon.setAttribute('rel','shortcut icon');
  setFavicon.setAttribute('href','/frontend/images/amazon-mobile-logo.png');
  headTitle.appendChild(setFavicon);
}

export default setFavicon;