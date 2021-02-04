function levelOfService(ride) {
  let levelOfService
  if (ride.length > 1) {
    levelOfService = 'Noober Pool'
  } else if (ride[0].purpleRequested) {
    levelOfService = 'Noober Purple'
  } else if (ride[0].numberOfPassengers > 3) {
    levelOfService = 'Noober XL'
  } else {
    levelOfService = 'Noober X'
  }
  return levelOfService
}

function renderRides(ridesArray) {
  for (let i = 0; i < ridesArray.length; i++) {
    let ride = ridesArray[i]

    document.querySelector('.rides').insertAdjacentHTML('beforeend', `
      <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        <i class="fas fa-car-side"></i>
        <span>${levelOfService(ride)}</span>
      </h1>
    `)

    let borderClass
    let backgroundClass
    if (levelOfService(ride) == 'Noober Purple') {
      borderClass = 'border-purple-500'
      backgroundClass = 'bg-purple-600'
    } else {
      borderClass = 'border-gray-900'
      backgroundClass = 'bg-gray-600'
    }

    for (let i = 0; i < ride.length; i++) {
      let leg = ride[i]

      document.querySelector('.rides').insertAdjacentHTML('beforeend', `
        <div class="border-4 ${borderClass} p-4 my-4 text-left">
          <div class="flex">
            <div class="w-1/2">
              <h2 class="text-2xl py-1">${leg.passengerDetails.first} ${leg.passengerDetails.last}</h2>
              <p class="font-bold text-gray-600">${leg.passengerDetails.phoneNumber}</p>
            </div>
            <div class="w-1/2 text-right">
              <span class="rounded-xl ${backgroundClass} text-white p-2">
                ${leg.numberOfPassengers} passengers
              </span>
            </div>
          </div>
          <div class="mt-4 flex">
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">PICKUP</div>
              <p>${leg.pickupLocation.address}</p>
              <p>${leg.pickupLocation.city}, ${leg.pickupLocation.state} ${leg.pickupLocation.zip}</p>
            </div>
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">DROPOFF</div>
              <p>${leg.dropoffLocation.address}</p>
              <p>${leg.dropoffLocation.city}, ${leg.dropoffLocation.state} ${leg.dropoffLocation.zip}</p>
            </div>
          </div>
        </div>
      `)
    }
  }
}




window.addEventListener('DOMContentLoaded', function() {
  // YOUR CODE
  


  // let AllButtons = document.querySelectorAll('.filter-button')
  let allRidesButton = document.querySelector('#all-filter')
  let NooberPurpleButton = document.querySelector('#noober-purple-filter')
  let NooberPoolButton = document.querySelector('#noober-pool-filter')
  let NooberXLButton = document.querySelector('#noober-xl-filter')
  let NooberXButton = document.querySelector('#noober-x-filter')

  console.log(allRidesButton.value)



  let AllButtons = [allRidesButton, NooberPurpleButton, NooberPoolButton, NooberXLButton, NooberXButton]
  // console.log(AllButtons[1])
  

    // event when the All Ride button is clicked
    allRidesButton.addEventListener('click', async function(event){ 
      event.preventDefault()

      // remove backgorund color of any previously clicked noober list
      allRidesButton.classList.remove('bg-gray-300')
      NooberPurpleButton.classList.remove('bg-gray-300')
      NooberPoolButton.classList.remove('bg-gray-300')
      NooberXLButton.classList.remove('bg-gray-300')
      NooberXButton.classList.remove('bg-gray-300')

      // shade in the button of the noober class picked 
      allRidesButton.classList.add('bg-gray-300')

      // output to user in console that they clicked All Rides button 
      console.log('The All Rides button was clicked')
      let output = document.querySelector('.rides')
      output.innerHTML = ''
      // output.insertAdjacentHTML('beforeend', '<p> The All Rides button was clicked!</p>')
      
      // request the data from our "API"
      let url = 'https://kiei451.com/api/rides.json'
      let response = await fetch(url)
      let json = await response.json()

      //pass the array of rides to the provided renderRides() function 
      renderRides(json)

    })
  

    // event when the Noober Purple button is clicked
    NooberPurpleButton.addEventListener('click', async function(event){ 
      event.preventDefault()

      // remove backgorund color of any previously clicked noober list
      allRidesButton.classList.remove('bg-gray-300')
      NooberPurpleButton.classList.remove('bg-gray-300')
      NooberPoolButton.classList.remove('bg-gray-300')
      NooberXLButton.classList.remove('bg-gray-300')
      NooberXButton.classList.remove('bg-gray-300')

      // shade in the button of the noober class picked 
      NooberPurpleButton.classList.add('bg-gray-300')

      // output to user in console that they clicked All Rides button 
      console.log('The Noober Purple button was clicked')
      let output = document.querySelector('.rides')
      output.innerHTML = ''
      // output.insertAdjacentHTML('beforeend', '<p> The Noober Purple button was clicked!</p>')
      
      // request the data from our "API"
      let url = 'https://kiei451.com/api/rides.json'
      let response = await fetch(url)
      let json = await response.json()
      const newArray = new Array()

        for(let i = 0; i < json.length; i++) {  
          
          let ride = json[i]
          let ServiceLevel = levelOfService(ride)

          if (ServiceLevel == "Noober Purple"){
            newArray.push(ride)
          } 
        }
      
      //pass the new array of rides to the provided renderRides() function 
      renderRides(newArray)  
   })  

    // event when the Noober Pool button is clicked
    NooberPoolButton.addEventListener('click', async function(event){ 
      event.preventDefault()

      // remove backgorund color of any previously clicked noober list
      allRidesButton.classList.remove('bg-gray-300')
      NooberPurpleButton.classList.remove('bg-gray-300')
      NooberPoolButton.classList.remove('bg-gray-300')
      NooberXLButton.classList.remove('bg-gray-300')
      NooberXButton.classList.remove('bg-gray-300')

      // shade in the button of the noober class picked 
      NooberPoolButton.classList.add('bg-gray-300')

      // output to user in console that they clicked All Rides button 
      console.log('The Noober Pool button was clicked')      
      let output = document.querySelector('.rides')
      output.innerHTML = ''
      // output.insertAdjacentHTML('beforeend', '<p> The Noober Pool button was clicked!</p>')
      
      // request the data from our "API"
      let url = 'https://kiei451.com/api/rides.json'
      let response = await fetch(url)
      let json = await response.json()
      const newArray = new Array()

        for(let i = 0; i < json.length; i++) {  
          
          let ride = json[i]
          let ServiceLevel = levelOfService(ride)

          if (ServiceLevel == "Noober Pool"){
            newArray.push(ride)
          } 
        }
      
      //pass the new array of rides to the provided renderRides() function 
      renderRides(newArray)  
    }) 
    
    // event when the Noober XL button is clicked
    NooberXLButton.addEventListener('click', async function(event){ 
      event.preventDefault()

      // remove backgorund color of any previously clicked noober list
      allRidesButton.classList.remove('bg-gray-300')
      NooberPurpleButton.classList.remove('bg-gray-300')
      NooberPoolButton.classList.remove('bg-gray-300')
      NooberXLButton.classList.remove('bg-gray-300')
      NooberXButton.classList.remove('bg-gray-300')

      // shade in the button of the noober class picked 
      NooberXLButton.classList.add('bg-gray-300')

      // output to user in console that they clicked All Rides button 
      console.log('The Noober XL button was clicked')
      let output = document.querySelector('.rides')
      output.innerHTML = ''
      // output.insertAdjacentHTML('beforeend', '<p> The Noober XL button was clicked!</p>')
      
      // request the data from our "API"
      let url = 'https://kiei451.com/api/rides.json'
      let response = await fetch(url)
      let json = await response.json()
      const newArray = new Array()

        for(let i = 0; i < json.length; i++) {  
          
          let ride = json[i]
          let ServiceLevel = levelOfService(ride)

          if (ServiceLevel == "Noober XL"){
            newArray.push(ride)
          } 
        }
      
      //pass the new array of rides to the provided renderRides() function 
      renderRides(newArray)  
   })  

    // event when the Noober X button is clicked
    NooberXButton.addEventListener('click', async function(event){ 
      event.preventDefault()

      // remove backgorund color of any previously clicked noober list
      allRidesButton.classList.remove('bg-gray-300')
      NooberPurpleButton.classList.remove('bg-gray-300')
      NooberPoolButton.classList.remove('bg-gray-300')
      NooberXLButton.classList.remove('bg-gray-300')
      NooberXButton.classList.remove('bg-gray-300')

      // shade in the button of the noober class picked 
      NooberXButton.classList.add('bg-gray-300')

      // output to user in console that they clicked All Rides button 
      console.log('The Noober X button was clicked')
      let output = document.querySelector('.rides')
      output.innerHTML = ''
      // output.insertAdjacentHTML('beforeend', '<p> The Noober X button was clicked!</p>')
      
      // request the data from our "API"
      let url = 'https://kiei451.com/api/rides.json'
      let response = await fetch(url)
      let json = await response.json()
      const newArray = new Array()

        for(let i = 0; i < json.length; i++) {  
          
          let ride = json[i]
          let ServiceLevel = levelOfService(ride)

          if (ServiceLevel == "Noober X"){
            newArray.push(ride)
          } 
        }
      
      //pass the new array of rides to the provided renderRides() function 
      renderRides(newArray)  
   })   

})

