import PhotoSwipe from "photoswipe/dist/photoswipe";
import PhotoSwipeUIDefault from "photoswipe/dist/photoswipe-ui-default";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";

const modalStr = `
<div id="modal" class="pswp photo-full-screen" tabindex="-1" role="dialog" aria-hidden="true">
      <!-- 背景 -->
      <div class="pswp__bg"></div>
      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <div class="pswp__counter"></div>
            <div class="pswp__button pswp__button--close"></div>
            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>`;

function getModal() {
  const el = document.getElementById("modal");
  if (el) return el;
  const div = document.createElement("div");
  div.innerHTML = modalStr;
  document.body.appendChild(div);
  return document.getElementById("modal");
}

getModal();

const dftOption = {
  items: [],
  triggerEl: null,
  index: 0
};

export default (opt = {}) =>
  new Promise(resolve => {
    const option = { ...dftOption, ...opt };
    if (option.triggerEl && option.triggerEl.tagName.toLowerCase() === "img") {
      option.index = option.items.findIndex(
        it => it.src === option.triggerEl.src
      );
    }
    const srcList = option.items.map(it => it.src);
    const allImages = [...document.body.getElementsByTagName("img")];
    const imgList = allImages.filter(it => srcList.includes(it.src));
    const modal = getModal();
    const options = {
      index: option.index,
      getThumbBoundsFn(index) {
        let imgEl = imgList[index];
        if (!imgEl) {
          imgEl = option.triggerEl;
        }
        const imgRect = imgList[index].getBoundingClientRect();
        const top = document.scrollingElement.scrollTop;
        return { x: imgRect.left, y: imgRect.top + top, w: imgRect.width };
      }
    };
    console.log(options, option.items);
    const gallery = new PhotoSwipe(
      modal,
      PhotoSwipeUIDefault,
      option.items,
      options
    );
    gallery.init();
  });
