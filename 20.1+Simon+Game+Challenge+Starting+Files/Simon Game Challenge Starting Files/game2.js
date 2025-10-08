/* Enhanced Simon Game - game2.js
 * Added features:
 *  - Input lock during sequence playback
 *  - High score persisted with localStorage
 *  - Restart button (no need for keypress after first load)
 *  - Sound toggle (mute/unmute)
 *  - Strict mode toggle (on mistake: restart from level 1 vs replay same level)
 *  - Sequence replay on non-strict mistake
 *  - Accessibility helpers (ARIA labels, focus management)
 *  - Haptic vibration feedback (if supported) for presses, flashes, success, and errors
 */

(function() {
  var buttonColours = ["red", "blue", "green", "yellow"]; // Available buttons

  var gamePattern = [];          // Sequence the game generates
  var userClickedPattern = [];   // Current user input sequence

  var started = false;           // Game started state
  var level = 0;                 // Current level (1-based for display)
  var acceptingInput = false;    // Whether user clicks should be processed
  var strictMode = false;        // Strict mode flag
  var soundEnabled = true;       // Sound enabled flag
  var highScore = 0;             // Highest level reached
  var vibrationEnabled = true;   // Enable/disable vibration feedback
  var vibrationSupported = typeof navigator !== 'undefined' && !!navigator.vibrate; // Feature detect

  // DOM references created lazily
  var $levelTitle = $("#level-title");
  var $uiPanel; // container for added controls

  // Load high score from localStorage if available
  try {
    var stored = localStorage.getItem("simonHighScore");
    if (stored) highScore = parseInt(stored, 10) || 0;
  } catch (e) { /* ignore storage errors */ }

  // Inject extra UI controls (idempotent)
  function ensureUI() {
    if ($uiPanel && $uiPanel.length) return; // already added
    $uiPanel = $(
      '<div id="game-controls" style="margin-top:16px; display:flex; gap:12px; flex-wrap:wrap; align-items:center; font-family:inherit;">' +
        '<button id="restart-btn" type="button">Restart</button>' +
        '<button id="sound-toggle" type="button">Sound: On</button>' +
        '<button id="strict-toggle" type="button">Strict: Off</button>' +
        '<span id="high-score" style="font-weight:600;">High Score: <span id="high-score-value">' + highScore + '</span></span>' +
      '</div>'
    );
    $levelTitle.after($uiPanel);

    // Wire buttons
    $("#restart-btn").on("click", function() { startOver(true); });
    $("#sound-toggle").on("click", function() {
      soundEnabled = !soundEnabled;
      $(this).text("Sound: " + (soundEnabled ? "On" : "Off"));
    });
    $("#strict-toggle").on("click", function() {
      strictMode = !strictMode;
      $(this).text("Strict: " + (strictMode ? "On" : "Off"));
      // Brief visual hint when switching modes
      flashBody(strictMode ? "#222" : "#444", 80);
      vibrate([20, 40, 20]);
    });
  }

  // Utility: flash body background color briefly
  function flashBody(color, dur) {
    var original = $("body").css("background-color");
    $("body").css("background-color", color);
    setTimeout(function() { $("body").css("background-color", ""); }, dur || 150);
  }

  // Vibrate helper (no-op if unsupported or disabled)
  function vibrate(pattern) {
    if (!vibrationEnabled || !vibrationSupported) return;
    try { navigator.vibrate(pattern); } catch (e) { /* ignore */ }
  }

  // Start / keypress binding remains for backwards compatibility
  $(document).on("keypress", function() {
    if (!started) {
      ensureUI();
      startGame();
    }
  });

  // Accessible labels for buttons (if markup lacks them)
  $(function() {
    buttonColours.forEach(function(col) {
      var $btn = $("#" + col);
      if ($btn.length) {
        if (!$btn.attr("aria-label")) {
          $btn.attr("role", "button").attr("tabindex", "0").attr("aria-label", col + " button");
        }
      }
    });
  });

  // Button click handler
  $(".btn").on("click", function() {
    if (!started || !acceptingInput) return; // ignore premature clicks

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  });

  // Main game start logic
  function startGame() {
    started = true;
    level = 0;
    gamePattern = [];
    nextSequence();
  }

  // Public restart (clear & start again)
  function startOver(triggeredByButton) {
    started = false;
    acceptingInput = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $levelTitle.text("Press A Key or Restart to Begin");
    if (triggeredByButton) {
      startGame();
    }
  }

  // Update high score if needed
  function updateHighScore() {
    if (level > highScore) {
      highScore = level;
      $("#high-score-value").text(highScore);
      try { localStorage.setItem("simonHighScore", String(highScore)); } catch (e) { /* ignore */ }
    }
  }

  // Generate next color & play sequence
  function nextSequence() {
    userClickedPattern = [];
    level++;
    updateHighScore();
    $levelTitle.text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playbackSequence();
  }

  // Replay full current sequence with timing
  function playbackSequence() {
    acceptingInput = false;
    var i = 0;
    var interval = setInterval(function() {
      var colour = gamePattern[i];
      animateFlash(colour);
      playSound(colour);
      i++;
      if (i >= gamePattern.length) {
        clearInterval(interval);
        // slight delay before accepting input
        setTimeout(function() { acceptingInput = true; }, 300);
      }
    }, 700); // controls playback pace
  }

  // Animate a single flash in sequence playback (distinct from user press)
  function animateFlash(colour) {
    var $btn = $("#" + colour);
    vibrate(15); // subtle feedback on sequence flash
    $btn.fadeOut(120).fadeIn(120);
  }

  function playSound(name) {
    if (!soundEnabled) return;
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play().catch(function() { /* ignore autoplay issues */ });
  }

  function animatePress(currentColour) {
    var $activeButton = $("#" + currentColour);
    $activeButton.addClass("pressed");
    vibrate(30); // user tap feedback
    setTimeout(function () { $activeButton.removeClass("pressed"); }, 100);
  }

  function checkAnswer(currentIndex) {
    if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
      // If user finished the whole sequence correctly
      if (userClickedPattern.length === gamePattern.length) {
        acceptingInput = false;
        vibrate([40, 30, 40]); // success pattern
        setTimeout(function() { nextSequence(); }, 800);
      }
    } else {
      handleMistake();
    }
  }

  function handleMistake() {
    playSound("wrong");
    vibrate([120, 60, 120]); // error pattern
    $("body").addClass("game-over");
    flashBody("#8B0000", 180);

    setTimeout(function () { $("body").removeClass("game-over"); }, 200);

    if (strictMode) {
      $levelTitle.text("Wrong! Strict Mode – Restarting...");
      setTimeout(function() { startGame(); }, 1200);
    } else {
      $levelTitle.text("Wrong! Replay Level " + level);
      userClickedPattern = []; // Clear user progress
      setTimeout(function() { playbackSequence(); }, 1500);
    }
  }

  // Initialize extra UI immediately so user sees controls before starting
  ensureUI();
  $levelTitle.text("Press A Key or Restart to Begin");

})();
