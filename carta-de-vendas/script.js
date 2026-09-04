// CONFIGURAÇÃO ÚNICA DO WHATSAPP:
// Troque apenas o número abaixo, mantendo o código do país e DDD, sem espaços ou símbolos.
const WHATSAPP_NUMBER = "5511977556835";
const WHATSAPP_MESSAGE = "QUERO QUALIFICAR MEUS LEADS";

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = whatsappUrl;

  link.addEventListener("click", () => {
    if (typeof window.fbq === "function") {
      window.fbq("track", link.dataset.metaEvent || "Contact", {
        content_name: "Qualificação de leads via WhatsApp",
        contact_method: "WhatsApp",
      });
    }
  });
});

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector("[data-carousel-track]");
  const slides = Array.from(track.querySelectorAll(".backstage-photo"));
  const previous = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  const current = carousel.querySelector("[data-carousel-current]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const maxStartIndex = () => {
    const slideWidth = slides[0]?.getBoundingClientRect().width || track.clientWidth;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const visibleSlides = Math.max(1, Math.floor((track.clientWidth + gap) / (slideWidth + gap)));
    return Math.max(0, slides.length - visibleSlides);
  };

  const activeIndex = () => {
    const left = track.scrollLeft;
    const nearest = slides.reduce((currentNearest, slide, index) => {
      const slideLeft = slide.offsetLeft - track.offsetLeft;
      const nearestLeft = slides[currentNearest].offsetLeft - track.offsetLeft;
      return Math.abs(slideLeft - left) < Math.abs(nearestLeft - left) ? index : currentNearest;
    }, 0);
    return Math.min(nearest, maxStartIndex());
  };

  const updateControls = () => {
    const index = activeIndex();
    current.textContent = String(index + 1);
    previous.disabled = index === 0;
    next.disabled = index === maxStartIndex();
  };

  const goTo = (index) => {
    const destination = Math.max(0, Math.min(maxStartIndex(), index));
    track.scrollTo({
      left: slides[destination].offsetLeft - track.offsetLeft,
      behavior: reduceMotion.matches ? "auto" : "smooth",
    });
  };

  previous.addEventListener("click", () => goTo(activeIndex() - 1));
  next.addEventListener("click", () => goTo(activeIndex() + 1));
  track.addEventListener("scroll", updateControls, { passive: true });
  updateControls();
});
