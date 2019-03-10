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
    var trainName = $("#traiName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();
    //Updates data to firebase storage
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
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

