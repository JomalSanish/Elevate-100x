max = float('-inf')
smax = float('-inf')
tmax = float('-inf')
l = list(map(int, input().split()))
for i in l:
    if i>max:
        tmax=smax
        smax=max
        max = i
    elif i>smax and i!=max:
        smax = i
    elif i>tmax and i!=max and i!=smax:
        tmax = i
print(max, smax, tmax)