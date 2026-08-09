const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

/*
  BestPriceWorld
  Podatkovna struktura za primerjavo dejanskih ponudb.

  Končna cena =
  cena izdelka +
  dostava +
  DDV +
  carina +
  drugi stroški
*/

const offers = [

  // iPhone
  {
    product: "iPhone 17 Pro",
    store: "Amazon",
    country: "Germany",
    currency: "EUR",
    price: 1079,
    shipping: 9.99,
    tax: 0,
    customs: 0,
    extra: 0,
    stock: "In stock",
    delivery: "2-4 days",
    url: "https://www.amazon.de/"
  },

  {
    product: "iPhone 17 Pro",
    store: "MediaMarkt",
    country: "Germany",
    currency: "EUR",
    price: 1089,
    shipping: 7.99,
    tax: 0,
    customs: 0,
    extra: 0,
    stock: "In stock",
    delivery: "2-5 days",
    url: "https://www.mediamarkt.de/"
  },

  {
    product: "iPhone 17 Pro",
    store: "eBay",
    country: "Italy",
    currency: "EUR",
    price: 1069,
    shipping: 14.99,
    tax: 0,
    customs: 0,
    extra: 5,
    stock: "Available",
    delivery: "3-6 days",
    url: "https://www.ebay.it/"
  },

  // Samsung
  {
    product: "Samsung Galaxy S26",
    store: "Amazon",
    country: "Germany",
    currency: "EUR",
    price: 879,
    shipping: 8.99,
    tax: 0,
    customs: 0,
    extra: 0,
    stock: "In stock",
    delivery: "2-4 days",
    url: "https://www.amazon.de/"
  },

  {
    product: "Samsung Galaxy S26",
    store: "MediaMarkt",
    country: "Austria",
    currency: "EUR",
    price: 889,
    shipping: 12.99,
    tax: 0,
    customs: 0,
    extra: 0,
    stock: "In stock",
    delivery: "2-5 days",
    url: "https://www.mediamarkt.at/"
  },

  // MacBook
  {
    product: "MacBook Air M4",
    store: "Amazon",
    country: "Germany",
    currency: "EUR",
    price: 1049,
    shipping: 9.99,
    tax: 0,
    customs: 0,
    extra: 0,
    stock: "In stock",
    delivery: "2-4 days",
    url: "https://www.amazon.de/"
  },

  {
    product: "MacBook Air M4",
    store: "MediaMarkt",
    country: "Austria",
    currency: "EUR",
    price: 1069,
    shipping: 14.99,
    tax: 0,
    customs: 0,
    extra: 0,
    stock: "In stock",
    delivery: "2-5 days",
    url: "https://www.mediamarkt.at/"
  }

];

/*
  Izračun končne cene.
*/
function calculateTotal(offer) {
  return (
    Number(offer.price || 0) +
    Number(offer.shipping || 0) +
    Number(offer.tax || 0) +
    Number(offer.customs || 0) +
    Number(offer.extra || 0)
  );
}

/*
  API: iskanje ponudb
*/
app.get("/api/search", (req, res) => {

  const query = String(req.query.q || "")
    .trim()
    .toLowerCase();

  if (!query) {
    return res.json([]);
  }

  const results = offers
    .filter(offer =>
      offer.product.toLowerCase().includes(query) ||
      offer.store.toLowerCase().includes(query)
    )
    .map(offer => ({
      ...offer,
      total: calculateTotal(offer)
    }))
    .sort((a, b) => a.total - b.total);

  res.json(results);
});

/*
  API: seznam vseh izdelkov
*/
app.get("/api/products", (req, res) => {

  const products = [
    ...new Set(offers.map(offer => offer.product))
  ];

  res.json(products);
});

/*
  API: seznam trgovin
*/
app.get("/api/stores", (req, res) => {

  const stores = [
    ...new Set(offers.map(offer => offer.store))
  ];

  res.json(stores);
});

/*
  API: osnovni podatki sistema
*/
app.get("/api/status", (req, res) => {

  res.json({
    name: "BestPriceWorld",
    status: "online",
    offers: offers.length,
    products: [...new Set(offers.map(o => o.product))].length,
    stores: [...new Set(offers.map(o => o.store))].length
  });

});

/*
  Zagon strežnika
*/
app.listen(PORT, () => {

  console.log("");
  console.log("=================================");
  console.log("      BestPriceWorld");
  console.log("=================================");
  console.log(`Strežnik: http://localhost:${PORT}`);
  console.log("API:      /api/search?q=iPhone");
  console.log("Status:   /api/status");
  console.log("=================================");
  console.log("");

});
