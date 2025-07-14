import math
n = int(input())
for i in range(1, int(math.sqrt(n)+1)):
    if n%i==0:
        print(i, n//i)