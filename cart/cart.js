//Local storage give string so we want to convert it to get the array of data, So we used JSON.parse
export let cart; 


loadFromStorage();



export function loadFromStorage(){
    cart=JSON.parse(localStorage.getItem('cart'));
// If cart doesnt exist, We are giving the default value
if(!cart){
    cart=[{
        // Here we are using a technique called normalizing the data,means with the peoductId itself we can get other information about the product
        productId:
        'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryOptionId:'1'
    },{
        productId:
        '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionId:'2'
    }
    
    ];

}
}



//We created the function to store the data in the local storage so that every time we refresh or reopen the page then the idems we deleted should not come again as a default
// localStorage can only store string so to convert the data to string we use JSON.stringify  
// Name of first string whatever we want to save and the second string is the data we want to save
function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
};



// Here, we are exporting the variable that we want to get out

export function addToCart(productId){
    // To see if the item is already present in the cart..if item is already present then it will increment by one and if not the item will be added to the cart
    let matchingItem;
     
    cart.forEach((cartItem)=>{
        if(productId===cartItem.productId){
            matchingItem=cartItem;
        }
    });

    if(matchingItem){
        matchingItem.quantity +=1;
    }else{
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionsId:'1'
        });

          }

          saveToStorage();
}




// This is a function in which we will remove all the id's which does not match our selected Id.

export function removeFromCart(productId){
    const newCart =[];

    cart.forEach((cartItem)=>{
        if(cartItem.productId!== productId){
            newCart.push(cartItem);
        }
    });


    cart = newCart;
    saveToStorage();

};


// To update the deliveryOptionId and to update the page so that it should match the date on the top with the selected deliveryOptionId

export function updateDeliveryOption(productId, deliveryOptionId ){
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(productId===cartItem.productId){
            matchingItem=cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}




export function loadCart(fun){

    // To make request to backend
    const xhr = new XMLHttpRequest();
  
  
    // xhr when send request it will need time to get the response as xhr is a asynchrounous code, means it does not wait for the above code to complete and run the below code as soon as is typed and so we are giving an eventListener to increase the waiting period and get the result after the response 
    xhr.addEventListener('load', ()=>{
  
      // The data we are getting is in the string format so we have to convert it back to objects
  
     console.log(xhr.response) ;
      

  
  
      // In amazon.js file we are giving the loadProduct() function to load the response and then display otherwise we would have to wait for the response, Which will need a lot of time and our page will still display nothing so far we used this.
      // Basically we are waiting for the response to comeback and then run the code
      fun();
    });
    
  
  
    // To setup the request
    xhr.open('GET', 'https://supersimplebackend.dev/cart')
    xhr.send();
  }