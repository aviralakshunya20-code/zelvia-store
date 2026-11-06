"""Add useful explanatory sections (how-to, tables, FAQs) to the thin tool pages, before the footer."""
import io

MARK = '<!-- extra-content -->'


def faq(items):
    return '\n'.join(f'''        <details class="home-more"><summary>{q}</summary><div><p>{a}</p></div></details>''' for q, a in items)


SECTIONS = {
    'ruler/index.html': f'''  {MARK}
  <section class="content-page" style="margin-top:8px;">
    <div class="article-body">
      <h2>What You Can Measure on Screen</h2>
      <p>Anything flat that fits on your display. The table shows how much of an object fits on typical screens once the ruler is calibrated.</p>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Device</th><th>Usable ruler length</th><th>Good for</th></tr></thead>
          <tbody>
            <tr><td>Phone (upright)</td><td>about 12–14 cm</td><td>Coins, rings, SIM cards, screws, keys, passport photos</td></tr>
            <tr><td>Tablet</td><td>about 18–22 cm</td><td>Cards, envelopes, small boxes, A6 notes</td></tr>
            <tr><td>Laptop</td><td>about 25–30 cm</td><td>A5 paper, phones, books, packaging</td></tr>
            <tr><td>Desktop monitor</td><td>40 cm and more</td><td>A4 sheets, cables, picture frames</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Which Ruler Page Should I Use?</h2>
      <ul>
        <li><a href="/ruler/cm/">Centimetre ruler</a> — everyday measuring with millimetre ticks.</li>
        <li><a href="/ruler/mm/">Millimetre ruler</a> — small parts such as screws, beads and jewellery.</li>
        <li><a href="/ruler/inches/">Inch ruler</a> — US sizes, photo prints and screen sizes, with 1/16-inch marks.</li>
      </ul>

      <h2>Getting the Most Accurate Reading</h2>
      <ol>
        <li>Calibrate once with any bank, debit or ID card. Every ISO card is exactly 85.60 mm long, so it is a perfect reference.</li>
        <li>Keep browser zoom at 100% and don't pinch the page; zooming changes the scale.</li>
        <li>Look straight down at the screen. Viewing at an angle through thick glass shifts the reading by up to half a millimetre.</li>
        <li>For long objects, measure in two parts and add the results.</li>
      </ol>

      <h2>Frequently Asked Questions</h2>
{faq([
    ('Is an online ruler accurate?', 'After calibration with a bank card, readings are typically accurate to about ±0.5 mm. Without calibration the scale is only an estimate, because every screen has a different pixel density.'),
    ('Why does the ruler need a card to calibrate?', 'Browsers do not know the physical size of your screen. Matching a card of known length (85.60 mm) lets the page work out exactly how many pixels make one millimetre on your device.'),
    ('Can I use this ruler on my phone?', 'Yes. It works on phones, tablets and computers. Calibrate once on each device; the setting is saved in that browser.'),
    ('Does it work if I change zoom or rotate the phone?', 'Rotating is fine. Changing browser zoom changes the scale, so the page will ask you to recalibrate.'),
])}
    </div>
  </section>
''',
    'fit-checker/index.html': f'''  {MARK}
  <section class="content-page" style="margin-top:8px;">
    <div class="article-body">
      <h2>How the Fit Checker Works</h2>
      <p>
        Enter the length and width of the item and of the space (a box, drawer, envelope or bag pocket). The checker compares them with a clearance margin and also tries the item rotated by 90°, because something that doesn't fit lengthways often fits sideways.
      </p>
      <h2>How Much Clearance to Leave</h2>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Situation</th><th>Suggested gap on each side</th></tr></thead>
          <tbody>
            <tr><td>Documents in an envelope or folder</td><td>3–5 mm</td></tr>
            <tr><td>Phone or tablet in a sleeve or case</td><td>2–4 mm</td></tr>
            <tr><td>Laptop in a padded bag</td><td>5–10 mm</td></tr>
            <tr><td>Product in a courier box with padding</td><td>15–25 mm</td></tr>
            <tr><td>Furniture through a doorway</td><td>at least 25 mm</td></tr>
          </tbody>
        </table>
      </div>
      <h2>Measuring the Space Correctly</h2>
      <ul>
        <li>Measure the <strong>inside</strong> of boxes and drawers, not the outside: walls can take 3–10 mm.</li>
        <li>Measure at the narrowest point — drawer runners, hinges and handles often stick out.</li>
        <li>For bags, measure flat and empty; soft bags lose space when packed.</li>
        <li>Airline cabin limits include wheels and handles. A common limit in India is 55 × 35 × 25 cm, but always check your airline.</li>
      </ul>
      <h2>Frequently Asked Questions</h2>
{faq([
    ('Does the fit checker work in 3D?', 'It compares two dimensions at a time. For boxes, check length × width first, then run it again with the height.'),
    ('What does the rotation check do?', 'It tests the item turned by 90°. Many items that seem too long fit once rotated, especially in square-ish spaces.'),
    ('How do I measure an item without a tape?', 'Use the on-screen ruler for small items, or compare with objects of known size such as an A4 sheet (21 × 29.7 cm) or a bank card (8.56 × 5.4 cm).'),
])}
    </div>
  </section>
''',
    'daily/index.html': f'''  {MARK}
  <section class="content-page" style="margin-top:8px;">
    <div class="article-body">
      <h2>How the Daily Challenge Works</h2>
      <p>
        Every day there is one secret length, the same for everyone. You draw what you think that length is on screen without any ruler marks, then see how close you were. Your streak grows each day you land within the allowed tolerance.
      </p>
      <h2>Why Practise Estimating Lengths?</h2>
      <p>
        Being able to judge sizes by eye is surprisingly useful: picking the right box before you post something, guessing whether a sofa fits a wall, or checking a "15 cm" product photo against reality. Like any skill, it improves quickly with short daily practice and feedback.
      </p>
      <h2>Tips to Improve</h2>
      <ul>
        <li>Learn a few body references: the width of your fingertip (about 1–1.5 cm) and your thumb joint (about 2.5 cm, close to one inch).</li>
        <li>Remember common objects: a bank card is 8.6 cm long, an A4 sheet is 21 × 29.7 cm, a ₹10 coin is 27 mm across.</li>
        <li>For longer lengths, picture how many cards would fit end to end.</li>
      </ul>
      <h2>Frequently Asked Questions</h2>
{faq([
    ('Is the daily length the same for everyone?', 'Yes. The target is chosen from the date, so everyone gets the same challenge on the same day.'),
    ('Do I need to calibrate first?', 'Yes, for a fair result. Calibration makes sure a centimetre on your screen is a real centimetre.'),
    ('What happens if I miss a day?', 'Your current streak resets, but your best streak is kept.'),
])}
    </div>
  </section>
''',
    'play/index.html': f'''  {MARK}
  <section class="content-page" style="margin-top:8px;">
    <div class="article-body">
      <h2>How to Play</h2>
      <ol>
        <li><strong>Calibrate</strong> your screen once with a bank card so sizes are real.</li>
        <li><strong>Guess</strong> the size of an everyday object — a coin, a battery, a sheet of paper — by dragging on screen.</li>
        <li><strong>Reveal</strong> the true size and score points for accuracy. Within 2% is a perfect score.</li>
        <li><strong>Progress</strong> through 8 worlds, from pocket coins to sports courts, unlocking new items and titles.</li>
      </ol>
      <h2>The 8 Worlds</h2>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>World</th><th>Examples</th><th>Size range</th></tr></thead>
          <tbody>
            <tr><td>Pocket Coins</td><td>₹1–₹10 coins, bank card</td><td>2–9 cm</td></tr>
            <tr><td>Battery Bazaar</td><td>Coin cell, AA, 9V, playing card</td><td>2–9 cm</td></tr>
            <tr><td>Gadget Box</td><td>Nano SIM, USB plug, Rubik's cube, CD</td><td>1–12 cm</td></tr>
            <tr><td>Paper Stack</td><td>A6, A4 and A3 sheets</td><td>10–42 cm</td></tr>
            <tr><td>Sports Spheres</td><td>Golf, tennis, cricket and football</td><td>4–22 cm</td></tr>
            <tr><td>Banknotes</td><td>₹10 to ₹500 notes, US dollar</td><td>12–16 cm</td></tr>
            <tr><td>Big Measures</td><td>Racket, stump, bat, doorway</td><td>0.7–2.1 m</td></tr>
            <tr><td>Grand Distances</td><td>Basketball hoop, goal, pitch, court</td><td>3–24 m</td></tr>
          </tbody>
        </table>
      </div>
      <h2>Frequently Asked Questions</h2>
{faq([
    ('Is the game free?', 'Yes. It runs in your browser with no sign-up, and your progress is saved on your device.'),
    ('Does it work offline?', 'After your first visit the game is cached, so most of it keeps working without a connection.'),
    ('How is the score calculated?', 'Points depend on how close your guess is in percent. A guess within about 2% earns full points, and points fall as the error grows.'),
])}
    </div>
  </section>
''',
}

for path, html in SECTIONS.items():
    s = io.open(path, encoding='utf-8').read()
    nl = '\r\n' if '\r\n' in s else '\n'
    s = s.replace('\r\n', '\n')
    if MARK in s:
        print('skip', path)
        continue
    i = s.index('  <!-- Footer Nav')
    s = s[:i] + html + '\n' + s[i:]
    io.open(path, 'w', encoding='utf-8', newline='').write(s.replace('\n', nl))
    print('expanded', path)
