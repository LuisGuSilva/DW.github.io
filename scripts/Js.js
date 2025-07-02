function toggleNav() {
  const menu = document.getElementById("Menu");
  const tickets = menu.querySelectorAll('.ticket');
  const isOpen = menu.style.width === "340px";

  if (isOpen) {
    tickets.forEach((ticket, i) => {
      setTimeout(() => {
        ticket.classList.remove('show');
        ticket.classList.add('hide');
      }, i * 100);
    });

    setTimeout(() => {
      menu.style.width = "0";
    }, tickets.length * 100 + 400);

  } else {
    menu.style.width = "340px";

    tickets.forEach((ticket, i) => {
      setTimeout(() => {
        ticket.classList.remove('hide');
        ticket.classList.add('show');
      }, i * 100);
    });
  }
}
document.addEventListener('DOMContentLoaded', function () {
  function SearchMarkSafe(inputId, contentId) {
    const input = document.getElementById(inputId);
    const content = document.getElementById(contentId);
    const button = document.getElementById('searchButton'); // pega o botão

    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function highlightText(node, regex) {
      const text = node.nodeValue;
      const match = regex.exec(text);
      if (!match) return;

      const span = document.createElement('span');
      let lastIndex = 0;

      regex.lastIndex = 0;
      let result;
      while ((result = regex.exec(text)) !== null) {
        const before = text.slice(lastIndex, result.index);
        const matched = result[0];

        if (before) span.appendChild(document.createTextNode(before));

        const mark = document.createElement('mark');
        mark.textContent = matched;
        span.appendChild(mark);

        lastIndex = regex.lastIndex;
      }

      const after = text.slice(lastIndex);
      if (after) span.appendChild(document.createTextNode(after));

      node.parentNode.replaceChild(span, node);
    }

    function removeHighlights(element) {
      const marks = element.querySelectorAll('mark');
      marks.forEach(mark => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      });

      const spans = element.querySelectorAll('span');
      spans.forEach(span => {
        if (span.childNodes.length === 1 && span.firstChild.nodeType === 3) {
          span.replaceWith(span.firstChild);
        }
      });
    }

    input.addEventListener('input', () => {
      const query = input.value.trim();
      removeHighlights(content);

      if (!query) return;

      const escapedQuery = escapeRegExp(query);
      const regex = new RegExp(escapedQuery, 'gi');

      const treeWalker = document.createTreeWalker(
        content,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      const nodes = [];
      while (treeWalker.nextNode()) {
        nodes.push(treeWalker.currentNode);
      }

      nodes.forEach(node => highlightText(node, regex));
    });

    button.addEventListener('click', () => {
      const firstMark = content.querySelector('mark');
      if (firstMark) {
        firstMark.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  SearchMarkSafe('searchInput', 'Content');
});    
document.addEventListener('DOMContentLoaded', () => {
  function isIOS() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  }

  function aplicarClasseIOS(element) {
    if (isIOS()) {
      element.classList.add('IOS');
    } else {
      element.classList.remove('IOS');
    }
  }

  function aplicarClasseEmTodos() {
    const elementos = document.querySelectorAll('input, textarea');
    elementos.forEach(el => aplicarClasseIOS(el));
  }

  aplicarClasseEmTodos();

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) { // elemento
          if (node.matches && (node.matches('input') || node.matches('textarea'))) {
            aplicarClasseIOS(node);
          }
          node.querySelectorAll && node.querySelectorAll('input, textarea').forEach(el => aplicarClasseIOS(el));
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});

