const search_input = document.querySelector("#search_input");
const page_containr = document.querySelector('.page_containr');
const root = document.querySelector(".show_time");
const load_page = document.getElementById("load_page");
const state = {};

const clearOriginSongs = () => {
    while (root.hasChildNodes()) {
        root.removeChild(root.firstChild);
    }
}


const passSongId = (id) => {
    var socket = io();
    socket.emit("pass songs ids", id);
}



const showOnePage = (songs, startIndex, num = 10) => {
    clearOriginSongs();

    for (var i = startIndex, count = 0; count < num && i < songs.length; ++i, ++count) {
        const song_name = songs[i].name;
        const id = songs[i].id;
        const singer = songs[i].artists[0].name;
        const sDuration = songs[i].duration;
        const album_name = songs[i].album.name;

        const iDuration = parseInt(sDuration);
        const dDuration = new Date(iDuration);

        function foo(str) {
            str = '00' + str;
            return str.substring(str.length - 2, str.length);
        }

        const duration = foo(dDuration.getMinutes()) + ": " + foo(dDuration.getSeconds());

        const el_song = document.createElement("div");
        el_song.className = "row songs_mgs";
        if (i % 2 == 1) {
            el_song.style.backgroundColor = "#fbfbfd";
        }

        const el_name_song = document.createElement("div");
        el_name_song.className = "col-md-5";
        el_name_song.innerHTML = `<a href="#"> ${song_name}</a>` +
            `<div class="mod_list_menu" style="float:right; display: none;">
            <a href="#">
                <img src="./images/play.png" alt="play">
            </a>
            <a href="#">
                <img onClick="passSongId(${id})" src="./images/add.png" alt="play">
            </a>
        </div>`;

        const el_singer = document.createElement("div");
        el_singer.className = "col-md-3";
        el_singer.innerHTML = `<a href="#">` + singer + `</a>`

        const el_album = document.createElement("div");
        el_album.className = "col-md-3";
        el_album.innerHTML = `<a href="#">` + album_name + `</a>`

        const el_duration = document.createElement("div");
        el_duration.className = "col-md-1";
        el_duration.innerHTML = duration;

        el_song.appendChild(el_name_song);
        el_song.appendChild(el_singer);
        el_song.appendChild(el_album);
        el_song.appendChild(el_duration);

        el_song.onmousemove = (e, el = el_name_song) => {
            console.log(el);
            el.children[1].style.display = "block";
        }
        el_song.onmouseout = (e, el = el_name_song) => {
            console.log(el);
            el.children[1].style.display = "none";
        }
        root.appendChild(el_song);
    }
}


const showThePagination = (num) => {

    while (load_page.children.length > 2) {
        load_page.removeChild(load_page.children[1]);
    }

    load_page.children[0].onclick = (e) => {
        if (state.page_index == 1) return false;
        load_page.children[state.page_index].className = "page-item";
        state.page_index--;
        load_page.children[state.page_index].className = "page-item active";

        showOnePage(state.songs, (state.page_index - 1) * 10);
    }

    load_page.children[1].onclick = (e) => {

        if (state.page_index == load_page.children.length - 2) return false;
        load_page.children[state.page_index].className = "page-item";
        state.page_index++;
        load_page.children[state.page_index].className = "page-item active";
        showOnePage(state.songs, (state.page_index - 1) * 10);
    }

    for (let i = 0; i < num; ++i) {

        const el_li = document.createElement("li");
        el_li.className = "page-item";
        const page_num = i + 1;

        if (page_num == 1) {
            el_li.className = "page-item active";
        }

        el_li.innerHTML = `<a class="page-link" href="#"> ${page_num} </a>`;
        load_page.insertBefore(el_li, load_page.children[load_page.children.length - 1]);
        el_li.addEventListener('click', (e) => {
            showOnePage(state.songs, (page_num - 1) * 10);
            load_page.children[state.page_index].className = "page-item";
            state.page_index = page_num;
            load_page.children[state.page_index].className = "page-item active";
        });
    }
}

const searchForSongs = (e) => {
    if (e.keyCode == 13) {
        const value = e.target.value;
        fetch("http://localhost:3000/search?keywords=" + value)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                const songs = data.result.songs;
                state.songs = songs;
                state.page_index = 1;
                const num_one_page = 10;
                console.log(songs);
                clearOriginSongs();
                page_containr.style.display = "none";
                if (songs != undefined) {
                    showOnePage(songs, 0, num_one_page);
                    showThePagination(songs.length / num_one_page);
                    page_containr.style.display = "flex";
                }
            }).catch(function (e) {
                console.log("Oops, error in search songs");
            });
    }
}

const func = () => {
    fetch("http://localhost:3000/search/hot")
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            const hotSongs = data.result.hots;
            for (let i = 0; i < hotSongs.length; ++i) {
                console.log(hotSongs[i].first)
            }
        }).catch(function (e) {
            console.log("Oops, error in hot songs");
        });
}

search_input.addEventListener("keydown", searchForSongs);