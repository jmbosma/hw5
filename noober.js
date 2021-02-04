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

  // let allRidesButton = document.querySelector('#all-filter')
  // let NooberPurpleButton = document.querySelector('#noober-purple-filter')
  // let NooberPoolButton = document.querySelector('#noober-pool-filter')
  // let NooberXLButton = document.querySelector('#noober-xl-filter')
  // let NooberXButton = document.querySelector('#noober-x-filter')
  let AllButtons = document.querySelectorAll('.filter-button')
  var button = new Array()
  let noobertype = ''

  for (let j = 0; j < AllButtons.length; j++){
    
    // event when any Noober button is clicked
    AllButtons[j].addEventListener('click', async function(event){ 
      event.preventDefault()

      button = AllButtons[j]
      noobertype = button.innerHTML
    
      // remove backgorund color of any previously clicked noober list
      for (let k = 0; k < AllButtons.length; k++){
        AllButtons[k].classList.remove('bg-gray-300')
      }

      // shade in the button of the noober class picked 
      button.classList.add('bg-gray-300')

      // output to user in console that they clicked All Rides button 
      console.log(`The ${noobertype} button was clicked`)
      // removes the previous output if a button was clicked previously
      let output = document.querySelector('.rides')
      output.innerHTML = ''
      
      // request the data from our "API"
      let url = 'https://kiei451.com/api/rides.json'
      let response = await fetch(url)
      let json = await response.json()

      if( noobertype == 'All Rides'){

        //pass the array of rides to the provided renderRides() function 
        renderRides(json)

      } else { //anything other than All Rides is clicked
        
        const newArray = new Array()

        //finds each ride within the correct service level if not the All Rides button
        for(let i = 0; i < json.length; i++) {  
          
          let ride = json[i]
          let ServiceLevel = levelOfService(ride)

          if (ServiceLevel == noobertype){
            newArray.push(ride)
          } 
        } 
        
        //pass the new array of rides to the provided renderRides() function 
        renderRides(newArray)  
      }
    })
  }
})

