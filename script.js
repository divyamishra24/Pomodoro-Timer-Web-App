 let timerBtn = document.getElementById('timer')
        let startBtn = document.getElementById('start');
        let resetBtn = document.getElementById('reset');
        let pauseBtn = document.getElementById('pause');
        let time = 25 * 60;
        let interval = null;

        let isRunning = false;


        startBtn.addEventListener('click', function () {
            if (interval !== null)
                return;

            isRunning = true;
            saveState();
            interval = setInterval(function () {
                if (time > 0) {
                    time--;
                    updateTimer();

                } else {
                    clearInterval(interval);
                    interval = null;
                    isRunning = false;
                    saveState();
                    startBtn.querySelector('span').textContent = 'Start';
                    alert("Yay You completed Pomodoro")
                }
            }, 1000);
        });
        resetBtn.addEventListener("click", function () {
            clearInterval(interval);
            interval = null;
            time = 25 * 60;
            isRunning = false;
            updateTimer();
            saveState();
            startBtn.querySelector('span').textContent = 'Start';
        });

        const progressCircle = document.getElementById("progress");
        const totalTime = 25 * 60;
        const radius = 100;
        const circumference = 2 * Math.PI * radius;

        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = 0;

        function updateTimer() {
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;

            timerBtn.textContent =
                String(minutes).padStart(2, '0') + ":" +
                String(seconds).padStart(2, '0');

            let progress = time / totalTime;
            progressCircle.style.strokeDashoffset =
                circumference * (1 - progress);
        }

        pauseBtn.addEventListener('click', function () {
            if (interval !== null) {
                clearInterval(interval);
                interval = null;
                isRunning = false;
                saveState();
                startBtn.querySelector('span').textContent = 'Resume';
            }
        })

        function saveState() {
            localStorage.setItem('pomodoroTime', time);
            localStorage.setItem('pomodoroRunning', isRunning);
        }

        function loadState() {
            const savedTime = localStorage.getItem('pomodoroTime');
            const savedRunning = localStorage.getItem('pomodoroRunning');

            if (savedTime !== null) {
                time = parseInt(savedTime);
                updateTimer();
            }

            if (savedRunning === 'true') {
                startBtn.querySelector('span').textContent = 'Resume';
            }
        }

        loadState();

