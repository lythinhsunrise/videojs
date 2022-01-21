var autoplayAllowed = false;
var autoplayRequiresMute = false;
var player;
var wrapperDiv;

function checkUnmutedAutoplaySupport() {
  canAutoplay
    .video({timeout: 100, muted: false})
    .then(function(response) {
        if(response.result === false) {
          // Unmuted autoplay is not allowed.
          checkMutedAutoplaySupport();
        } else {
          // Unmuted autoplay is allowed.
          autoplayAllowed = true;
          autoplayRequiresMute = true;
          initPlayer();
        }
    })
}

function checkMutedAutoplaySupport() {
  canAutoplay
    .video({timeout: 100, muted: true})
    .then(function(response) {
        if(response.result === false) {
          // Muted autoplay is not allowed.
          autoplayAllowed = false;
          autoplayRequiresMute = false;
        } else {
          // Muted autoplay is allowed.
          autoplayAllowed = true;
          autoplayRequiresMute = true;
        }
        initPlayer();
    })
}

function initPlayer() {
  var vjsOptions = {
    autoplay: autoplayAllowed,
    muted: autoplayRequiresMute,
    debug: true
  }
  player = videojs('content_video', vjsOptions);

  player.on('timeupdate', function(){
    var currentTime = this.currentTime();
    console.log(currentTime)
    if(Math.round(currentTime)===10){
        player.ima.changeAdTag(imaOptions.adTagUrl);
        player.ima.requestAds();
    }
    if(Math.round(currentTime)===20){
        player.ima.changeAdTag(imaOptions.adTagUrl);
        player.ima.requestAds();
    }
  });

  var imaOptions = {
      id: 'content_video',
      adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=',
  };
  player.ima(imaOptions);

  if (!autoplayAllowed) {
    if (navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/Android/i)) {
      startEvent = 'touchend';
    }

    wrapperDiv = document.getElementById('content_video');
    wrapperDiv.addEventListener(startEvent, initAdDisplayContainer);
  }
}

function initAdDisplayContainer() {
    player.ima.initializeAdDisplayContainer();
    wrapperDiv.removeEventListener(startEvent, initAdDisplayContainer);
}

var startEvent = 'click';
checkUnmutedAutoplaySupport();