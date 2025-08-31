# def climbStairs(n):
#     if n==0:
#         return 0
#     if n==1:
#         return 1
#     dp = [0]*(n+1)
#     dp[0] = 0
#     dp[1] = 1
#     dp[2] = 2
#     for i in range(3,n+1):
#         dp[i] = dp[i-1]+dp[i-2]
#     print(dp[n])
# climbStairs(3)



# def climbingStairs(curr, n, path):
#     if curr > n:
#         return 0
#     if curr == n:
#         print(path)
#         return 1
#     count1 = climbingStairs(curr + 1, n, path + "1")
#     count2 = climbingStairs(curr + 2, n, path + "2")
#     return count1 + count2
# print(climbingStairs(0, 10, ""))


