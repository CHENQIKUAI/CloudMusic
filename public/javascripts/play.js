const iconPrev = document.querySelector(".icon-prev");
const iconState = document.querySelector(".icon-state");
const iconNext = document.querySelector(".icon-next");
const iconVoice = document.querySelector(".icon-voice");
const audioMedia = document.getElementById('audio-media');
const dotEl = document.querySelector(".player-progress-dot");
const playLineEl = document.querySelector(".player-progress-play");


const musicIDs = ["400162138", "28949444", "156374", "157301"];
// https://music.163.com/song/media/outer/url?id=400162138.mp3
const PAUSE_STATE = "PAUSE_STATE"
const START_STATE = "START_STATE"
const STOP_STATE = "STOP_STATE"

const CHANGE_NEXT = 'CHANGE_NEXT';
const CHANEG_PREV = 'CHANGE_PREV';

const store = {
    musicIDs: musicIDs,
    musicIndex: 0,
    volume: 1,
    playState: STOP_STATE,

}


const changeMusicIndex = (changeTo) => {
    if (changeTo === CHANGE_NEXT) {
        store.musicIndex = (store.musicIndex + 1) % store.musicIDs.length;
    } else if (changeTo === CHANEG_PREV) {
        store.musicIndex = (store.musicIndex - 1 + store.musicIDs.length) % store.musicIDs.length;
    }
}



// 传进毫秒，得到分秒
const calcDuration = (sDuration) => {
    const iDuration = parseInt(sDuration);
    const dDuration = new Date(iDuration);

    function foo(str) {
        str = '00' + str;
        return str.substring(str.length - 2, str.length);
    }
    const duration = foo(dDuration.getMinutes()) + ": " + foo(dDuration.getSeconds());
    return duration;
}


//音乐的加载函数
const loadMusic = (audioMedia, musicIDs, musicIndex) => {
    
    const id = musicIDs[musicIndex];
    const url = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
    fetch(`http://localhost:3000/song/detail?ids=${id}`)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            const songName = data.songs[0].name;
            const singer = data.songs[0].ar[0].name;

            document.querySelector(".song-name").innerHTML = songName + " -";
            document.querySelector(".singer-name").innerHTML = singer;

            document.querySelector(".song-duration").innerHTML = "";

        }).catch(function (e) {
            console.log("Oops, error in hot songs");
        });
    document.querySelector(".a-download").href = url;
    audioMedia.src = url;
    audioMedia.pause();
}


//两个关于音频播放的函数
const play = (audioMedia) => {
    setTimeout(() => {
        iconState.children[0].href.baseVal = "#icon-zanting";
    }, 150);
    audioMedia.play();
    store.playState = START_STATE;
}


//暂停函数
const pause = (audioMedia) => {
    audioMedia.pause();
    iconState.children[0].href.baseVal = "#icon-bofang";
    store.playState = PAUSE_STATE;
}
    

const justPlay = () => {
    //使 播放
    if (store.playState === START_STATE) {
        //若 之前状态 为 播放
        clearInterval(window.interval);
        dotEl.style.left = 0 + 'px';
        playLineEl.style.width = 0 + "%";

        setTimeout(() => {
            dotMove(dotEl, playLineEl, audioMedia.duration);
        }, 800);
    } else if (store.playState === PAUSE_STATE) {
        //若 之前状态 为 暂停
        dotMove(dotEl, playLineEl, audioMedia.duration, parseInt(window.recordDotLeft));
    } else {
        //若 之前状态 为 停止
        setTimeout(() => {
            dotMove(dotEl, playLineEl, audioMedia.duration);
        }, 800);
    }

    play(audioMedia);
    iconState.children[0].href.baseVal = "#icon-zanting"
    store.playState = START_STATE;
}

// 当点击 播放|暂停按钮
iconState.onclick = (e) => {
    if (iconState.children[0].href.baseVal === "#icon-bofang") {
        justPlay();
    } else {
        //使 暂停
        window.recordDotLeft = dotEl.style.left;
        iconState.children[0].href.baseVal = "#icon-bofang"
        clearInterval(window.interval);
        pause(audioMedia);
    }
}


//播放下一首
iconNext.onclick = (e) => {

    changeMusicIndex(CHANGE_NEXT);
    loadMusic(audioMedia, store.musicIDs, store.musicIndex);

    //播放、暂停、停止 三种情况
    if (store.playState === START_STATE) {
        pause(audioMedia);
        clearInterval(window.interval);

        dotEl.style.left = 0 + 'px';
        playLineEl.style.width = 0 + "%";

        setTimeout(() => {
            dotMove(dotEl, playLineEl, audioMedia.duration);
            play(audioMedia);
        }, 800);

    } else if (store.playState === PAUSE_STATE) {
        pause(audioMedia);

        DotEl.style.left = 0 + 'px';
        PlayLineEl.style.width = 0 + "%";

        setTimeout(() => {
            dotMove(dotEl, playLineEl, audioMedia.duration);
            play(audioMedia);
        }, 800);

    } else if (store.playState === STOP_STATE) {

        setTimeout(() => {
            dotMove(dotEl, playLineEl, audioMedia.duration);
            play(audioMedia);
        }, 800);

    }

    store.playState = START_STATE;
}



//播放上一首
iconPrev.onclick = (e) => {

    changeMusicIndex(CHANEG_PREV);
    loadMusic(audioMedia, store.musicIDs, store.musicIndex);


    //播放、暂停、停止 三种情况
    if (store.playState === START_STATE) {
        pause(audioMedia);
        clearInterval(window.interval);

        dotEl.style.left = 0 + 'px';
        playLineEl.style.width = 0 + "%";

        setTimeout(() => {
            dotMove(dotEl, playLineEl, audioMedia.duration);
            play(audioMedia);
        }, 800);

    } else if (store.playState === PAUSE_STATE) {
        pause(audioMedia);

        DotEl.style.left = 0 + 'px';
        PlayLineEl.style.width = 0 + "%";

        setTimeout(() => {
            dotMove(dotEl, playLineEl, audioMedia.duration);
            play(audioMedia);
        }, 800);

    } else if (store.playState === STOP_STATE) {

        setTimeout(() => {
            dotMove(dotEl, playLineEl, audioMedia.duration);
            play(audioMedia);
        }, 800);

    }

    store.playState = START_STATE;
}



//对进度条上的点进行操作；
const dotMove = (DotEl, PlayLineEl, timeTotal, beginAt = 0) => {

    
    let duration = null;
    
    const width = 350;
    timeTotal *= 1000;

    const timePerExe = 1000;
    let distance = 0;
    let percent = 0;
    const perTimeDistance = width * timePerExe / timeTotal;
    const perTimePercent = 100 * timePerExe / timeTotal;

    distance += beginAt;
    percent += beginAt / width * 100;

    let time = 0;
    window.interval = setInterval(() => {
        if (distance >= width - 10) {
            clearInterval(interval);
        } else {
            time++;
            if(duration == null){
                duration = calcDuration(audioMedia.duration * 1000);
            }
            
            distance += perTimeDistance;
            percent += perTimePercent;
            DotEl.style.left = distance + 'px';
            PlayLineEl.style.width = percent + "%";
            document.querySelector(".song-duration").innerHTML = calcDuration(time * 1000) + "/" + duration;
        }
    }, timePerExe);
}



//静音或有音
iconVoice.onclick = (e) => {
    if (iconVoice.children[0].href.baseVal === "#icon-shengyin") {
        // 使 静音
        iconVoice.children[0].href.baseVal = "#icon-jingyin";
        audioMedia.volume = 0;
    } else {
        //使 有声音
        iconVoice.children[0].href.baseVal = "#icon-shengyin";
        audioMedia.volume = store.volume;
    }
}


const componentASong = (id, songName, singer, time) => {
    const el = document.createElement("div");
    const idEl = document.createElement("span");
    const songNameEl = document.createElement("span");
    const singerEl = document.createElement("span");
    const timeEl = document.createElement("span");

    idEl.innerHTML = id;
    songNameEl.innerHTML = `       ${songName}`
    singerEl.innerHTML = `${singer}`
    timeEl.innerHTML = `${time}`


    timeEl.style.float = "right";
    timeEl.style.marginRight = "10px";


    el.appendChild(idEl);
    el.appendChild(songNameEl)
    el.appendChild(singerEl)
    el.appendChild(timeEl)
    return el;
}


window.onload = () => {
    //执行音乐的加载
    loadMusic(audioMedia, store.musicIDs, store.musicIndex);

    const container = document.createElement("div");

    const box = document.getElementById('box');
    container.className = "content";
    for (let i = 0; i < store.musicIDs.length; ++i) {

        (() => {
            // let index = i;
            const id = store.musicIDs[i];
            const url = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
            fetch(`http://localhost:3000/song/detail?ids=${id}`)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {

                    const songName = data.songs[0].name;
                    const singer = data.songs[0].ar[0].name;
                    const po = componentASong(i + 1, songName, singer, "time");


                    po.addEventListener("dblclick", (e) => {
                        loadMusic(audioMedia, store.musicIDs, i);
                        justPlay();
                        // setTimeout(() => {
                        //     dotMove(dotEl, playLineEl, audioMedia.duration);
                        //     // play(audioMedia);
                        // }, 800);
                    })

                    console.log(po)
                    container.appendChild(po);

                    if (i === store.musicIDs.length - 1) {
                        box.appendChild(container);

                    }

                }).catch(function (e) {
                    console.log("Oops, error in hot songs");
                });
        })();
    }


    $(".content").mCustomScrollbar({
        axis: "yx",
        scrollButtons: {
            enable: true
        },
        theme: "3d-dark",
    });

}