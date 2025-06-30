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

function SearchMark(inputId, contentId) {
      const input = document.getElementById(inputId);
      const content = document.getElementById(contentId);
      const originalText = content.innerHTML;

      input.addEventListener('input', () => {
        const query = input.value.trim();

        if (!query) {
          content.innerHTML = originalText;
          return;
        }

        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedQuery})`, 'gi');

        content.innerHTML = originalText.replace(regex, '<mark>$1</mark>');
      });
}

    
    setupLiveSearchHighlight('searchInput', 'content');
	
document.addEventListener('DOMContentLoaded',function(){
	function detectarDispositivo() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const x = document.querySelector('container');
    if(/android/i.test(userAgent)){
      
	  }else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        x.style.fontSize = '16px'
      }
    }
    detectarDispositivo();
  });