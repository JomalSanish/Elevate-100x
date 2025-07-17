row, col = map(int, input().split())
t = 0
b = 15-1
l = 0
r = 15-1
black = []
white = []
flag = 0 

while t <= b and l <= r:
    for j in range(l, r + 1):
        if flag == 0:
            black.append([t, j])
        else:
            white.append([t, j])
    t += 1
    for i in range(t, b + 1):
        if flag == 0:
            black.append([i, r])
        else:
            white.append([i, r])
    r -= 1
    if t <= b:
        for j in range(r, l - 1, -1):
            if flag == 0:
                black.append([b, j])
            else:
                white.append([b, j])
        b -= 1
    if l <= r:
        for i in range(b, t - 1, -1):
            if flag == 0:
                black.append([i, l])
            else:
                white.append([i, l])
        l += 1
    flag = 1 - flag

if [row-1, col-1] in black:
    print("black")
else:
    print("white")
