# sub array
l = list(map(int, input().split()))
for k in range(len(l)):
    for i in range(k,len(l)):
        for j in range(k,i+1):
            print(l[j],end=' ')
        print()

print("**************************************************************************************************")
# max sum in sub array

answer = float('-inf')
s =0
for i in range(len(l)):
    if(s<0):
        s = 0
    s+=l[i]
    answer = max(answer,s)
print(answer)


print("**************************************************************************************************")
# max sum in sub array of size k

answer = float('-inf')
k = int(input("enter value for k "))
s =sum(l[:k])
i = 0
j = k
while(j<len(l)):
    s-=l[i]
    s+=l[j]
    answer = max(answer, s)
    i+=1
    j+=1
print(answer)

