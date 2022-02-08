var videoOptions = {
  controls: true,
  sources: [{
    src: 'videos/master.m3u8',
    type: 'application/x-mpegURL',
  }],
}

var player = videojs('content_video', videoOptions);

var options = {
  adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?' +
  'sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&' +
  'impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&' +
  'cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator='
};

player.ima(options);
// var promise = player.play();

// if (promise !== undefined) {
//   promise.then(_ => {
//     // Autoplay worked!
//     console.log('Autoplay worked!')
//   }).catch(error => {
//     // Autoplay failed.
//     console.log('Autoplay failed.')
//   });
// }

var adssecond = 0;

player.on('timeupdate', function() {
  var currentTime = player.currentTime()
  if(Math.round(currentTime)!==adssecond && Math.round(currentTime)!==0 && Math.round(currentTime)%10===0){
    console.log('trigger')
    player.ima.changeAdTag(options.adTagUrl);
    player.ima.requestAds()
    adssecond = Math.round(currentTime)
  }
})

var videos = document.getElementsByTagName("video");

function playInViewPort() {
  let video = document.querySelector("#content_video_html5_api");
  video.muted = true;
  let startplay = false;

  let observer = new IntersectionObserver(
      (entries) => {
          entries.forEach((entry) => {
              if (
                  entry.intersectionRatio !== 0 
                  && video.paused && startplay === false
              ) {
                video.play();
                startplay = true;
              }
          });
      },
      { threshold: 0.5 }
  );
  observer.observe(video);

}

playInViewPort();