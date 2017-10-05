var pages = ["main", "about", "calendar", "contact", "events", "forms", "news", "pictures", "not"];
var curPage = 0;

var id = 61738;
var key = 'u9G1Rt2PsBxbSDyO8i61w-gPXXaEQetClGfeq7v4mkM';
var admins = {};
var adminPics = [];
$.get('https://api.engage.nyu.edu/api/v01/orgs/' + id + '?key=' + key, function (responseText) {
    console.log(responseText);
    //Add mission statement to homepage
    document.getElementsByClassName("mission")[0].innerText = responseText["profile_responses"][0]["data"];
    document.getElementsByClassName("meetings")[0].innerText = responseText["profile_responses"][1]["data"];

    document.getElementsByClassName("description")[0].innerText = responseText["description"];

    var contacts = [];

    getData(contacts, "President", responseText);
    getData(contacts, "Vice President", responseText);
    getData(contacts, "Treasurer", responseText);
    getData(contacts, "Secretary", responseText);
    getData(contacts, "Webmaster", responseText);

    var cons = {};

    for(var i = 0; i < contacts.length; i ++) {
        var pos = "";
        if(cons[contacts[i]["FN"] + " " + contacts[i]["LN"]]["Pos"]) {
            pos = cons[contacts[i]["FN"] + " " + contacts[i]["LN"]]["Pos"] + ", " + contacts[i]["Pos"];
        } else {
            pos = contacts[i]["Pos"];
        }
        cons[contacts[i]["FN"] + " " + contacts[i]["LN"]] = {"Pos": pos, id: contacts[i]["ID"]};
    }

    console.log(cons);

    console.log("CONTACTS");
    console.log(contacts);
});

function getData(arr, position, responseText) {
    var obj = {};

    var dontAsk = [];
    dontAsk.push(obj);

    for (var i = 0; i < responseText["profile_responses"].length; i++) {
        if (responseText["profile_responses"][i]["element"]["name"] === (position + " First Name")) {
            var multiple = responseText["profile_responses"][i]["data"].split(" ");
            while (multiple.length > dontAsk.length) {
                dontAsk.push({});
            }
            for (var j = 0; j < multiple.length; j++) {
                dontAsk[j]["FN"] = multiple[j];
            }
        }
        if (responseText["profile_responses"][i]["element"]["name"] === (position + " Last Name")) {
            var multiple = responseText["profile_responses"][i]["data"].split(" ");
            console.log(multiple);
            while (multiple.length > dontAsk.length) {
                dontAsk.push({});
            }
            for (var j = 0; j < multiple.length; j++) {
                dontAsk[j]["LN"] = multiple[j];
            }
        }
        if (responseText["profile_responses"][i]["element"]["name"] === (position + " Net ID")) {
            var multiple = responseText["profile_responses"][i]["data"].split(" ");
            console.log(multiple);
            while (multiple.length > dontAsk.length) {
                dontAsk.push({});
            }
            for (var j = 0; j < multiple.length; j++) {
                dontAsk[j]["ID"] = multiple[j];
                dontAsk[j]["Pos"] = position;
            }
        }
    }

    for (var i = 0; i < dontAsk.length; i++) {
        arr.push(dontAsk[i]);
    }

}

$(function () {
    console.log("ready!");

});

window.addEventListener('load',
    function () {

        (function () {
            var redirect = sessionStorage.redirect;
            delete sessionStorage.redirect;
            if (redirect && redirect !== location.href) {
                var check = redirect.replace("http://nyuchess.com/", "");
                if (pages.indexOf(check) < 0) {
                    check = "not";
                    redirect = "404"
                }
                history.replaceState(null, "", redirect);
                document.getElementsByClassName(pages[curPage])[0].style.display = "none";
                document.getElementsByClassName(check)[0].style.display = "block";
                if (check !== "not") {
                    onPage(pages.indexOf(check));
                }
                curPage = pages.indexOf(check);
            }
            else {
                $(".main").fadeIn("slow", function () {
                });
                onPage(0);
            }
        })();

        console.log("trying click");

        document.getElementsByClassName("aboutBar")[0].addEventListener('click', function () {
            if (location.href !== "http://nyuchess.com/about") {
                history.pushState(null, '', '/about');
                loadPage(1);
            }
        });

        document.getElementsByClassName("calendarBar")[0].addEventListener('click', function () {
            if (location.href !== "http://nyuchess.com/calendar") {
                history.pushState(null, '', '/calendar');
                loadPage(2);
            }
        });

        document.getElementsByClassName("contactBar")[0].addEventListener('click', function () {
            if (location.href !== "http://nyuchess.com/contact") {
                history.pushState(null, '', '/contact');
                loadPage(3);
            }
        });

        document.getElementsByClassName("eventsBar")[0].addEventListener('click', function () {
            if (location.href !== "http://nyuchess.com/events") {
                history.pushState(null, '', '/events');
                loadPage(4);
            }
        });

        document.getElementsByClassName("formsBar")[0].addEventListener('click', function () {
            if (location.href !== "http://nyuchess.com/forms") {
                history.pushState(null, '', '/forms');
                loadPage(5);
            }
        });

        for (var i = 0; i < document.getElementsByClassName("mainBar").length; i++) {
            document.getElementsByClassName("mainBar")[i].addEventListener('click', function () {
                if (location.href !== "http://nyuchess.com/") {
                    history.pushState(null, '', '/');
                    loadPage(0);
                }
            });
        }

        document.getElementsByClassName("newsBar")[0].addEventListener('click', function () {
            if (location.href !== "http://nyuchess.com/news") {
                history.pushState(null, '', '/news');
                loadPage(6);
            }
        });

        document.getElementsByClassName("picturesBar")[0].addEventListener('click', function () {
            if (location.href !== "http://nyuchess.com/pictures") {
                history.pushState(null, '', '/pictures');
                loadPage(7);
            }
        });

        window.onpopstate = function () {
            var toPage = location.href;
            var ext = toPage.replace("http://nyuchess.com/", "");
            if (ext === "") {
                ext = "main";
            }
            if (ext === "404") {
                ext = "not";
            }
            loadPage(pages.indexOf(ext));
        };

        console.log("Setting up click");

        console.log("Setting up events");

        var token = "EAACBHKPzZBGMBABJoOcpDl0QnT0LhzGbC6gm6WGZB9n8uGS0aIB1ZAtwGfHuU1b18pzqsg9NLTytgVBS34RHjtyniwAXY6ZAcwi1ZBa5doLyRdX02wG8VeqroNPcPTYm80ZCeDg6Jf1yzHdr8Rw2b6dIfwDMRYhBQZD";

        $.get('https://graph.facebook.com/v2.10/194680683893776/events?access_token=' + token, function (responseText) {
            var max = 5;
            if (responseText["data"].length < 5) {
                max = responseText["data"].length;
            }
            createEvent(responseText, 0, max);
        });

        var pictures = "graph.facebook.com/v2.10/2024220797864412/picture?access_token=" + token + "&type=large";

        console.log("RESPONSE");

        getAdmins('https://graph.facebook.com/v2.10/194680683893776/members?access_token=' + token);

        console.log(admins);

        function roll() {
            return Math.floor((Math.random() * 20) + 1);
        }

        function getAdmins(url) {
            $.get(url, function (responseText) {
                for (var i = 0; i < responseText["data"].length; i++) {
                    if (responseText["data"][i]["administrator"]) {
                        admins[responseText["data"][i]["name"]] = responseText["data"][i]["id"];
                    }
                }
                if (responseText["paging"]["next"]) {
                    getAdmins(responseText["paging"]["next"]);
                }
            });
        }

        function createEvent(responseText, i, max) {
            document.getElementsByClassName("events")[0].removeChild(document.getElementsByClassName("events")[0].lastChild);
            for (i; i < max; i++) {
                var event = document.createElement('div');
                event.className = "event";

                var pic = document.createElement('div');
                pic.className = "eventPic";
                pic.style.background = "url(../pictures/eventImages/" + roll() + ".jpg) no-repeat";

                var info = document.createElement('div');
                info.className = "eventInfo";

                var title = document.createElement('div');
                title.className = "eventTitle text-center";
                title.textContent = responseText["data"][i]["name"];

                var link = document.createElement('a');
                link.href = "https://www.facebook.com/events/" + responseText["data"][i]["id"];
                link.target = "_blank";
                link.appendChild(title);

                var desc = document.createElement('div');
                desc.className = "eventDesc";
                if (desc.textContent = responseText["data"][i]["place"]) {
                    desc.textContent = responseText["data"][i]["place"]["name"];
                } else {
                    desc.textContent = "No place announced!";
                }
                if (responseText["data"][i]["start_time"]) {
                    desc.textContent += " " + responseText["data"][i]["start_time"] + "\r\n\r\n";
                } else {
                    desc.textContent += "No time announced!\n\n";
                }
                if (responseText["data"][i]["description"]) {
                    desc.textContent += responseText["data"][i]["description"];
                } else {
                    desc.textContent += "No description available!";
                }

                info.appendChild(link);
                info.appendChild(desc);
                event.appendChild(pic);
                event.appendChild(info);

                if (i === max - 1) {
                    event.style.marginBottom = "0";
                }
                event.id = "fadeIn";
                document.getElementsByClassName("events")[0].appendChild(event);
                $("#fadeIn").fadeIn("fast", function () {
                });
                event.id = "";
            }

            console.log(document.getElementsByClassName("events")[0].childNodes.length);

            if (document.getElementsByClassName("events")[0].childNodes.length < responseText["data"].length - 1) {
                console.log("MAKING DIV");
                var div = document.createElement("div");
                document.getElementsByClassName("events")[0].lastChild.style.marginBottom = "4vw";
                div.className = "loadMore text-center";
                div.innerText = "Load Older Posts";
                div.addEventListener('click', function () {
                    $.get('https://graph.facebook.com/v2.10/194680683893776/events?access_token=' + token, function (responseText) {
                        var start = document.getElementsByClassName("events")[0].childNodes.length - 1;
                        var max = Math.min(start + 2, responseText["data"].length - 1);
                        console.log("click click");
                        createEvent(responseText, start, max);
                    });
                });
                document.getElementsByClassName("events")[0].appendChild(div);
            }
        }

    }, false);

function loadPage(x) {
    console.log("fading out page");
    disable();
    $("." + pages[curPage]).fadeOut("slow", function () {
        offPage(curPage);
        onPage(x);
        $("." + pages[x]).fadeIn("slow", function () {
            curPage = x;
            enable();
        });
    });
}

function disable() {
    console.log("disabling");
    $('.topBar').css("pointer-events", "none");//disabled buttons
}

function enable() {
    console.log("activating");
    $('.topBar').css("pointer-events", "auto");//enabled buttons
}

function offPage(x) {
    $('.' + pages[x] + "Bar").css("border-color", "#333");
    console.log("turning off " + '.' + pages[x] + "Bar");
}

function onPage(x) {
    $('.' + pages[x] + "Bar").css("border-color", "white");
}