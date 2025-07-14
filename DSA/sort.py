#sort array of 0 and 1
l = [0,1,1,0,1,0,1,0,1,0,0,1,1,0,0,0,0,1,1,0]

print(sorted(l))

zero = l.count(0)
one = l.count(1)
for i in range(zero):
    l[i]=0
for i in range(zero,zero+one):
    l[i]=1

# sort in single pass
print(l)

l = [0,1,1,0,1,0,1,0,1,0,0,1,1,0,0,0,0,1,1,0]

i = 0
j = len(l)-1

while(i<j):
    if(l[i]==0):
        i+=1
    else:
        l[i],l[j] = l[j],l[i]
        j-=1
print(l)


#sort as odd and even

l = [1,2,3,4,5,6,7,8,9,10,11,12,13,0,1,2,3,4,5,6,7,8,9]

i = 0
j = len(l)-1

while(i<j):
    if(l[i]%2==0):
        i+=1
    else:
        l[i],l[j] = l[j],l[i]
        j-=1
print(l)


#sort 3 numbers in single pass
#dnf algorithm
l = [1,0,2,1,0,2,1,0,2,1,0,2,1,0,2,1,0,2,1,0,2,0,0,0,1,1,1,2,2,2]

start = 0
end = len(l)-1
i=0

while i<=end:
    if l[i]==0:
        l[i],l[start]=l[start],l[i]
        start+=1
        i+=1
    elif l[i]==1:
        i+=1
    elif l[i]==2:
        l[i],l[end]=l[end],l[i]
        end-=1
print(l)
