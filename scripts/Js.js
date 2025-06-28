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
/* 
   const input = document.getElementById('searchInput');
    const content = document.getElementById('content');
    const originalText = content.innerHTML;

    input.addEventListener('input', () => {
      const query = input.value.trim();
      if(!query) {
        content.innerHTML = originalText;
        return;
      }
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      content.innerHTML = originalText.replace(regex, '<mark>$1</mark>');
    });
*/ 