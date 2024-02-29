
        var tours = [];
        

        function bookTour() {
            var countries = document.getElementById("countries").value;
            var countrie = document.getElementById("countrie").value;
            var fromCity = document.getElementById("from-city").value;
            var toCity = document.getElementById("citySelect").value;
            var hotel = document.getElementById("hotel").value;
            var arrivalDate = document.getElementById("arrival-date").value;
            var departureDate = document.getElementById("departure-date").value;
            var adults = document.getElementById("adults").value;
            var children = document.getElementById("children").value;

            
            var adultPrice = 1000; 
            var childPrice = 500; 
            
            var totalAmount = (adults * adultPrice) + (children * childPrice);
            var tourId =  Math.floor(Math.random() * 900000) + 100000;
            var tourInfo = "Tour ID: " + tourId + "<br>" +
                            "From: " + countries + "<br>" +
                            "To: " + countrie + "<br>" +
                            "From: " + fromCity + "<br>" +
                            "To: " + toCity + "<br>" +
                            "Hotel: " + hotel + "<br>" +
                            "Arrival Date: " + arrivalDate + "<br>" +
                            "Departure Date: " + departureDate + "<br>" +
                            "Adults: " + adults + " x $" + adultPrice + "<br>" +
                            "Children: " + children + " x $" + childPrice + "<br>" +
                            "Total Amount: $" + totalAmount + "<br>" +
                            "Booking Time: " + new Date().toLocaleString();

                            tours.push({ id: tourId, info: tourInfo });

                            updateBookingInfo();
                        }
                
                        function updateBookingInfo() {
                            var bookingInfo = "";
                            for (var i = 0; i < tours.length; i++) {
                                var tourData = document.createElement("div");
                                tourData.innerHTML = tours[i].info;
                    
                                bookingInfo += "<div class='tour-container' id='tour-" + i + "'><strong>Tour " + (i + 1) + ":</strong><br><div>" + tourData.innerText +
                                    "</div><button onclick=\"editTour(" + i + ")\">Edit</button>" +
                                    "<button onclick=\"deleteTourCompletely(" + i + ")\">Delete</button></div>";
                            }
                    
                            document.getElementById("booking-info").innerHTML = bookingInfo;
                        }
                    
                        function editTour(tourIndex) {
                            var editedTour = tours[tourIndex];
                            var editedTourInfo = prompt("Edit the tour information:", editedTour.info);
                    
                            if (editedTourInfo !== null) {
                                tours[tourIndex].info = editedTourInfo;
                                updateBookingInfo();
                            }
                        }
                    
                        
                    
                        function deleteTourCompletely(tourIndex) {
                            var confirmation = confirm("Are you sure you want to delete this tour completely?");
                            if (confirmation) {
                               tours.splice(tourIndex, 1);
                                updateBookingInfo();
                            }
                        }
                    
                        function saveEditedTour(tourIndex) {
                           var editedTourInfo = document.getElementById("edit-countries").value;
                           tours[tourIndex].info = editedTourInfo;
                    
                            document.getElementById("edit-form").innerHTML = "";
                    
                            
                            updateBookingInfo();
                        }
                        function saveToJSON() {
                            var jsonTours = JSON.stringify(tours);
                            
                            console.log(jsonTours);
                            
                            localStorage.setItem("toursData", jsonTours);
                        }
                        function loadFromJSON(jsonData) {
                            tours = JSON.parse(jsonData);
                            updateBookingInfo();
                        }
                        function updateBookingInfo() {
                            var bookingInfo = "";
                            for (var i = 0; i < tours.length; i++) {
                                var tourData = document.createElement("div");
                                tourData.innerHTML = tours[i].info;
                        
                                bookingInfo += "<div class='tour-container' id='tour-" + i + "'><strong>Tour " + (i + 1) + ":</strong><br><div>" + tourData.innerText +
                                    "</div><button onclick=\"editTour(" + i + ")\">Edit</button>" +
                                    "<button onclick=\"deleteTourCompletely(" + i + ")\">Delete</button></div>";
                            }
                        
                            document.getElementById("booking-info").innerHTML = bookingInfo;
                        }
                        
                        
                        function searchTour() {
                            var searchQuery = document.getElementById("search-query").value.toLowerCase();
                            var searchResults = tours.filter(function (tour) {
                                return tour.info.toLowerCase().includes(searchQuery);
                            });
                        
                            var searchInfo = "";
                            for (var i = 0; i < searchResults.length; i++) {
                                searchInfo += "<div class='search-result'><strong>Search Result " + (i + 1) + ":</strong><br>" + searchResults[i].info + "</div>";
                            }
                        
                            document.getElementById("search-results").innerHTML = searchInfo;
                        }
                        function updateTour(tourIndex, updatedTourInfo) {
                            
                            tours[tourIndex].info = updatedTourInfo;
                            saveToursToFile();
                            updateBookingInfo();
                        }
    