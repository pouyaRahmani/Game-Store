
function togglePanel() {
  let panel = document.querySelector("#panel")
  if (panel.className =='panel') {
    panel.classList.replace("panel", "panel-min");
    active_user_name_arrow(0);
    activeTextMenuBtn(0);
    activeUserDetails(0);
  } else {
    panel.classList.replace("panel-min", "panel");
    active_user_name_arrow(1);
    activeTextMenuBtn(1);
  }
}
function activeTextMenuBtn(flag) {
  let btn_menu_items = document.querySelectorAll(".menu-btns .item");
  let item_texts = document.querySelectorAll(".menu-btns .item span");
  if (flag) {
    btn_menu_items.forEach(ele => {
      ele.style.justifyContent = "flex-start";
      ele.style.paddingRight = "30px";
    });
    item_texts.forEach(ele => {
      ele.style.display = "block";
    });
  } else {
    btn_menu_items.forEach(ele => {
      ele.style.justifyContent = "center";
      ele.style.paddingRight = "0px";
    });
    item_texts.forEach(ele => {
      ele.style.display = "none";
    });
  }
}

function toggleUserDetails() {
  let userDetails = document.querySelector(".user-info .details");
  let arrow = document.querySelector(".user-info .img-name i");
  if (userDetails.style.display != "none") {
    userDetails.style.display = "none";
    arrow.className = "fas fa-angle-down";
  } else {
    userDetails.style.display = "block";
    arrow.className = "fas fa-angle-up";
  }
}

function activeUserDetails(flag) {
  let userDetails = document.querySelector(".user-info .details");
  let arrow = document.querySelector(".user-info .img-name i");
  if (flag) {
    userDetails.style.display = "block";
    arrow.className = "fas fa-angle-up";
  } else {
    userDetails.style.display = "none";
    arrow.className = "fas fa-angle-down";
  }
}

function active_user_name_arrow(flag) {
  let imgNameBox = document.querySelector(".user-info .img-name");
  let name = document.querySelector(".user-info .img-name .name");
  let arrow = document.querySelector(".user-info .img-name i");
  if (flag) {
    name.style.display = "block";
    arrow.style.display = "block";
    imgNameBox.style.justifyContent = "space-between";
  } else {
    name.style.display = "none";
    arrow.style.display = "none";
    imgNameBox.style.justifyContent = "center";
  }
}

var ctx = document.getElementById("myChart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: ["بازی 5", "بازی4", "بازی 3", "بازی 2", "بازی 1"],
          datasets: [
            {
              label: "",
              data: [12, 19, 3, 5, 2],
              backgroundColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            
          }
        }
      });

      const wheelCanvas = document.getElementById('wheel');
const wheelCtx = wheelCanvas.getContext('2d');
const segments = ['بازی 1', 'بازی 2', 'بازی 3', 'بازی 4', 'بازی 5'];
const colors = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)"
];
const segmentAngle = (2 * Math.PI) / segments.length;

function drawWheel() {
  for (let i = 0; i < segments.length; i++) {
    const startAngle = i * segmentAngle;
    const endAngle = startAngle + segmentAngle;

    wheelCtx.beginPath();
    wheelCtx.moveTo(200, 200); // Center of the wheel
    wheelCtx.arc(200, 200, 150, startAngle, endAngle);
    wheelCtx.closePath();
    wheelCtx.fillStyle = colors[i];
    wheelCtx.fill();

    // Draw the text
    wheelCtx.save();
    wheelCtx.translate(200, 200);
    wheelCtx.rotate(startAngle + segmentAngle / 2);
    wheelCtx.fillStyle = 'white';
    wheelCtx.fillText(segments[i], 60, 0);
    wheelCtx.restore();
  }
}

drawWheel();

let spinning = false;
const pointsForSegments = [10, 20, 30, 40, 50]; // Define points for each segment

function spinWheel() {
  if (spinning) return;
  spinning = true;

  const spins = Math.floor(Math.random() * 10) + 10; // Random spins between 10 and 20
  const spinAngle = (Math.random() * 2 * Math.PI) + (spins * 2 * Math.PI); // Total angle to rotate

  let currentAngle = 0;
  const spinDuration = 4000; // Spin duration in milliseconds
  const startTime = performance.now();

  function animate() {
    const currentTime = performance.now();
    const elapsedTime = currentTime - startTime;

    if (elapsedTime < spinDuration) {
      currentAngle = (spinAngle * (elapsedTime / spinDuration)) % (2 * Math.PI);
      wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
      drawWheel();
      wheelCtx.save();
      wheelCtx.translate(200, 200);
      wheelCtx.rotate(currentAngle);
      wheelCtx.translate(-200, -200);
      drawWheel();
      wheelCtx.restore();
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      const finalAngle = currentAngle % (2 * Math.PI);
      const segmentIndex = Math.floor((finalAngle + (Math.PI / segments.length)) / segmentAngle) % segments.length;

      // Add points to the chart data based on the selected segment
      const pointsToAdd = pointsForSegments[segmentIndex];
      myChart.data.datasets[0].data[segmentIndex] += pointsToAdd; // Update chart data
      myChart.update(); // Refresh the chart

      alert(`شما ${segments[segmentIndex]} را انتخاب کردید و ${pointsToAdd} امتیاز به امتیاز شما اضافه شد!`);
    }
  }

  animate();
}

function toggleWheel() {
  const wheelContainer = document.querySelector('.wheel-container');
  wheelContainer.style.display = (wheelContainer.style.display === 'none') ? 'block' : 'none';
}

