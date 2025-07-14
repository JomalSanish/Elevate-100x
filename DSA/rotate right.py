l = list(map(int, input().split()))
n = len(l)
k = int(input("Enter number of elements to be rotated "))
l[(n-(k%n)):n], l[0:n-(k%n)] =  l[0:(n-(k%n))], l[n-(k%n):n]
print(l)