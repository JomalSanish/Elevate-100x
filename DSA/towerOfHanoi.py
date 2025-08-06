def toh(n,src,aux,des):
    if n==0:
        return
    toh(n-1,src,des,aux)
    print(src, "->" ,des)
    print("yohan")
    toh(n-1,aux,src,des)
    print("alan")
toh(3,"A","B","C")


