/**
 * Created by Henry on 20.02.17.
 */
const streams = ["wintergaming"];

$(document).ready(() => {
    getStreams();
});

function getStreams() {
    for (let i = 0; i < streams.length; i++) {
        $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + streams[i], (data) => {
            console.log(data);
            displayStream(data);
        })
    }
}

function displayStream(data) {          //ToDo: Add check if Online (typeOf?), also display the Game
    let logo = data.stream.channel.logo;
    let name = data.stream.channel.display_name;
    let description = data.stream.channel.status;

    if (description.length > 47) {
        description = description.slice(0, 47) + "...";
    }

    $("#logo").attr("src", logo);
    $("#name").html(name);
    $("#description").html(description);


/*    $("#streams").append('<div><div class="row"><div class="col-xs-2">' +
        '<img class="logo" src="' + logo + '"></div><div class="col-xs-10 col-md-3 name"><p>' + name + '</p></div>' +
        '<div class="col-xs-10 col-md-7"><p>' + description + '</p></div></div></div>')*/
}