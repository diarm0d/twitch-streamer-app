const twitchStreamContainerEl = document.getElementById('twitch-stream-container');
const profilePictureEl = document.getElementById('profile-image');
const streamerNameEl = document.getElementById('streamer-name');
const streamerOnlineOfflineEl = document.getElementById('online-offline');

twitchArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
testTwitchName = 'freecodecamp';

twitchApiUrl = 'https://api.twitch.tv/helix/streams?query=';
proxyApiUrl = 'https://twitch-proxy.freecodecamp.rocks/helix/streams?user_login=';
proxyUrl = 'https://twitch-proxy.freecodecamp.rocks/twitch-api/users/freecodecamp';
proxyServer='https://obscure-sands-82167.herokuapp.com/'

// user_login - optional query param

// need returned - user_name, game_name, type, 

async function fetchTwitchAPI() {
    try {
            const res = await fetch(proxyServer + proxyUrl);
            twitchRes = await res.json();
            console.log(twitchRes);
    } catch(error) {
        console.log(error);
    }
    populateStreamers(twitchRes);
}

function populateStreamers(twitchRes) {
    streamerNameEl.textContent = twitchRes.display_name;
    profilePictureEl.src = twitchRes.logo;
    streamerOnlineOfflineEl.textContent = twitchRes.type;
    console.log(twitchRes._links.self);
}

fetchTwitchAPI();