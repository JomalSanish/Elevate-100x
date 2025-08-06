max=20*100
t = int(input())
for _ in range(t):
    n = int(input())
    l = list(map(int, input().split()))
    flag = 0
    seen = set()
    for i in range(len(l)):
        toFind = max - l[i]
        if toFind in seen:
            print("Accepted")
            flag = 1
            break
        seen.add(l[i])
        
    if flag == 0:
        print("Rejected")
