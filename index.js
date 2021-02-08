const mainContainerEl = document.getElementById('main-container');
const loadingEl = document.getElementById('loading');
const twitchStreamContainerEl = document.getElementById('twitch-stream-container');
const profilePictureEl = document.getElementById('profile-image');
const streamerNameEl = document.getElementById('streamer-name');
const streamerNameLinkEl = document.getElementById('streamer-name-url');
const streamerOnlineOfflineEl = document.getElementById('online-offline');

let isDuplicated = false;

twitchArray = ["ESL_SC2", "OgamingSC2", "freecodecamp"];
//  , "cretetion" , "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"
testTwitchName = 'freecodecamp';

proxyUrlUsers = `https://twitch-proxy.freecodecamp.rocks/twitch-api/users/`;
proxyUrlStatus = `https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/`;
proxyServer='https://obscure-sands-82167.herokuapp.com/';


twitchArray.forEach(streamer => {
    Promise.all([fetchTwitchOnlineOffline(streamer), fetchTwitchAPI(streamer)]).then((values) => {
        populateStreamers(values);
    });
});

async function fetchTwitchOnlineOffline(streamer){
    try {
        const resStatus =  await fetch(proxyServer + proxyUrlStatus + streamer);
        twitchStatusRes = await resStatus.json();
        return twitchStatusRes;
    } catch(error) {
                console.log(error);
    }

}

async function fetchTwitchAPI(streamer) {
    try {
        const resUser = await fetch(proxyServer + proxyUrlUsers + streamer);
        twitchUserRes = await resUser.json();
        return twitchUserRes;
    } catch(error) {
        console.log(error);
    }
}


function populateStreamers(values) {
    if (!isDuplicated) {
        loadingEl.remove();
        twitchStreamContainerEl.hidden = false;
        // Populate streamer name and create link to twitch
        streamerNameLinkEl.textContent = values[1].display_name;
        streamerNameLinkEl.href = 'https://www.twitch.tv/' + values[1].display_name;
        // Populate streamer profile picture
        profilePictureEl.src = values[1].logo;
        // Populate streamer type
        if (values[0].stream === null) {
            streamerOnlineOfflineEl.textContent = 'Offline';
            twitchStreamContainerEl.classList.add('offline');

        } else {
            streamerOnlineOfflineEl.textContent = values[0].stream.game;
            twitchStreamContainerEl.classList.add('online');
        }    
        isDuplicated = true;
    } else {
        // Create new block
        var newStreamerEl = twitchStreamContainerEl.cloneNode(true);
        mainContainerEl.append(newStreamerEl);
        newStreamerEl.hidden = false;
        // Populate streamer name and create link to twitch
        streamerNameLinkEl.textContent = values[1].display_name;
        streamerNameLinkEl.href = 'https://www.twitch.tv/' + values[1].display_name;
        // Populate streamer profile picture
        profilePictureEl.src = values[1].logo;
        // Populate streamer type
        if (values[0].stream === null) {
            streamerOnlineOfflineEl.textContent = 'Offline';
            twitchStreamContainerEl.classList.add('offline');
        } else {
            streamerOnlineOfflineEl.textContent = values[0].stream.game;
            twitchStreamContainerEl.classList.add('online');
        }
        
    }
};

function filterOnlineOffline() {
    streamerContainers = document.getElementsByClassName("twitch-stream-container");
}

// fetchTwitchAPI();