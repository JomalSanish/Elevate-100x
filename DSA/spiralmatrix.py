row,col = map(int, input("Row and Col ").split())
matrix = [list(map(int, input().split())) for _ in range(row)]
t = 0
b = row-1
l = 0
r = col-1
arr = []
while t<=b and l<=r:
	for j in range(l, r+1):
		arr.append(matrix[t][j])
	t+=1
	for i in range(t, b+1):
		arr.append(matrix[i][r])
	r-=1
	if t<=b:
		for j in range(r, l-1, -1):
			arr.append(matrix[b][j])
		b-=1
	if l<=r:
		for i in range(b,t-1,-1):
			arr.append(matrix[i][l])
		l+=1
print(arr)

