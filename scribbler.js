// utilities
var get = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelector(selector);
};

var getAll = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelectorAll(selector);
};

if (document.getElementsByClassName('demo').length > 0) {
  const lines = [
    { text: '>> INITIATING GODNAUT.OS', class: 'sys' },
    { text: '>> LOADING MODULE: [ ZEITAIBER.MATH ]', class: 'load' },
    { text: '>> SYNCING AVATAR ENGINE', class: 'load-dots' },
    { text: '>> LINKING ∑divine.signal ↦ /avatar.shell', class: 'divine' },
    { text: '>> SYSTEM STATUS: STABLE', class: 'success' },
    { text: 'ENV> ', class: 'prompt' }
  ];

  let i = 0;
  const speed = 30;

  function typeLine() {
    if (i < lines.length) {
      const line = document.createElement("div");
      line.className = 'term-line ' + lines[i].class;

      if (lines[i].class === 'load-dots') {
        line.textContent = lines[i].text;
        document.getElementsByClassName('demo')[0].appendChild(line);
        let dots = 0;
        const dotInterval = setInterval(() => {
          if (dots < 3) {
            line.textContent += '.';
            dots++;
          } else {
            clearInterval(dotInterval);
            i++;
            setTimeout(typeLine, 300);
          }
        }, 300);
      } else {
        let charIndex = 0;
        function typeChar() {
          if (charIndex < lines[i].text.length) {
            line.innerHTML += lines[i].text.charAt(charIndex) === '\n' ? '<br>' : lines[i].text.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, speed);
          } else {
            document.getElementsByClassName('demo')[0].appendChild(line);
            i++;
            setTimeout(typeLine, 300);
          }
        }
        document.getElementsByClassName('demo')[0].appendChild(line);
        typeChar();
      }
    } else {
      // Append blinking cursor after final line
      const cursor = document.createElement("span");
      cursor.className = "cursor";
      cursor.innerHTML = "█";
      document.getElementsByClassName('demo')[0].appendChild(cursor);
    }
  }

  setTimeout(typeLine, 1200);
}

// toggle tabs on codeblock
window.addEventListener("load", function() {
  // get all tab_containers in the document
  var tabContainers = getAll(".tab__container");

  // bind click event to each tab container
  for (var i = 0; i < tabContainers.length; i++) {
    get('.tab__menu', tabContainers[i]).addEventListener("click", tabClick);
  }

  // each click event is scoped to the tab_container
  function tabClick (event) {
    var scope = event.currentTarget.parentNode;
    var clickedTab = event.target;
    var tabs = getAll('.tab', scope);
    var panes = getAll('.tab__pane', scope);
    var activePane = get(`.${clickedTab.getAttribute('data-tab')}`, scope);

    // remove all active tab classes
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
    }

    // remove all active pane classes
    for (var i = 0; i < panes.length; i++) {
      panes[i].classList.remove('active');
    }

    // apply active classes on desired tab and pane
    clickedTab.classList.add('active');
    activePane.classList.add('active');
  }
});

//in page scrolling for documentaiton page
var btns = getAll('.js-btn');
var sections = getAll('.js-section');

function setActiveLink(event) {
  // remove all active tab classes
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('selected');
  }

  event.target.classList.add('selected');
}

function smoothScrollTo(i, event) {
  var element = sections[i];
  setActiveLink(event);

  window.scrollTo({
    'behavior': 'smooth',
    'top': element.offsetTop - 20,
    'left': 0
  });
}

if (btns.length && sections.length > 0) {
  for (var i = 0; i<btns.length; i++) {
    btns[i].addEventListener('click', smoothScrollTo.bind(this,i));
  }
}

// fix menu to page-top once user starts scrolling
window.addEventListener('scroll', function () {
  var docNav = get('.doc__nav > ul');

  if( docNav) {
    if (window.pageYOffset > 63) {
      docNav.classList.add('fixed');
    } else {
      docNav.classList.remove('fixed');
    }
  }
});

// responsive navigation
var topNav = get('.menu');
var icon = get('.toggle');

window.addEventListener('load', function(){
  function showNav() {
    if (topNav.className === 'menu') {
      topNav.className += ' responsive';
      icon.className += ' open';
    } else {
      topNav.className = 'menu';
      icon.classList.remove('open');
    }
  }
  icon.addEventListener('click', showNav);
});

const toggleBtn = document.querySelector('.navbar__toggle');
const menu = document.querySelector('.navbar__menu');

toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('open');
  menu.classList.toggle('open');

  // Accessibility
  const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
  toggleBtn.setAttribute('aria-expanded', !expanded);
});
