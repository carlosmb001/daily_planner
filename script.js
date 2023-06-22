
var currentDateTime = dayjs().format('dddd MMMM, DD HH:mm:ss');

function updateClock() {
  currentDateTime = dayjs().format('dddd MMMM, DD HH:mm:ss');
  $('#currentDay').text(currentDateTime);
}
setInterval(updateClock, 1000);

$(document).ready(function() {
  // Add click event listener to the save button
  $('.saveBtn').click(function() {
    // Get the user input from the textarea
    var userInput = $(this).siblings('.description').val();

    // Check if there is any input
    if (userInput.trim() !== '') {
      // Save the user input to local storage
      var timeBlockId = $(this).closest('.time-block').attr('id');
      localStorage.setItem(timeBlockId, userInput);
      console.log('User input saved to local storage');
    }
  });

  // Apply past, present, or future class to each time block
  var currentHour = dayjs().format('H');
  $('.time-block').each(function() {
    var hour = parseInt($(this).attr('id').split('-')[1]);

    if (hour < currentHour) {
      $(this).addClass('past');
    } else if (hour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });

  // Get user input from local storage and set textarea values
  $('.time-block').each(function() {
    var timeBlockId = $(this).attr('id');
    var userInput = localStorage.getItem(timeBlockId);

    if (userInput) {
      $(this).find('.description').val(userInput);
    }
  });

  // Display the current date in the header
  $('#currentDay').text(currentDateTime);
});
