def rotate(nums,k):
    def rev(nums,i,j):
        while(i<j):
            nums[i],nums[j]=nums[j],nums[i]
            i+=1
            j-=1
            
    k=k%len(nums)
    rev(nums,0,len(nums)-1)
    rev(nums,0,k-1)
    rev(nums,k,len(nums)-1)

    return (nums)

nums = list(map(int, input().split()))
k = int(input())
print(rotate(nums,k))