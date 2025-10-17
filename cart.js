document.addEventListener("DOMContentLoaded", function () {
    var addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
    var slidebar = document.getElementById("slidebar");
    var closeBtn = document.querySelector(".close-btn");
    var checkoutBtn = document.getElementById("checkout-btn");
    var itemNameDisplay = document.getElementById("item-name");
    var itemPriceDisplay = document.getElementById("item-price");
    var itemImage = document.getElementById("item-image");
    var quantityInput = document.getElementById("quantity");
    var flavorSelect = document.getElementById("flavor");
    var sliderAddToCartBtn = document.getElementById("slider-add-to-cart-btn");
    var cartCountDisplay = document.getElementById("cart-count");
    var cartItemsList = document.getElementById("cart-items-list");
    var cartData = [];
    var itemData = {
      "Family Combo": { price: 29.99, image: "Menu_images/deal1.jpg" },
      "Pizza Party": { price: 15.99, image: "Menu_images/deal2.jpg" },
      "Party Platter": { price: 12.99, image: "Menu_images/deal3.jpg" },
      "Spring Rolls": { price: 4.99, image: "Menu_images/springroll.jpg" },
      "Garlic Bread": { price: 3.99, image: "Menu_images/garlicbread.jpg" },
      Bruschetta: { price: 5.49, image: "Menu_images/bruschetta.jpg" },
      "Cheese Burger": { price: 7.99, image: "Menu_images/burger1.png" },
      "Bacon Burger": { price: 8.99, image: "Menu_images/burger2.png" },
      "Veggie Burger": { price: 6.99, image: "Menu_images/burger3.png" },
      Margherita: { price: 9.99, image: "Menu_images/pizza1.png" },
      Pepperoni: { price: 11.99, image: "Menu_images/pizza2.png" },
      "Veggie Delight": { price: 10.99, image: "Menu_images/pizza3.png" },
      "Spaghetti Bolognese": { price: 12.99, image: "Menu_images/pasta 1.png" },
      "Fettuccine Alfredo": { price: 13.99, image: "Menu_images/pasta2.png" },
      Carbonara: { price: 14.99, image: "Menu_images/pasta3.png" },
      "Fried Rice": { price: 8.99, image: "Menu_images/rice 1.png" },
      "Chicken Biryani": { price: 10.99, image: "Menu_images/rice2.png" },
      "Vegetable Pulao": { price: 7.99, image: "Menu_images/rice3.png" },
      "Chocolate Cake": { price: 5.99, image: "Menu_images/dessert1.png" },
      "Ice Cream Sundae": { price: 4.99, image: "Menu_images/dessert2.png" },
      Cheesecake: { price: 6.99, image: "Menu_images/dessert3.png" },
      Coffee: { price: 2.99, image: "Menu_images/coffee.jpg" },
      "Fresh Juice": { price: 3.99, image: "Menu_images/Drink 2.png" },
      Soda: { price: 1.99, image: "Menu_images/Drink3.png" },
      "BBQ Ribs": { price: 15.99, image: "Menu_images/bbqribs.avif" },
      "BBQ Chicken": { price: 12.99, image: "Menu_images/bbqchicken.avif" },
      "Grilled Veggies": { price: 10.99, image: "Menu_images/grillveggies.jpg" },
    };
  
    addToCartBtns.forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        var itemName = event.target.getAttribute("data-item");
  
        if (itemData[itemName]) {
          itemNameDisplay.textContent = itemName;
          itemPriceDisplay.textContent =
            "$" + itemData[itemName].price.toFixed(2);
          slidebar.style.width = "300px"; // Slidebar opens from the right
          // Update the image in the slider
          itemImage.src = itemData[itemName].image;
          itemImage.alt = itemName; // Set alt text to the item name
        } else {
          console.error("Item data not found for: ", itemName);
        }
      });
    });
  
    if (sliderAddToCartBtn) {
      sliderAddToCartBtn.addEventListener("click", function () {
        // Increment the cart count
        var cartCount = parseInt(cartCountDisplay.textContent) || 0;
        cartCountDisplay.textContent = cartCount + 1;
        // Add item to cart data array
        var itemName = itemNameDisplay.textContent;
        var itemPrice = parseFloat(itemData[itemName].price);
        var itemQuantity = parseInt(quantityInput.value);
        var itemFlavor = flavorSelect.value;
        var cartItem = {
          name: itemName,
          price: itemPrice,
          quantity: itemQuantity,
          flavor: itemFlavor,
        };
        cartData.push(cartItem);
        updateCartDropdown();
        slidebar.style.width = "0"; // Close the slidebar after adding to cart
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        slidebar.style.width = "0"; // Close the slidebar
      });
    }
    window.addEventListener("click", function (event) {
      if (event.target == slidebar) {
        slidebar.style.width = "0"; // Close the slidebar if clicked outside of it
      }
    });
    var viewCartBtn = document.getElementById("view-cart-btn");
    if (viewCartBtn) {
      viewCartBtn.addEventListener("click", function () {
        // Redirect to cart page or open cart slidebar
        window.location.href = "cart.html";
      });
    }
    function updateCartDropdown() {
      // Clear existing items
      cartItemsList.innerHTML = "";
      // Populate cart dropdown
      cartData.forEach(function (item) {
        var listItem = document.createElement("li");
        listItem.textContent = `${item.name} (x${
          item.quantity
        }) - $${item.price.toFixed(2)}`;
        cartItemsList.appendChild(listItem);
      });
    }
  
    checkoutBtn.addEventListener("click", function () {
      var quantity = quantityInput.value;
      var flavor = flavorSelect.value;
      var price = itemData[itemNameDisplay.textContent].price;
      var totalPrice = price * quantity;
      // Redirect to cart page with selected data as query params
      window.location.href = `cart.html?item=${
        itemNameDisplay.textContent
      }&quantity=${quantity}&flavor=${flavor}&total=${totalPrice.toFixed(2)}`;
    });
  })