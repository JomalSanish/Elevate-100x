def fastExp(k,n):
    if n==0:
        return 1
    ans = fastExp(k,n//2)
    if n%2==0:
        return ans*ans
    else:
        return ans*ans*k
        
print(fastExp(2,20))