var app = new Vue({
    el: '#player',
    data: {
        query: "",
        musicList: [],
        musicUrl: '',
        coverUrl: '',
        hotComments: [],
        person: '',
        isPlaying: false,
        mvUrl: '',
        //遮罩层
        isShow: false,
    },
    methods: {

        //搜索歌曲接口"https://autumnfish.cn/search?keywords="
        //播放音乐接口https://autumnfish.cn/song/url
        searchMusic: function () {
            var that = this
            axios.get("http://musicapi.leanapp.cn/search?keywords=" + this.query)
                .then(function (response) {
                    console.log(response.data.result.songs[0].album.artist.img1v1Url);
                    console.log(response);
                    that.musicList = response.data.result.songs;

                }, function (err) {
                    console.log(err);
                })
        },

        playMusic: function (musicId) {
            var that = this
            console.log(musicId);
            // 获取歌曲地址
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
                .then(function (response) {
                    console.log(response.data.data[0].url);
                    that.musicUrl = response.data.data[0].url
                });
            //获取封面
            axios.get('https://autumnfish.cn/song/detail?ids=' + musicId).then(response => {
                // console.log(response)
                // 设置封面
                that.coverUrl = response.data.songs[0].al.picUrl
            }) //获取热门评论
            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + musicId).then(response => {
                // console.log(response)
                // 保存热门评论
                console.log(response.data.hotComments);
                this.hotComments = response.data.hotComments
            })


        },
        play: function () {
            var that = this
            console.log('play');
            that.isPlaying = true
            console.log(that.isPlaying);

        },
        pause: function () {
            var that = this
            console.log('pause');
            that.isPlaying = false
            console.log(that.isPlaying);
        },
        playMV: function (mvid) {

            var that = this
            axios.get('https://autumnfish.cn/mv/url?id=' + mvid)
                .then(function (response) {
                    console.log(response.data.data.url);
                    that.isShow = true
                    that.mvUrl = response.data.data.url
                }, function (error) {

                })
        },
        hidden() {
            this.isShow = false;
            this.mvUrl = ''
        }
    }
})