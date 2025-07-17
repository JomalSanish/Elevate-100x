n = int(input())
a = list(map(int, input().split()))
count=0
i=n
while i!=1:
    count+=1
    i=a[i-2]
print(count)