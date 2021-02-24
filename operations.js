let songs = [
  {
    title: 'Outsider No More',
    artist: "P.T. Adamczyk",
    songPath: "files/outsider_no_more.mp3",
    imgPath: "files/outsider_no_more_thumbnail.jpg"
  },
  {
    title: 'Homesick',
    artist: "Ichika Nito",
    songPath: "files/ichika_nito_homesick.mp3",
    imgPath: "files/ichika_nito_homesick_tumbnail.jpg"
  },
  {
    title: "Chippin' in",
    artist: "Kerry Eurodayne",
    songPath: 'files/kerry_eurodayne_chippin_in.mp3',
    imgPath: "files/kerry_eurodayne_chippin_in_thumbnail2.jpg"
  },
  {
    title: "Skeletons",
    artist: "Driveways",
    songPath: 'files/driveways_skeletons.mp3',
    imgPath: 'files/driveways_skeletons_thumbnail.jpg'
  }
];

$(document).ready(showDetails);

$(document).ready(function () {
  $('#playlist').click(function () {
    $('#myPlaylist').toggleClass('hide');

  });

  $('#songs').click(function () {
    $('#listSongs').toggleClass('hide');
  });
});


songs.forEach((element) => {
  var newDiv = document.createElement('div');
  newDiv.innerHTML = element.title;
  $(newDiv).css("margin-left", "20px");
  $(newDiv).css("letter-spacing", "1px");
  $(newDiv).css("font-size", "20px");
  $(newDiv).css("cursor", "pointer");

  $(newDiv).click(function () {
    currentSongIndex = songs.indexOf(element);
    audio.pause();
    playAudio();
  });

  $(newDiv).hover(
    function () {
      $(this).css("filter", "brightness(200%)");
    },
    function () {
      $(this).css("filter", "brightness(100%)");
    });


  $('#listSongs').append(newDiv);
});

//new
$('#addButton').click(function () {
  var songToSend = songs[currentSongIndex];
  var addSongDiv = document.createElement('div');
  $(addSongDiv).css("display", "flex");
  $(addSongDiv).css("align-items", "center");
  $(addSongDiv).css("justify-content", "space-between");
  $(addSongDiv).css("height", "60px");

  var firstDiv = document.createElement('div');
  firstDiv.style = "background-image: url('" + songToSend.imgPath + "');";
  $(firstDiv).css({
    'width': '45px',
    'height': '50px',
    'background-size': 'cover',
    'background-position': 'center',

  });

  var secondDiv = document.createElement('div');
  $(secondDiv).css({
    'font-size': '15px',
  });
  secondDiv.innerHTML = songToSend.title;

  //third

  var thirdDiv = document.createElement('div');
  $(thirdDiv).html("<i class='fa fa-trash'></i>");
  $(thirdDiv).css({
    'cursor': 'pointer',
    'color': 'white',
    'font-size': '15px'
  });

  $(thirdDiv).click(function () {
    $(addSongDiv).remove();
  })

  $(addSongDiv).append(firstDiv);
  $(addSongDiv).append(secondDiv);
  $(addSongDiv).append(thirdDiv);

  $(addSongDiv).hover(function () {
    $(this).css("filter", "brightness(200%)");
  },
    function () {
      $(this).css("filter", "brightness(100%)");
    });

  $('#myPlaylist').append(addSongDiv);
});



//////player

let currentSongIndex = 0;
let nextSongIndex;

let newSongImage = document.getElementById('songIMG');
let newSongTitle = document.getElementById('songTitle');
let newArtist = document.getElementById('songAuthor');
let playButton = document.getElementById('playIcon');


let fillbar = document.querySelector(".fillbar");


var audio = document.getElementById('music');


$('#mainButton').click(playAudio);
$('#before').click(beforeSong);
$('#after').click(nextSong);



function showDetails() {
  var song = songs[currentSongIndex];

  document.body.style = "background-image: url('" + song.imgPath + "');";
  newSongImage.style = "background-image: url('" + song.imgPath + "');";
  newSongTitle.innerHTML = songs[currentSongIndex].title;
  $('#songAuthor').html(songs[currentSongIndex].artist);
}

function playAudio() {

  if (audio.paused) {
    justPlay();
    playButton.classList.remove("fa-play");
    playButton.classList.add("fa-pause");
  }
  else {
    audio.pause();
    playButton.classList.add("fa-play");
    playButton.classList.remove("fa-pause");
  }

  showDetails();
}

function justPlay() {
  audio.src = songs[currentSongIndex].songPath;
  audio.play();
}

function nextSong() {
  if (currentSongIndex === songs.length - 1) {
    currentSongIndex = 0;

    audio.pause();
    playAudio();
  }
  else {
    currentSongIndex++;

    audio.pause();
    playAudio();

  }
}

function beforeSong() {
  if (currentSongIndex > 0) {
    currentSongIndex--;

    audio.pause();
    playAudio();
  }
  else {
    currentSongIndex = songs.length - 1;

    audio.pause();
    playAudio();
  }
}

//bar


audio.addEventListener("timeupdate", function () {
  let position = audio.currentTime / audio.duration;
  fillbar.style.width = position * 100 + "%";

  if (audio.ended) {
    nextSong();
  }
});
