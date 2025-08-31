def canPlace(board, row, col):
    n = len(board)
    #same column
    i = row
    j = col
    while(i>=0):
        if board[i][j]=='Q':
            return False
        i-=1

    # #same row
    # i = row
    # j = col
    # while(j>=0):
    #     if board[i][j]=='Q':
    #         return False
    #     j-=1  

    #diagonal 1
    i = row
    j = col
    while(j>=0 and i>=0):
        if board[i][j]=='Q':
            return False
        j-=1  
        i-=1

    #diagonal 2
    i = row
    j = col
    while(j<n and i>=0):
        if board[i][j]=='Q':
            return False
        j+=1  
        i-=1
        
    return True

def deepCopy(board):
    res = []
    for i in range(len(board)):
        curr = "".join(board[i])
        res.append(curr)
    return res
def NQueen(board,row,ans):
    n = len(board)

    if row==n:
        ans.append(deepCopy(board))
        return
    for j in  range(n):
        if canPlace(board, row, j):
            board[row][j]= 'Q'
            NQueen(board, row+1, ans)
            board[row][j] = '.'



n = int(input())
board = [["."] * n for _ in range(n)]
ans = []
NQueen(board,0,ans)

print(ans)

