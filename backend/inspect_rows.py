from pathlib import Path
p = Path('Dataset_Kidsland_Skripsi_Final_Fiks.csv')
lines = [line.rstrip('\r\n') for line in p.read_text(encoding='utf-8-sig').splitlines() if line.strip()]
for i, line in enumerate(lines[:3], 1):
    line = line.strip()
    if line.startswith('"') and line.endswith('"'):
        line = line[1:-1]
    parts = [part.strip().strip('"') for part in line.split('\t')]
    print(i, parts)
