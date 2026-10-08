// scripts/record-60s-video.js
// Records an exact 60-second (1200 frames @ 20fps) walkthrough of OnlineMeasurer.com
import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const FFMPEG_BIN = 'C:\\Users\\VICTUS\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.0-full_build\\bin\\ffmpeg.exe';
const CHROME_BIN = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;
const FPS = 20;
const TOTAL_SECONDS = 60;
const TOTAL_FRAMES = FPS * TOTAL_SECONDS; // 1,200 frames = 60.00s
const OUTPUT_MP4 = 'assets/onlinemeasurer-demo.mp4';
const ARTIFACT_MP4 = 'C:/Users/VICTUS/.gemini/antigravity-ide/brain/8d8c2cc4-1a7a-4163-b6da-2e12c1763318/onlinemeasurer-60s-advertisement.mp4';

console.log(`Starting 60-Second Video Recorder (${TOTAL_FRAMES} frames @ ${FPS} fps)...`);

// Launch Chrome in headless mode with remote debugging
const chrome = spawn(CHROME_BIN, [
  `--remote-debugging-port=${PORT}`,
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--window-size=1280,720',
  '--hide-scrollbars',
  'http://localhost:8000/'
]);

chrome.on('error', err => {
  console.error('Failed to start Chrome:', err);
  process.exit(1);
});

async function main() {
  await new Promise(r => setTimeout(r, 2200));

  // Find target Chrome tab
  const list = await new Promise((res, rej) => {
    http.get(`http://localhost:${PORT}/json/list`, r => {
      let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d)));
    }).on('error', rej);
  });
  const page = list.find(x => x.type === 'page') || list[0];
  console.log('Connected to Chrome tab:', page.title);

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let msgId = 1;
  function send(method, params = {}) {
    return new Promise(resolve => {
      const curId = msgId++;
      const handler = e => {
        try {
          const msg = JSON.parse(e.data);
          if (msg.id === curId) {
            ws.removeEventListener('message', handler);
            if (msg.error) {
              resolve(null);
            } else {
              resolve(msg.result);
            }
          }
        } catch {
          resolve(null);
        }
      };
      ws.addEventListener('message', handler);
      try {
        ws.send(JSON.stringify({ id: curId, method, params }));
      } catch {
        resolve(null);
      }
    });
  }

  async function evaluate(code) {
    return send('Runtime.evaluate', { expression: code, returnByValue: true });
  }

  await send('Page.enable');
  await send('DOM.enable');

  // Spawn ffmpeg
  fs.mkdirSync('assets', { recursive: true });
  const ffmpeg = spawn(FFMPEG_BIN, [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'mjpeg',
    '-r', String(FPS),
    '-i', '-',
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '20',
    '-pix_fmt', 'yuv420p',
    '-r', String(FPS),
    OUTPUT_MP4
  ]);

  ffmpeg.stderr.on('data', d => {
    const s = d.toString();
    if (s.includes('error') || s.includes('Error')) console.error('FFmpeg:', s.trim());
  });

  // Client Overlay script injected into every page automatically
  const initOverlayScript = `
    (function() {
      if (!window.__overlayInstalled) {
        window.__overlayInstalled = true;
      }
      function install() {
        if (!document.body) return setTimeout(install, 20);

        let cursor = document.getElementById('demo-cursor');
        if (!cursor) {
          cursor = document.createElement('div');
          cursor.id = 'demo-cursor';
          cursor.style.cssText = 'position:fixed; width:22px; height:22px; border-radius:50%; background:rgba(243, 183, 59, 0.95); border:3px solid #2B2118; box-shadow:0 3px 10px rgba(0,0,0,0.45); pointer-events:none; z-index:9999999; transform:translate(-50%, -50%); transition:transform 0.12s ease;';
          document.body.appendChild(cursor);
        }

        let rippleWrap = document.getElementById('demo-ripples');
        if (!rippleWrap) {
          rippleWrap = document.createElement('div');
          rippleWrap.id = 'demo-ripples';
          rippleWrap.style.cssText = 'position:fixed; inset:0; pointer-events:none; z-index:9999998;';
          document.body.appendChild(rippleWrap);
        }

        let banner = document.getElementById('demo-banner');
        if (!banner) {
          banner = document.createElement('div');
          banner.id = 'demo-banner';
          banner.style.cssText = 'position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:#2B2118; color:#F6EFDC; padding:11px 26px; border-radius:30px; font-family:"Patrick Hand", sans-serif; font-size:22px; font-weight:bold; letter-spacing:0.4px; box-shadow:0 8px 24px rgba(0,0,0,0.5); z-index:9999999; border:2px solid #F3B73B; display:flex; align-items:center; gap:12px; pointer-events:none; white-space:nowrap; transition:all 0.2s ease;';
          banner.innerHTML = '<span style="font-size:24px;">📏</span> <span>OnlineMeasurer.com — Hand-crafted measurement & size intuition</span>';
          document.body.appendChild(banner);
        }

        window.__moveCursor = function(x, y) {
          if (cursor) {
            cursor.style.left = x + 'px';
            cursor.style.top = y + 'px';
          }
        };

        window.__clickCursor = function() {
          if (!cursor) return;
          cursor.style.transform = 'translate(-50%, -50%) scale(0.75)';
          setTimeout(() => { if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)'; }, 140);

          if (!rippleWrap) return;
          const rip = document.createElement('div');
          const cx = parseFloat(cursor.style.left) || 0;
          const cy = parseFloat(cursor.style.top) || 0;
          rip.style.cssText = 'position:fixed; left:' + cx + 'px; top:' + cy + 'px; width:12px; height:12px; border-radius:50%; border:3px solid #E05A47; transform:translate(-50%, -50%) scale(1); opacity:1; transition:all 0.4s ease-out;';
          rippleWrap.appendChild(rip);
          requestAnimationFrame(() => {
            rip.style.transform = 'translate(-50%, -50%) scale(4.5)';
            rip.style.opacity = '0';
          });
          setTimeout(() => rip.remove(), 450);
        };

        window.__setBanner = function(icon, text) {
          if (banner) {
            banner.innerHTML = '<span style="font-size:26px;">' + icon + '</span> <span>' + text + '</span>';
          }
        };
      }
      install();
    })();
  `;

  await send('Page.addScriptToEvaluateOnNewDocument', { source: initOverlayScript });
  await evaluate(initOverlayScript);

  let curX = 640, curY = 360;
  let curIcon = '📏', curText = 'OnlineMeasurer.com — Hand-crafted measurement & size intuition';

  async function setBanner(icon, text) {
    curIcon = icon;
    curText = text;
    await evaluate(`window.__setBanner && window.__setBanner("${icon}", "${text}")`);
  }

  async function ensureOverlay() {
    await evaluate(initOverlayScript);
    await evaluate(`window.__setBanner && window.__setBanner("${curIcon}", "${curText}")`);
    await evaluate(`window.__moveCursor && window.__moveCursor(${curX}, ${curY})`);
  }

  let captured = 0;
  let lastFrameBuf = null;

  async function captureFrame() {
    if (captured >= TOTAL_FRAMES) return;
    try {
      const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 85 });
      if (shot && shot.data) {
        lastFrameBuf = Buffer.from(shot.data, 'base64');
      }
    } catch {
      // Keep previous frame on transition
    }

    if (lastFrameBuf) {
      try {
        ffmpeg.stdin.write(lastFrameBuf);
      } catch (err) {
        console.error('ffmpeg write error:', err);
      }
      captured++;
      if (captured % 100 === 0 || captured === TOTAL_FRAMES) {
        console.log(`Captured ${captured}/${TOTAL_FRAMES} frames (${(captured / FPS).toFixed(1)}s / ${TOTAL_SECONDS}s)`);
      }
    }
  }

  async function captureForSeconds(sec) {
    const target = Math.min(TOTAL_FRAMES, captured + Math.round(sec * FPS));
    while (captured < target) {
      await captureFrame();
      await new Promise(r => setTimeout(r, 12));
    }
  }

  async function moveCursorSmooth(toX, toY, steps = 8) {
    const startX = curX, startY = curY;
    for (let i = 1; i <= steps; i++) {
      const p = i / steps;
      curX = Math.round(startX + (toX - startX) * p);
      curY = Math.round(startY + (toY - startY) * p);
      await evaluate(`window.__moveCursor && window.__moveCursor(${curX}, ${curY})`);
      await captureFrame();
      await new Promise(r => setTimeout(r, 12));
    }
  }

  async function clickCurrent() {
    await evaluate(`window.__clickCursor && window.__clickCursor()`);
    await captureForSeconds(0.2);
  }

  async function navigateTo(url) {
    console.log(`Navigating to ${url}...`);
    await send('Page.navigate', { url });
    await new Promise(r => setTimeout(r, 800));
    await ensureOverlay();
  }

  // --- 60-SECOND SCENE CHOREOGRAPHY ---

  console.log('🎬 SCENE 1: Landing Page Showcase (0s - 10s)...');
  await setBanner('📐', '<b>OnlineMeasurer.com</b> — Hand-crafted measurement & size intuition');
  await moveCursorSmooth(640, 260, 10);
  await captureForSeconds(2.0);

  // Smooth scroll down to feature highlights
  for (let i = 0; i < 45; i++) {
    await evaluate(`window.scrollBy(0, 16)`);
    await captureFrame();
    await new Promise(r => setTimeout(r, 12));
  }
  await captureForSeconds(1.5);

  // Smooth scroll back to top
  for (let i = 0; i < 45; i++) {
    await evaluate(`window.scrollBy(0, -16)`);
    await captureFrame();
    await new Promise(r => setTimeout(r, 12));
  }
  await captureForSeconds(1.0);

  console.log('🎬 SCENE 2: Calibrated Online Ruler Tool (10s - 22s)...');
  await setBanner('💳', '<b>1. Credit Card Calibration</b>: Match physical card for true mm scale');
  await moveCursorSmooth(565, 42, 10);
  await clickCurrent();

  // Navigate to ruler page
  await navigateTo('http://localhost:8000/ruler/');
  await captureForSeconds(1.0);

  // Click "Calibrate" button on ruler screen
  await moveCursorSmooth(640, 410, 10);
  await clickCurrent();
  await evaluate(`document.getElementById('t-go-calib')?.click()`);
  await captureForSeconds(1.2);

  // Calibration outline adjustments: demonstrate +5, -1 fine tuning
  await setBanner('🔍', '<b>100% Calibrated Precision</b>: Adjust outline to standard 85.6 mm card');
  await moveCursorSmooth(710, 475, 8); // +5 button
  await clickCurrent();
  await evaluate(`document.querySelectorAll('.fine-buttons-row button')[3]?.click()`);
  await captureForSeconds(0.8);

  await moveCursorSmooth(680, 475, 8); // +1 button
  await clickCurrent();
  await evaluate(`document.querySelectorAll('.fine-buttons-row button')[2]?.click()`);
  await captureForSeconds(0.8);

  // Click "Done" button to save calibration
  await moveCursorSmooth(640, 660, 10);
  await clickCurrent();
  await evaluate(`document.getElementById('c-done')?.click()`);
  await captureForSeconds(1.2);

  // Return to Ruler page now that calibration is saved
  await navigateTo('http://localhost:8000/ruler/');
  await setBanner('📏', '<b>Real-Time Screen Ruler</b>: Switch seamlessly between mm, cm, and inches');
  await captureForSeconds(1.0);

  // Switch units chips: cm -> in -> mm
  await moveCursorSmooth(640, 115, 8); // cm chip
  await clickCurrent();
  await evaluate(`document.querySelectorAll('#t-chips .chip')[1]?.click()`);
  await captureForSeconds(1.0);

  await moveCursorSmooth(680, 115, 8); // in chip
  await clickCurrent();
  await evaluate(`document.querySelectorAll('#t-chips .chip')[2]?.click()`);
  await captureForSeconds(1.0);

  await moveCursorSmooth(600, 115, 8); // mm chip
  await clickCurrent();
  await evaluate(`document.querySelectorAll('#t-chips .chip')[0]?.click()`);
  await captureForSeconds(1.2);

  console.log('🎬 SCENE 3: 2D Fit Checker Clearance Tool (22s - 34s)...');
  await setBanner('📦', '<b>2. "Will It Fit?" Tool</b>: Instant 2D clearance calculation');
  await moveCursorSmooth(645, 42, 10);
  await clickCurrent();

  // Navigate to Fit Checker
  await navigateTo('http://localhost:8000/fit-checker/');
  await captureForSeconds(1.5);

  // Adjust margin clearance to 10 mm
  await moveCursorSmooth(600, 310, 8);
  await clickCurrent();
  await evaluate(`
    const gap = document.getElementById('ft-gap');
    if (gap) { gap.value = '10'; gap.dispatchEvent(new Event('input')); }
  `);
  await captureForSeconds(1.0);

  // Click "Check Fit" button
  await setBanner('✅', '<b>Instant Visual Clearance Stamp</b>: Tests item orientation & margins');
  await moveCursorSmooth(640, 365, 8);
  await clickCurrent();
  await evaluate(`document.getElementById('ft-check')?.click()`);
  await captureForSeconds(3.5);

  console.log('🎬 SCENE 4: Naapu Size Guessing Game (34s - 48s)...');
  await setBanner('🎮', '<b>3. The Naapu Game</b>: Train your physical size intuition!');
  await moveCursorSmooth(510, 42, 10);
  await clickCurrent();

  // Navigate to Play
  await navigateTo('http://localhost:8000/play/#home');
  await captureForSeconds(1.5);

  // Select World 1 (Pocket Coins)
  await setBanner('🪙', '<b>8 Themed Worlds</b>: Coins, gadgets, sports, notes & grand scales');
  await moveCursorSmooth(560, 240, 10);
  await clickCurrent();
  await evaluate(`document.querySelector('.world-card[data-wid="w1"]')?.click()`);
  await captureForSeconds(1.5);

  // Click "Play Set"
  await moveCursorSmooth(640, 665, 10);
  await clickCurrent();
  await evaluate(`document.getElementById('w-play')?.click()`);
  await captureForSeconds(1.5);

  // In Guess screen: Round 1
  await setBanner('🤔', '<b>Guess The Size</b>: Drag the slider or use hint from Fita the snail');
  await moveCursorSmooth(640, 220, 8); // Think expression
  await captureForSeconds(1.0);

  // Click Hint button
  await moveCursorSmooth(580, 665, 8);
  await clickCurrent();
  await evaluate(`document.getElementById('g-hint-btn')?.click()`);
  await captureForSeconds(1.8);

  // Click step plus button
  await moveCursorSmooth(690, 420, 8);
  await clickCurrent();
  await evaluate(`document.getElementById('g-plus')?.click()`);
  await captureForSeconds(0.6);
  await clickCurrent();
  await evaluate(`document.getElementById('g-plus')?.click()`);
  await captureForSeconds(0.6);

  // Click "Lock Guess!"
  await setBanner('🎯', '<b>Visual Scorecard</b>: Compare estimate vs actual with XP & streak combos');
  await moveCursorSmooth(710, 665, 8);
  await clickCurrent();
  await evaluate(`document.getElementById('g-lock-btn')?.click()`);
  await captureForSeconds(3.2); // Observe Reveal screen bars & confetti

  // Click Next Round
  await moveCursorSmooth(640, 665, 8);
  await clickCurrent();
  await evaluate(`document.getElementById('rev-next-btn')?.click()`);
  await captureForSeconds(1.2);

  console.log('🎬 SCENE 5: Daily Hunt Challenge & Outro (48s - 60s)...');
  await setBanner('📅', '<b>4. Daily Hunt Challenge</b>: A new mystery measurement every single day');
  await moveCursorSmooth(720, 42, 10);
  await clickCurrent();

  // Navigate to Daily
  await navigateTo('http://localhost:8000/daily/');
  await captureForSeconds(3.0);

  // Return to Home for Outro
  await navigateTo('http://localhost:8000/');
  await setBanner('✨', '<b>100% Free · No Sign-Up · Offline PWA</b> 👉 onlinemeasurer.com');
  await moveCursorSmooth(640, 300, 10);

  // Fill up remaining frames to reach exactly 1,200 frames (60.00 seconds)
  console.log(`Wrapping up recording to reach exactly ${TOTAL_FRAMES} frames...`);
  await captureForSeconds(TOTAL_SECONDS);

  console.log(`Finished recording ${captured} frames.`);
  ffmpeg.stdin.end();

  await new Promise(r => ffmpeg.on('close', r));
  const fileSizeMb = (fs.statSync(OUTPUT_MP4).size / (1024 * 1024)).toFixed(2);
  console.log(`Video created successfully! Output: ${OUTPUT_MP4} (${fileSizeMb} MB)`);

  // Copy to persistent artifact directory
  fs.copyFileSync(OUTPUT_MP4, ARTIFACT_MP4);
  console.log(`Artifact copied to: ${ARTIFACT_MP4}`);

  ws.close();
  chrome.kill();
  console.log('COMPLETE! Full 60-Second Video Generated.');
}

main().catch(err => {
  console.error('Fatal error during recording:', err);
  chrome.kill();
  process.exit(1);
});
