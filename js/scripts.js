document.addEventListener("DOMContentLoaded", () => {
    /* Slideshow Functionality */
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slideshow-container img");
  
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
      });
    }
  
    setInterval(() => {
      slideIndex = (slideIndex + 1) % slides.length;
      showSlide(slideIndex);
    }, 5000);
  
    /* Basket System */
    const basketList = document.querySelector(".basket-list");
    const basketTotal = document.querySelector("#basketTotal");
    const checkoutButton = document.querySelector("#checkoutButton");
    const checkoutModal = document.querySelector("#checkoutModal");
    const closeModal = document.querySelector(".close");
    const orderSummary = document.querySelector("#orderSummary");
    const finalTotal = document.querySelector("#finalTotal");
    const checkoutForm = document.querySelector("#checkoutForm");
  
    let total = 0;
  
    // Add products to the basket
    document.querySelectorAll(".add-to-basket").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productItem = event.target.parentElement;
        const productName = productItem.querySelector("span").textContent;
        const productPrice = parseFloat(productItem.dataset.price);
  
        const basketItem = document.createElement("li");
        basketItem.textContent = `${productName} - $${productPrice.toFixed(2)}`;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        basketItem.appendChild(removeButton);
        basketList.appendChild(basketItem);
  
        total += productPrice;
        basketTotal.textContent = total.toFixed(2);
  
        removeButton.addEventListener("click", () => {
          basketItem.remove();
          total -= productPrice;
          basketTotal.textContent = total.toFixed(2);
        });
      });
    });
  
    // Open checkout modal
    checkoutButton.addEventListener("click", () => {
      orderSummary.innerHTML = "";
      document.querySelectorAll(".basket-list li").forEach((item) => {
        const summaryItem = document.createElement("li");
        summaryItem.textContent = item.textContent.replace("Remove", "").trim();
        orderSummary.appendChild(summaryItem);
      });
  
      finalTotal.textContent = basketTotal.textContent;
      checkoutModal.style.display = "block";
    });
  
    closeModal.addEventListener("click", () => {
      checkoutModal.style.display = "none";
    });
  
    checkoutForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const userName = document.querySelector("#name").value.trim();
      const userEmail = document.querySelector("#email").value.trim();
      const userAddress = document.querySelector("#address").value.trim();
  
      if (!userName || !userEmail || !userAddress) {
        alert("Please fill out all fields.");
        return;
      }
  
      alert(`Thank you, ${userName}! Your order has been placed.`);
      basketList.innerHTML = "";
      basketTotal.textContent = "0.00";
      total = 0;
      checkoutModal.style.display = "none";
    });
  });
  