n = int(input())
l = list(map(int, input().split()))

sign = 1  
count1 = 0
for i in range(n):
    if sign == 1 and l[i] < 0:
        count1 += 1
    elif sign == 0 and l[i] > 0:
        count1 += 1
    sign = 1 - sign  

sign = 0
count2 = 0
for i in range(n):
    if sign == 1 and l[i] < 0:
        count2 += 1
    elif sign == 0 and l[i] > 0:
        count2 += 1
    sign = 1 - sign

print(min(count1, count2))
