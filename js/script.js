
(function(){
  var toggle = document.querySelector('.main-nav .dropdown-toggle');
  var dropdown = toggle && toggle.parentElement;
  if(!toggle || !dropdown) return;

  // toggle on click
  toggle.addEventListener('click', function(e){
    e.preventDefault();
    dropdown.classList.toggle('open');
  });

  // close when clicking outside
  document.addEventListener('click', function(e){
    if(!dropdown.contains(e.target)){
      dropdown.classList.remove('open');
    }
  });

  // optional: close on Escape
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') dropdown.classList.remove('open');
  });
})();
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("main-slider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".slide"));
  const prevBtn = slider.querySelector(".slider-btn.prev");
  const nextBtn = slider.querySelector(".slider-btn.next");
  const dotsWrap = document.getElementById("slider-dots");

  let index = slides.findIndex(s => s.classList.contains("active"));
  if (index === -1) index = 0;

  // create dots
  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "slider-dot" + (i === index ? " active" : "");
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function updateDots() {
    if (!dotsWrap) return;
    const dots = dotsWrap.querySelectorAll(".slider-dot");
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function showSlide(newIndex) {
    slides[index].classList.remove("active");
    index = (newIndex + slides.length) % slides.length;
    slides[index].classList.add("active");
    updateDots();
  }

  function goTo(i) { showSlide(i); }
  function next() { showSlide(index + 1); }
  function prev() { showSlide(index - 1); }

  // buttons
  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  // autoplay
  let timer = setInterval(next, 3500);

  // pause on hover
  slider.addEventListener("mouseenter", () => clearInterval(timer));
  slider.addEventListener("mouseleave", () => {
    timer = setInterval(next, 3500);
  });
});
// --------------------
// HOME LIVE TABLE PREVIEW
// --------------------
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("home-live-tbody");
  if (!tbody) return; // agar home pe section nahi to skip

  const lots = [
    { id:"h1", lot:"#101", title:"Vintage Oak Dining Table", bid:1450, bids:12, time:"03:21" },
    { id:"h2", lot:"#214", title:"Impressionist Landscape Painting", bid:2700, bids:9, time:"12:05" },
    { id:"h3", lot:"#333", title:"Diamond Necklace", bid:4850, bids:7, time:"01:10" },
  ];

  function money(v){ return "$" + v.toLocaleString("en-US"); }

  function render(){
    tbody.innerHTML = "";
    lots.forEach(l => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${l.lot}</td>
        <td>${l.title}</td>
        <td>${money(l.bid)}</td>
        <td>${l.bids} bids</td>
        <td><span style="font-family:monospace;">${l.time}</span></td>
        <td style="text-align:right;">
          <button class="btn" data-homebid="${l.id}" style="padding:6px 12px; font-size:11px;">Place Bid</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.querySelectorAll("button[data-homebid]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-homebid");
        const lot = lots.find(x => x.id === id);
        if(!lot) return;

        const inc = lot.bid >= 5000 ? 250 : lot.bid >= 1000 ? 100 : 50;
        lot.bid += inc;
        lot.bids += 1;

        const msg = document.getElementById("home-bid-msg");
        if(msg) msg.textContent = `Sample only: Bid placed on ${lot.lot}. New bid: ${money(lot.bid)}.`;

        render();
      });
    });
  }

  render();
});


