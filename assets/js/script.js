
const displayDate = function () {
    $("#currentDay").text(moment().format("dddd, MMM Do"));
};

const displayPlanner = function () {

    const startTime = 9;
    const endTime = 12 + 5;

    const savedPlans = loadPlans();

    for (let hour = startTime; hour <= endTime; hour++) {

        createTimeBlockEl(hour);
        $("#" + hour).find("textarea").val(savedPlans[hour]);
    }
};

const createTimeBlockEl = function (hour) {
    const template = $($("#hour-block-template").html());

    template.attr("id", hour);

    template.find(".hour").text(moment({ hour }).format("hA"));
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

displayDate();
displayPlanner();

$(".saveBtn").on("click", function(event) {
    const timeBlockEl = $(event.target).parents(".time-block");
    console.log(timeBlockEl);
    const hour = timeBlockEl.attr("id");
    const text = timeBlockEl.find("textarea").val();

    const savedPlans = loadPlans();

    savedPlans[hour] = text;
    savePlans(savedPlans);
});

