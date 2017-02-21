/**
 * Created by Henry on 20.02.17.
 */
const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(document).ready(() => {
    checkOnline();
});

//Checks if a channel is Online
function checkOnline() {
    for (let i = 0; i < channels.length; i++) {
        $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + channels[i], (stream) => {
            //If the channel is Online --> Display the Channel
            if (stream.stream) {
                displayOnlineChannel(stream);
            }

            //If the channel not is Online --> Check if the channel is existing
            else {
                checkIfExisting(channels[i]);
            }
        })
    }
}

//Checks if a channel is Existing
function checkIfExisting(channelNameToCheck) {
    $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + channelNameToCheck, (channel) => {
        //If the channel not is existing --> display the channel
        if (typeof channel.status === "number") {
            displayNotExistingChannel();
        }

        //If the channel is existing --> display the channel
        else {
            displayOfflineChannel(channel);
        }
    })
}

//Display an Online channel
function displayOnlineChannel(channelToDisplay) {
    let logo = channelToDisplay.stream.channel.logo;
    let name = channelToDisplay.stream.channel.display_name;
    let game = channelToDisplay.stream.game;
    let description = channelToDisplay.stream.channel.status;
    let link = "https://www.twitch.tv/" + channelToDisplay.stream.channel.name;
    let gameAndDescription = game + description;

    console.log(channelToDisplay);

    if (gameAndDescription.length > 100) {
        gameAndDescription = gameAndDescription.slice(0, 97) + "...";
    }

    $("#online").append('<div class="frame online"><div class="row text-center"><div class="col-xs-2">' +
        '<img class="logo img-responsive" src="' + logo + '"></div><div class="col-xs-10 col-md-3"><a href="' + link + '" target="_blank"><h4>' + name + '</h4></a></div>' +
        '<div class="col-xs-12 col-md-7"><p>' + game + '</p></div></div><div class="row"><div class="col-md-12"><p>' + description + '</p></div></div></div>');
}

//Display an Offline channel
function displayOfflineChannel(channelToDisplay) {
    let logo = channelToDisplay.logo;
    let name = channelToDisplay.display_name;
    let description = "Offline";
    let link = "https://www.twitch.tv/" + channelToDisplay.name;

    $("#offline").append('<div class="frame offline"><div class="row text-center"><div class="col-xs-2"><img class="logo img-responsive" src="' + logo + '"></div>' +
        '<div class="col-xs-10 col-md-3"><a href="' + link + '" target="_blank"><h4>' + name + '</h4></a></div></div><div class="row">' +
        '<div class="col-md-12"><p>' + description + '</p></div></div></div>');
}

//Display a not existing Channel
function displayNotExistingChannel() {
    let logo = "https://pbs.twimg.com/profile_images/2349866958/m9pjwl1x1n3nvzf8x8rc.png";
    let name = "Error: Channel is not existing!";
    let description = "Error: Channel is not existing!";

    $("#error").append('<div class="frame error"><div class="row text-center"><div class="col-xs-2">' +
        '<img class="logo img-responsive" src="' + logo + '"></div><div class="col-xs-10"><h4>' + name + '</h4></div></div>' +
        '<div class="row"><div class="col-md-12"><p>' + description + '</p></div></div></div>');
}
