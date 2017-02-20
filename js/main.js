/**
 * Created by Henry on 20.02.17.
 */
const channels = ["wintergaming"];

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
        //If the channel not is existing -->
        if (typeof channel.status === "number") {

        }

        //If the channel is existing --> display the channel
        else {
            displayOfflineChannel(channel);
        }
    })
}


function displayOnlineChannel(chanelToDisplay) {

}

function displayOfflineChannel(chanelToDisplay) {
    
}
