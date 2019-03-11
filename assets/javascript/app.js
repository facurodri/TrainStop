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
      // var timeLeft = $("timeLeft").val("?");
      console.log(trainName);
      console.log(destination);
      console.log(firstTrain);
      console.log(frequency);
      //Updates data to firebase storage
      database.ref().push({
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
        });
        
        alert("Train successfully added");
        
        // Clears all of the text-boxes
        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");
                
    
    });
    // var timeLeft = $("timeLeft").text("?");
    
    database.ref().on("child_added", function(childSnapspot){
        console.log(childSnapspot.key);
        console.log(childSnapspot.val());
        
        var trainName = childSnapspot.val().name;
        var destination = childSnapspot.val().destination;
        var firstTrain = childSnapspot.val().firstTrain;
        var frequency = childSnapspot.val().frequency;
       
        var timeOfArrival;
        var timeOfMinutesPasssed;

        var trainTime= moment(firstTrain,"hh:mm").subtract(1,"day");
        
        console.log(trainName);
        console.log(destination);
        console.log(firstTrain);
        console.log(frequency);
        
        // create new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(firstTrain),
            $("<td>").text(frequency),
            $("<td>").text("?")
            
            
            );
            
            $("#train-table > tbody").append(newRow); 
        });
        