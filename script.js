const products = [
{
name:"iPhone 16 Pro",
category:"Telefoni",
country:"Nemčija",
shop:"Amazon",
price:1099,
shipping:0,
image:"slike/iphone.jpg"
},

{
name:"Samsung Galaxy S25+",
category:"Telefoni",
country:"Avstrija",
shop:"MediaMarkt",
price:899,
shipping:10,
image:"slike/samsung.jpg"
},

{
name:"MacBook Air M4",
category:"Računalniki",
country:"Nemčija",
shop:"Amazon",
price:1099,
shipping:0,
image:"slike/macbook.jpg"
},

{
name:"PlayStation 5",
category:"Konzole",
country:"Slovenija",
shop:"Mimovrste",
price:499,
shipping:0,
image:"slike/ps5.jpg"
}
];


function searchProduct(){

let text=document
.getElementById("search")
.value
.toLowerCase();


let results=document
.getElementById("results");


results.innerHTML="";


let found=products.filter(p=>
p.name.toLowerCase().includes(text)
);


found.forEach(p=>{

results.innerHTML += `

<div class="card">

<img src="${p.image}" width="200">

<h2>${p.name}</h2>

<p>🏪 ${p.shop}</p>

<p>🌍 ${p.country}</p>

<p>💶 Cena: ${p.price} €</p>

<p>🚚 Dostava: ${p.shipping} €</p>

<h3>
Skupaj: ${p.price+p.shipping} €
</h3>

</div>

`;

});


if(found.length===0){

results.innerHTML="<h2>Ni rezultatov</h2>";

}

}
