var video;

var poseNet, osc, fft;

var rwX = 0,
  rwY = 0,
  lwX = 0,
  lwY = 0,
  reX = 0,
  reY = 0,
  leX = 0,
  leY = 0;

function setup() {
  createCanvas(400, 400);

  video = createCapture(VIDEO);

  video.hide();

  poseNet = ml5.poseNet(video, modelReady);

  poseNet.on("pose", gotPoses);

  osc = new p5.TriOsc(); // set frequency and type

  osc.amp(0.5);

  fft = new p5.FFT();

  osc.start();
}

function modelReady() {
  console.log("Model Ready");
}

function gotPoses(poses) {
  console.log(poses);

  if (poses.length > 0) {
    lwX = poses[0].pose.keypoints[9].position.x - 160;

    lwY = poses[0].pose.keypoints[9].position.y;

    rwX = poses[0].pose.keypoints[10].position.x - 160;

    rwY = poses[0].pose.keypoints[10].position.y;

    leX = poses[0].pose.keypoints[7].position.x;

    leY = poses[0].pose.keypoints[7].position.y;

    reX = poses[0].pose.keypoints[8].position.x;

    reY = poses[0].pose.keypoints[8].position.y;

    // accL = poses[0].pose.keypoints[0].position.x-160;

    // accR = poses[0].pose.keypoints[0].position.y;

    // console.log(poses[0].pose.keypoints[0].score);
  }
}

function draw() {
  background(220);

  image(video, 0, 0, height, width);

  // fill(255, 0, 0);

  // ellipse(lwX, lwY, 20);

  // ellipse(rwX, rwY, 20);

  var lengF = dist(lwX, lwY, rwX, rwY);
  var lengA = dist(leX, leY, reX, reY);
  console.log(lengA);
  console.log(lengF);

  // ellipse(accL, accR, 20);
  var freq = map(lengF, 0, width, 40, 880);
  osc.freq(freq);
  var amp = map(lengA, 0, height, 1, 0.01);
  osc.amp(0.5);
}
