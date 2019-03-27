const App = (function(myModule) {
  /**
   * @private
   */
  let anchorsElem = null;

  /**
   * @private
   */
  const fixNav = function () {
    const navElement = document.querySelector('body > nav');
    if (
      window.scrollY >= 50 &&
      navElement.className !== 'fixed'
    ) {
      navElement.className = 'fixed';
    } else if (
        window.scrollY < 50 &&
        navElement.className === 'fixed'
      ) {
        navElement.className = '';
      }
  }

  /**
   * @private
   */
  const setupFixedNav = function () {
    fixNav(); // first, onload if scroll is already down
    document.addEventListener('scroll', function () {
      fixNav();
    });
  };

  /**
   * @private
   */
  const smoothScroll = function () {
    anchorsElem.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        removeAllClass(anchorsElem);
        anchor.className = 'active';

        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
          block: "start", 
          inline: "nearest"
        });
      });
    });
  };

  /**
   * @private
   */
  const activeClassOnScroll = function () {
    document.addEventListener('scroll', function(e) {
      anchorsElem.forEach(function (anchor) {
        const titleElem = document.querySelector(anchor.getAttribute('href'));
        const titleRect = titleElem.getBoundingClientRect();
        const bodyRect = document.querySelector('body').getBoundingClientRect();
        const offset = titleRect.top - bodyRect.top;

        if (
          offset <= (window.scrollY + 150) &&
          anchor.className !== 'active'
        ) {
          removeAllClass(anchorsElem);
          anchor.className = 'active';
        }
      });
    });
  };

  /**
   * @private
   */
  const removeAllClass = function (Elems) {
    Elems.forEach(function (elem) {
      elem.className = '';
    });
  };

  /**
   * @public
   */
  myModule.start = function () {
    console.log('hey, it is running!');

    anchorsElem = document.querySelectorAll('a[href^="#"]');

    setupFixedNav();
    smoothScroll();
    activeClassOnScroll();
  };
  
  return myModule;
})({});
