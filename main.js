// ——————————————————————————————————————————————————————————— CORE

const rootTag = document.querySelector(':root')
const html = document.querySelector('html')
const bodyTag = document.querySelector('body')

// ——————————————————————————————————————————————————————————— MOBILE CHECKER

let isMobile = false
let isTablet = false
let isSmallDevice = false

const checkMobile = () => {
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) isMobile = true;})(navigator.userAgent||navigator.vendor||window.opera);
}

const checkTablet = () => {
  let iPad = false
  let tablet = false
  
  if (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform)) {
    iPad = true
  }
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent)) {
    tablet = true
  }
  if (iPad || tablet) {
    isTablet = true
  }
}

const checkSmallDevice = () => {
  if (window.innerWidth <= 1050 || window.innerHeight <= 700) {
    isSmallDevice = true
  }
}

checkMobile()
checkTablet()
checkSmallDevice()

window.addEventListener ('resize', () => {
  checkMobile()
  checkTablet()
  checkSmallDevice()
})

console.log(`isMobile = ${isMobile} | isTablet = ${isTablet} | isSmallDevice = ${isSmallDevice}`)

if (isMobile) {
  bodyTag.classList.add('mobile')
}

// ——————————————————————————————————————————————————————————— MOBILE VIEWPORT

const setMobileVh = () => {
  rootTag.style.setProperty('--vh', `${window.innerHeight}px`)
}

if (isMobile || isTablet) {
  setMobileVh()
  // window.addEventListener ('resize', setMobileVh)
}
  
// ——————————————————————————————————————————————————————————— HEADER

const headerTag = document.querySelector('#ticker')
let headerText = '************ Beef Worldwide ************ Studio now live! ************ Beef Worldwide ************'
let n = 0

const headerTicker = () => {
  n += 1
  if (n >= headerText.length - 40) { n = 0 }
  headerTag.innerHTML = headerText.substring(n, 40 + n)
}

window.setInterval(headerTicker, 800)

// ——————————————————————————————————————————————————————————— TIME

const timeTags = document.querySelectorAll('#timeLDN, #timeAKL, #timeCDMX')

const setTime = i => {
  let timezone = timeTags[i].dataset.timezone
  let now = luxon.DateTime.now().setZone(timezone)

  let h = now.toFormat('HH')
  let m = now.toFormat('mm')

  return `${h}:${m}`
}

timeTags.forEach((time, i) => {
  time.innerHTML = setTime(i)

  window.setInterval(function() {
    setTime(i)
  }, 1000)
})

// ——————————————————————————————————————————————————————————— LAUNCH

const launchBar = document.querySelector('#launchBar')
const launchDays = document.querySelector('#launchDays')

const unloaded = '□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□'
const loaded = '■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■'
let t = 0
let blinked = false
let blinker

const launchDate = luxon.DateTime.fromISO("2026-02-16T12:00")
// const startDate = luxon.DateTime.fromISO("2026-01-19T12:00")
const startDate = luxon.DateTime.fromISO("2026-01-01T12:00")

const setLaunch = () => {
  // Set now
  let now = luxon.DateTime.now().setZone('Europe/London')

  // Set days from launch
  let d = Math.round(launchDate.diff(startDate, 'days').values.days)
  if (d < 10) {
    launchDays.innerHTML = `0${d}`
  } else {
    launchDays.innerHTML = `${d}`
  }

  // Get ratio from launch
  let ratio = (now.ts - startDate.ts)/(launchDate.ts - startDate.ts)
  console.log (`Launch at ${Math.round(ratio * 100)}%`)

  // Work out percentage of string
  let n = Math.round(unloaded.length * ratio)

  // Repeat over loadbar, changing one square at a time
  window.onload = () => {
    for (let i = 0; i < (n + 1); i++) {
      t += 100
      setTimeout(() => {
        if (i < n) {
          launchBar.innerHTML = loaded.substring(0, i) + unloaded.substring(i)
        } else {
          launchBar.innerHTML = loaded.substring(0, i) + `<span class='blink'>□</span>` + unloaded.substring(i + 1)
          blinker = document.querySelector('.blink')
          window.setInterval(() => {
            if (blinked) {
              blinker.innerHTML = '□'
              blinked = false
            } else {
              blinker.innerHTML = '■'
              blinked = true
            }
          }, 800)
        }
      }, t)
    }
  }

}

setLaunch()

// ——————————————————————————————————————————————————————————— TWITCH

const introTag = document.querySelector('.intro h1')
let textSpans, textAmount
let twitchMax = 10
let twitchMin = 4
let twitchRot = 45

const twitchRatio = 0.25
const twitchStagger = 30
const twitchHold = 150

let idleTimer
const idleTime = 12000

let wordSplit = t => {
  o = t
  t = t.textContent.split(' ')
  t = '<span>' + t.join('</span> <span>') + '</span>'
  o.innerHTML = t
}

let charSplit = t => {
  o = t
  t = t.textContent.split('')
  t = '<span>' + t.join('</span><span>') + '</span>'
  o.innerHTML = t
}

const twitch = span => {
  span.classList.add('twitch')
  let x = Math.random()
  // span.style.transform = `scaleY(${(Math.random() * (twitchMax - twitchMin)) + twitchMin}) 
  //                         scaleX(${(Math.random() * ((twitchMax / 2) - twitchMin)) + twitchMin}) 
  //                         skew(${(Math.random() * (twitchRot * 2)) - twitchRot}deg, ${(Math.random() * twitchRot) - (twitchRot / 2)}deg)`

  if (x < 0.5) {
    span.style.transform = `scaleY(${(Math.random() * (twitchMax - twitchMin)) + twitchMin})`
  } else {
    span.style.transform = `scaleX(${(Math.random() * ((twitchMax / 2) - twitchMin)) + twitchMin})`
  }
  setTimeout(() => {
    span.classList.remove('twitch')
    span.style.transform = 'unset'
  }, twitchHold)
}

const twitchIntro = () => {
  let randomSpans = []
  let n = Math.floor(Math.random() * 4) + 1

  while(randomSpans.length < n) {
    let rand = Math.floor(Math.random() * textAmount)
    if(!randomSpans.includes(rand)) {
      randomSpans.push(rand)
    }
  }

  randomSpans.forEach(span => { twitch(textSpans[span]) })
}

const twitchRollover = () => {
  textSpans.forEach(span => {
    span.addEventListener('mouseover', () => { twitch(span) })
  })
}

const twitchInactive = () => {
  let n = 0
  textSpans.forEach(span => {
    n += twitchStagger
    setTimeout(() => {
      twitch(span)
      setTimeout(() => {
        twitch(span)
        setTimeout(() => {
          twitch(span)
        }, twitchStagger * textSpans.length)
      }, twitchStagger * textSpans.length)
    }, n)
  })
}

const startIdleTimer = () => {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { twitchInactive() }, idleTime);
}

document.addEventListener("mousemove", startIdleTimer);
document.addEventListener("mousedown", startIdleTimer);
document.addEventListener("keypress", startIdleTimer);

const setupTwitch = () => {
  wordSplit(introTag)
  textSpans = document.querySelectorAll('.intro h1 span')
  textAmount = textSpans.length
  textSpans.forEach(span => {
    if (isMobile) {
      span.addEventListener('touchstart', () => { twitch(span) })
    } else {
      span.addEventListener('click', () => { twitch(span) })
    }
  })
  twitchRollover()
  startIdleTimer()
}
setupTwitch()

// ——————————————————————————————————————————————————————————— DVD

const dvd = document.querySelector('#dvd')
const dvdUrls = [
  { url: 'lockup_steak.png', size: 'mid' },
  { url: 'sign.png', size: 'large' },
  { url: 'meat.gif', size: 'mid' },
  { url: 'bvd.png', size: 'small' },
]

let dvdSet = []

let i, dvdW, dvdH, screenW, screenH
let x = 0
let y = 0
let dirX = 1
let dirY = 1
const speed = 100 // pixels per second (not per frame!)
let lastTime = 0

const preloadDvds = () => {
  for (let i = 0; i < dvdUrls.length; i++) {
    const img = new Image()
    img.src = `images/${dvdUrls[i].url}`
    dvdSet.push(img) // Store the images
  }
}

const setDimensions = () => {
  dvdW = dvd.clientWidth
  dvdH = dvd.clientHeight
  screenW = document.body.clientWidth
  screenH = document.body.clientHeight
}

const resetDvd = () => {
  x = Math.random() * (screenW - dvdW)
  y = Math.random() * (screenH - dvdH)
  dirX = Math.random() < 0.5 ? -1 : 1
  dirY = Math.random() < 0.5 ? -1 : 1
  dvd.style.left = x + 'px'
  dvd.style.top = y + 'px'
}

const checkBounds = () => {
  // Check if DVD is out of bounds
  if (x < 0 || y < 0 || x + dvdW > screenW || y + dvdH > screenH) {
    console.log('DVD out of bounds, resetting...')
    resetDvd()
  }
}

const nextDvd = (callback) => {
  i += 1
  if (i >= dvdSet.length) { i = 0 }
  
  dvd.onload = () => {
    dvdW = dvd.clientWidth
    dvdH = dvd.clientHeight
    if (callback) callback()  // Call the callback after dimensions update
  }
  
  dvd.src = dvdSet[i].src
  dvd.className = dvdUrls[i].size
}

const animate = (currentTime) => {

  // Calculate delta time in seconds
  let deltaTime = (currentTime - lastTime) / 1000
  lastTime = currentTime

  // Cap deltaTime to prevent huge jumps when tab is inactive
  if (deltaTime > 0.1) {  // Max 100ms (0.1 seconds)
    deltaTime = 0.1
  }

  // Calculate movement based on time, not frames
  const movement = speed * deltaTime

  // Check vertical bounds - only trigger if moving in that direction
  if (y + dvdH >= screenH && dirY > 0) {
    dirY = -1
    nextDvd(() => {
      y = screenH - dvdH  // Clamp after dimensions update
      // twitchIntro()
    })
  } else if (y < 0 && dirY < 0) {
    dirY = 1
    nextDvd(() => {
      y = 0
      // twitchIntro()
    })
  }
  
  // Check horizontal bounds - only trigger if moving in that direction
  if (x + dvdW >= screenW && dirX > 0) {
    dirX = -1
    nextDvd(() => {
      x = screenW - dvdW  // Clamp after dimensions update
      // twitchIntro()
    })
  } else if (x < 0 && dirX < 0) {
    dirX = 1
    nextDvd(() => {
      x = 0
      // twitchIntro()
    })
  }

  x += dirX * movement
  y += dirY * movement
  
  dvd.style.left = x + 'px'
  dvd.style.top = y + 'px'

  window.requestAnimationFrame(animate)
}

// Listen for tab visibility changes
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    // Tab just became visible
    setDimensions()  // Update viewport dimensions in case window was resized
    checkBounds()    // Check and reset if out of bounds
    lastTime = performance.now()  // Reset time to prevent huge deltaTime
  }
})

const setupDvd = () => {
  preloadDvds()
  i = Math.floor(Math.random() * dvdSet.length)
  dvd.src = dvdSet[i].src
  dvd.className = dvdUrls[i].size
  dvd.onload = () => {
    dvd.style.opacity = 1
    setDimensions()
    lastTime = performance.now() // Initialize lastTime
    window.requestAnimationFrame(animate)
  }
}

setupDvd()

// ——————————————————————————————————————————————————————————— PIGEON

const pigeonButton = document.querySelector('#pigeon')

const pigeonImg = new Image()
pigeonImg.src = 'images/pigeon.gif'

pigeonButton.addEventListener('click', e => {
  // Create image
  const img = document.createElement('img')
  img.className = 'pigeon'
  img.src = pigeonImg.src
  
  // Get button position
  const btnRect = pigeonButton.getBoundingClientRect()
  const startX = btnRect.left + btnRect.width / 2
  const startY = btnRect.top + btnRect.height / 2
  
  // Set starting position
  img.style.left = startX + 'px';
  img.style.top = startY + 'px';
  
  document.body.appendChild(img);
  
  // Random horizontal distance (-200 to 200 pixels from center)
  let randomHorizontal;
  if (!isMobile) { 
    randomHorizontal = (Math.random() - 0.5) * 400;
  } else {
    randomHorizontal = (-Math.random() * 200) - 100;
  }

  // Random height parameters
  const minHeight = 55; // vh units
  const maxHeight = 25; // vh units
  const randomHeight = minHeight + Math.random() * (maxHeight - minHeight);
  const heightInPixels = (randomHeight / 100) * window.innerHeight;

  // Animation parameters
  const duration = 2000; // 2 seconds
  const startTime = Date.now();
  
  // Physics constants
    const gravity = 1500; // Gravity (pixels/second²)
    const initialVelocityY = -Math.sqrt(2 * gravity * heightInPixels); // Physics: v = sqrt(2gh)
    const horizontalDistance = randomHorizontal;

  function animate() {
    const elapsed = (Date.now() - startTime) / 1000; // Convert to seconds
    
    if (elapsed * 1000 > duration + 1000) {
      // Remove image after it's well off screen
      img.remove();
      return;
    }
    
    // Calculate position using physics equations
    // x = x0 + vx * t
    const x = startX + (horizontalDistance * elapsed / (duration / 1000));
    
    // y = y0 + vy * t + 0.5 * a * t²
    const y = startY + (initialVelocityY * elapsed) + (0.5 * gravity * elapsed * elapsed);
    
    // Update position
    img.style.left = x + 'px';
    img.style.top = y + 'px';
    
    // Add rotation for visual effect
    // img.style.transform = `rotate(${elapsed * 360}deg)`;
    img.style.transform = `rotate(${elapsed * 60}deg)`;
    
    requestAnimationFrame(animate);
  }
  
  animate();
})