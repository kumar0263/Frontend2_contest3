// Function to fetch the menu items from the provided JSON
async function getMenu() {
    try {
      const response = await fetch('menu.json'); 
      const menuItems = await response.json();
      return menuItems;
    } catch (error) {
      throw new Error('Error fetching menu items: ' + error.message);
    }
  }
  
  // Function to simulate taking an order
  function takeOrder() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = [];
        const menuItems = getMenu();
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * menuItems.length);
          order.push(menuItems[randomIndex]);
        }
        resolve(order);
      }, 2500);
    });
  }
  
  // Function to simulate order preparation
  function orderPrep(order) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const preparedOrder = order.map(item => ({
          ...item,
          order_status: true,
          paid: false
        }));
        resolve(preparedOrder);
      }, 1500);
    });
  }
  
  // Function to simulate payment for an order
  function payOrder(order) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const paidOrder = order.map(item => ({
          ...item,
          paid: true
        }));
        resolve(paidOrder);
      }, 1000);
    });
  }
  
  // Function to display a thank you message
  function thankYouFunc() {
    alert('Thank you for your order!');
  }
  
  // Using async/await for promise chaining
  async function processOrder() {
    try {
      const order = await takeOrder();
      const preparedOrder = await orderPrep(order);
      const paidOrder = await payOrder(preparedOrder);
      thankYouFunc();
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }
  
  // Call the processOrder function to start the order process
  processOrder();
  