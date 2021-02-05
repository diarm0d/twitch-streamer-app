const mainContainerEl = document.getElementById('main-container');
const loadingEl = document.getElementById('loading');
const twitchStreamContainerEl = document.getElementById('twitch-stream-container');
const profilePictureEl = document.getElementById('profile-image');
const streamerNameEl = document.getElementById('streamer-name');
const streamerNameLinkEl = document.getElementById('streamer-name-url');
const streamerOnlineOfflineEl = document.getElementById('online-offline');

let isDuplicated = false;

twitchArray = ["ESL_SC2", "OgamingSC2"];
//  , "cretetion" , "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"
testTwitchName = 'freecodecamp';

proxyUrlUsers = `https://twitch-proxy.freecodecamp.rocks/twitch-api/users/`;
proxyUrlStatus = `https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/`;
proxyServer='https://obscure-sands-82167.herokuapp.com/';

// user_login - optional query param

// need returned - user_name, game_name, type, 

twitchArray.forEach(streamer => {
    fetchTwitchAPI(streamer);  
});

async function fetchTwitchAPI(streamer) {
    try {
        const resUser = await fetch(proxyServer + proxyUrlUsers + streamer);
        twitchUserRes = await resUser.json();
        // const resStatus =  await fetch(proxyServer + proxyUrlStatus + streamer);
        // twitchStatusRes = await resStatus.json();
        // console.log(twitchStatusRes);
    } catch(error) {
        console.log(error);
    }
   populateStreamers(twitchUserRes);
}


function populateStreamers(twitchUserRes) {
    if (!isDuplicated) {
        loadingEl.remove();
        twitchStreamContainerEl.hidden = false;
        // Populate streamer name and create link to twitch
        streamerNameLinkEl.textContent = twitchUserRes.display_name;
        streamerNameLinkEl.href = 'https://www.twitch.tv/' + twitchUserRes.display_name;
        // Populate streamer profile picture
        profilePictureEl.src = twitchUserRes.logo;
        // Populate streamer type
        streamerOnlineOfflineEl.textContent = twitchUserRes.type;
        isDuplicated = true;
    } else {
        // Create new block
        var newStreamerEl = twitchStreamContainerEl.cloneNode(true);
        mainContainerEl.append(newStreamerEl);
        newStreamerEl.hidden = false;
        // Populate streamer name and create link to twitch
        streamerNameLinkEl.textContent = twitchUserRes.display_name;
        streamerNameLinkEl.href = 'https://www.twitch.tv/' + twitchUserRes.display_name;
        // Populate streamer profile picture
        profilePictureEl.src = twitchUserRes.logo;
        // Populate streamer type
        streamerOnlineOfflineEl.textContent = twitchUserRes.type;
    }
};

// fetchTwitchAPI();