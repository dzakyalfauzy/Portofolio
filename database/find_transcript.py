import json

log_path = r"C:\Users\ameli\.gemini\antigravity\brain\13445561-de27-4fe4-8541-f2dfa8e0771f\.system_generated\logs\transcript.jsonl"
with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        if "hmpsti" in line:
            idx = line.find("hmpsti")
            start = max(0, idx - 1500)
            end = min(len(line), idx + 500)
            print("--- CONTEXT ---")
            print(line[start:end])
            break
