def traverseDiagonally(arr, row,col):
    result = []
    i = 0
    j = 0
    def diagonal(m,n):
        inter = []
        while m>=0 and n<col:
            inter.append(arr[m][n])
            m-=1
            n+=1
        return inter
    while i<row and j<col:
        result.append(diagonal(i,j))
        i+=1
        if i==row:
            i-=1
            j+=1
    return result
            



 
print(traverseDiagonally([[1,2,3,4,5,6],[7,8,9,10,11,12],[13,14,15,16,17,18],[19,20,21,22,23,24]], 4,6))
                



# 00 01 02 03 04 05
# 10 11 12 13 14 15
# 20 21 22 23 24 25
# 30 31 32 33 34 35