var soundd="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreRightWrist=0;
scoreLeftWrist=0;
function preload() {
    soundd=loadSound("music.mp3");
}

function setup() {
    canvas=createCanvas(400, 400);
    canvas.position(440, 170);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 500, 400);
    if (scoreRightWrist>0) {
        if (rightWristY>0 && rightWristY<=100) {
            document.getElementById("h41").innerHTML="Velocidade= 0.5x";
            soundd.rate(0.5);
        }
        else if (rightWristY>100 && rightWristY<=200) {
            document.getElementById("h41").innerHTML="velocidade= 1x";
            soundd.rate(1);
        }
        else if (rightWristY>200 && rightWristY<=300) {
            document.getElementById("h41").innerHTML="velocidade= 1.5x";
            soundd.rate(1.5);
        }
        else if (rightWristY>300 && rightWristY<=350) {
            document.getElementById("h41").innerHTML="velocidade= 2x";
            soundd.rate(2);
        }
        else if (rightWristY>350) {
            document.getElementById("h41").innerHTML="velocidade= 2.5x";
            soundd.rate(2.5);
        }
    }
    if (scoreLeftWrist>0) {
        InNumberleftWristY=Number(leftWristY);
        remove_decimals=floor(InNumberleftWristY);
        volume=(remove_decimals/400);
        document.getElementById("h42").innerHTML="Volume= "+volume;
        soundd.setVolume(volume);
    }
}

function play() {
    soundd.play();
    soundd.setVolume(1);
    soundd.rate(1);
}

function modelLoaded() {
    console.log('PoseNet is initialized');
}

function gotPoses(results) {
    if (results.length>0) {
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist= "+scoreRightWrist+"scoreLeftWrist= "+scoreLeftWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX= "+leftWristX+"leftWristY= "+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX= "+rightWristX+"rightWristY= "+ rightWristY);
    }
}