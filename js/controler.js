const wrapper = document.querySelector("#wrapper"),
mainAudio = document.querySelector("#main-audio"),
musicName = document.querySelector("#text>.musicTitle"),
playPauseBtn = document.querySelector(".playIcon"),
likeBtn = document.querySelector(".likeIcon"),
prevBtn = document.querySelector(".prev"),
nextBtn = document.querySelector(".next"),
progressBar = document.querySelector(".music_progress_line");

// 控制歌曲列表的索引
let musicIndex = 1;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
})

// 加载歌曲信息
function loadMusic(indexNum) {
    musicName.innerText = allMusic[indexNum - 1].name;
    mainAudio.src = `audio/${allMusic[indexNum - 1].src}.mp3`;
}

// 播放控制
playPauseBtn.addEventListener('click', function() {
    // 检查音频是否已暂停
    if (mainAudio.paused) {
        // 如果已暂停，则播放音频
        mainAudio.play();
    } else {
        // 如果正在播放，则暂停音频
        mainAudio.pause();
    }
})

var iconContainer = document.querySelector('.controler');
let icon = iconContainer.querySelector('.playIcon');

var likeContainer = document.querySelector('.likeList');
let like = likeContainer.querySelector('.likeIcon')

var isPlay = true;
let isLike = true;

// 图标切换控制
document.addEventListener('DOMContentLoaded', function() {
    playPauseBtn.addEventListener('click', function() {
        if (isPlay) {
            // 切换到暂停图标
            icon.classList.remove('icon-bofang');
            icon.classList.add('icon-ai07');
            mainAudio.play();
        } else {
            // 切换回播放图标
            icon.classList.remove('icon-ai07');
            icon.classList.add('icon-bofang');
            mainAudio.pause();
        }
        isPlay = !isPlay; // 切换状态
    })

    likeBtn.addEventListener('click', function() {
        if (isLike) {
            // 切换到已喜欢图标
            like.classList.remove('icon-aixin');
            like.classList.add('icon-keaide');
        } else {
            // 切换回未喜欢图标
            like.classList.remove('icon-keaide');
            like.classList.add('icon-aixin');
        }
        isLike = !isLike; // 切换状态
    })
})

// 上一首的函数控制
function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    // 切换到暂停图标
    icon.classList.remove('icon-bofang');
    icon.classList.add('icon-ai07');
    mainAudio.play();
    isPlay = false; // 切换状态
}

// 下一首的函数控制
function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    // 切换回暂停图标
    icon.classList.remove('icon-bofang');
    icon.classList.add('icon-ai07');
    mainAudio.play();
    isPlay = true; // 切换状态
}

// 上一首
prevBtn.addEventListener('click', function() {
    prevMusic();
})

// 下一首
nextBtn.addEventListener('click', function() {
    nextMusic();
})


// 进度条更新
mainAudio.addEventListener('timeupdate', function(e) {
    const currentTime = e.target.currentTime;   // 获取当前播放的进度
    const duration = e.target.duration; // 获取总的播放长度
    let progressWidth = (currentTime / duration) * 100; // 获取百分比
    progressBar.style.width = `${progressWidth}%`;  // 应用百分比


    // 获取当前播放进度和播放总进度的容器
    let musicCurrentTime = document.querySelector('.current');
    let musicDuration = document.querySelector('.duration');
    // 更新歌曲总长度的时间
    mainAudio.addEventListener('loadeddata', function() {

        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    })
    // 更新正在播放的时间
    let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if (currentSec < 10) {
            currentSec = `0${currentSec}`;
        }
        musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
})