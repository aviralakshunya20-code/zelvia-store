"""Update Indian coin sizes to the RBI 2019 series in the game data and the coin guide."""
import io

p = 'guides/coin-and-note-sizes-india/index.html'
s = io.open(p, encoding='utf-8').read()
nl = '\r\n' if '\r\n' in s else '\n'
s = s.replace('\r\n', '\n')


def rep(a, b):
    global s
    assert a in s, a[:60]
    s = s.replace(a, b)


rep('rupee coins (₹1, ₹2, ₹5, ₹10)', 'rupee coins (₹1, ₹2, ₹5, ₹10, ₹20 — 2019 series)')
rep('"name": "Why is the ₹2 coin wider than the ₹5 coin?"', '"name": "Why do I have two different sizes of the same coin?"')
rep('"text": "The ₹5 coin is minted noticeably thicker and heavier to maintain tactile distinctiveness for visually impaired citizens while keeping raw material cost balanced."',
    '"text": "Older coin series are still legal tender, so earlier ₹1, ₹2 and ₹5 designs with different diameters circulate alongside the 2019 series. In the 2019 series the size grows with value, which makes the coins easier to tell apart by touch."')
rep('''      <h2>The Sizing Order of Indian Coins</h2>
      <p>
        A frequent misconception is that coin diameter grows with monetary value. In circulating Indian coinage, this is not strictly true:
      </p>
      <ul>
        <li>The standard <strong>₹1 coin</strong> has a diameter of <strong>22.0 mm</strong> (the smallest diameter in this four-coin set).</li>
        <li>The standard <strong>₹2 coin</strong> has a diameter of <strong>25.0 mm</strong>.</li>
        <li>The standard <strong>₹5 coin</strong> has a diameter of <strong>23.0 mm</strong>—smaller in diameter than the ₹2 coin, but noticeably thicker and heavier.</li>
        <li>The bimetallic <strong>₹10 coin</strong> is the largest common circulating coin at <strong>27.0 mm</strong> diameter.</li>
      </ul>''',
    '''      <h2>Sizes of Indian Coins (2019 Series)</h2>
      <p>
        In the coin series issued from 2019, each coin is larger than the one below it in value, so they are easy to tell apart by touch:
      </p>
      <ul>
        <li><strong>₹1 coin:</strong> <strong>20 mm</strong> diameter (the smallest).</li>
        <li><strong>₹2 coin:</strong> <strong>23 mm</strong> diameter.</li>
        <li><strong>₹5 coin:</strong> <strong>25 mm</strong> diameter.</li>
        <li><strong>₹10 coin:</strong> <strong>27 mm</strong> diameter, bimetallic.</li>
        <li><strong>₹20 coin:</strong> <strong>27 mm</strong> across, 12-sided and bimetallic.</li>
      </ul>
      <p>
        Older series are still legal tender and have different sizes, so a coin in your wallet may not match these numbers. You can see each 2019 coin at actual size on the <a href="/actual-size/#inr-1">actual-size objects</a> page.
      </p>''')

rows = [
    ('₹1 Coin', '22.0 mm', '2.20 cm', '₹1 Coin (2019)', '20.0 mm', '2.00 cm'),
    ('₹2 Coin', '25.0 mm', '2.50 cm', '₹2 Coin (2019)', '23.0 mm', '2.30 cm'),
    ('₹5 Coin', '23.0 mm', '2.30 cm', '₹5 Coin (2019)', '25.0 mm', '2.50 cm'),
]
for name, mm, cm, new_name, new_mm, new_cm in rows:
    rep(f'''              <td>{name}</td>
              <td>Outer diameter</td>
              <td>{mm}</td>
              <td>{cm}</td>''', f'''              <td>{new_name}</td>
              <td>Outer diameter</td>
              <td>{new_mm}</td>
              <td>{new_cm}</td>''')
rep('''              <td>₹10 Coin</td>
              <td>Outer diameter</td>
              <td>27.0 mm</td>
              <td>2.70 cm</td>
              <td>Official Standard (Exact)</td>
            </tr>''', '''              <td>₹10 Coin (2019)</td>
              <td>Outer diameter</td>
              <td>27.0 mm</td>
              <td>2.70 cm</td>
              <td>Official Standard (Exact)</td>
            </tr>
            <tr>
              <td>₹20 Coin (2019)</td>
              <td>Across (12-sided)</td>
              <td>27.0 mm</td>
              <td>2.70 cm</td>
              <td>Official Standard (Exact)</td>
            </tr>''')
rep("The following table compiles the verified dimensions recorded in Naapu's measurement engine, indicating which figures represent official mint standards versus real-world approximations:",
    "The following table lists the dimensions used across OnlineMeasurer's tools and game:")
rep('The numbers above reflect current circulating ferritic steel and bimetallic designs. Older commemorative issues may vary; check before relying on older coins for precision work.',
    'The coin numbers above are for the 2019 series. Older series and commemorative issues have different diameters; check which series a coin is before relying on it for precision work.')
rep('''          <h3>Why is the ₹2 coin wider than the ₹5 coin?</h3>
          <p>The ₹5 coin is minted noticeably thicker and heavier to maintain tactile distinctiveness for visually impaired citizens while keeping raw material cost balanced.</p>''',
    '''          <h3>Why do I have two different sizes of the same coin?</h3>
          <p>Older coin series are still legal tender, so earlier ₹1, ₹2 and ₹5 designs with different diameters circulate alongside the 2019 series. In the 2019 series the size grows with value, which makes the coins easier to tell apart by touch.</p>''')
rep('<title>Indian Coin and Currency Note Sizes Reference | Naapu Guide</title>',
    '<title>Indian Coin and Note Sizes in mm (2019 Coins) | OnlineMeasurer</title>')
io.open(p, 'w', encoding='utf-8', newline='').write(s.replace('\n', nl))
print('guide ok')

p = 'js/data.js'
s = io.open(p, encoding='utf-8').read()
for a, b in [
    ("name:'₹1 coin', part:'diameter', mm:22.0, approx:false, hint:'Smallest among ₹1, ₹2, ₹5, and ₹10 coins.'",
     "name:'₹1 coin', part:'diameter', mm:20.0, approx:false, hint:'Smallest among ₹1, ₹2, ₹5, and ₹10 coins (2019 series).'"),
    ("name:'₹2 coin', part:'diameter', mm:25.0, approx:false, hint:'Larger than the ₹5 coin.', name_hi:'₹2 ka sikka', part_hi:'diameter', hint_hi:'₹5 ke sikke se bhi bada hai.'",
     "name:'₹2 coin', part:'diameter', mm:23.0, approx:false, hint:'Larger than ₹1, smaller than ₹5 (2019 series).', name_hi:'₹2 ka sikka', part_hi:'diameter', hint_hi:'₹1 se bada, ₹5 se chhota.'"),
    ("name:'₹5 coin', part:'diameter', mm:23.0, approx:false, hint:'Smaller than ₹2, larger than ₹1.', name_hi:'₹5 ka sikka', part_hi:'diameter', hint_hi:'₹2 se chhota, ₹1 se bada.'",
     "name:'₹5 coin', part:'diameter', mm:25.0, approx:false, hint:'Larger than ₹2, smaller than ₹10 (2019 series).', name_hi:'₹5 ka sikka', part_hi:'diameter', hint_hi:'₹2 se bada, ₹10 se chhota.'"),
]:
    assert a in s, a[:40]
    s = s.replace(a, b)
io.open(p, 'w', encoding='utf-8', newline='').write(s)
print('data ok')
