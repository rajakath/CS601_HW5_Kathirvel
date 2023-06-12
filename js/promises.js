/*
when we click the "Fetch Degrees" button, it will fetch the JSON data, process it, 
and display the degree information as cards in the <div> with the id "result". 
The degree cards will have animation delays applied to create a staggered effect.
*/
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("fetchButton").addEventListener("click", fetchDegrees);
  
    /*create a fetch request to return a promise 
    resolve the promise using the Response class */  
    function fetchDegrees() {
      const url = "data/degrees.json";
      fetch(url)
        .then(response => {
          /*check the status code of the response. 
          If the response is ok, then it returns the response json
          If the response is not ok, then it returns HTTP error response*/
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
        //added a new Promise wrapper around the processDegrees function
          return new Promise(resolve => {
            processDegrees(data);            
            resolve();
          });
        })
        .then(() => {
          /*after processing the degrees data, the promise is resolved, 
          and a new 'then' block is added to apply animation delays to each degree card.*/
          const outputDiv = document.getElementById("result");
          const degreeCards = outputDiv.querySelectorAll(".degree-card");        
          degreeCards.forEach((degreeCard, index) => {
            degreeCard.style.animationDelay = `${index * 0.2}s`;
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    
    //process the 'data' object and display the result
    function processDegrees(data) {
      const outputDiv = document.getElementById("result");
      // clear previous output  
      outputDiv.innerHTML = ""; 
      const degrees = data.degrees;
      degrees.forEach(degree => {
        //create display container/div 
        const degreeCard = document.createElement("div");
        //add the degree card css style
        degreeCard.classList.add("degree-card");
        //display degree information and add css style class
        const degreeInfo = `
        <div class="degree-info">
          <p>
            <span class="degree-label">School:</span>
            <span class="degree-data">${degree.degree.school}</span>
          </p>
          <p>
            <span class="degree-label">Program/Major:</span>
            <span class="degree-data">${degree.degree.program}</span>
          </p>
          <p>
            <span class="degree-label">Type:</span>
            <span class="degree-data degree-type">${degree.degree.type}</span>
          </p>
          <p>
            <span class="degree-label">Year Conferred:</span>
            <span class="degree-data degree-year">${degree.degree.year}</span>
          </p>
        </div>
      `;
        
        //set the degree information into div html element
        degreeCard.innerHTML = degreeInfo;
        outputDiv.appendChild(degreeCard);

        // Hide the fetchButton
        fetchButton.style.display = "none"; 
      });
    }
  });
  