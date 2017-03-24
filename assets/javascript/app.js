var intervalId;
var trivia = {
    time: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    writeq: 1,
    questions: {
        q1: {
            q: "What was the most selling game in history?",
            a: "Wii Sports",
            c: ["Wii Sports", "Tetris", "Pong", "Super Mario Bros."],
            img: "assets/images/wiiSports.png"
        },
        q2: {
            q: "In what year was Sega Genesis released in North America?",
            a: "1989",
            c: ["1989", "1999", "1991", "1975"],
            img: "assets/images/segaGen.png"
        },
        q3: {
            q: "Which of the following video games takes place in a dystopian underwater city called Rapture?",
            a: "Bioshock",
            c: ["Bioshock", "Fallout 3", "God of War", "Half-Life"],
            img: "assets/images/bioshock.png"
        },
        q4: {
            q: "E. Honda, Dhalsim and Chun Li are all characters from what video game series?",
            a: "Street Fighter",
            c: ["Street Fighter", "Tekken", "Battletoads", "Mortal Kombat"],
            img: "assets/images/ryu.png"
        },
        q5: {
            q: "What classic beat-'em-up game featured brothers Billy Lee and Jimmy (also nicknamed Spike and Hammer)?",
            a: "Double Dragon",
            c: ["Double Dragon", "Smash Brothers", "Snow Brothers", "Ninja Gaiden"],
            img: "assets/images/doubleDrag.png"
        },
        q6: {
            q: "How many bits was the Super Nintendo Entertainment System?",
            a: "16",
            c: ["16", "8", "128", "64"],
            img: "assets/images/snes.png"
        },
        q7: {
            q: "What character do you play as in The Legend Of Zelda?",
            a: "Link",
            c: ["Link", "Zelda", "Gandolf", "Tingle"],
            img: "assets/images/link.png"
        }

    },
    start: function() {
        // debugger;
        trivia.writeToDiv(trivia.writeq);
        intervalId = setInterval(trivia.count, 1000);
    },
    stop: function() {
        clearInterval(intervalId);
    },
    count: function() {
        trivia.time--;
        $("#time").html("Time left: " + trivia.time);
        if (trivia.time === 0) {
            trivia.stop();
            trivia.unanswered++;
            trivia.buffer();
        }
    },
    oblength: function() {
        return (Object.keys(trivia.questions).length);
    },
    writeToDiv: function(i) {
        // debugger;
        var questions = $("<div>");
        questions.addClass("hideThis");
        var theQuestion = trivia.questions["q" + i].q;
        var pone = $("<p id='questions'>").text(theQuestion);
        questions.append(pone);
        var randomChoice = trivia.questions["q" + i].c.sort(function() {
            return 0.5 - Math.random();
        });
        for (var n = 0; n < randomChoice.length; n++) {
            var choice = randomChoice[n];
            var choices = $("<button>").text(choice);
            choices.addClass("options");
            choices.attr("data-name", randomChoice[n]);
            questions.append(choices);
            questions.append("<br>")
        }
        $("#mainContent").html(questions);
    },
    scorer: function() {
        var userguess = $(this).data("name");
        trivia.stop();
        if (userguess == trivia.questions["q" + trivia.writeq].a) {
            console.log("YEE");
            trivia.correct++;
            trivia.buffer();
        } else {
            console.log("NEE");
            trivia.incorrect++;
            trivia.buffer();
        }
    },
    buffer: function() {
        trivia.time = 30;
        $("#time").html("Time left: " + trivia.time);
        var imgname = trivia.questions["q"+trivia.writeq].img;
        $("#mainContent").html("<br><p>Answer: " + trivia.questions["q" + trivia.writeq].a + "</p><p>Correct: " + trivia.correct + "</p><p>Incorrect: " + trivia.incorrect + "</p><p>Unanswered: " + trivia.unanswered + "</p><br><img id='previewpic' src="+imgname+">");
        trivia.writeq++;
        if (trivia.writeq <= (trivia.oblength())) {
            setTimeout(trivia.start, 1000 * 3);
        } else {
            setTimeout(trivia.endgame, 1000 *3);
        }
    },
    endgame: function() {
        $("#title").html("<img id=endgamepic src='assets/images/thanks.jpg'>");
        $("#time").empty();
        $("#mainContent").html("<br><p>Total Scores!</p><p>Correct: " + trivia.correct + "</p><p>Incorrect: " + trivia.incorrect + "</p><p>Unanswered: " + trivia.unanswered + "</p>");
    }
};
window.onload = function() {
    // debugger;
    $("#start").click(function() {
        $("#start").hide();
        $("#time").html("Time left: " + trivia.time);
        trivia.start();
    });
    $("#mainContent").on("click", ".options", trivia.scorer);
};








// function myfunc(){
// 	console.log("hi!");
// 	if(true){
// 		setTimeout(myfunc,2000)
// 	}
// }

// myfunc();