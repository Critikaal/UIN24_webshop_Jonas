let productsHTML = "<h2>NINJAGO</h2>"

products.map(product => productsHTML += `<article>
<img src="website_images/PROD_${product.imagefile}" alt="${product.title}">
<a href="#">${product.category}</a>
<h3>${product.title}</h3>
<span>kr. ${product.price}</span>
<button onclick="addToCart(${product.prodid})">Legg i handlekurv</button>
</article>`)

const main = document.getElementsByTagName("main")

main[0].innerHTML = productsHTML

//HANDLEVOGNFUNKSJONALITET
document.getElementById("carttoggle").addEventListener("click", function() {
    const cart = document.getElementById("cart")
    cart.classList.toggle("show")
})

function addToCart(productid) {
    
    let exist = cart.findIndex(p => productid === p.product)
    console.log("Exist: " + exist)

    if(exist === -1){
        cart.push({product: productid, quantity: 1})
    } else {
        cart[exist].quantity += 1
    }

    
    
    updateCartDisplay ()
}

function updateCartDisplay() {

    let cartCount = 0

    cart.map(p => cartCount += p.quantity)
    document.getElementById("cartcount").innerHTML = cartCount

    let cartHTML = ""

    if(cart.length === 0) {
        cartHTML+= "<li> Du har ingen produkter i handlevognen</li>"
    } else {
        cart.map((prod, index) => {
            let filteredProduct = products.filter(filterprod => prod.product === filterprod.prodid)
                cartHTML +=  `<li>
                <span class="title">${filteredProduct[0].title}</span>
                <span class="price">${filteredProduct[0].price},-</span>
                <span class="quantity">x${prod.quantity}</span>
                <span class="functions">
                <button onclick="removeFromCart(${index})">X</button>
                </span>
            </li>` 
})

}
document.getElementById("cartlist").innerHTML = cartHTML
}

function removeFromCart(index) {

    if(cart[index].quantity > 1) {
        cart[index].quantity -= 1
    } else {
        cart.splice(index, 1)
    }
    
    updateCartDisplay()
}