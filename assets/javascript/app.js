  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBTKUqIZhhM9uW-41wg1wI_iyccbI2pNf8",
    authDomain: "trainstop-c292f.firebaseapp.com",
    databaseURL: "https://trainstop-c292f.firebaseio.com",
    storageBucket: "trainstop-c292f.appspot.com"    
  };
  //firebase use
  firebase.initializeApp(config);
  //varible to hold data from firebase
  var database = firebase.database();
  
  //submit button for train form 
  $("#addTrainBtn").on("click", function (event) {
      event.preventDefault();
      //creates varibles to hold inputs 
      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrain = $("#firstTrain").val().trim();
      var frequency = $("#frequency").val().trim();
      //Updates data to firebase storage
      database.ref().push({
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
        });
        
        // alert("Train successfully added");
        
        // Empties input 
        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");
    });
    //pulls refrence from firebase to child     
    database.ref().on("child_added", function(childSnapspot){
        // console.log(childSnapspot.key);
        console.log(childSnapspot.val());
        // creates new variables to hold value data 
        var trainName = childSnapspot.val().name;
        var destination = childSnapspot.val().destination;
        var firstTrain = childSnapspot.val().firstTrain;
        var frequency = childSnapspot.val().frequency;
        // variable to hold time of arrival
        var minutesPassed;
        // varible to hold time till train arrives
        var timeOfArrival;
        // Train time using moment() function w/ input data from user 
        // and brings it back 1 day, so it doesn't affect future time
        var trainTime= moment(firstTrain,"HH:mm").subtract(1,"day");
        console.log(trainTime);
        //getting the difference in minutes 
        var differenceInMins = moment().diff(moment(trainTime), "minutes");
        //variable to hold difference in mins
        var difference = differenceInMins % frequency;
        //time of next train arrival
        minutesPassed = frequency - difference;
        //records the minutes passed to the current time to give next train coming up time
        var trainToFollow = moment().add(minutesPassed, "minutes");
        timeOfArrival = moment(trainToFollow).format("ddd HH:mm A");
      
        // create new row 
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(timeOfArrival), 
            $("<td>").text(minutesPassed)
           );
            
            $("#train-table > tbody").append(newRow); 
        });
        