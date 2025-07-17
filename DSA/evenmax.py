n = int(input())
a = list(map(int, input().split()))
even = []
odd = []
for i in a:
    if(i%2==0):
        even.append(i)
    else:
        odd.append(i)
even.sort(reverse=True)
odd.sort(reverse=True)
m = -1
if len(even)>1:
    m = max(m, even[0]+even[1])
if len(odd)>1:
    m = max(m, odd[0]+odd[1])
print(m)



