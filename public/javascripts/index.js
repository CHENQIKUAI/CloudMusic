const container_playlist = document.querySelector(".container_playlist");
const container_bill = document.querySelector(".bill");

//当页面加载后
window.onload = () => {
    fetch("http://localhost:3000/top/playlist?limit=12&order=hot")
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            const playlists = data.playlists;
            showPlaylist(playlists);
        }).catch(function (e) {
            console.log("Oops, error in playlist");
        });


    fetch("http://localhost:3000/top/list?idx=0")
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            const tracks = data.playlist.tracks;
            const coverImgUrl = data.playlist.coverImgUrl;

            const component = componentTopList("云音乐新歌榜", tracks, coverImgUrl, 0);
            container_bill.appendChild(component);

        }).catch(function (e) {
            console.log("Oops, error in playlist");
        });


    fetch("http://localhost:3000/top/list?idx=1")
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            const tracks = data.playlist.tracks;
            const coverImgUrl = data.playlist.coverImgUrl;
            const component = componentTopList("云音乐热歌榜", tracks, coverImgUrl, 1);
            container_bill.appendChild(component);
        }).catch(function (e) {
            console.log("Oops, error in playlist");
        });


    fetch("http://localhost:3000/top/list?idx=3")
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            const tracks = data.playlist.tracks;
            const coverImgUrl = data.playlist.coverImgUrl;
            const component = componentTopList("云音乐飙升榜", tracks, coverImgUrl, 3);
            container_bill.appendChild(component);
        }).catch(function (e) {
            console.log(e);
        });

}


const passSongsId = (ids) => {
    let socket = io();
    socket.emit('pass songs ids', ids);
    // console.log("pass songs ids", ids)
}

const passPlayListId = (id) => {
    
    fetch(`http://localhost:3000/playlist/detail?id=${id}`)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        const playlist= data.playlist;
        let ids = [];
        for(let i = 0; i < 10; ++i){
            ids.push(playlist.trackIds[i].id);
        }
        passSongsId(ids);
        console.log("pass playlist id", ids)
    }).catch(function (e) {
        console.log("Oops, error in playlist");
    });

    
}

// 构建一个 歌单展示模板
const componentItemPlaylist = (coverImgUrl, playCount, name, playlistId) => {

    const item_playlist = document.createElement("div");
    item_playlist.innerHTML = `
        <div class="item_playlist">
            <a href="javascript:;" onClick="passPlayListId(${playlistId})">
                <img class="img_playlist" src=${coverImgUrl}
                    alt="">
                <div class="playCount_playlist">播放量: ${playCount}</div>
                <img class="icon_play" src="./images/play.png" alt="play">
            </a>
            <div class="title_playlist">
            <a href="#">${name}</a>
            </div>
        </div> `;
    //为这个模板添加 鼠标移动到上面就展示图标 移出图标就消失的动作
    item_playlist.children[0].children[0].onmouseover = (e) => {
        item_playlist.children[0].children[0].children[2].style.display = "block";
    }
    item_playlist.children[0].children[0].onmouseout = (e) => {
        item_playlist.children[0].children[0].children[2].style.display = "none";
    }
    return item_playlist;
}


const showPlaylist = (playlists) => {
    for (let i = 0; i < playlists.length; ++i) {
        const el = playlists[i];
        let name_class = '.playlist_';
        if (i < 4) {
            name_class = name_class + 1;
        } else if (i < 8) {
            name_class = name_class + 2;
        } else {
            name_class = name_class + 3;
        }

        const el_root = document.querySelector(name_class);
        const name = el.name;
        const coverImgUrl = el.coverImgUrl;
        const playCount = el.playCount;
        const playlistId = el.id;

        const item_playlist = componentItemPlaylist(coverImgUrl, playCount, name, playlistId);
        el_root.appendChild(item_playlist);
    }
}


const clickAlbum = (idx) => {
    fetch(`http://localhost:3000/top/list?idx=${idx}`)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            const playlist= data.playlist;
            let ids = [];
            for(let i = 0; i < 10; ++i){
                ids.push(playlist.trackIds[i].id);
            }
            passSongsId(ids);
        }).catch(function (e) {
            console.log("Oops, error in playlist");
        });
}



const componentTopList = (billName, tracks, coverImgUrl, idx) => {
    const component = document.createElement("div");
    component.style.width = "20%";
    component.className = "item_bill";
    component.innerHTML = `
        <div class="top_item_bill">
            <img src=${coverImgUrl} alt="img" height="80px" width="80px"/>
            <div class="flex top_right_item_bill">
                <div>${billName}</div>
                <a href="javascript:;" onClick="clickAlbum(${idx})">
                    <img src="./images/play.png" alt="play_img" height="20px" width="20px"/>
                </a>
            </div>
        </div>
        <dd>
            <ol></ol>
        </dd>
        `
    for (let i = 0; i < 10; ++i) {
        const insertedEl = component.children[1].children[0];
        const name = tracks[i].name;
        const singer = tracks[i].ar[0].name;
        const li = document.createElement("li");
        li.innerHTML = `
        <span>${i + 1}</span>
        <a href="javascript:;" onClick="passSongsId(${tracks[i].id})">${name}</a>
        `
        li.style.listStyle = "none";
        li.style.overflow = "hidden";
        li.style.whiteSpace = "nowrap";
        li.style.textOverflow = "ellipsis";
        li.style.position = "relative";
        li.children[0].style.width = "35px";
        li.children[0].style.textAlign = "center";
        li.children[0].style.float = "left";
        li.children[1].style.position = "absolute";
        li.children[1].style.left = "30px";
        if (i < 3) {
            li.style.color = "#c10d0c";
        }
        if (i % 2 == 0) {
            li.style.backgroundColor = "#E8E8E8"
        }
        insertedEl.appendChild(li);
    }
    return component;
}