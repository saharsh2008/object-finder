img = "";
status = "";
objects = [];
objectName = ""

function preload() {
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model is loaded!");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {    
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {

            object = objects[i].label;

            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#d62929");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 5, objects[i].y + 12);
            noFill();
            stroke("#d62929");
            objectName = document.getElementById("object-name").value;
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (object == objectName) {
                document.getElementById("object-found").innerHTML = "Object Found! Look Around!"
                console.log(objectName)
                console.log(object)
            } else {
                document.getElementById("object-found").innerHTML = "Object not Found!"
                console.log(objectName)
            }
        }
    }
}