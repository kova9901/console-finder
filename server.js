const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.get("/api/status", (req, res) => {
  res.json({status:"online", server:"BestPriceWorld"});
});

app.get("/api/search", (req, res) => {
  const q = (req.query.q || "").toLowerCase();

  const products = [
    {name:"Apple iPhone 15", price:699.99, store:"Amazon", shipping:0, total:699.99, image:"/slike/iphone.jpg"},
    {name:"Samsung Galaxy S25", price:899.99, store:"Amazon", shipping:0, total:899.99, image:"/slike/samsung.jpg"},
    {name:"Apple MacBook Air", price:1099.99, store:"eBay", shipping:9.99, total:1109.98, image:"/slike/macbook.jpg"}
  ];

  res.json(products.filter(p => p.name.toLowerCase().includes(q)));
});

app.listen(PORT, () => {
  console.log("=================================");
  console.log("      BestPriceWorld");
  console.log("=================================");
  console.log("Strežnik: http://localhost:3000");
  console.log("API: /api/search?q=iPhone");
  console.log("Status: ONLINE");
  console.log("=================================");
});
