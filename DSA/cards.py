a = list(map(int, input().split()))
d = {}
for i in range(len(a)):
    if(a[i] in d):
        d[a[i]]+=1
    else:
        d[a[i]]=1
flag = 0
for x in d:
    if d[x] >= 3:
        for y in d:
            if x != y and d[y] >= 2:
                flag =1
                break
    if flag:
        break

if flag==1:
    print("Yes")
else:
    print("No")

    
        