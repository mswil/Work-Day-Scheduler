
const displayDate = function () {
    $("#currentDay").text(moment().format("dddd, MMM Do"));
};

const displayTime = function () {
    
    const startTime = 9;
    const endTime = 12 + 5;
    
    for (let hour = startTime; hour <= endTime; hour++) {
        
        createTimeBlockEl(hour);
    }
};

const createTimeBlockEl = function (hour) {
    const template = $($("#hour-block-template").html());
    
    //in case I need to referance stuff like saving to local storage
    // template.find(".time-block").attr("id", hour);

    template.find(".hour").text(moment({hour}).format("hA"));
    $("#workday").append(template);
}


displayDate();
displayTime();

//.saveBtn on click don't need specific id