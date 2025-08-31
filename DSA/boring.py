t = int(input())
for _ in range(t):
    n = int(input())
    s = input()
    if n == 0:
        print("")
        continue
    curr = s[0]
    count = 1
    boring = []
    for i in range(1, n):
        if s[i] == curr:
            count += 1
        else:
            boring.append(curr * count)
            curr = s[i]
            count = 1
    boring.append(curr * count)
    boring.sort(key=len, reverse=True)
    print(boring)
    if len(boring) >= 2:
        if boring[0] == boring[1]:
            print(len(boring[0]))
        else:
            print(len(boring[0])-1)
    elif boring:
        print(len(boring[0])-1)
    else:
        print("")