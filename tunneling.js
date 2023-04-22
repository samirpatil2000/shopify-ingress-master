// const localtunnel = require('localtunnel');

// (async () => {
//   const tunnel = await localtunnel({ port: 8000 });

//   // the assigned public url for your tunnel
//   // i.e. https://abcdefgjhij.localtunnel.me
//   tunnel.url;
//   console.log(tunnel.url, "Tunnel URL");

//   tunnel.on('close', () => {
//     // tunnels are closed
//   });
// })();

const encodedString = "%2Fproducts%2Fspinbot-battlebudz-gx10-gaming-bluetooth-tws-earbuds-with-low-latency-and-game-mode%3Ffbclid%3DPAAaYcp30odM6EpJZITSWfMlqTXp55CayIKGnpI-IAfj9pEGFK2k9gjfn3T6M_aem_AfcZ2ntkmw0fo-OxYWLTdXf6W_Kg2hKSqJePO6raf-zodZg6v0ciZ__idIYTXUAQJlrvQ3Ni6NC20qTxsgz3oCglBMO1ZlGNQtF9Vq6TvLS_p_vASbb-0_darLycsopLSx8&utm_campaign=blog_post &utm_medium=social&utm_source=facebook";
const decodedString = decodeURIComponent(encodedString).split("?");
const landingPage = decodedString[0]
const paramsList = decodedString[1].split("&")
const params = {}
for(var i = 0; i < paramsList.length; i ++){
  var keyValue = paramsList[i].split("=")
  params[keyValue[0]] = keyValue[1]
}console.log(decodedString)
console.log(decodedString, typeof(decodedString)); // Output: fbclid=PAAaYcp30odM6EpJZ


// const cookie = "preview_theme=1; localization=IN; _cmp_a=%7B%22purposes%22%3A%7B%22a%22%3Atrue%2C%22p%22%3Atrue%2C%22m%22%3Atrue%2C%22t%22%3Atrue%7D%2C%22display_banner%22%3Afalse%2C%22merchant_geo%22%3A%22IN%22%2C%22sale_of_data_region%22%3Afalse%7D; _y=d0421bfc-f62d-40ef-9a2b-1ed5b8387111; _s=05527b9f-1bd6-40d4-8748-234a0d8adb46; _shopify_y=d0421bfc-f62d-40ef-9a2b-1ed5b8387111; _shopify_s=05527b9f-1bd6-40d4-8748-234a0d8adb46; _ga=GA1.2.1879288599.1681847651; _gid=GA1.2.984109285.1681847651; _fbp=fb.1.1681847651495.2143080970; _shopify_sa_t=2023-04-18T19%3A54%3A19.994Z; _shopify_sa_p=fbclid%3DPAAaYcp30odM6EpJZITSWfMlqTXp55CayIKGnpI-IAfj9pEGFK2k9gjfn3T6M_aem_AfcZ2ntkmw0fo-OxYWLTdXf6W_Kg2hKSqJePO6raf-zodZg6v0ciZ__idIYTXUAQJlrvQ3Ni6NC20qTxsgz3oCglBMO1ZlGNQtF9Vq6TvLS_p_vASbb-0_darLycsopLSx8; _fbc=fb.1.1681847660145.PAAaYcp30odM6EpJZITSWfMlqTXp55CayIKGnpI-IAfj9pEGFK2k9gjfn3T6M_aem_AfcZ2ntkmw0fo-OxYWLTdXf6W_Kg2hKSqJePO6raf-zodZg6v0ciZ__idIYTXUAQJlrvQ3Ni6NC20qTxsgz3oCglBMO1ZlGNQtF9Vq6TvLS_p_vASbb-0_darLycsopLSx8";
const cookie = "localization=IN; _y=c60b7907-1a15-48ae-8b73-a8ca3d54303a; _shopify_y=c60b7907-1a15-48ae-8b73-a8ca3d54303a; refb=67f8fd07-fe74-4515-9af2-6ae786329da0; _ga_HJGBQFF0PL=GS1.1.1681626905.1.1.1681626931.0.0.0; _ga_9BQT4YTEK5=GS1.1.1681626905.1.1.1681626931.0.0.0; BS_UNIQUE_USER_ID=1681626909073z70N4gSJjs; cart=d8b8132c724fab31a80567a721cf6008; checkout_session_token__c__d8b8132c724fab31a80567a721cf6008=%7B%22token%22%3A%22ekxPajlxZ3hrMU1TL2pRbko1dUptTWpHWEZCbVgzUGpxamZWZXBGMHVUL3UrbVRJQzV3Y1dKZ25YaWw4RUZWL2ROVkVld05QeUk5QzVjeURvSTB2L3h1WEpsc2VTbEtOTmZxZ3RFcHoyZE9pMGFobjdvWFJTbWpjdnF1Y3JqUGJvWkhqdUN4YU8vVWRNb2VUdGF5S1lEWVllb0xDLzBjbWJML1RsWGJWUGlMS250bVZRemdNbk5wYWpadkVzcWUxV0lrdmoxbVdkNkdIM1M4Q2d3Vm1NY2d6cHZmVTg3dnUzeFJLeElHcUY4SHhGc2xjWmVCTDlOaisvMEN1b1JTMWFaVVQwOTQ9LS1TdGZ2ZndGY29UMzlKN3BPLS14SmFUSWxDbGQ3dEhxd0xXR0hORnVRPT0%22%2C%22locale%22%3A%22en-IN%22%7D; checkout_session_lookup=%7B%22version%22%3A1%2C%22keys%22%3A%5B%7B%22source_id%22%3A%22d8b8132c724fab31a80567a721cf6008%22%2C%22checkout_session_identifier%22%3A%222f9b45e0c50a844eb67f66401209339e%22%2C%22source_type_abbrev%22%3A%22c%22%2C%22updated_at%22%3A%222023-04-16T06%3A35%3A29.900Z%22%7D%5D%7D; _cmp_a=%7B%22purposes%22%3A%7B%22a%22%3Atrue%2C%22p%22%3Atrue%2C%22m%22%3Atrue%2C%22t%22%3Atrue%7D%2C%22display_banner%22%3Afalse%2C%22merchant_geo%22%3A%22IN%22%2C%22sale_of_data_region%22%3Afalse%7D; _s=e83b964a-2785-4547-a1a9-14bf1ca9a0e0; _shopify_s=e83b964a-2785-4547-a1a9-14bf1ca9a0e0; _shopify_sa_t=2023-04-18T20%3A17%3A39.384Z; _shopify_sa_p=fbclid%3DPAAaYcp30odM6EpJZITSWfMlqTXp55CayIKGnpI-IAfj9pEGFK2k9gjfn3T6M_aem_AfcZ2ntkmw0fo-OxYWLTdXf6W_Kg2hKSqJePO6raf-zodZg6v0ciZ__idIYTXUAQJlrvQ3Ni6NC20qTxsgz3oCglBMO1ZlGNQtF9Vq6TvLS_p_vASbb-0_darLycsopLSx8; _gat=1; _ga=GA1.2.2071903723.1681626905; _gid=GA1.2.1763493583.1681838920; _gat_gtag_UA_250083749_1=1";
const pairs = cookie.split("; ");
obj = {}
for (let i = 0; i < pairs.length; i++) {
  const pair = pairs[i].split("=");
  const key = pair[0];
  const value = decodeURIComponent(pair[1]);
  // if(key === "_shopify_sa_p" || key === "_landing_page"){
      obj[key] = value;
  // }
}
console.log(obj)
