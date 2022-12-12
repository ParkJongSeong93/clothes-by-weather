lat = 37.5666805;
lon = 126.9784147;
let date = new Date();

let year = date.getFullYear();
let month = ('0' + (date.getMonth() + 1)).slice(-2);
let day = ('0' + date.getDate()).slice(-2);

let hour = ('0' + (date.getHours())).slice(-2);
let minute = ('0' + date.getMinutes()).slice(-2);
if (minute <= 40) {
    hour = ('0' + (hour - 1)).slice(-2);
    minute = 59;
}

now_time = hour + minute;

baseDate = year + month + day;

(function CurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            lat = position.coords.latitude;
            lon = position.coords.longitude;
        });
    } else {
        alert("현재 위치를 알 수 없습니다")
    }
})();

(adsbygoogle = window.adsbygoogle || []).push({});

function feelsLike(t, v) {
    v = v * 60 * 60 / 1000;
    if (v == 0) { v = 0.1 };
    S = 13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16);
    return S;
}

function clothStyle(temp) {
    if (temp >= 25) {//반팔, 반바지
        $(function () {
            $('#sleeve_left').css('visibility', 'hidden');
            $('#sleeve_right').css('visibility', 'hidden');
            $('#tr_left').css('height', '70px');
            $('#tr_right').css('height', '70px');
            $('#outerDown').css('visibility', 'hidden');
            $('#coat').css('visibility', 'hidden');
            $('p').empty();
            $('p').append(`더운 날씨에요</br>얇은 반팔, 반바지를 추천드려요`);
        })
    } else if (temp >= 19) {//반팔, 7부바지
        $(function () {
            $('#sleeve_left').css('visibility', 'hidden');
            $('#sleeve_right').css('visibility', 'hidden');
            $('#tr_left').css('height', '110px');
            $('#tr_right').css('height', '110px');
            $('#outerDown').css('visibility', 'hidden');
            $('#coat').css('visibility', 'hidden');
            $('p').empty();
            $('p').append(`약간 더운 날씨에요</br>반팔, 7부 바지를 추천드려요</br>얇은 가디건도 괜찮아요`);
        })
    } else if (temp >= 14) {//긴바지, 맨투맨
        $(function () {
            $('#sleeve_left').css({
                'visibility': 'visible',
                'background': 'green',
                'left': '190px',
                'width': '25px'
            });
            $('#sleeve_right').css({
                'visibility': 'visible',
                'background': 'green',
                'left': '85px',
                'width': '25px'
            });
            $('#tr_left').css('height', '137px');
            $('#tr_right').css('height', '137px');
            $('#outerDown').css('visibility', 'hidden');
            $('#coat').css('visibility', 'hidden');
            $('p').empty();
            $('p').append(`맨투맨, 긴바지를 추천드려요</br>니트나 얇은 가디건도 괜찮아요`);
        })
    } else if (temp >= 8) {//긴바지, 코트
        $(function () {
            $('#sleeve_left').css({
                'visibility': 'visible',
                'background': 'rgb(197, 164, 121)',
                'left': '190px',
                'width': '25px'
            });
            $('#sleeve_right').css({
                'visibility': 'visible',
                'background': 'rgb(197, 164, 121)',
                'left': '85px',
                'width': '25px'
            });
            $('#outerDown').css('visibility', 'hidden');
            $('#coat').css('visibility', 'visible');
            $('#tr_left').css('height', '137px');
            $('#tr_right').css('height', '137px');
            $('p').empty();
            $('p').append(`조금 쌀쌀한 날씨에요</br>후드티나 후리스를 추천드려요</br>코트나 가디건도 괜찮아요`);
        })
    } else {//긴바지, 패딩
        $(function () {
            $('#sleeve_left').css({
                'visibility': 'visible',
                'background': 'rgb(228, 194, 0)',
                'left': '185px',
                'width': '40px'
            });
            $('#sleeve_right').css({
                'visibility': 'visible',
                'background': 'rgb(228, 194, 0)',
                'left': '75px',
                'width': '40px'
            });
            $('#tr_left').css('height', '137px');
            $('#tr_right').css('height', '137px');
            $('#coat').css('visibility', 'hidden');
            $('#outerDown').css('visibility', 'visible');
            $('p').empty();
            $('p').append(`추운 날씨에요</br>패딩을 추천드려요</br>장갑이나 귀마개도 좋아요`);
        })
    }
}

function weather() {

    var nx = dfs_xy_conv(lat, lon)['x'];
    var ny = dfs_xy_conv(lat, lon)['y'];

    var url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'X081vRnr%2ByrA3sAVqHsY9tExB9Pjp3wRNoJ29v9xmEFB4oF25Iz71SJ1pe6ZXEwkx2P%2FdL1%2FSxEBQPrHWUS6Wg%3D%3D'; /*ServiceKey*/
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(baseDate);
    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(now_time);
    queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(nx);
    queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(ny);

    fetch(url + queryParams).then(res => res.json()).then((data) => {
        let items = data['response']['body']['items']['item'];
        for (let i = 0; i < items.length; i++) {
            if (items[i]['category'] == 'T1H') {
                T = (items[i]['obsrValue']);
            }
            if (items[i]['category'] == 'WSD') {
                V = (items[i]['obsrValue']);
            }
        }
        console.log('T = ', T, 'V = ', V, 'feelsLike = ', feelsLike(T, V));
        $('#temp').empty();
        $('h1').css('font-size', '50px');
        $('#feelsLike').empty();
        let temp_html = `${T} &#8451;`
        $('#temp').append(temp_html);
        let feelsLike_html = `체감온도  ${feelsLike(T, V).toFixed(2)} &#8451;
                                    <h2 class = "warning">위치 동의 후 2초 뒤의 데이터가 정확해요<br/>개발자를 클릭하면 데이터를 새로고침할 수 있어요</h2>`
        $('#feelsLike').append(feelsLike_html);
        $('.p').empty();
        clothStyle(feelsLike(T, V));
    })
};

var RE = 6371.00877;
var GRID = 5.0;
var SLAT1 = 30.0;
var SLAT2 = 60.0;
var OLON = 126.0;
var OLAT = 38.0;
var XO = 43;
var YO = 136;

function dfs_xy_conv(v1, v2) {
    var DEGRAD = Math.PI / 180.0;
    var RADDEG = 180.0 / Math.PI;

    var re = RE / GRID;
    var slat1 = SLAT1 * DEGRAD;
    var slat2 = SLAT2 * DEGRAD;
    var olon = OLON * DEGRAD;
    var olat = OLAT * DEGRAD;

    var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
    var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = re * sf / Math.pow(ro, sn);
    var rs = {};
    rs['lat'] = v1;
    rs['lng'] = v2;
    var ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
    ra = re * sf / Math.pow(ra, sn);
    var theta = v2 * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;
    rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

    return rs;
}