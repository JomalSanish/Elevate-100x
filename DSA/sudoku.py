def deepCopy(board):
    res = []
    for i in range(len(board)):
        curr = "".join(board[i])
        res.append(curr)
    return res
def solve(board,row,col,ans):
    n = len(board)

    if row==n and col==n:
        ans.append(deepCopy(board))
        return
    value = 1
    if canPlace(board, row, col, value):
        board[row][j]= "{value}"
        solve(board, row,col+1,ans)
        solve(board, row,col+1,ans)
        solve()
        board[row][j] = '.'
        
ans = []
board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
solve(board, 0,0, ans)