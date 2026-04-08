with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()
    print(f"Open: {content.count('{')}")
    print(f"Close: {content.count('}')}")
    print(f"Open (parenthesis): {content.count('(')}")
    print(f"Close (parenthesis): {content.count(')')}")
    print(f"Open (bracket): {content.count('[')}")
    print(f"Close (bracket): {content.count(']')}")
