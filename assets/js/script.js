
const displayDate = function () {
    $("#currentDay").text(moment().format("dddd, MMM Do"));
};

const displayPlanner = function () {

    const startTime = 9;
    const endTime = 12 + 5;

    const savedPlans = loadPlans();

    for (let hour = startTime; hour <= endTime; hour++) {
        createTimeBlockEl(hour, savedPlans[hour]);
    }
};

const createTimeBlockEl = function (hour, text) {
    const template = $($("#hour-block-template").html());

    //div class time-block will have an id of hour
    template.attr("id", hour);

    //populate hour and description fields
    template.find(".hour").text(moment({ hour }).format("hA"));
    template.find("textarea").val(text);

    $("#workday").append(template);
}

const savePlans = function (plans) {
    localStorage.setItem("plans", JSON.stringify(plans))
};

const loadPlans = function () {
    let savedPlans = localStorage.getItem("plans");
    if (!savedPlans) {
        return {};
    }

    savedPlans = JSON.parse(savedPlans);
    return savedPlans;
};

const colorCode = function () {
    //get the current hour
    const currentHour = parseInt(moment().format("H"));
    
    //clear all description background colors
    $(".description").removeClass("past present future");

    $(".time-block").each(function () {

        const currentTimeBlock = parseInt($(this).attr("id"));
        const currentDescription = $(this).find(".description");

        if (currentTimeBlock < currentHour) {
            currentDescription.addClass("past");
        }
        else if (currentTimeBlock === currentHour) {
            currentDescription.addClass("present");
        }
        else {
            currentDescription.addClass("future");
        }
    });
};

displayDate();
displayPlanner();
colorCode();

setInterval(function () {
    colorCode();
    displayDate();
}, 1000 * 60);

$(".saveBtn").on("click", function (event) {

    //find the time-block element whose save button was clicked
    const timeBlockEl = $(event.target).parents(".time-block");
    //capture the hour and the description
    const hour = timeBlockEl.attr("id");
    const text = timeBlockEl.find("textarea").val();

    //load plans
    const savedPlans = loadPlans();

    //update plans
    savedPlans[hour] = text;

    //save plans
    savePlans(savedPlans);
});

