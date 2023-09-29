export const removeForbiddenURLs = (urls: string[]) => {
  const forbiddenUrls = [
    "pracuj.pl",
    "jobsora.com",
    "facebook.com",
    "fixly.pl",
    "oferteo.pl",
    "pkt.pl",
    "gratka.pl",
    "targeo.pl",
    "gowork.pl",
    "nieruchomosci-online.pl",
    "cylex-polska.pl",
    "oferia.pl",
    "aleo.com",
    "olx.pl",
    "allegro.pl",
    "wikipedia.org",
    "panoramafirm.pl",
    "firmy.net",
    "naszemiasto.pl",
    "firmania.pl",
    "biznesfinder.pl",
    "sprzedajemy.pl",
    "allegrolokalnie.pl",
    "jooble.org",
    "teraz-otwarte.pl",
  ];

  const allowedUrl = urls.filter(
    (url) => !forbiddenUrls.some((forbiddenUrl) => url.includes(forbiddenUrl))
  );
  return allowedUrl.filter((url) => {
    const urlObj = new URL(url);
    return urlObj.pathname === "/";
  });
};
