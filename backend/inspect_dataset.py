from pathlib import Path
p = Path('Dataset_Kidsland_Skripsi_Final_Fiks.csv')
text = p.read_text(encoding='utf-8-sig')
lines = text.splitlines()[:8]
for i, line in enumerate(lines, 1):
    print(i, repr(line))
