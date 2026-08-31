import json

with open(r'c:\Users\WDING8\Downloads\luoshuan\bolt\standard_layout.json', 'r') as f:
    data = json.load(f)

sorted_data = sorted(data, key=lambda d: (d['y'], d['x']))
print('Y-coordinate distribution (sorted, gap > 20 marked with <<<):')
for i, d in enumerate(sorted_data):
    gap = sorted_data[i+1]['y'] - d['y'] if i+1 < len(sorted_data) else 0
    marker = ' <<<' if gap > 20 else ''
    print(f'  {d["id"]:>4} x={d["x"]:>4} y={d["y"]:>4} r={d["r"]:>3} next_gap={gap:>3}{marker}')

# Count rows using gap threshold of 20
print('\nRow analysis (gap threshold = 20):')
rows = []
current_row = [sorted_data[0]]
for i in range(1, len(sorted_data)):
    gap = sorted_data[i]['y'] - current_row[-1]['y']
    if gap > 20:
        rows.append(current_row)
        current_row = [sorted_data[i]]
    else:
        current_row.append(sorted_data[i])
rows.append(current_row)

for row_idx, row in enumerate(rows):
    y_vals = [b['y'] for b in row]
    x_vals = [b['x'] for b in row]
    print(f'  Row {chr(65+row_idx)}: {len(row):>2} bolts, y_range=[{min(y_vals)}-{max(y_vals)}], x_range=[{min(x_vals)}-{max(x_vals)}]')