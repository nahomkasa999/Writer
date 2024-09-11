// //https://localhost:5173/#access_token=BQDlbyepIJvYK9dmIJYErhahhEKcCsOlbxasSTZz8JegPw3sCJ2x1xwrDaHQr2OQ6JqRbDnLTDlP7JurRjiNlhXLMu3B5rPo5cWDD0SHjP29WZz5fXpI6y_NKi4HYmrQHEX-YXT3lheMXvyjZnfiFI5F2qpk9MIryKcyaHNAr1Dc1eBud_E9rFuda4B0pqoytH4R0_2QzvA&token_type=Bearer&expires_in=3600

// import React, { useState, useEffect } from 'react';

// function Spotify() {
//   const CLIENT_ID = '6e5aec84cea24c02aff0f4fe16ad1b39';
//   const REDIRECT_URI = 'https://localhost:5173';
//   const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
//   const RESPONSE_TYPE = 'token';
//   const SCOPE = 'user-read-playback-state user-modify-playback-state streaming';

//   const [token, setToken] = useState('');
//   const [deviceId, setDeviceId] = useState(null);
//   const [player, setPlayer] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [tracks, setTracks] = useState([]);
//   const [selectedTrack, setSelectedTrack] = useState(null);

//   // Check for access token in the URL
//   useEffect(() => {
//     const hash = window.location.hash;
//     if (hash) {
//       const params = new URLSearchParams(hash.substring(1));
//       const accessToken = params.get('access_token');
//       if (accessToken) {
//         setToken(accessToken);
//         window.location.hash = ''; // Clear the URL hash
//       }
//     }

//     // Load Spotify SDK
//     window.onSpotifyWebPlaybackSDKReady = () => {
//       const player = new window.Spotify.Player({
//         name: 'Spotify Web Player',
//         getOAuthToken: cb => { cb(token); }, // Use the token
//         volume: 0.5
//       });

//       // Ready
//       player.addListener('ready', ({ device_id }) => {
//         console.log('Ready with Device ID', device_id);
//         setDeviceId(device_id);
//       });

//       // Not Ready
//       player.addListener('not_ready', ({ device_id }) => {
//         console.log('Device ID has gone offline', device_id);
//       });

//       player.connect();
//       setPlayer(player);
//     };

//   }, [token]);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!searchTerm) return;

//     const searchUrl = `https://api.spotify.com/v1/search?q=${searchTerm}&type=track&limit=10`;
//     const response = await fetch(searchUrl, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await response.json();
//     setTracks(data.tracks.items); // Store the tracks in state
//   };

//   const handlePlay = (trackUri) => {
//     // Play the track using Spotify's Web Playback SDK
//     if (player && deviceId) {
//       fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//           uris: [trackUri],
//         }),
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setSelectedTrack(trackUri);
//     } else {
//       console.log('Player or device ID not ready');
//     }
//   };

//   return (
//     <>
//       <div className="SpotifyContainer">
//         {!token ? (
//           <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>
//             Login to Spotify
//           </a>
//         ) : (
//           <div>
//             <h2>Search for Tracks</h2>
//             <form onSubmit={handleSearch}>
//               <input
//                 type="text"
//                 placeholder="Enter a topic (e.g., 'lofi')"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <button type="submit">Search</button>
//             </form>

//             <div>
//               {tracks.length > 0 && (
//                 <ul>
//                   {tracks.map((track) => (
//                     <li key={track.id}>
//                       <span>{track.name} by {track.artists[0].name}</span>
//                       <button onClick={() => handlePlay(track.uri)}>Play</button>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             {selectedTrack && (
//               <div>
//                 <h3>Now Playing: {selectedTrack}</h3>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Spotify;
