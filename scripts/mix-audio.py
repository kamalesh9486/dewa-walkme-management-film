import subprocess, os, sys

FFMPEG = r"C:\Users\kkama\AppData\Local\Programs\Python\Python314\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe"
BASE   = r"C:\Users\kkama\Downloads\WalkMe\WalkMe\walkme-video"
AUDIO  = os.path.join(BASE, "public", "audio")
OUT    = os.path.join(BASE, "out")

# Scene start times (seconds) matching timeline.ts
STARTS = [0, 13, 26, 40, 53, 66, 80, 91, 104]
TOTAL  = 115

inputs = []
for i in range(9):
    inputs += ["-i", os.path.join(AUDIO, f"scene{i+1}.mp3")]
inputs += ["-i", os.path.join(AUDIO, "bg-music.mp3")]  # index 9

filters = []
# Loop bg music to full duration at low volume
filters.append(
    f"[9:a]aloop=loop=-1:size=2147483647,atrim=duration={TOTAL},"
    f"aformat=sample_fmts=s16:sample_rates=48000,volume=0.09[bgm]"
)
# Delay each narration to its scene start
for i, start in enumerate(STARTS):
    ms = start * 1000
    filters.append(f"[{i}:a]adelay={ms}|{ms}[n{i}]")

# Mix all 10 streams
mix_in = "".join(f"[n{i}]" for i in range(9)) + "[bgm]"
filters.append(f"{mix_in}amix=inputs=10:dropout_transition=0:normalize=0[out]")

filter_complex = ";".join(filters)
out_file = os.path.join(OUT, "audio-mixed.aac")

cmd = [FFMPEG, "-y"] + inputs + [
    "-filter_complex", filter_complex,
    "-map", "[out]",
    "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
    out_file,
]

print("Mixing audio...")
result = subprocess.run(cmd, capture_output=True, text=True)
if result.returncode != 0:
    print("ERROR:", result.stderr[-3000:])
    sys.exit(1)
print(f"Done: {out_file}")
