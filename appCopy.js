// const timeSelect = document.querySelector('.time-select');
// const song = document.querySelector('.song');

// timeSelect.addEventListener('click', () => {
//   song.play();
//   console.log(0);

// });

const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  // const pause = document.querySelector('pause');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  const sounds = document.querySelectorAll('.sound-picker button');
  // time表示

  const timeDisplay = document.querySelector('.time-display');
  // select sound
  const timeSelect = document.querySelectorAll(".time-select button");
  console.log(4);
  const outlineLength = outline.getTotalLength();
  // totalの綴り間違い

  // Duration  data-timeのこと
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  // outline.style.strokeDashoffset = 200;     ←onlyForTest

  outline.style.strokeDasharray = outlineLength;
  // 初期　デフォルト　↑ ↓
  outline.style.strokeDashoffset = outlineLength;


  // pick diff sounds
  sounds.forEach(sound => {
    sound.addEventListener('click', function () {
      song.src = this.getAttribute("data-sounds");
      console.log(2);

      video.src = this.getAttribute("data-video");
      checkplaying(song);

    })
  }
  );




  // playアイコンからの挙動
  play.addEventListener('click', () => {
    checkplaying(song);
  });


  // timeSelect.forEach の機能をつけるため、上の宣言を追加
  timeSelect.forEach(option => {
    option.addEventListener('click', function () {
      fakeDuration = this.getAttribute("data-times");

      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
    });
  });

  const checkplaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "svg/pause.svg"

    }
    else {
      song.pause();
      video.pause();
      play.src = "svg/play.svg"
    }
  };

  // 　　Fkae長さから現在時間をひいたもの　⇨を　〜〜で割ると経過秒数（elapse）が取得できる？
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;

    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    // Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    timeDisplay.textContent = `${minutes}:${seconds}`;
    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = 'svg/play.svg';
      video.pause();
    }
  };

};

app();