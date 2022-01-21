var player = videojs('content_video');

// loader = new google.ima.AdsLoader(...);
// loader.addEventListener(
//     google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
//     (event) => {
//        event.getAdsManager(videoTag).setVolume(0);
// }

var options = {
  id: 'content_video',
  adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=vmap&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ar%3Dpremidpostlongpod&cmsid=496&vid=short_tencue&correlator=',
};

player.ima(options);
//autoplay
// player.play();

var player1 = videojs('content_video1');

var options = {
  id: 'content_video1',
  adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator='
};

player1.ima(options);