function toggleNav() {
  const menu = document.getElementById("Menu");
  const tickets = menu.querySelectorAll('.ticket');
  const isOpen = menu.style.width === "250px";

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
    menu.style.width = "250px";

    tickets.forEach((ticket, i) => {
      setTimeout(() => {
        ticket.classList.remove('hide');
        ticket.classList.add('show');
      }, i * 100);
    });
  }
}
