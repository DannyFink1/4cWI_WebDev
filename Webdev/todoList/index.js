var todos = [
    { id: "1", title: "putzen", done: "false" },
    { id: "2", title: "aufräumen", done: "true" }
]

var maxId = 2;
document.getElementById("input").addEventListener("change", function(event) {
    maxId++;
    todos.push({ id: maxId, title: event.target.value, done: false })
    var html = ""
    todos.forEach((element) => {
        html += "<div class=\"item\">" + element.title + " - " + element.done + "</div>";
    });

    document.getElementById("list").innerHTML = html;

});